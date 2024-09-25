FROM node:latest

WORKDIR /app

RUN npm i -g pnpm@latest
RUN npm i -g prisma@latest

COPY --chown=node:node . .

RUN pnpm i

RUN prisma generate

RUN pnpm build

EXPOSE 3003

CMD ["pnpm", "run", "start:prod"]