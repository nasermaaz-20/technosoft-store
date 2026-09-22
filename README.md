# TechnoSoft — نظام إدارة متجر وخدمات تقنية

موقع تجاري متكامل لشركة **TechnoSoft** (صيانة أجهزة، قطع كمبيوتر، وخدمات برمجية) مع لوحة تحكم إدارية لإدارة المنتجات والخدمات.

> **ملاحظة:** هذا المستودع للعرض والمحفظة (Portfolio). الكود المصدري عام 
---

## الميزات

- واجهة عربية (RTL) سريعة ومتجاوبة
- صفحات: الرئيسية، من نحن، المنتجات، الخدمات، تواصل
- لوحة تحكم محمية (JWT) لإدارة المنتجات والخدمات
- رفع صور المنتجات مع التحقق من نوع الملف
- تكامل WhatsApp للطلبات والاستفسارات

---

## التقنيات

| الطبقة | التقنية |
|--------|---------|
| Frontend | React 19, Vite, Tailwind CSS, React Router |
| Backend | Node.js, Express 5, MongoDB, Mongoose |
| Auth | JWT + bcrypt |
| Hosting | Frontend (Static) + Backend (Railway) |

---

## هيكل المشروع

```
technosoft/
├── frontend/          # React + Vite
│   ├── src/
│   │   ├── pages/     # صفحات الموقع ولوحة التحكم
│   │   ├── components/
│   │   ├── services/  # Axios API client
│   │   └── config/    # متغيرات البيئة
│   └── .env.example
├── backend/           # Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── .env.example
└── SECURITY.md        # دليل حماية موقع الإنتاج
```

---

## التشغيل المحلي

### 1) Backend

```bash
cd backend
cp .env.example .env
# عدّل .env بقيمك المحلية
npm install
npm run dev
```

الـ API يعمل على `http://localhost:5000`

### 2) Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

الواجهة تعمل على `http://localhost:5173`

### 3) إنشاء حساب أدمن (مرة واحدة)

```bash
curl -X POST http://localhost:5000/api/auth/create \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"your-strong-password"}'
```

> في **الإنتاج** يتطلب مسار الإنشاء هيدر `x-admin-setup-secret`

---

## متغيرات البيئة

### Backend (`backend/.env`)

| المتغير | الوصف |
|---------|--------|
| `PORT` | منفذ السيرفر |
| `MONGO_URI` | رابط MongoDB |
| `JWT_SECRET` | سر توقيع JWT (طويل وعشوائي) |
| `CLIENT_URL` | دومين الواجهة (مفصول بفاصلة إن تعدد) |
| `ADMIN_SETUP_SECRET` | سر لمرة إنشاء الأدمن في الإنتاج |
| `NODE_ENV` | `development` أو `production` |

### Frontend (`frontend/.env`)

| المتغير | الوصف |
|---------|--------|
| `VITE_API_URL` | رابط الـ API |
| `VITE_IMAGE_BASE_URL` | قاعدة URL لصور المنتجات |

---

## البناء للإنتاج

```bash
# Backend
cd backend && npm start

# Frontend
cd frontend && npm run build
# ارفع محتوى dist/ إلى الاستضافة
```

---

## الأمان

المشروع يتضمن:

- Helmet (Security Headers)
- Rate Limiting على تسجيل الدخول والـ API
- CORS مقيد على `CLIENT_URL`
- حماية مسار إنشاء الأدمن في الإنتاج
- `.env` مستبعد من Git

---

## الترخيص

مشروع خاص — تم تسليمه لعميل. الكود المعروض هنا لأغراض العرض فقط.
