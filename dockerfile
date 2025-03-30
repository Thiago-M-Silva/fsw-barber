# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.14.0

FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app

# Adiciona dependências necessárias para o prisma (openssl)
RUN apk add --no-cache openssl

################################################################################
# Etapa para instalar todas as dependências
FROM base AS deps

COPY package.json package-lock.json ./
RUN npm ci

################################################################################
# Etapa de build da aplicação
FROM deps AS build

COPY . .

# Garante que o Prisma gere os tipos corretamente
RUN npx prisma generate

# Builda o Next.js para produção
RUN npm run build

################################################################################
# Etapa final para rodar a aplicação
FROM base AS final

ENV NODE_ENV=production

USER node

COPY --chown=node:node package.json ./
COPY --chown=node:node --from=deps /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/public ./public
COPY --chown=node:node --from=build /app/.next ./.next
COPY --chown=node:node --from=build /app/next.config.mjs ./next.config.mjs
COPY --chown=node:node --from=build /app/prisma ./prisma
COPY --chown=node:node .env .    
COPY --chown=node:node --from=build /app/app ./app       

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
