# ===== Giai đoạn 1: Build Dependencies =====
FROM node:20-alpine AS builder

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json (hoặc yarn.lock)
COPY package*.json ./

# Cài đặt dependencies cho môi trường production
# Sử dụng 'npm ci' để cài đặt nhanh và đáng tin cậy từ package-lock.json
RUN npm ci --only=production

# Sao chép toàn bộ mã nguồn của ứng dụng
COPY . .

# ===== Giai đoạn 2: Production Image =====
FROM node:20-alpine AS production

WORKDIR /app

# Sao chép node_modules và mã nguồn từ giai đoạn builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app .

# Mở cổng mà ứng dụng của bạn sẽ chạy
EXPOSE 3000

# Chạy ứng dụng với người dùng không phải root để tăng cường bảo mật
USER node

# Lệnh để khởi động ứng dụng của bạn.
# Thay 'server.js' bằng file khởi động chính của bạn (ví dụ: 'index.js', 'app.js')
CMD [ "node", "server.js" ]
