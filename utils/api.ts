// API 工具函数

// 获取所有文档
export async function fetchDocuments() {
  try {
    const response = await fetch('/api/documents');
    if (!response.ok) {
      throw new Error('Failed to fetch documents');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}

// 获取所有Agent任务
export async function fetchAgentTasks() {
  try {
    const response = await fetch('/api/agent-tasks');
    if (!response.ok) {
      throw new Error('Failed to fetch agent tasks');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching agent tasks:', error);
    return [];
  }
}

// 模拟文档详情获取
export async function fetchDocumentById(id: string) {
  try {
    // 在实际应用中，这里会调用 /api/documents/[id]
    const response = await fetch('/api/documents');
    if (!response.ok) {
      throw new Error('Failed to fetch document');
    }
    const documents = await response.json();
    return documents.find((doc: any) => doc.id === id) || null;
  } catch (error) {
    console.error(`Error fetching document ${id}:`, error);
    return null;
  }
} 