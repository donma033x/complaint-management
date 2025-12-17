# Complaint Management System

舆鹰@词盾 - 网络内容管理平台。一个现代化的投诉/内容管理系统，基于 Next.js 和 React 构建，提供用户友好的界面用于处理和追踪投诉。

## 功能特性

- 📝 投诉提交和管理
- 🔐 密码认证（无用户名，仅需访问密码）
- 📊 投诉数据统计和报表
- 📁 投诉分类管理
- 🎨 现代化 UI 界面（基于 Radix UI）
- 🌙 深色主题支持
- 📱 响应式设计
- 🔒 安全的密码加密（bcryptjs）
- 💾 数据导入/导出功能

## 技术栈

- **框架**: Next.js 16.0
- **前端**: React 19
- **样式**: Tailwind CSS 4.1 + PostCSS
- **UI 组件**: Radix UI
- **表单**: React Hook Form
- **图表**: Recharts
- **密码加密**: bcryptjs
- **语言**: TypeScript
- **数据存储**: 基于文件系统的 JSON 存储

## 快速开始

### 前提条件

- Node.js 18+ 或 pnpm

### 安装

```bash
# 克隆项目
git clone https://github.com/donma033x/complaint-management.git
cd complaint-management

# 安装依赖
npm install
# 或使用 pnpm
pnpm install
```

### 开发

```bash
npm run dev
```

访问 http://localhost:3000

### 生产构建

```bash
npm run build
npm start
```

## 项目结构

```
.
├── app/              # Next.js 应用程序主目录
├── components/       # React 组件
├── hooks/            # 自定义 React hooks
├── lib/              # 工具函数和库
├── public/           # 静态资源
├── scripts/          # 脚本文件
├── styles/           # 样式文件
├── data/             # 数据文件
└── Dockerfile        # Docker 配置
```

## Docker 部署

### 构建镜像

```bash
docker build -t complaint-management .
```

### 运行容器

```bash
docker-compose up -d
```

详见 [DEPLOYMENT.md](./DEPLOYMENT.md)

## 使用说明

### 首次使用

1. 访问 http://localhost:3000/login
2. 输入默认密码: `admin123`
3. 点击登录
4. 进入仪表板查看统计数据
5. 在管理员页面修改密码

### 主要功能模块

- **仪表板**: 查看投诉统计和数据概览
- **投诉管理**: 创建、编辑、查看和删除投诉
- **分类管理**: 管理投诉分类（仅管理员）
- **数据导入/导出**: 批量导入和导出投诉数据
- **密码修改**: 在管理员页面更改访问密码

## 环境配置

复制 `.env.example` 为 `.env.local` 并配置必要的环境变量。

## 默认凭证

本系统仅使用密码进行身份认证，无需用户名。

- **访问密码**: admin123

⚠️ **重要**: 部署到生产环境前，请务必更改默认密码。可在管理员页面修改密码。

## 许可证

MIT

## 贡献

欢迎提交 Issue 和 Pull Request！

## 支持

如有问题或建议，请创建 Issue。
