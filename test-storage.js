// 简单测试脚本，检查文件是否存在
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'lib', 'file-storage.ts');
console.log('检查文件是否存在:', filePath);

if (fs.existsSync(filePath)) {
  console.log('✓ file-storage.ts 文件存在');
} else {
  console.log('✗ file-storage.ts 文件不存在');
}

// 检查data目录
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('✓ 创建了 data 目录');
} else {
  console.log('✓ data 目录已存在');
}