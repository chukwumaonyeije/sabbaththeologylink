'use client';

import React, { useState } from 'react';
import { dataConnect } from '@/lib/firebase';
import { createQuiz, createQuestion } from '@/dataconnect-generated';

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

interface BulkQuizUploadProps {
  onClose: () => void;
  onSuccess: (count: number) => void;
}

const BulkQuizUpload: React.FC<BulkQuizUploadProps> = ({ onClose, onSuccess }) => {
  const [jsonInput, setJsonInput] = useState('');
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

  const handlePreview = () => {
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

  const handleUpload = async () => {
    if (!previewData || !dataConnect) return;

    setLoading(true);
    setError(null);

    try {
      let uploadedCount = 0;

      for (const quizData of previewData) {
        // Create the quiz
        const quizResult = await createQuiz(dataConnect, {
          title: quizData.title,
          moduleId: quizData.moduleId || null
        });

        const quizId = quizResult.data.quiz_insert.id;

        // Create all questions for this quiz
        for (const questionData of quizData.questions) {
          await createQuestion(dataConnect, {
            quizId: quizId,
            questionText: questionData.questionText,
            questionType: questionData.questionType,
            options: questionData.questionType === 'mcq' ? questionData.options || [] : [],
            correctAnswer: questionData.correctAnswer,
            explanation: questionData.explanation || null,
            order: questionData.order
          });
        }

        uploadedCount++;
      }

      onSuccess(uploadedCount);
    } catch (err) {
      console.error('Error uploading quizzes:', err);
      setError('Failed to upload quizzes. Please check your data and try again.');
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
    } catch {
      setError('Failed to load sample data');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Bulk Quiz Upload</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">Upload Instructions</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Paste JSON data containing an array of quiz objects</li>
              <li>• Each quiz must have: title, questions array</li>
              <li>• Each question must have: questionText, questionType, correctAnswer, order</li>
              <li>• MCQ questions must include options array</li>
              <li>• Supported types: &apos;mcq&apos;, &apos;true_false&apos;, &apos;fill_blank&apos;</li>
            </ul>
          </div>

          {/* Sample Data Button */}
          <div className="mb-4">
            <button
              onClick={loadSampleData}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Load Sample Data
            </button>
          </div>

          {/* JSON Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quiz JSON Data
            </label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full h-48 border border-gray-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`[
  {
    "title": "Sample Quiz",
    "moduleId": null,
    "questions": [
      {
        "questionText": "What is 2+2?",
        "questionType": "mcq",
        "options": ["3", "4", "5", "6"],
        "correctAnswer": "4",
        "explanation": "Basic addition",
        "order": 1
      }
    ]
  }
]`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handlePreview}
              disabled={!jsonInput.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Preview & Validate
            </button>
            {previewData && (
              <button
                onClick={handleUpload}
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Uploading...' : `Upload ${previewData.length} Quiz${previewData.length !== 1 ? 'es' : ''}`}
              </button>
            )}
          </div>

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
                  <h3 className="text-sm font-medium text-red-800">Validation Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview */}
          {previewData && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-medium text-green-900 mb-3">Preview ({previewData.length} quizzes)</h3>
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

export default BulkQuizUpload;