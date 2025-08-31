import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { 
  DocumentTextIcon, 
  CogIcon, 
  BoltIcon,
  PlusIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { fetchDocuments, fetchAgentTasks } from '../utils/api';

interface Document {
  id: string;
  title: string;
  date: string;
  status: string;
  preview: string;
}

interface AgentTask {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  complexity: string;
  status: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('documents');
  const [documents, setDocuments] = useState<Document[]>([]);
  const [agentTasks, setAgentTasks] = useState<AgentTask[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [docsData, tasksData] = await Promise.all([
          fetchDocuments(),
          fetchAgentTasks()
        ]);
        setDocuments(docsData);
        setAgentTasks(tasksData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'draft':
        return 'text-yellow-600 bg-yellow-100';
      case 'in review':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getComplexityIcon = (complexity: string) => {
    switch (complexity.toLowerCase()) {
      case 'high':
        return <ExclamationTriangleIcon className="h-4 w-4 text-red-500" />;
      case 'medium':
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      default:
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <>
      <Head>
        <title>CivilDoc AI - Documentation Assistant</title>
        <meta name="description" content="AI-powered documentation assistant for civil engineers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <img src="/logo.svg" alt="CivilDoc AI" className="h-8 w-8 mr-3" />
                <h1 className="text-xl font-bold text-blue-800">CivilDoc AI</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-md text-gray-400 hover:text-gray-500">
                  <CogIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('documents')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'documents'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <DocumentTextIcon className="h-5 w-5 inline mr-2" />
                文档管理
              </button>
              <button
                onClick={() => setActiveTab('agent-tasks')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'agent-tasks'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BoltIcon className="h-5 w-5 inline mr-2" />
                AI 代理任务
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              {/* Documents Tab */}
              {activeTab === 'documents' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">文档管理</h2>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                      <PlusIcon className="h-5 w-5 mr-2" />
                      新建文档
                    </button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900 truncate">{doc.title}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doc.status)}`}>
                              {doc.status}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">{doc.preview}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{doc.date}</span>
                            <Link href={`/document/${doc.id}`} className="text-blue-600 hover:text-blue-800 flex items-center text-sm">
                              <EyeIcon className="h-4 w-4 mr-1" />
                              查看
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Agent Tasks Tab */}
              {activeTab === 'agent-tasks' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">AI 代理任务</h2>
                    <div className="text-sm text-gray-500">
                      选择一个任务让 AI 代理为您完成
                    </div>
                  </div>

                  <div className="space-y-4">
                    {agentTasks.map((task) => (
                      <div key={task.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                        <div className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center mb-2">
                                {getComplexityIcon(task.complexity)}
                                <h3 className="text-lg font-medium text-gray-900 ml-2">{task.title}</h3>
                              </div>
                              <p className="text-gray-600 mb-4">{task.description}</p>
                              <div className="flex items-center text-sm text-gray-500 space-x-4">
                                <span className="flex items-center">
                                  <ClockIcon className="h-4 w-4 mr-1" />
                                  预计时间: {task.estimatedTime}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  task.complexity === 'High' ? 'bg-red-100 text-red-600' :
                                  task.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                                  'bg-green-100 text-green-600'
                                }`}>
                                  复杂度: {task.complexity}
                                </span>
                              </div>
                            </div>
                            <Link href={`/task/${task.id}`} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md ml-4 inline-block">
                              启动任务
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-gray-500 text-sm">
              © 2023 CivilDoc AI - 为土木工程师打造的智能文档助手
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
