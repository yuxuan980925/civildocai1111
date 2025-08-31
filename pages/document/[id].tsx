import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  PencilIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  CalendarIcon,
  TagIcon
} from '@heroicons/react/24/outline';
import { fetchDocumentById } from '../../utils/api';

interface Document {
  id: string;
  title: string;
  date: string;
  status: string;
  preview: string;
}

export default function DocumentDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      loadDocument();
    }
  }, [id]);

  const loadDocument = async () => {
    setLoading(true);
    try {
      const doc = await fetchDocumentById(id as string);
      setDocument(doc);
    } catch (error) {
      console.error('Error loading document:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">文档未找到</h2>
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{document.title} - CivilDoc AI</title>
        <meta name="description" content={document.preview} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Link href="/" className="mr-4">
                  <ArrowLeftIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                </Link>
                <img src="/logo.svg" alt="CivilDoc AI" className="h-8 w-8 mr-3" />
                <h1 className="text-xl font-bold text-blue-800">CivilDoc AI</h1>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 rounded-md text-gray-400 hover:text-gray-500">
                  <ShareIcon className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-md text-gray-400 hover:text-gray-500">
                  <ArrowDownTrayIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  {isEditing ? '保存' : '编辑'}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Document Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Document Header */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    defaultValue={document.title}
                    className="text-2xl font-bold text-gray-900 w-full border-b border-gray-300 focus:border-blue-500 outline-none"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">{document.title}</h1>
                )}
              </div>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(document.status)}`}>
                {document.status}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-500 space-x-6">
              <div className="flex items-center">
                <CalendarIcon className="h-4 w-4 mr-1" />
                创建日期: {document.date}
              </div>
              <div className="flex items-center">
                <EyeIcon className="h-4 w-4 mr-1" />
                最后查看: 2 小时前
              </div>
              <div className="flex items-center">
                <TagIcon className="h-4 w-4 mr-1" />
                类型: 工程报告
              </div>
            </div>
          </div>

          {/* Document Body */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="prose max-w-none">
              {isEditing ? (
                <textarea
                  defaultValue={`${document.preview}\n\n这里是文档的详细内容。在实际应用中，这里会显示完整的工程文档内容，包括：\n\n1. 项目概述\n2. 技术规范\n3. 设计图纸\n4. 材料清单\n5. 施工计划\n6. 质量控制标准\n7. 安全要求\n8. 环境影响评估\n\n用户可以直接在这里编辑文档内容，AI助手会实时提供建议和格式化帮助。`}
                  rows={20}
                  className="w-full border border-gray-300 rounded-md p-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                />
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-700">{document.preview}</p>
                  <div className="text-gray-700">
                    <h2 className="text-xl font-semibold mb-3">文档详细内容</h2>
                    <p className="mb-4">这里是文档的详细内容。在实际应用中，这里会显示完整的工程文档内容，包括：</p>
                    <ol className="list-decimal pl-6 space-y-2">
                      <li>项目概述</li>
                      <li>技术规范</li>
                      <li>设计图纸</li>
                      <li>材料清单</li>
                      <li>施工计划</li>
                      <li>质量控制标准</li>
                      <li>安全要求</li>
                      <li>环境影响评估</li>
                    </ol>
                    <p className="mt-4">用户可以直接在这里编辑文档内容，AI助手会实时提供建议和格式化帮助。</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Assistant Panel */}
          {isEditing && (
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mt-6">
              <h3 className="text-lg font-medium text-blue-900 mb-3">AI 写作助手</h3>
              <div className="space-y-3">
                <div className="text-sm text-blue-700">
                  💡 建议：您可以添加更多技术细节来完善这份报告
                </div>
                <div className="text-sm text-blue-700">
                  📊 检测到：文档缺少数据图表，是否需要AI生成相关图表？
                </div>
                <div className="text-sm text-blue-700">
                  ✅ 格式检查：文档结构符合工程标准
                </div>
                <div className="flex space-x-2 mt-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                    生成图表
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                    检查合规性
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                    优化内容
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
