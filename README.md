# B1 Deutsch للعرب والسوريين 🇸🇾

تطبيق سوري مجاني لتحضير امتحان B1 الألماني — قراءة، استماع، كتابة، محادثة، Leben in Deutschland، وأكثر.

**الموقع:** https://b1-syrer.de  
**التطبيق:** https://b1-syrer.de/app/  
**المؤسّس:** فادي الحلواني (shami.fadi@gmx.de)

## التقنيات

- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Backend:** Cloudflare Pages Functions
- **Database:** Neon Postgres
- **Hosting:** Cloudflare Pages
- **Domain:** b1-syrer.de (Porkbun → Cloudflare DNS)

## التطوير المحلي

```bash
npm install
npm run dev
```

## النشر

```bash
npm run build
npx wrangler pages deploy dist/app --project-name b1-syrer
```

## هيكل المشروع

```
b1-syrer/
├── src/                    # React Frontend
│   ├── pages/             # صفحات التطبيق
│   ├── components/        # مكوّنات مشتركة
│   ├── data/              # بيانات الأسئلة والمحتوى
│   ├── hooks/             # React hooks
│   └── utils/             # أدوات مساعدة
├── functions/             # Cloudflare Pages Functions (Backend)
│   ├── auth/              # تسجيل دخول + إنشاء حساب
│   ├── admin/             # لوحة الإدارة
│   └── push/              # إشعارات Push
├── public/                # ملفات ثابتة
└── dist/                  # ملفات البناء (لا تُرفع)
```

## الأقسام

- 📖 **Lesen** — نماذج قراءة telc B1
- 🎧 **Hören** — نماذج استماع
- ✍️ **Schreiben** — تدريب الكتابة
- 🗣️ **Sprechen** — تدريب المحادثة
- 📐 **Grammatik** — قواعد B1 بالعربي
- 📚 **Wortschatz** — مفردات مهمّة
- 🧩 **Sprachbausteine** — إكمال الفراغات
- 🇩🇪 **Leben in Deutschland** — أسئلة الجنسية
- 🎓 **B2** — محتوى متقدّم
- ⭐ **Premium** — اشتراك بدون إعلانات

## الرخصة

© 2026 فادي الحلواني. جميع الحقوق محفوظة.
