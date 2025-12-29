# 🚀 ThinkHub Kurulum Rehberi

Bu rehber, ThinkHub web sitesini ve email servisini çalıştırmanız için adım adım talimatlar içerir.

## 📋 Gereksinimler

- ✅ Node.js (v16+)
- ✅ npm veya yarn
- ✅ Bir Gmail veya Outlook hesabı (email gönderimi için)

## 🎯 Hızlı Başlangıç

### Adım 1: Frontend'i Çalıştırın

```bash
# Bağımlılıkları yükleyin
npm install

# Development server'ı başlatın
npm run dev
```

✅ Frontend şimdi `http://localhost:5173` adresinde çalışıyor!

### Adım 2: Backend Email Servisini Kurun

```bash
# Server klasörüne gidin
cd server

# Bağımlılıkları yükleyin
npm install
```

### Adım 3: Gmail App Password Oluşturun

Email göndermek için Gmail App Password'e ihtiyacınız var:

1. **Google Hesabınıza Gidin**
   - https://myaccount.google.com/ adresine gidin

2. **Güvenlik Sekmesine Tıklayın**
   - Sol menüden "Güvenlik" seçeneğine tıklayın

3. **2 Adımlı Doğrulama'yı Aktifleştirin**
   - "Google'da nasıl oturum açarsınız" bölümünü bulun
   - "2 Adımlı Doğrulama"yı aktifleştirin

4. **Uygulama Şifresi Oluşturun**
   - 2 Adımlı Doğrulama aktif olduktan sonra
   - "Uygulama Şifreleri" seçeneğine tıklayın
   - "Mail" kategorisini seçin
   - 16 haneli şifreyi kopyalayın

### Adım 4: Backend Environment Variables Ayarlayın

```bash
# Hala server klasöründeyken
cp env.example .env
```

`.env` dosyasını bir text editörle açın ve şu bilgileri girin:

```env
EMAIL_USER=sizin-email@gmail.com
EMAIL_PASS=xxxx-xxxx-xxxx-xxxx  # 16 haneli App Password
RECEIVER_EMAIL=mesajlarin-gidecegi@email.com
PORT=3001
```

**Önemli:** 
- `EMAIL_USER`: Gmail adresiniz
- `EMAIL_PASS`: Adım 3'te oluşturduğunuz 16 haneli App Password
- `RECEIVER_EMAIL`: İletişim formundan gelen mesajların gideceği email

### Adım 5: Backend'i Çalıştırın

```bash
# server klasöründeyken
npm run dev
```

✅ Backend şimdi `http://localhost:3001` adresinde çalışıyor!

### Adım 6: Test Edin! 🎉

1. Tarayıcınızda `http://localhost:5173` adresine gidin
2. İletişim formuna gidin
3. Formu doldurun ve gönderin
4. `RECEIVER_EMAIL` adresinize email gelip gelmediğini kontrol edin

## ⚙️ Çalıştırma Seçenekleri

### Seçenek 1: Tek Komutla Her İkisi (⚡ Önerilen)

```bash
npm run dev:all
```

Bu komut hem frontend hem backend'i aynı anda başlatır. Renkli output ile hangi log'un nereden geldiğini kolayca görebilirsiniz:
- 🔵 FRONTEND (cyan) - Frontend logları
- 🔴 BACKEND (magenta) - Backend logları

### Seçenek 2: Ayrı Terminaller

Projeyi ayrı terminallerde çalıştırmak isterseniz:

**Terminal 1 - Frontend:**
```bash
npm run dev
# veya
npm run dev:frontend
```

**Terminal 2 - Backend:**
```bash
npm run dev:backend
# veya
cd server && npm run dev
```

## 🔧 Sorun Giderme

### "Invalid login" Hatası

**Sebep:** Email veya App Password yanlış

**Çözüm:**
1. `.env` dosyasındaki `EMAIL_USER` ve `EMAIL_PASS` değerlerini kontrol edin
2. App Password'ü boşluksuz yazın (xxxxxxxxxxxx)
3. 2 Adımlı Doğrulama'nın aktif olduğunu doğrulayın

### "CORS Error" Hatası

**Sebep:** Backend çalışmıyor

**Çözüm:**
1. `cd server` ile server klasörüne gidin
2. `npm run dev` ile backend'i başlatın
3. Terminal'de "Server 3001 portunda çalışıyor..." mesajını görmelisiniz

### Frontend Backend'e Bağlanamıyor

**Sebep:** Port çakışması veya backend çalışmıyor

**Çözüm:**
1. Backend terminalinde hata mesajı olup olmadığını kontrol edin
2. `http://localhost:3001/api/health` adresine gittiğinizde "Server çalışıyor!" mesajını görmelisiniz
3. Görmüyorsanız backend'i yeniden başlatın

### Email Gelmiyor

**Kontrol Listesi:**
- [ ] Backend terminalde hata var mı?
- [ ] `.env` dosyası doğru doldurulmuş mu?
- [ ] App Password doğru mu?
- [ ] Spam klasörünü kontrol ettiniz mi?
- [ ] `RECEIVER_EMAIL` doğru mu?

## 🌐 Outlook Kullanmak İsterseniz

`server/index.js` dosyasında değişiklik yapın:

```javascript
// Satır 16'yı bulun ve değiştirin:
const transporter = nodemailer.createTransport({
  service: 'outlook',  // 'gmail' yerine 'outlook' yazın
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

`.env` dosyasını Outlook hesabınızla güncelleyin:
```env
EMAIL_USER=sizin-email@outlook.com
EMAIL_PASS=outlook-sifreniz
```

## 📚 Ek Kaynaklar

- [Gmail App Password Oluşturma](https://support.google.com/accounts/answer/185833)
- [Nodemailer Dokümantasyonu](https://nodemailer.com/)
- [Express.js Dokümantasyonu](https://expressjs.com/)

## 🎓 Önemli Notlar

1. **Asla `.env` dosyasını GitHub'a pushlamamayın!** (Zaten .gitignore'da)
2. App Password'ü kimseyle paylaşmayın
3. Production'da güvenlik önlemleri almayı unutmayın
4. Her iki servisi de (frontend + backend) çalıştırmalısınız

## ✅ Her Şey Çalışıyor mu?

Şunları kontrol edin:

- [ ] Frontend `http://localhost:5173` adresinde açılıyor
- [ ] Backend `http://localhost:3001/api/health` adresinde yanıt veriyor
- [ ] İletişim formu gönderilebiliyor
- [ ] Email geldi

Hepsi ✅ ise tebrikler! 🎉 Sistem çalışıyor!

---

❓ **Sorunuz mu var?**
İletişim formundan veya GitHub Issues üzerinden bize ulaşabilirsiniz.

