FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --workspace apps/customer-web

EXPOSE 3000

CMD ["npm", "start", "--workspace", "apps/customer-web"]
