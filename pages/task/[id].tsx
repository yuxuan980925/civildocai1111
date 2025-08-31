import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  BoltIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

interface TaskStep {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'error';
  description: string;
  progress: number;
}

interface AgentTask {
  id: string;
  title: string;
  description: string;
  estimatedTime: string;
  complexity: string;
  status: string;
}

export default function TaskExecution() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState<AgentTask | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<TaskStep[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  // 模拟任务数据
  const mockTask: AgentTask = {
    id: 'task-1',
    title: '生成环境影响报告',
    description: '为伦敦地铁延伸项目创建全面的环境影响评估',
    estimatedTime: '45分钟',
    complexity: 'High',
    status: 'Available'
  };

  const mockSteps: TaskStep[] = [
    {
      id: 'step-1',
      title: '分析项目范围',
      status: 'pending',
      description: '收集和分析项目基础信息',
      progress: 0
    },
    {
      id: 'step-2',
      title: '环境数据收集',
      status: 'pending',
      description: '收集相关环境数据和历史资料',
      progress: 0
    },
    {
      id: 'step-3',
      title: '影响评估分析',
      status: 'pending',
      description: '分析项目对环境的潜在影响',
      progress: 0
    },
    {
      id: 'step-4',
      title: '缓解措施建议',
      status: 'pending',
      description: '提出环境保护和缓解措施',
      progress: 0
    },
    {
      id: 'step-5',
      title: '生成最终报告',
      status: 'pending',
      description: '整合所有信息生成完整报告',
      progress: 0
    }
  ];

  useEffect(() => {
    setTask(mockTask);
    setSteps(mockSteps);
  }, []);

  const startTask = () => {
    setIsRunning(true);
    setIsPaused(false);
    simulateTaskExecution();
  };

  const pauseTask = () => {
    setIsPaused(true);
    setIsRunning(false);
  };

  const stopTask = () => {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentStep(0);
    setSteps(steps.map(step => ({ ...step, status: 'pending', progress: 0 })));
    setLogs([]);
  };

  const simulateTaskExecution = () => {
    let stepIndex = 0;
    const executeStep = () => {
      if (stepIndex >= steps.length) {
        setIsRunning(false);
        addLog('✅ 任务执行完成！');
        return;
      }

      setCurrentStep(stepIndex);
      const newSteps = [...steps];
      newSteps[stepIndex].status = 'in_progress';
      setSteps(newSteps);

      addLog(`🔄 开始执行: ${newSteps[stepIndex].title}`);

      // 模拟进度更新
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          progress = 100;
          clearInterval(progressInterval);
          
          const completedSteps = [...newSteps];
          completedSteps[stepIndex].status = 'completed';
          completedSteps[stepIndex].progress = 100;
          setSteps(completedSteps);
          
          addLog(`✅ 完成: ${completedSteps[stepIndex].title}`);
          
          stepIndex++;
          setTimeout(executeStep, 1000);
        } else {
          const updatedSteps = [...newSteps];
          updatedSteps[stepIndex].progress = Math.round(progress);
          setSteps(updatedSteps);
        }
      }, 500);
    };

    executeStep();
  };

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <ClockIcon className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'error':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>;
    }
  };

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{task.title} - AI 任务执行 - CivilDoc AI</title>
        <meta name="description" content={task.description} />
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
                <BoltIcon className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-gray-600">AI 任务执行</span>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Task Info & Controls */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{task.title}</h2>
                <p className="text-gray-600 mb-4">{task.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">预计时间:</span>
                    <span className="font-medium">{task.estimatedTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">复杂度:</span>
                    <span className={`font-medium ${
                      task.complexity === 'High' ? 'text-red-600' : 
                      task.complexity === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>{task.complexity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">状态:</span>
                    <span className={`font-medium ${
                      isRunning ? 'text-blue-600' : 
                      isPaused ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      {isRunning ? '执行中' : isPaused ? '已暂停' : '待执行'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {!isRunning && !isPaused && (
                    <button
                      onClick={startTask}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center"
                    >
                      <PlayIcon className="h-4 w-4 mr-2" />
                      开始执行
                    </button>
                  )}
                  
                  {isRunning && (
                    <button
                      onClick={pauseTask}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md flex items-center justify-center"
                    >
                      <PauseIcon className="h-4 w-4 mr-2" />
                      暂停执行
                    </button>
                  )}
                  
                  {(isRunning || isPaused) && (
                    <button
                      onClick={stopTask}
                      className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center justify-center"
                    >
                      <StopIcon className="h-4 w-4 mr-2" />
                      停止执行
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Steps */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">执行步骤</h3>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-start">
                      <div className="flex-shrink-0 mr-3 mt-1">
                        {getStatusIcon(step.status)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{step.title}</h4>
                        <p className="text-xs text-gray-500 mb-2">{step.description}</p>
                        {step.status === 'in_progress' && (
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${step.progress}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Execution Logs & Output */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">执行日志</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm h-64 overflow-y-auto">
                  {logs.length === 0 ? (
                    <div className="text-gray-500">等待任务开始...</div>
                  ) : (
                    logs.map((log, index) => (
                      <div key={index} className="mb-1">{log}</div>
                    ))
                  )}
                </div>
              </div>

              {/* Generated Output Preview */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">生成的内容预览</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {currentStep > 0 ? (
                    <div className="space-y-4">
                      <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto" />
                      <div>
                        <h4 className="text-lg font-medium text-gray-900">环境影响报告</h4>
                        <p className="text-gray-600 mt-2">AI正在生成详细的环境影响评估报告...</p>
                        <div className="mt-4 text-left bg-gray-50 p-4 rounded-md">
                          <h5 className="font-medium text-gray-900 mb-2">报告大纲:</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• 1. 项目概述与背景</li>
                            <li>• 2. 环境现状基线调查</li>
                            <li>• 3. 潜在环境影响分析</li>
                            <li>• 4. 环境保护措施</li>
                            <li>• 5. 监测与管理计划</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto" />
                      <p className="text-gray-500 mt-2">开始任务后，生成的内容将在此处显示</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
