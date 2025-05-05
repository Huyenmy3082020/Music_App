# Sử dụng Node 18 Alpine làm base image
FROM node:18-alpine

# Đặt thư mục làm việc cho ứng dụng
WORKDIR /app

# Sao chép package.json và package-lock.json vào container
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Build ứng dụng
RUN npm run build

# Chạy ứng dụng NestJS từ tệp dist/src/main.js
CMD ["node", "dist/src/main.js"]
