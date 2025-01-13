FROM node:20-alpine
RUN apt-get update && apt-get install -y curl bash
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "preview", "--", "--port", "8001"]
