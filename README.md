# Oxylabs Proxy Gateway for Google Apps Script

## 🚀 Cấu trúc thư mục

```
vercel-project/
├── api/
│   └── proxy.js          # Serverless function
├── package.json          # Dependencies
├── vercel.json          # Vercel config
└── README.md            # File này
```

## 📦 Deploy lên Vercel

### Cách 1: Deploy từ CLI

```bash
# 1. Tải toàn bộ thư mục vercel-project
# 2. Mở terminal trong thư mục đó
cd vercel-project

# 3. Cài Vercel CLI (nếu chưa có)
npm i -g vercel

# 4. Login Vercel
vercel login

# 5. Deploy
vercel

# Làm theo hướng dẫn:
# - Set up and deploy? Yes
# - Which scope? (Chọn account của bạn)
# - Link to existing project? No
# - Project name? oxylabs-proxy (hoặc tên khác)
# - Directory? ./ (Enter)
# - Override settings? No

# 6. Lấy URL
# Sau khi deploy xong, bạn sẽ thấy URL như:
# https://oxylabs-proxy-abc123.vercel.app
```

### Cách 2: Deploy từ GitHub (KHUYẾN NGHỊ)

```bash
# 1. Push code lên GitHub
git init
git add .
git commit -m "Add proxy gateway"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

# 2. Vào https://vercel.com
# 3. Click "New Project"
# 4. Import từ GitHub repo
# 5. Click "Deploy"
# 6. Đợi 30 giây → Xong!
```

## ✅ Sau khi deploy

1. Lấy URL của bạn (VD: `https://abc123.vercel.app`)
2. Mở Google Apps Script
3. Sửa dòng này:
   ```javascript
   const PROXY_GATEWAY_URL = 'https://abc123.vercel.app/api/proxy';
   ```
4. Chạy `testProxy()` để test
5. Nếu thành công → Chạy `createPagesByCookie()`

## 🧪 Test thủ công

Bạn có thể test bằng cURL:

```bash
curl -X POST https://YOUR-URL.vercel.app/api/proxy \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://api.ipify.org?format=json",
    "method": "GET"
  }'
```

Kết quả sẽ hiển thị IP từ proxy US.

## 📊 Monitoring

- Vercel Dashboard: https://vercel.com/dashboard
- Xem logs: Click vào project → "Logs"
- Xem usage: Kiểm tra bandwidth đã dùng

## ⚠️ Lưu ý

- Vercel free tier: **100GB bandwidth/tháng** (đủ xài)
- Oxylabs: Bạn có **1GB residential proxy** 
- Mỗi request qua proxy ~100-500KB
- → Có thể tạo ~2000-10000 pages với 1GB

## 🔧 Troubleshooting

### Lỗi: "Pattern doesn't match"
- Đảm bảo có thư mục `api/` với file `proxy.js` bên trong
- Check file `vercel.json` có đúng không

### Lỗi: "Cannot find module"
- Run: `npm install` trước khi deploy
- Hoặc push lên GitHub, Vercel sẽ tự install

### Lỗi: "Proxy connection failed"
- Check Oxylabs account còn traffic không
- Verify username/password trong `api/proxy.js`

## 💡 Tips

- Deploy xong có thể xóa repo GitHub (nếu không cần)
- Vercel tự động redeploy khi bạn push code mới
- Free tier không sleep, luôn available 24/7
