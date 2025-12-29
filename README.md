# ThinkHub - Beykent Üniversitesi Bilimsel Araştırma ve Teknoloji Kulübü

Modern ve dinamik bir web sitesi. React, TypeScript, Tailwind CSS ve Vite ile geliştirilmiştir.

## 🚀 Özellikler

- ⚡️ Vite ile hızlı geliştirme
- 🎨 Modern Neobrutalism tasarım
- 📱 Tam responsive tasarım
- 📧 Nodemailer ile email entegrasyonu
- 🎯 TypeScript ile tip güvenliği
- 🎭 React Icons kütüphanesi
- 🌈 Tailwind CSS ile stil yönetimi

## 📋 Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn

## 🛠️ Kurulum

### 1. Ana Kurulum

```bash
# Ana dizinde bağımlılıkları yükleyin
npm install

# Server klasöründe bağımlılıkları yükleyin
cd server
npm install
cd ..
```

### 2. Backend Environment Variables

```bash
# Server klasöründe .env dosyası oluşturun
cd server
cp env.example .env
# .env dosyasını düzenleyin ve email bilgilerinizi girin
cd ..
```

### 3. Çalıştırma

#### ⚡ Tek Komutla Her İkisini Birden (Önerilen):
```bash
npm run dev:all
```

#### Veya Ayrı Ayrı:

**Frontend:**
```bash
npm run dev:frontend
# veya
npm run dev
```
Frontend varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.

**Backend:**
```bash
npm run dev:backend
# veya
cd server && npm run dev
```
Backend varsayılan olarak `http://localhost:3001` adresinde çalışacaktır.

Detaylı backend kurulum talimatları için [server/README.md](server/README.md) dosyasına bakın.

## 📧 Email Yapılandırması

İletişim formu için email gönderimi yapabilmek için:

1. `server/env.example` dosyasını `.env` olarak kopyalayın
2. Gmail kullanıyorsanız:
   - Google hesabınızdan "App Password" oluşturun
   - 2 Adımlı Doğrulama'yı aktifleştirin
   - Oluşturduğunuz app password'ü `.env` dosyasına yazın

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECEIVER_EMAIL=receiver@example.com
PORT=3001
```

Detaylı bilgi için: [server/README.md](server/README.md)

## 🎯 Kullanılabilir Komutlar

### Frontend

```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Production build önizleme
npm run lint         # ESLint kontrolü
```

### Backend

```bash
cd server
npm run dev          # Development server (nodemon)
npm start            # Production server
```

## 📁 Proje Yapısı

```
thinkhub/
├── src/
│   ├── _components/      # React komponentleri
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Who.tsx
│   │   ├── Faq.tsx
│   │   ├── ContactUs.tsx
│   │   └── Footer.tsx
│   ├── assets/          # Görseller ve medya
│   ├── pages/           # Sayfa komponentleri
│   ├── App.tsx
│   └── main.tsx
├── server/              # Backend Express server
│   ├── index.js         # Ana server dosyası
│   ├── package.json
│   └── README.md
├── public/
└── package.json
```

## 🎨 Tasarım Sistemi

Proje, modern Neobrutalism tasarım prensiplerine göre geliştirilmiştir:

- **Kalın siyah borderlar** (border-3, border-4)
- **Düz, canlı renkler** (#fbca1f, #1ABCAA)
- **Box shadow efektleri** (shadow-[4px_4px_0px_0px_rgba(0,0,0,1)])
- **Cesur tipografi** (font-black)
- **Minimal, bold görünüm**

## 🔧 Teknolojiler

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- React Icons (HeroIcons, Font Awesome)

### Backend
- Node.js
- Express.js
- Nodemailer
- CORS
- dotenv

## 🚀 Production Build

```bash
# Frontend build
npm run build

# Backend için environment variables ayarlayın
cd server
# .env dosyasını production değerleriyle güncelleyin

# Backend'i production modunda çalıştırın
npm start
```

## 🔒 Güvenlik Notları

- ✅ `.env` dosyaları `.gitignore`'da olmalı
- ✅ Email şifrelerini asla GitHub'a pushlamamayın
- ✅ Production'da CORS ayarlarını spesifik domainler için yapılandırın
- ✅ Rate limiting eklemek önerilir

## 📞 İletişim

Web sitesi iletişim formu üzerinden bize ulaşabilirsiniz veya:

- Email: info@thinkhub.com
- Instagram: [@beykenthinkhub](https://www.instagram.com/beykenthinkhub)
- LinkedIn: [ThinkHub](https://www.linkedin.com/company/thinkhub)

## 📄 Lisans

Bu proje Beykent Üniversitesi Bilimsel Araştırma ve Teknoloji Kulübü tarafından geliştirilmiştir.

## 🤝 Katkıda Bulunma

Katkıda bulunmak isterseniz:

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

---

Made with ❤️ by ThinkHub
"# beytrium" 
