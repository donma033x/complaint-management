# 投诉管理系统 - 部署文档

## 目录
- [Docker 部署（推荐）](#docker-部署推荐)
- [本地部署](#本地部署)
- [环境变量配置](#环境变量配置)
- [常见问题](#常见问题)

---

## Docker 部署（推荐）

### 前置要求
- Docker 20.10+
- Docker Compose 2.0+

### 快速开始

1. **克隆或下载项目代码**
\`\`\`bash
cd complaint-management-system
\`\`\`

2. **构建并启动容器**
\`\`\`bash
docker-compose up -d
\`\`\`

3. **访问应用**
- 应用地址: http://localhost:3000
- 默认管理员账号: admin
- 默认密码: admin123

### Docker 常用命令

\`\`\`bash
# 启动服务
docker-compose up -d

# 停止服务
docker-compose down

# 查看日志
docker-compose logs -f

# 重启服务
docker-compose restart

# 重新构建并启动
docker-compose up -d --build

# 查看容器状态
docker-compose ps
\`\`\`

### 端口配置

如需修改端口，编辑 `docker-compose.yml`:

\`\`\`yaml
ports:
  - "8080:3000"  # 将 3000 改为你想要的端口
\`\`\`

---

## 本地部署

### 前置要求
- Node.js 20+
- npm 或 yarn

### 安装步骤

1. **安装依赖**
\`\`\`bash
npm install
\`\`\`

2. **开发模式运行**
\`\`\`bash
npm run dev
\`\`\`

3. **生产模式构建**
\`\`\`bash
npm run build
npm start
\`\`\`

4. **访问应用**
- 开发模式: http://localhost:3000
- 生产模式: http://localhost:3000

---

## 环境变量配置

当前版本使用内存存储，无需配置数据库。未来如需添加环境变量，可创建 `.env.local` 文件：

\`\`\`env
# 应用端口
PORT=3000

# Node 环境
NODE_ENV=production
\`\`\`

---

## 数据管理

### 数据持久化说明

当前版本使用**内存存储**，数据保存在应用运行时的内存中。

**重要提示:**
- 容器重启或应用重启后，所有数据将丢失
- 建议定期使用系统内置的"导出数据"功能备份数据
- 导出的 JSON 文件可通过"导入数据"功能恢复

### 数据备份流程

1. 登录管理员账号
2. 进入管理页面
3. 点击"导出数据"按钮
4. 保存 JSON 文件到安全位置
5. 定期重复此操作

### 数据恢复流程

1. 登录管理员账号
2. 进入管理页面
3. 点击"导入数据"按钮
4. 选择之前导出的 JSON 文件
5. 确认导入

---

## 常见问题

### 1. 容器无法启动

**检查端口占用:**
\`\`\`bash
# Linux/Mac
lsof -i :3000

# Windows
netstat -ano | findstr :3000
\`\`\`

**解决方案:** 修改 docker-compose.yml 中的端口映射

### 2. 数据丢失

**原因:** 容器重启导致内存数据清空

**解决方案:** 
- 定期使用导出功能备份数据
- 考虑升级到持久化存储版本

### 3. 构建失败

**清理 Docker 缓存:**
\`\`\`bash
docker-compose down
docker system prune -a
docker-compose up -d --build
\`\`\`

### 4. 忘记管理员密码

**重置方法:**
1. 停止容器: `docker-compose down`
2. 重新启动: `docker-compose up -d`
3. 使用默认密码 `admin123` 登录
4. 登录后立即修改密码

### 5. 性能优化

**生产环境建议:**
- 使用反向代理 (Nginx/Caddy)
- 启用 HTTPS
- 配置防火墙规则
- 定期备份数据

---

## 安全建议

1. **首次部署后立即修改默认密码**
2. **不要在公网直接暴露应用**，使用反向代理
3. **定期更新 Docker 镜像**
4. **限制管理员账号访问**
5. **定期备份数据**

---

## 技术支持

如遇到问题，请检查:
1. Docker 和 Docker Compose 版本是否符合要求
2. 端口是否被占用
3. 容器日志: `docker-compose logs -f`
4. 系统资源是否充足

---

## 版本信息

- 应用版本: 2.0.0
- Node.js: 20+
- Next.js: 16.0.0
- 存储方式: 内存存储
