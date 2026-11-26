FROM node:24-alpine AS builder

WORKDIR /app

ARG BLOG_ENABLED=false
ARG DEPLOYMENT_URL="http://localhost"
ARG DEPLOYMENT_BRANCH="main"
ARG BASE_URL="/"
ARG GITHUB_ORG="vadim-cebanu"
ARG GITHUB_PROJECT="portfolio"
ARG GIT_REPOSITORY_URL="https://github.com/vadim-cebanu/portfolio"

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS runner

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80