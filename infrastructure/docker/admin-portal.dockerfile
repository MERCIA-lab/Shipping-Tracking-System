FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --workspace apps/admin-portal

EXPOSE 5173

CMD ["npm", "start", "--workspace", "apps/admin-portal"]
