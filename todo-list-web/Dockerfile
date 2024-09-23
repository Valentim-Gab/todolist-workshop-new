FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Example
RUN echo "API_URL=http://localhost:3004" > .env

RUN npm run build

EXPOSE 9000

# CMD ["npx", "serve", "-s", "dist/spa", "-l", "9000"]
CMD ["sh", "-c", "npx serve -s dist/spa -l 9000 > /dev/null"]

