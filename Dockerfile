# 多阶段构建 - 依赖安装阶段
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 复制 package 文件
COPY package.json package-lock.json ./
RUN npm ci --only=production

# 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

# 构建应用为 standalone 模式
RUN npm run build

# 生产运行阶段 - 使用 distroless 最小化镜像
FROM node:20-alpine
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 创建非root用户
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# 从 builder 复制 standalone 产物（比复制 .next + node_modules 更小）
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# 创建数据目录
RUN mkdir -p /app/data && chown -R nextjs:nodejs /app/data && chmod 755 /app/data

# 切换到非root用户
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
