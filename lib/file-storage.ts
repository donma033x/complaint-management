import fs from 'fs/promises';
import path from 'path';
import { Category, Complaint } from './data';

// 定义数据结构接口
interface DataStore {
  categories: Category[];
  complaints: Complaint[];
}

// 数据存储文件路径
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'complaints-data.json');

// 确保数据目录存在
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// 读取数据
export async function readData(): Promise<DataStore> {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // 如果文件不存在或读取失败，返回默认空数据
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      const defaultData: DataStore = { categories: [], complaints: [] };
      await writeData(defaultData);
      return defaultData;
    }
    throw error;
  }
}

// 写入数据
export async function writeData(data: DataStore): Promise<void> {
  try {
    await ensureDataDir();
    const dataToWrite = {
      ...data,
      updatedAt: Date.now(),
    };
    await fs.writeFile(DATA_FILE, JSON.stringify(dataToWrite, null, 2));
  } catch (error) {
    console.error('写入数据文件时出错:', error);
    throw error;
  }
}

// 获取所有分类
export async function getCategories(): Promise<Category[]> {
  const data = await readData();
  return data.categories.map((cat) => ({
    ...cat,
    count: data.complaints.filter((c) => c.categoryId === cat.id).length,
  }));
}

// 根据ID获取分类
export async function getCategoryById(id: string): Promise<Category | undefined> {
  const data = await readData();
  return data.categories.find((cat) => cat.id === id);
}

// 创建分类
export async function createCategory(name: string, icon: string): Promise<Category> {
  const data = await readData();
  const newCategory: Category = {
    id: Date.now().toString(),
    name,
    icon,
    createdAt: Date.now(),
  };
  data.categories.push(newCategory);
  await writeData(data);
  return newCategory;
}

// 更新分类
export async function updateCategory(id: string, name: string, icon: string): Promise<Category | null> {
  const data = await readData();
  const index = data.categories.findIndex((cat) => cat.id === id);
  if (index === -1) return null;

  data.categories[index] = { ...data.categories[index], name, icon };
  await writeData(data);
  return data.categories[index];
}

// 删除分类
export async function deleteCategory(id: string): Promise<boolean> {
  const data = await readData();
  const initialLength = data.categories.length;
  data.categories = data.categories.filter((cat) => cat.id !== id);
  data.complaints = data.complaints.filter((c) => c.categoryId !== id);
  
  if (initialLength !== data.categories.length) {
    await writeData(data);
    return true;
  }
  return false;
}

// 根据分类ID获取投诉
export async function getComplaintsByCategory(categoryId: string): Promise<Complaint[]> {
  const data = await readData();
  return data.complaints.filter((c) => c.categoryId === categoryId);
}

// 根据ID获取投诉
export async function getComplaintById(id: string): Promise<Complaint | undefined> {
  const data = await readData();
  return data.complaints.find((c) => c.id === id);
}

// 创建投诉
export async function createComplaint(categoryId: string, content: string): Promise<Complaint> {
  const data = await readData();
  const newComplaint: Complaint = {
    id: Date.now().toString(),
    categoryId,
    content,
    usageCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  data.complaints.push(newComplaint);
  await writeData(data);
  return newComplaint;
}

// 更新投诉
export async function updateComplaint(id: string, content: string): Promise<Complaint | null> {
  const data = await readData();
  const index = data.complaints.findIndex((c) => c.id === id);
  if (index === -1) return null;

  data.complaints[index] = { ...data.complaints[index], content, updatedAt: Date.now() };
  await writeData(data);
  return data.complaints[index];
}

// 删除投诉
export async function deleteComplaint(id: string): Promise<boolean> {
  const data = await readData();
  const initialLength = data.complaints.length;
  data.complaints = data.complaints.filter((c) => c.id !== id);
  
  if (initialLength !== data.complaints.length) {
    await writeData(data);
    return true;
  }
  return false;
}

// 搜索投诉
export async function searchComplaints(query: string): Promise<(Complaint & { categoryName: string })[]> {
  const data = await readData();
  const lowerQuery = query.toLowerCase();
  return data.complaints
    .filter((c) => c.content.toLowerCase().includes(lowerQuery))
    .map((c) => ({
      ...c,
      categoryName: data.categories.find((cat) => cat.id === c.categoryId)?.name || "",
    }));
}

// 导出数据
export async function exportData() {
  const data = await readData();
  return {
    ...data,
    exportedAt: Date.now(),
    version: "1.0",
  };
}

// 导入数据
export async function importData(importData: { categories: Category[]; complaints: Complaint[] }): Promise<{ categoriesCount: number; complaintsCount: number }> {
  const data: DataStore = {
    categories: importData.categories,
    complaints: importData.complaints,
  };

  await writeData(data);

  return {
    categoriesCount: data.categories.length,
    complaintsCount: data.complaints.length,
  };
}

// 跟踪投诉使用情况
export async function trackComplaintUsage(id: string) {
  const data = await readData();
  const complaint = data.complaints.find((c) => c.id === id);
  if (complaint) {
    complaint.usageCount++;
    await writeData(data);
  }
}