FROM node:18-alpine

WORKDIR /app

ARG API_URL=$API_URL

COPY . .

RUN npm install

RUN npm run build

EXPOSE 9000

# CMD ["npx", "serve", "-s", "dist/spa", "-l", "9000"]
CMD ["sh", "-c", "npx serve -s dist/spa -l 9000 > /dev/null"]

