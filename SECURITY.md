# دليل أمان TechnoSoft — قبل وبعد رفع GitHub

عند نشر الكود المصدري علناً، يصبح هيكل الـ API ومسارات لوحة التحكم معروفة.  
هذا الدليل يحمي **موقع الإنتاج** (technosoft-store.com) من الاستغلال.

---

## قبل الرفع على GitHub — تحقق من هذه القائمة

- [ ] ملف `backend/.env` **غير** مرفوع (مضاف في `.gitignore`)
- [ ] لا توجد كلمات مرور أو JWT secrets داخل الكود
- [ ] لا توجد روابط cPanel أو FTP أو Railway في الملفات
- [ ] حذف أي ملفات مؤقتة (`Untitled`, `*.rar`, backups)
- [ ] `node_modules/` غير مرفوع

---

## فور رفع GitHub — خطوات إلزامية على الإنتاج

### 1) تغيير كل الأسرار (Rotate Secrets)

حتى لو `.env` لم يُرفع، غيّر:

| السر | أين |
|------|-----|
| `JWT_SECRET` | Railway / Backend env |
| `ADMIN_SETUP_SECRET` | Railway / Backend env |
| كلمة مرور الأدمن | MongoDB + login |
| كلمة مرور MongoDB | MongoDB Atlas |

> **JWT_SECRET جديد = كل جلسات الأدمن الحالية تنتهي** (مطلوب بعد تسريب محتمل).

### 2) إعداد متغيرات الإنتاج

```env
NODE_ENV=production
JWT_SECRET=<64-char-random-string>
CLIENT_URL=https://technosoft-store.com,https://www.technosoft-store.com
ADMIN_SETUP_SECRET=<strong-random-secret>
MONGO_URI=<production-mongodb-uri>
```

### 3) إنشاء الأدمن (مرة واحدة فقط)

```bash
curl -X POST https://YOUR-API/api/auth/create \
  -H "Content-Type: application/json" \
  -H "x-admin-setup-secret: YOUR_ADMIN_SETUP_SECRET" \
  -d '{"username":"admin","password":"STRONG-PASSWORD-HERE"}'
```

بعد إنشاء الحساب: **لا تعيد** استدعاء هذا المسار.

### 4) MongoDB Atlas

- فعّل **IP Access List** (Whitelist) — اسمح فقط لـ IP السيرفر (Railway)
- استخدم مستخدم DB بصلاحيات محدودة (readWrite على DB واحد)
- فعّل **Encryption at Rest**

### 5) Frontend

```env
VITE_API_URL=https://technosoft-production.up.railway.app/api
VITE_IMAGE_BASE_URL=https://technosoft-store.com/ftp
```

أعد بناء Frontend بعد أي تغيير: `npm run build`

### 6) استضافة Frontend

- فعّل **HTTPS** (SSL)
- أضف Security Headers من `.htaccess` أو CDN:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`

---

## ما الذي يحميه الكود المحدّث؟

| التهديد | الحماية |
|---------|---------|
| Brute-force على Login | Rate limit: 10 محاولات / 15 دقيقة |
| إنشاء أدمن عشوائي | محمي بـ `ADMIN_SETUP_SECRET` في الإنتاج |
| CORS abuse | مقيد على `CLIENT_URL` فقط |
| Headers attacks | Helmet middleware |
| API flooding | Rate limit عام: 200 طلب / 15 دقيقة |
| رفع ملفات خبيثة | Multer: jpeg/png/webp فقط، max 5MB |

---

## توصيات إضافية

1. **Cloudflare** (مجاني): WAF + DDoS protection + إخفاء IP السيرفر
2. **Railway**: راقب Logs للمحاولات المشبوهة
3. **Backup**: نسخ MongoDB يومياً
4. **2FA**: على حسابات Railway, MongoDB Atlas, cPanel
5. **لا تستخدم** `admin` كاسم مستخدم — اختر اسماً غير متوقع

---

## في حال اختراق مشتبه

1. غيّر `JWT_SECRET` فوراً
2. غيّر كلمة مرور الأدمن
3. راجع MongoDB للبيانات المضافة/المحذوفة
4. فعّل IP whitelist أضيق
5. راجع Railway logs
