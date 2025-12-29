# ThinkHub Email Server

Bu, ThinkHub web sitesi için Nodemailer kullanarak email gönderen Express.js backend serveridir.

## Kurulum

1. Server klasörüne gidin:
```bash
cd server
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Environment variables ayarlayın:
   - `env.example` dosyasını `.env` olarak kopyalayın
   - `.env` dosyasını kendi bilgilerinizle doldurun

```bash
cp env.example .env
```

## Gmail Kullanımı

Gmail kullanıyorsanız **App Password** oluşturmalısınız:

1. Google hesabınıza gidin (https://myaccount.google.com/)
2. **Güvenlik** sekmesine tıklayın
3. **2 Adımlı Doğrulama**'yı aktifleştirin
4. **Uygulama Şifreleri**'ne gidin
5. "Mail" seçeneğiyle yeni bir uygulama şifresi oluşturun
6. Oluşan 16 haneli şifreyi `.env` dosyasındaki `EMAIL_PASS` değişkenine yazın

## Environment Variables

`.env` dosyasında aşağıdaki değişkenleri ayarlayın:

```env
EMAIL_USER=your-email@gmail.com          # Gönderen email adresi
EMAIL_PASS=your-app-password             # Gmail app password
RECEIVER_EMAIL=receiver@example.com      # Maillerin gideceği adres
PORT=3001                                # Server portu
```

## Sunucuyu Başlatma

### Development (nodemon ile):
```bash
npm run dev
```

### Production:
```bash
npm start
```

Server varsayılan olarak `http://localhost:3001` adresinde çalışacaktır.

## API Endpoints

### POST `/api/send-email`

İletişim formu verilerini email olarak gönderir.

**Request Body:**
```json
{
  "ad": "Ahmet",
  "soyad": "Yılmaz",
  "email": "ahmet@example.com",
  "mesaj": "Merhaba, bir sorunuz var..."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Mesajınız başarıyla gönderildi!"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Hata mesajı..."
}
```

### GET `/api/health`

Server durumunu kontrol eder.

**Response:**
```json
{
  "status": "Server çalışıyor!"
}
```

## Farklı Email Servisleri

### Outlook kullanmak için:

`server/index.js` dosyasında `service: 'gmail'` kısmını değiştirin:

```javascript
const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

### Özel SMTP kullanmak için:

```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## Güvenlik Notları

- ✅ `.env` dosyası `.gitignore`'da olmalı (zaten ekli)
- ✅ Asla email şifrelerinizi GitHub'a pushlamamayın
- ✅ Production'da CORS ayarlarını spesifik domainler için yapılandırın
- ✅ Rate limiting eklemek iyi bir pratiktir

## Sorun Giderme

### "Invalid login" hatası alıyorsanız:
- Gmail App Password kullandığınızdan emin olun
- 2 Adımlı Doğrulama'nın aktif olduğunu kontrol edin
- Email ve şifreyi .env dosyasında doğru yazdığınızdan emin olun

### CORS hatası alıyorsanız:
- Frontend ve backend'in farklı portlarda çalıştığından emin olun
- `cors()` middleware'inin doğru yapılandırıldığını kontrol edin

