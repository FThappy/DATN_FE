# syntax=docker/dockerfile:1

FROM node:20.11.0-alpine

WORKDIR /app

# Copy mã nguồn từ thư mục hiện tại của bạn vào container
COPY package.json .

RUN npm i
# Cài đặt các dependencies của ứng dụng bằng npm

COPY . .

RUN npm run build

# Xác định lệnh mặc định để chạy ứng dụng khi container được khởi chạy
CMD ["npm", "start"]
