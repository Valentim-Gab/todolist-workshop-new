FROM node:latest

WORKDIR /app

RUN npm i -g pnpm@latest
RUN npm i -g prisma@latest

COPY package*.json ./

RUN pnpm i

COPY . .

RUN echo "DATABASE_URL=postgresql://{USER}:{PASSWORD}@{DATABASE_PATH}:{PORT}/{DATABASE_NAME}" > .env

RUN prisma generate

COPY --chown=node:node . .

RUN pnpm build

EXPOSE 3003

CMD ["pnpm", "run", "start:prod"]