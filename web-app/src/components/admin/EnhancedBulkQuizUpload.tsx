'use client';

import React, { useState } from 'react';
import { dataConnect } from '@/lib/firebase';
import { createQuiz, createQuestion } from '@dataconnect/generated';
import { useAuth } from '@/contexts/AuthContext';

interface QuizData {
  title: string;
  moduleId?: string | null;
  questions: QuestionData[];
}

interface QuestionData {
  questionText: string;
  questionType: 'mcq' | 'true_false' | 'fill_blank';
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  order: number;
}

interface EnhancedBulkQuizUploadProps {
  onClose: () => void;
  onSuccess: (count: number) => void;
}

const EnhancedBulkQuizUpload: React.FC<EnhancedBulkQuizUploadProps> = ({ onClose, onSuccess }) => {
  const { currentUser } = useAuth();
  const [uploadMethod, setUploadMethod] = useState<'json' | 'file' | 'ai'>('json');
  const [jsonInput, setJsonInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<QuizData[] | null>(null);

  const validateQuizData = (data: unknown): data is QuizData[] => {
    if (!Array.isArray(data)) {
      throw new Error('Data must be an array of quizzes');
    }

    for (let i = 0; i < data.length; i++) {
      const quiz = data[i];
      if (!quiz.title || typeof quiz.title !== 'string') {
        throw new Error(`Quiz ${i + 1}: Missing or invalid title`);
      }

      if (!Array.isArray(quiz.questions) || quiz.questions.length === 0) {
        throw new Error(`Quiz ${i + 1}: Must have at least one question`);
      }

      for (let j = 0; j < quiz.questions.length; j++) {
        const question = quiz.questions[j];
        if (!question.questionText || typeof question.questionText !== 'string') {
          throw new Error(`Quiz ${i + 1}, Question ${j + 1}: Missing question text`);
        }

        if (!['mcq', 'true_false', 'fill_blank'].includes(question.questionType)) {
          throw new Error(`Quiz ${i + 1}, Question ${j + 1}: Invalid question type. Must be 'mcq', 'true_false', or 'fill_blank'`);
        }

        if (question.questionType === 'mcq' && (!question.options || !Array.isArray(question.options) || question.options.length < 2)) {
          throw new Error(`Quiz ${i + 1}, Question ${j + 1}: MCQ questions must have at least 2 options`);
        }

        if (!question.correctAnswer || typeof question.correctAnswer !== 'string') {
          throw new Error(`Quiz ${i + 1}, Question ${j + 1}: Missing correct answer`);
        }
      }
    }

    return true;
  };

  const handleJsonPreview = () => {
    try {
      setError(null);
      const parsed = JSON.parse(jsonInput);
      validateQuizData(parsed);
      setPreviewData(parsed);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON format. Please check your syntax.');
      } else {
        setError(err instanceof Error ? err.message : 'Unknown validation error');
      }
      setPreviewData(null);
    }
  };

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const fileType = file.type;
      const fileName = file.name.toLowerCase();

      if (fileType === 'application/json' || fileName.endsWith('.json')) {
        // Handle JSON file
        const text = await file.text();
        const parsed = JSON.parse(text);
        validateQuizData(parsed);
        setPreviewData(parsed);
      } else if (fileType === 'text/csv' || fileName.endsWith('.csv')) {
        // Handle CSV file
        const csvData = await processCsvFile(file);
        validateQuizData(csvData);
        setPreviewData(csvData);
      } else if (fileType === 'application/pdf' || fileName.endsWith('.pdf')) {
        // Handle PDF file
        setError('PDF processing requires AI assistance. Please use the AI-Powered option and describe your PDF content.');
      } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || fileName.endsWith('.docx')) {
        // Handle Word document
        setError('Word document processing requires AI assistance. Please use the AI-Powered option and describe your document content.');
      } else if (fileType === 'text/plain' || fileName.endsWith('.txt')) {
        // Handle plain text file
        const textData = await processTextFile(file);
        validateQuizData(textData);
        setPreviewData(textData);
      } else {
        setError('Unsupported file format. Supported formats: JSON, CSV, TXT. For PDF/Word, use AI-Powered option.');
      }
    } catch (err) {
      console.error('Error processing file:', err);
      setError(err instanceof Error ? err.message : 'Failed to process file');
      setPreviewData(null);
    } finally {
      setLoading(false);
    }
  };

  const processCsvFile = async (file: File): Promise<QuizData[]> => {
    const text = await file.text();
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    if (lines.length < 2) {
      throw new Error('CSV file must have at least a header row and one data row');
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const requiredColumns = ['title', 'questionText', 'questionType', 'correctAnswer'];
    
    for (const col of requiredColumns) {
      if (!headers.includes(col)) {
        throw new Error(`CSV must include column: ${col}`);
      }
    }

    const quizzes = new Map<string, QuizData>();
    
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      const row: Record<string, string> = {};
      
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });

      const title = row.title;
      if (!quizzes.has(title)) {
        quizzes.set(title, {
          title,
          moduleId: row.moduleId || null,
          questions: []
        });
      }

      const quiz = quizzes.get(title)!;
      const options = row.options ? row.options.split('|') : undefined;
      
      quiz.questions.push({
        questionText: row.questionText,
        questionType: row.questionType as 'mcq' | 'true_false' | 'fill_blank',
        options,
        correctAnswer: row.correctAnswer,
        explanation: row.explanation || undefined,
        order: quiz.questions.length + 1
      });
    }

    return Array.from(quizzes.values());
  };

  const processTextFile = async (file: File): Promise<QuizData[]> => {
    const text = await file.text();
    
    // Simple text parsing - expects format like:
    // QUIZ: Quiz Title
    // Q: Question text?
    // A: Answer
    // E: Explanation (optional)
    // (blank line)
    
    const sections = text.split(/\n\s*\n/).filter(section => section.trim());
    const quizzes: QuizData[] = [];
    
    let currentQuiz: QuizData | null = null;
    
    for (const section of sections) {
      const lines = section.trim().split('\n').map(line => line.trim());
      
      for (const line of lines) {
        if (line.startsWith('QUIZ:')) {
          if (currentQuiz) {
            quizzes.push(currentQuiz);
          }
          currentQuiz = {
            title: line.substring(5).trim(),
            questions: []
          };
        } else if (line.startsWith('Q:') && currentQuiz) {
          const questionText = line.substring(2).trim();
          currentQuiz.questions.push({
            questionText,
            questionType: 'fill_blank', // Default type
            correctAnswer: '',
            order: currentQuiz.questions.length + 1
          });
        } else if (line.startsWith('A:') && currentQuiz && currentQuiz.questions.length > 0) {
          const lastQuestion = currentQuiz.questions[currentQuiz.questions.length - 1];
          lastQuestion.correctAnswer = line.substring(2).trim();
        } else if (line.startsWith('E:') && currentQuiz && currentQuiz.questions.length > 0) {
          const lastQuestion = currentQuiz.questions[currentQuiz.questions.length - 1];
          lastQuestion.explanation = line.substring(2).trim();
        }
      }
    }
    
    if (currentQuiz) {
      quizzes.push(currentQuiz);
    }

    if (quizzes.length === 0) {
      throw new Error('No valid quiz data found in text file. Expected format: QUIZ: title, Q: question, A: answer');
    }

    return quizzes;
  };

  const handleAiGeneration = async () => {
    setLoading(true);
    setError(null);

    try {
      // This would integrate with an AI service like OpenAI
      setError('AI-powered quiz generation is coming soon! For now, please describe your content and we\'ll help you format it as JSON.');
      
      // Placeholder for AI integration
      // const aiResponse = await generateQuizFromPrompt(aiPrompt);
      // validateQuizData(aiResponse);
      // setPreviewData(aiResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate quiz from AI');
      setPreviewData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!previewData || !dataConnect) {
      setError('No data to upload or database connection unavailable.');
      return;
    }
    
    if (!currentUser) {
      setError('You must be signed in to upload quizzes. Please refresh the page and try again.');
      return;
    }
    
    // Check admin permissions
    const isAdmin = currentUser.email?.includes('admin') || 
                   currentUser.email?.includes('onyei') || 
                   currentUser.email?.includes('chukwuma') || 
                   currentUser.email?.endsWith('@sabbaththeologylink.com');
    
    if (!isAdmin) {
      setError('You do not have permission to upload quizzes.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Starting upload with user:', currentUser?.email);
      console.log('DataConnect available:', !!dataConnect);
      
      // Small delay to ensure auth state is fully ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      let uploadedCount = 0;

      for (const quizData of previewData) {
        console.log('Uploading quiz:', quizData.title);
        
        // Create the quiz first
        const quizResult = await createQuiz(dataConnect, {
          title: quizData.title,
          moduleId: quizData.moduleId || null
        });

        console.log('Quiz created:', quizResult);
        const quizId = quizResult.data.quiz_insert.id;

        // Create questions one by one
        for (let i = 0; i < quizData.questions.length; i++) {
          const questionData = quizData.questions[i];
          console.log(`Creating question ${i + 1}:`, questionData.questionText);
          
          try {
            await createQuestion(dataConnect, {
              quizId: quizId,
              questionText: questionData.questionText,
              questionType: questionData.questionType,
              options: questionData.questionType === 'mcq' ? (questionData.options || []) : [],
              correctAnswer: questionData.correctAnswer,
              explanation: questionData.explanation || null,
              order: questionData.order
            });
            console.log(`Question ${i + 1} created successfully`);
          } catch (questionError) {
            console.error(`Error creating question ${i + 1}:`, questionError);
            throw new Error(`Failed to create question ${i + 1} in quiz "${quizData.title}": ${questionError instanceof Error ? questionError.message : 'Unknown error'}`);
          }
        }

        uploadedCount++;
        console.log(`Quiz "${quizData.title}" uploaded successfully (${uploadedCount}/${previewData.length})`);
      }

      console.log(`All quizzes uploaded successfully! Total: ${uploadedCount}`);
      onSuccess(uploadedCount);
    } catch (err) {
      console.error('Detailed error uploading quizzes:', err);
      
      let errorMessage = 'Failed to upload quizzes.';
      if (err instanceof Error) {
        errorMessage += ` Error: ${err.message}`;
      } else {
        errorMessage += ' Please check your data and try again.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadSampleData = async () => {
    try {
      const response = await fetch('/sample-quizzes.json');
      const sampleData = await response.text();
      setJsonInput(sampleData);
      setError(null);
      setPreviewData(null);
      setUploadMethod('json');
    } catch {
      setError('Failed to load sample data');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Enhanced Bulk Quiz Upload</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Upload Method Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Upload Method</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => setUploadMethod('json')}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  uploadMethod === 'json' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">📝</div>
                <h4 className="font-medium text-gray-900">JSON/Text Input</h4>
                <p className="text-sm text-gray-600">Paste JSON directly or load samples</p>
              </button>

              <button
                onClick={() => setUploadMethod('file')}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  uploadMethod === 'file' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">📄</div>
                <h4 className="font-medium text-gray-900">File Upload</h4>
                <p className="text-sm text-gray-600">JSON, CSV, TXT files</p>
              </button>

              <button
                onClick={() => setUploadMethod('ai')}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${
                  uploadMethod === 'ai' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">🤖</div>
                <h4 className="font-medium text-gray-900">AI-Powered</h4>
                <p className="text-sm text-gray-600">Generate from description (coming soon)</p>
              </button>
            </div>
          </div>

          {/* Format Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">Supported Formats</h3>
            {uploadMethod === 'json' && (
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• JSON: Complete quiz data structure</li>
                <li>• Direct text input with validation</li>
                <li>• Load sample data to see format</li>
              </ul>
            )}
            {uploadMethod === 'file' && (
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>JSON files</strong>: Same format as text input</li>
                <li>• <strong>CSV files</strong>: Columns: title, questionText, questionType, correctAnswer, options (pipe-separated), explanation</li>
                <li>• <strong>TXT files</strong>: Format: QUIZ: title, Q: question, A: answer, E: explanation</li>
                <li>• <strong>PDF/Word</strong>: Use AI-Powered option to describe content</li>
              </ul>
            )}
            {uploadMethod === 'ai' && (
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Describe your PDF, Word doc, or lesson content</li>
                <li>• AI will generate properly formatted quiz questions</li>
                <li>• Perfect for converting existing study materials</li>
                <li>• Currently in development - coming soon!</li>
              </ul>
            )}
          </div>

          {/* JSON Input Method */}
          {uploadMethod === 'json' && (
            <div className="space-y-4">
              <div className="flex gap-3">
                <button
                  onClick={loadSampleData}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Load Sample Data
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quiz JSON Data
                </label>
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  className="w-full h-48 border border-gray-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Paste your JSON quiz data here..."
                />
              </div>

              <button
                onClick={handleJsonPreview}
                disabled={!jsonInput.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Preview & Validate
              </button>
            </div>
          )}

          {/* File Upload Method */}
          {uploadMethod === 'file' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select File
                </label>
                <input
                  type="file"
                  accept=".json,.csv,.txt,.pdf,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setSelectedFile(file);
                      handleFileUpload(file);
                    }
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              {selectedFile && (
                <div className="text-sm text-gray-600">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
                </div>
              )}
            </div>
          )}

          {/* AI Method */}
          {uploadMethod === 'ai' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe Your Content
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full h-32 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the content you want to turn into a quiz. For example: 'I have a PDF about the Sabbath truth that covers its biblical foundation, the Fourth Commandment, and why Saturday is the correct day. Please create 5 multiple choice questions based on this content.'"
                />
              </div>

              <button
                onClick={handleAiGeneration}
                disabled={!aiPrompt.trim() || loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : 'Generate Quiz with AI'}
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Processing...</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Processing Error</h3>
                  <div className="mt-2 text-sm text-red-700">{error}</div>
                </div>
              </div>
            </div>
          )}

          {/* Preview */}
          {previewData && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-green-900">Preview ({previewData.length} quizzes)</h3>
                <button
                  onClick={handleUpload}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Uploading...' : `Upload ${previewData.length} Quiz${previewData.length !== 1 ? 'es' : ''}`}
                </button>
              </div>
              <div className="space-y-4">
                {previewData.map((quiz, index) => (
                  <div key={index} className="bg-white rounded-md p-3 border border-green-200">
                    <h4 className="font-medium text-gray-900">{quiz.title}</h4>
                    <p className="text-sm text-gray-600">
                      {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
                      {quiz.moduleId && ` • Module: ${quiz.moduleId}`}
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      Question types: {[...new Set(quiz.questions.map(q => q.questionType))].join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedBulkQuizUpload;