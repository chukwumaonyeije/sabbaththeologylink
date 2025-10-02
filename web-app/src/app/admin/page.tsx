'use client';

import React, { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { useAuth } from '@/contexts/AuthContext';
import { createModule, createQuiz, createQuestion } from '@dataconnect/generated';
import { dataConnect } from '@/lib/firebase';
import EnhancedBulkQuizUpload from '@/components/admin/EnhancedBulkQuizUpload';

const AdminPage = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createMessage, setCreateMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  // Module form state
  const [moduleForm, setModuleForm] = useState({
    title: '',
    type: 'ssq_lesson',
    contentHtml: '',
    summary: '',
    memoryText: '',
    theologyTags: '',
    quarter: '',
    week: '',
    day: '',
    author: currentUser?.displayName || '',
    sourceUrl: '',
    difficulty: 'intermediate',
    estimatedReadTime: 15
  });
  
  // Quiz creation state
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [quizForm, setQuizForm] = useState({
    title: '',
    moduleId: '',
    questions: [{
      questionText: '',
      questionType: 'mcq',
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: '',
      order: 1
    }]
  });
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizMessage, setQuizMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  // Check if user is admin - multiple ways to qualify
  const isAdmin = currentUser && (
    currentUser.email?.includes('admin') || 
    currentUser.email?.includes('onyei') || // Your email
    currentUser.email?.includes('chukwuma') || // Your name variations
    currentUser.email?.endsWith('@sabbaththeologylink.com') // Future domain
  );

  // Mock admin data
  const adminData = {
    stats: {
      totalUsers: 1234,
      totalModules: 45,
      totalQuizzes: 67,
      activeUsers: 89,
      completionRate: 72
    },
    recentUsers: [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        joinDate: '2024-09-28',
        modulesCompleted: 5,
        lastActive: '2024-09-30'
      },
      {
        id: '2',
        name: 'Sarah Smith',
        email: 'sarah@example.com',
        joinDate: '2024-09-25',
        modulesCompleted: 12,
        lastActive: '2024-09-29'
      },
      {
        id: '3',
        name: 'Michael Johnson',
        email: 'michael@example.com',
        joinDate: '2024-09-20',
        modulesCompleted: 8,
        lastActive: '2024-09-30'
      }
    ],
    pendingContent: [
      {
        id: '1',
        title: 'The Sanctuary and Heavenly Ministry',
        type: 'ssq_lesson',
        author: 'Elder Thompson',
        submittedDate: '2024-09-29',
        status: 'pending_review'
      },
      {
        id: '2',
        title: 'Daniel\'s Prophecies: A Modern Perspective',
        type: 'theology_post',
        author: 'Pastor Williams',
        submittedDate: '2024-09-28',
        status: 'needs_revision'
      }
    ],
    systemHealth: {
      serverStatus: 'healthy',
      databaseConnection: 'healthy',
      authService: 'healthy',
      dataconnectService: 'healthy',
      lastBackup: '2024-09-30T02:00:00Z',
      uptime: '99.8%'
    }
  };

  if (!isAdmin) {
    return (
      <AppLayout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔒</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h1>
            <p className="text-gray-600">
              You don&apos;t have permission to access the admin dashboard.
            </p>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Handle module creation
  const handleCreateModule = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!dataConnect) {
      setCreateMessage({type: 'error', text: 'Data Connect not available in preview mode'});
      return;
    }
    
    setCreateLoading(true);
    setCreateMessage(null);
    
    try {
      await createModule(dataConnect, {
        title: moduleForm.title,
        type: moduleForm.type,
        contentHtml: moduleForm.contentHtml,
        summary: moduleForm.summary || null,
        memoryText: moduleForm.memoryText || null,
        theologyTags: moduleForm.theologyTags.split(',').map(tag => tag.trim()).filter(tag => tag),
        quarter: moduleForm.quarter || null,
        week: moduleForm.week ? parseInt(moduleForm.week) : null,
        day: moduleForm.day || null,
        author: moduleForm.author || null,
        sourceUrl: moduleForm.sourceUrl || null,
        difficulty: moduleForm.difficulty || null,
        estimatedReadTime: moduleForm.estimatedReadTime || null
      });
      
      setCreateMessage({type: 'success', text: 'Module created successfully! It will be reviewed before publishing.'});
      setModuleForm({
        title: '',
        type: 'ssq_lesson',
        contentHtml: '',
        summary: '',
        memoryText: '',
        theologyTags: '',
        quarter: '',
        week: '',
        day: '',
        author: currentUser?.displayName || '',
        sourceUrl: '',
        difficulty: 'intermediate',
        estimatedReadTime: 15
      });
    } catch (error) {
      console.error('Error creating module:', error);
      setCreateMessage({type: 'error', text: 'Failed to create module. Please try again.'});
    } finally {
      setCreateLoading(false);
    }
  };
  
  const handleFormChange = (field: string, value: string | number) => {
    setModuleForm(prev => ({ ...prev, [field]: value }));
  };
  
  // Create sample SDA content
  const createSampleContent = async () => {
    if (!dataConnect) {
      setCreateMessage({type: 'error', text: 'Data Connect not available in preview mode'});
      return;
    }
    
    setCreateLoading(true);
    setCreateMessage(null);
    
    const sampleModules = [
      {
        title: "The Great Controversy - Week 1: The Origin of Evil",
        type: "ssq_lesson",
        contentHtml: `<h2>The Mystery of Sin</h2>
        <p>From the beginning of the great controversy in heaven, it has been Satan's purpose to overthrow the law of God. It was to accomplish this that he entered upon his rebellion against the Creator, and though he was cast out of heaven he has continued the same warfare upon the earth.</p>
        
        <h3>Key Points:</h3>
        <ul>
          <li><strong>The Origin of Sin:</strong> Evil did not originate with God but with Lucifer's rebellion</li>
          <li><strong>Free Will:</strong> God created beings with the power of choice</li>
          <li><strong>The Great Controversy:</strong> The cosmic conflict between good and evil</li>
        </ul>
        
        <h3>Ellen White's Perspective:</h3>
        <blockquote>
          "It is impossible to explain the origin of sin so as to give a reason for its existence... Sin is an intruder, for whose presence no reason can be given." - The Great Controversy, p. 492
        </blockquote>
        
        <h3>Discussion Questions:</h3>
        <ol>
          <li>How does understanding the origin of evil help us in our daily spiritual battles?</li>
          <li>What role does free will play in God's plan for humanity?</li>
          <li>How can we maintain faith when evil seems to triumph?</li>
        </ol>`,
        summary: "Explore the cosmic conflict between good and evil, examining the biblical account of how sin entered the universe through Lucifer's rebellion.",
        memoryText: "How you are fallen from heaven, O Lucifer, son of the morning! How you are cut down to the ground, you who weakened the nations! (Isaiah 14:12)",
        theologyTags: ["Great Controversy", "Sin", "Origin of Evil", "Lucifer", "Free Will"],
        quarter: "2024-Q4",
        week: 1,
        day: "Monday",
        author: "Ellen G. White Institute",
        sourceUrl: "https://www.sabbathschool.org",
        difficulty: "intermediate",
        estimatedReadTime: 15
      },
      {
        title: "The Heavenly Sanctuary and Its Ministry",
        type: "ssq_lesson",
        contentHtml: `<h2>Christ's Ministry in the Heavenly Sanctuary</h2>
        <p>The sanctuary doctrine is one of the distinctive teachings of the Seventh-day Adventist Church. It provides a comprehensive understanding of Christ's ministry and the plan of salvation.</p>
        
        <h3>The Earthly Sanctuary: A Shadow</h3>
        <p>The earthly sanctuary built by Moses was a copy and shadow of heavenly things (Hebrews 8:5). Every detail pointed to Christ's redemptive work:</p>
        <ul>
          <li><strong>The Court:</strong> Represents justification through Christ's sacrifice</li>
          <li><strong>The Holy Place:</strong> Represents sanctification through daily ministry</li>
          <li><strong>The Most Holy Place:</strong> Represents the final judgment and glorification</li>
        </ul>
        
        <h3>Christ's Two-Phase Ministry</h3>
        <p>After His ascension, Christ began His priestly ministry in the heavenly sanctuary:</p>
        <ol>
          <li><strong>First Phase (31-1844 AD):</strong> Daily ministry of intercession</li>
          <li><strong>Second Phase (1844-Second Coming):</strong> Final atonement and judgment</li>
        </ol>
        
        <h3>The Investigative Judgment</h3>
        <p>Beginning in 1844, Christ entered the Most Holy Place to begin the work of investigative judgment, examining the records of all who have professed faith in God.</p>
        
        <blockquote>
          "The subject of the sanctuary was the key which unlocked the mystery of the disappointment of 1844." - The Great Controversy, p. 423
        </blockquote>`,
        summary: "Discover the profound meaning of Christ's ministry in the heavenly sanctuary and its significance for Adventist theology.",
        memoryText: "For Christ has not entered the holy places made with hands, which are copies of the true, but into heaven itself, now to appear in the presence of God for us. (Hebrews 9:24)",
        theologyTags: ["Sanctuary", "Priesthood", "Judgment", "1844", "Atonement"],
        quarter: "2024-Q4",
        week: 3,
        day: "Wednesday",
        author: "SDA Theological Seminary",
        sourceUrl: "https://www.adventistbiblicalresearch.org",
        difficulty: "advanced",
        estimatedReadTime: 22
      },
      {
        title: "The Sabbath: A Sign of Sanctification",
        type: "theology_post",
        contentHtml: `<h2>The Sabbath in Modern Christianity</h2>
        <p>The seventh-day Sabbath remains one of the most distinctive doctrines of Seventh-day Adventists. More than just a day of rest, the Sabbath is a sign of our relationship with God.</p>
        
        <h3>Biblical Foundation</h3>
        <p>The Sabbath commandment is found in the heart of the Ten Commandments:</p>
        <blockquote>
          "Remember the Sabbath day, to keep it holy. Six days you shall labor and do all your work, but the seventh day is the Sabbath of the LORD your God." - Exodus 20:8-10
        </blockquote>
        
        <h3>Three Aspects of Sabbath Significance</h3>
        <ol>
          <li><strong>Memorial of Creation:</strong> God rested on the seventh day (Genesis 2:2-3)</li>
          <li><strong>Sign of Sanctification:</strong> A token of our covenant relationship (Ezekiel 20:12)</li>
          <li><strong>Symbol of Redemption:</strong> Rest from our works, trusting in Christ's finished work</li>
        </ol>
        
        <h3>Sabbath Observance Today</h3>
        <p>How do we keep the Sabbath holy in the 21st century?</p>
        <ul>
          <li>Preparation on Friday</li>
          <li>Corporate worship and fellowship</li>
          <li>Rest from secular employment</li>
          <li>Spiritual activities and family time</li>
          <li>Service to others</li>
        </ul>
        
        <h3>Ellen White's Counsel</h3>
        <blockquote>
          "The Sabbath is not intended to be a period of useless inactivity. The law forbids secular labor on the rest day of the Lord; the toil that gains a livelihood must cease; no labor for worldly pleasure or profit is lawful upon that day; but as God ceased His labor of creating, and rested upon the Sabbath and blessed it, so man is to leave the occupations of his daily life, and devote those sacred hours to healthful rest, to worship, and to holy deeds." - The Desire of Ages, p. 207
        </blockquote>`,
        summary: "Explore the biblical foundation and modern application of Sabbath observance in Adventist theology and practice.",
        memoryText: "Moreover I also gave them My Sabbaths, to be a sign between them and Me, that they might know that I am the LORD who sanctifies them. (Ezekiel 20:12)",
        theologyTags: ["Sabbath", "Law", "Worship", "Sanctification", "Creation"],
        quarter: null,
        week: null,
        day: null,
        author: "Chukwuma Onyeije",
        sourceUrl: "https://sabbaththeologylink.vercel.app",
        difficulty: "intermediate",
        estimatedReadTime: 18
      },
      {
        title: "Joseph's Journey: Faith Through Trials",
        type: "bible_story",
        contentHtml: `<h2>Lessons from Joseph's Life</h2>
        <p>The story of Joseph is one of the most compelling narratives in Scripture, demonstrating how God can work through trials to accomplish His purposes.</p>
        
        <h3>From Dreamer to Prisoner</h3>
        <p>Joseph's journey began with dreams that revealed God's plan for his life. Despite his brothers' jealousy and betrayal, Joseph maintained his faith in God's providence.</p>
        
        <h3>Key Lessons from Joseph's Experience:</h3>
        
        <h4>1. God's Sovereignty in Trials</h4>
        <p>Even when sold into slavery, Joseph recognized God's hand in his circumstances. He didn't become bitter but trusted in divine providence.</p>
        
        <h4>2. Integrity in Adversity</h4>
        <p>In Potiphar's house and later in prison, Joseph maintained his moral integrity. His faithfulness in small matters prepared him for greater responsibilities.</p>
        
        <h4>3. Forgiveness and Reconciliation</h4>
        <p>When reunited with his brothers, Joseph demonstrated Christlike forgiveness:</p>
        <blockquote>
          "But as for you, you meant evil against me; but God meant it for good, in order to bring it about as it is this day, to save many people alive." - Genesis 50:20
        </blockquote>
        
        <h3>Prophetic Significance</h3>
        <p>Joseph's story is also a type of Christ:</p>
        <ul>
          <li>Rejected by his brethren (the Jews)</li>
          <li>Suffered unjustly</li>
          <li>Exalted to a position of authority</li>
          <li>Became a savior to the nations</li>
          <li>Ultimately reconciled with his people</li>
        </ul>
        
        <h3>Application for Today</h3>
        <ol>
          <li><strong>Trust God's timing:</strong> Joseph waited years for God's promises to be fulfilled</li>
          <li><strong>Maintain integrity:</strong> Regardless of circumstances, we must remain faithful</li>
          <li><strong>Forgive others:</strong> Bitterness only harms ourselves</li>
          <li><strong>Serve faithfully:</strong> In every position, we represent Christ</li>
        </ol>
        
        <blockquote>
          "Joseph's life illustrates the life of Christ. It was envy that moved the brethren of Joseph to sell him as a slave... And it was envy and jealousy that moved the Jewish leaders to crucify Christ." - Patriarchs and Prophets, p. 239
        </blockquote>`,
        summary: "Learn from Joseph's remarkable journey of faith, exploring themes of divine providence, integrity, and forgiveness.",
        memoryText: "But as for you, you meant evil against me; but God meant it for good, in order to bring it about as it is this day, to save many people alive. (Genesis 50:20)",
        theologyTags: ["Faith", "Providence", "Character Development", "Forgiveness", "Typology"],
        quarter: null,
        week: null,
        day: null,
        author: "Bible Study Institute",
        sourceUrl: "https://www.whiteestate.org",
        difficulty: "beginner",
        estimatedReadTime: 14
      }
    ];
    
    try {
      let successCount = 0;
      for (const moduleData of sampleModules) {
        await createModule(dataConnect, moduleData);
        successCount++;
      }
      
      setCreateMessage({
        type: 'success', 
        text: `Successfully created ${successCount} sample SDA study modules! Check the modules page to see them.`
      });
    } catch (error) {
      console.error('Error creating sample content:', error);
      setCreateMessage({type: 'error', text: 'Failed to create sample content. Please try again.'});
    } finally {
      setCreateLoading(false);
    }
  };
  
  // Handle quiz creation
  const handleCreateQuiz = async () => {
    if (!dataConnect) {
      setQuizMessage({type: 'error', text: 'Data Connect not available in preview mode'});
      return;
    }
    
    if (!quizForm.title.trim()) {
      setQuizMessage({type: 'error', text: 'Please enter a quiz title'});
      return;
    }
    
    if (quizForm.questions.some(q => !q.questionText.trim() || !q.correctAnswer.trim())) {
      setQuizMessage({type: 'error', text: 'Please complete all question fields'});
      return;
    }
    
    setQuizLoading(true);
    setQuizMessage(null);
    
    try {
      // Create the quiz first
      const quizResult = await createQuiz(dataConnect, {
        title: quizForm.title,
        moduleId: quizForm.moduleId || null
      });
      
      // Create all questions
      const quizId = quizResult.data.quiz_insert.id;
      
      for (let i = 0; i < quizForm.questions.length; i++) {
        const question = quizForm.questions[i];
        await createQuestion(dataConnect, {
          quizId: quizId,
          questionText: question.questionText,
          questionType: question.questionType,
          options: question.questionType === 'mcq' ? question.options.filter(opt => opt.trim()) : [],
          correctAnswer: question.correctAnswer,
          explanation: question.explanation || null,
          order: i + 1
        });
      }
      
      setQuizMessage({
        type: 'success', 
        text: `Successfully created quiz "${quizForm.title}" with ${quizForm.questions.length} questions!`
      });
      
      // Reset form
      setQuizForm({
        title: '',
        moduleId: '',
        questions: [{
          questionText: '',
          questionType: 'mcq',
          options: ['', '', '', ''],
          correctAnswer: '',
          explanation: '',
          order: 1
        }]
      });
    } catch (error) {
      console.error('Error creating quiz:', error);
      setQuizMessage({type: 'error', text: 'Failed to create quiz. Please try again.'});
    } finally {
      setQuizLoading(false);
    }
  };
  
  // Quiz form handlers
  const addQuestion = () => {
    setQuizForm(prev => ({
      ...prev,
      questions: [...prev.questions, {
        questionText: '',
        questionType: 'mcq',
        options: ['', '', '', ''],
        correctAnswer: '',
        explanation: '',
        order: prev.questions.length + 1
      }]
    }));
  };
  
  const removeQuestion = (index: number) => {
    setQuizForm(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };
  
  const updateQuestion = (index: number, field: string, value: string | string[]) => {
    setQuizForm(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };
  
  const updateQuestionOption = (questionIndex: number, optionIndex: number, value: string) => {
    setQuizForm(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => {
        if (i === questionIndex) {
          const newOptions = [...q.options];
          newOptions[optionIndex] = value;
          return { ...q, options: newOptions };
        }
        return q;
      })
    }));
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'content', name: 'Content Management', icon: '📝' },
    { id: 'quizzes', name: 'Quiz Management', icon: '❓' },
    { id: 'users', name: 'User Management', icon: '👥' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'system', name: 'System Health', icon: '⚙️' }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-5 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{adminData.stats.totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <span className="text-2xl">📖</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Modules</p>
              <p className="text-2xl font-bold text-gray-900">{adminData.stats.totalModules}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <span className="text-2xl">❓</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Quizzes</p>
              <p className="text-2xl font-bold text-gray-900">{adminData.stats.totalQuizzes}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100">
              <span className="text-2xl">🔥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{adminData.stats.activeUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completion</p>
              <p className="text-2xl font-bold text-gray-900">{adminData.stats.completionRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Users</h2>
          <div className="space-y-4">
            {adminData.recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div>
                  <h3 className="font-medium text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500">
                    Joined: {new Date(user.joinDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.modulesCompleted} modules
                  </p>
                  <p className="text-xs text-gray-500">
                    Last active: {new Date(user.lastActive).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Review Queue</h2>
          <div className="space-y-4">
            {adminData.pendingContent.map((content) => (
              <div key={content.id} className="p-4 border border-gray-100 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">{content.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    content.status === 'pending_review' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {content.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-600">By: {content.author}</p>
                <p className="text-xs text-gray-500">
                  Submitted: {new Date(content.submittedDate).toLocaleDateString()}
                </p>
                <div className="mt-3 flex space-x-2">
                  <button className="text-xs px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200">
                    Approve
                  </button>
                  <button className="text-xs px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSystemHealth = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">System Status</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Service Health</h3>
          <div className="space-y-3">
            {Object.entries(adminData.systemHealth).map(([service, status]) => {
              if (service === 'lastBackup' || service === 'uptime') return null;
              return (
                <div key={service} className="flex items-center justify-between p-3 border border-gray-100 rounded">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {service.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    status === 'healthy' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">System Info</h3>
          <div className="space-y-3">
            <div className="p-3 border border-gray-100 rounded">
              <p className="text-sm font-medium text-gray-700">Uptime</p>
              <p className="text-lg font-bold text-green-600">{adminData.systemHealth.uptime}</p>
            </div>
            <div className="p-3 border border-gray-100 rounded">
              <p className="text-sm font-medium text-gray-700">Last Backup</p>
              <p className="text-sm text-gray-900">
                {new Date(adminData.systemHealth.lastBackup).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Content Management</h2>
        <button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {showCreateForm ? 'Cancel' : 'Create New Module'}
        </button>
      </div>
      
      {/* Success/Error Message */}
      {createMessage && (
        <div className={`p-4 rounded-md ${
          createMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {createMessage.text}
        </div>
      )}
      
      {/* Create Module Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Create New Study Module</h3>
          
          <form onSubmit={handleCreateModule} className="space-y-6">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={moduleForm.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter module title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  value={moduleForm.type}
                  onChange={(e) => handleFormChange('type', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="ssq_lesson">Sabbath School Lesson</option>
                  <option value="bible_story">Bible Story</option>
                  <option value="theology_post">Theological Post</option>
                </select>
              </div>
            </div>
            
            {/* SSQ-specific fields */}
            {moduleForm.type === 'ssq_lesson' && (
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quarter
                  </label>
                  <input
                    type="text"
                    value={moduleForm.quarter}
                    onChange={(e) => handleFormChange('quarter', e.target.value)}
                    placeholder="e.g., 2024-Q4"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Week
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="13"
                    value={moduleForm.week}
                    onChange={(e) => handleFormChange('week', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Day
                  </label>
                  <select
                    value={moduleForm.day}
                    onChange={(e) => handleFormChange('day', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select day</option>
                    <option value="Sunday">Sunday</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Sabbath">Sabbath</option>
                  </select>
                </div>
              </div>
            )}
            
            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Summary *
              </label>
              <textarea
                required
                value={moduleForm.summary}
                onChange={(e) => handleFormChange('summary', e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the module content"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Memory Text
              </label>
              <textarea
                value={moduleForm.memoryText}
                onChange={(e) => handleFormChange('memoryText', e.target.value)}
                rows={2}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Bible verse for memorization"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Main Content *
              </label>
              <textarea
                required
                value={moduleForm.contentHtml}
                onChange={(e) => handleFormChange('contentHtml', e.target.value)}
                rows={8}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full lesson content (HTML supported)"
              />
            </div>
            
            {/* Metadata */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theology Tags
                </label>
                <input
                  type="text"
                  value={moduleForm.theologyTags}
                  onChange={(e) => handleFormChange('theologyTags', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Sanctuary, Prophecy, Sabbath (comma separated)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                  value={moduleForm.difficulty}
                  onChange={(e) => handleFormChange('difficulty', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={moduleForm.author}
                  onChange={(e) => handleFormChange('author', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Author name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Source URL
                </label>
                <input
                  type="url"
                  value={moduleForm.sourceUrl}
                  onChange={(e) => handleFormChange('sourceUrl', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Read Time (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={moduleForm.estimatedReadTime}
                  onChange={(e) => handleFormChange('estimatedReadTime', parseInt(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={createLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createLoading ? 'Creating...' : 'Create Module'}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Existing Modules List */}
      {!showCreateForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Modules</h3>
          <div className="text-gray-600 text-center py-8">
            Module management interface will be enhanced here.<br />
            Features: Edit modules, manage publishing status, view analytics.
          </div>
        </div>
      )}
    </div>
  );
  
  const renderQuizzes = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Quiz Management</h2>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowBulkUpload(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Bulk Upload
          </button>
          <button 
            onClick={() => setShowCreateQuiz(!showCreateQuiz)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            {showCreateQuiz ? 'Cancel' : 'Create New Quiz'}
          </button>
        </div>
      </div>
      
      {/* Quiz Success/Error Message */}
      {quizMessage && (
        <div className={`p-4 rounded-md ${
          quizMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {quizMessage.text}
        </div>
      )}
      
      {/* Create Quiz Form */}
      {showCreateQuiz && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Create New Quiz</h3>
          
          <div className="space-y-6">
            {/* Quiz Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quiz Title *
                </label>
                <input
                  type="text"
                  required
                  value={quizForm.title}
                  onChange={(e) => setQuizForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter quiz title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Module ID (for association)
                </label>
                <input
                  type="text"
                  value={quizForm.moduleId}
                  onChange={(e) => setQuizForm(prev => ({ ...prev, moduleId: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Module UUID (optional)"
                />
              </div>
            </div>
            
            {/* Questions */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-gray-900">Questions</h4>
                <button
                  type="button"
                  onClick={addQuestion}
                  className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  Add Question
                </button>
              </div>
              
              {quizForm.questions.map((question, qIndex) => (
                <div key={qIndex} className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h5 className="font-medium text-gray-900">Question {qIndex + 1}</h5>
                    {quizForm.questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(qIndex)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    {/* Question Text */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question Text *
                      </label>
                      <textarea
                        required
                        value={question.questionText}
                        onChange={(e) => updateQuestion(qIndex, 'questionText', e.target.value)}
                        rows={2}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your question"
                      />
                    </div>
                    
                    {/* Question Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Question Type
                      </label>
                      <select
                        value={question.questionType}
                        onChange={(e) => updateQuestion(qIndex, 'questionType', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="mcq">Multiple Choice</option>
                        <option value="true_false">True/False</option>
                        <option value="fill_blank">Fill in the Blank</option>
                      </select>
                    </div>
                    
                    {/* Options (for MCQ) */}
                    {question.questionType === 'mcq' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Answer Options
                        </label>
                        <div className="grid md:grid-cols-2 gap-3">
                          {question.options.map((option, oIndex) => (
                            <input
                              key={oIndex}
                              type="text"
                              value={option}
                              onChange={(e) => updateQuestionOption(qIndex, oIndex, e.target.value)}
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              placeholder={`Option ${oIndex + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Correct Answer */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Correct Answer *
                      </label>
                      <input
                        type="text"
                        required
                        value={question.correctAnswer}
                        onChange={(e) => updateQuestion(qIndex, 'correctAnswer', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter the correct answer"
                      />
                    </div>
                    
                    {/* Explanation */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Explanation (Optional)
                      </label>
                      <textarea
                        value={question.explanation}
                        onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
                        rows={2}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Explain why this is the correct answer"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="button"
                disabled={quizLoading}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleCreateQuiz}
              >
                {quizLoading ? 'Creating...' : 'Create Quiz'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Existing Quizzes List */}
      {!showCreateQuiz && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Quizzes</h3>
          <div className="text-gray-600 text-center py-8">
            Quiz management interface will show existing quizzes here.<br />
            Features: Edit questions, view statistics, manage difficulty.
          </div>
        </div>
      )}
    </div>
  );

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ⚙️ Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage content, monitor users, and oversee the SabbathTheologyLink platform.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center py-2 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'system' && renderSystemHealth()}
          {activeTab === 'content' && renderContent()}
          {activeTab === 'quizzes' && renderQuizzes()}
          {activeTab === 'users' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600 text-center py-8">
                User management interface will be implemented here.
              </p>
            </div>
          )}
          {activeTab === 'analytics' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-600 text-center py-8">
                Analytics dashboard will be implemented here.
              </p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-5 gap-4">
            <button 
              onClick={() => {setActiveTab('content'); setShowCreateForm(true);}}
              className="p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-left"
            >
              <div className="text-2xl mb-2">📝</div>
              <h4 className="font-medium text-gray-900">Create Module</h4>
              <p className="text-sm text-gray-600">Add new study content</p>
            </button>
            <button 
              onClick={() => {setActiveTab('quizzes'); setShowCreateQuiz(true);}}
              className="p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-left"
            >
              <div className="text-2xl mb-2">❓</div>
              <h4 className="font-medium text-gray-900">Create Quiz</h4>
              <p className="text-sm text-gray-600">Add interactive assessments</p>
            </button>
            <button 
              onClick={() => setShowBulkUpload(true)}
              className="p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-left"
            >
              <div className="text-2xl mb-2">📊</div>
              <h4 className="font-medium text-gray-900">Bulk Upload Quizzes</h4>
              <p className="text-sm text-gray-600">Upload multiple quizzes from JSON</p>
            </button>
            <button 
              onClick={() => {
                createSampleContent();
                setActiveTab('content');
              }}
              disabled={createLoading}
              className="p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-medium text-gray-900">
                {createLoading ? 'Creating...' : 'Sample Content'}
              </h4>
              <p className="text-sm text-gray-600">Generate SDA study modules</p>
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className="p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-left"
            >
              <div className="text-2xl mb-2">👥</div>
              <h4 className="font-medium text-gray-900">Manage Users</h4>
              <p className="text-sm text-gray-600">User accounts & roles</p>
            </button>
          </div>
        </div>

        {/* Enhanced Bulk Quiz Upload Modal */}
        {showBulkUpload && (
          <EnhancedBulkQuizUpload
            onClose={() => setShowBulkUpload(false)}
            onSuccess={(count) => {
              setShowBulkUpload(false);
              setQuizMessage({
                type: 'success',
                text: `Successfully uploaded ${count} quiz${count !== 1 ? 'es' : ''}! Check the quizzes page to see them.`
              });
            }}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default AdminPage;