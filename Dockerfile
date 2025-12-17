# 多阶段构建 - 依赖安装阶段
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 复制 package 文件
COPY package.json ./
RUN npm install --package-lock-only && npm ci

# 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 构建应用
RUN npm run build

# 生产运行阶段
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# 创建非root用户并设置数据目录权限
RUN addgroup -g 1001 -S nodejs &&    adduser -S nextjs -u 1001

# 复制构建产物（非standalone模式）
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --chown=nextjs:nodejs . .

# 创建并设置数据目录权限
RUN mkdir -p /app/data &&    chown -R nextjs:nodejs /app/data &&    chmod -R 755 /app/data

# 切换到非root用户
USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["npm", "start"]
