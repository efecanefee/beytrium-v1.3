import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory (built frontend)
app.use(express.static(path.join(__dirname, '../dist')));

// API Routes

// Nodemailer transporter yapılandırması
const transporter = nodemailer.createTransport({
  service: 'gmail', // Gmail kullanıyorsanız. Outlook için 'outlook', vb.
  auth: {
    user: process.env.EMAIL_USER, // Gönderen email
    pass: process.env.EMAIL_PASS, // Email şifresi veya App Password
  },
});

// Email gönderme endpoint'i
app.post('/api/send-email', async (req, res) => {
  const { ad, soyad, email, mesaj } = req.body;

  // Validasyon
  if (!ad || !soyad || !email || !mesaj) {
    return res.status(400).json({ 
      success: false, 
      message: 'Lütfen tüm alanları doldurun.' 
    });
  }

  // Email içeriği
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL, // Gelen maillerin gideceği adres
    subject: `ThinkHub İletişim Formu - ${ad} ${soyad}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #000; border-radius: 10px;">
        <h2 style="color: #000; border-bottom: 3px solid #fbca1f; padding-bottom: 10px;">
          🎯 Yeni İletişim Formu Mesajı
        </h2>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #fbca1f;">
          <p style="margin: 10px 0;"><strong>👤 Ad Soyad:</strong> ${ad} ${soyad}</p>
          <p style="margin: 10px 0;"><strong>📧 Email:</strong> ${email}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3 style="color: #000; border-bottom: 2px solid #1ABCAA; padding-bottom: 5px;">💬 Mesaj:</h3>
          <p style="line-height: 1.6; color: #333; padding: 15px; background-color: #fff; border: 1px solid #ddd; border-radius: 5px;">
            ${mesaj}
          </p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; text-align: center;">
          <p>Bu mesaj ThinkHub web sitesi iletişim formundan gönderilmiştir.</p>
          <p>Gönderim Tarihi: ${new Date().toLocaleString('tr-TR')}</p>
        </div>
      </div>
    `,
    // Yanıt vermek için kullanıcının emailini reply-to olarak ekle
    replyTo: email,
  };

  // Kullanıcıya gönderilecek teşekkür maili
  const autoReplyOptions = {
    from: process.env.EMAIL_USER,
    to: email, // Formu dolduran kişinin emaili
    subject: 'Mesajınızı Aldık - ThinkHub',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #000; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #000; margin: 0; font-size: 28px;">ThinkHub</h1>
          <p style="color: #666; margin: 5px 0;">Bilimsel Araştırma ve Teknoloji Kulübü</p>
        </div>
        
        <div style="background-color: #fbca1f; padding: 20px; border-radius: 8px; border: 2px solid #000; margin: 20px 0;">
          <h2 style="color: #000; margin: 0 0 10px 0; font-size: 22px;">
            ✅ Mesajınızı Aldık!
          </h2>
          <p style="color: #000; margin: 0; font-size: 16px; font-weight: 600;">
            İlginiz için teşekkürler!
          </p>
        </div>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #333; line-height: 1.6; margin: 0 0 15px 0;">
            Merhaba <strong>${ad} ${soyad}</strong>,
          </p>
          <p style="color: #333; line-height: 1.6; margin: 0 0 15px 0;">
            Bizimle iletişime geçtiğiniz için çok teşekkür ederiz. Mesajınız tarafımıza ulaşmıştır ve ekibimiz en kısa zamanda size geri dönüş yapacaktır.
          </p>
          <p style="color: #333; line-height: 1.6; margin: 0;">
            Genellikle <strong>24-48 saat</strong> içerisinde tüm mesajlara yanıt vermeye çalışıyoruz.
          </p>
        </div>
        
        <div style="background-color: #1ABCAA; padding: 15px; border-radius: 8px; border: 2px solid #000; margin: 20px 0;">
          <p style="color: #fff; margin: 0; font-weight: bold; text-align: center;">
            💡 Bu arada sosyal medya hesaplarımızı takip etmeyi unutmayın!
          </p>
        </div>
        
        <div style="text-align: center; margin: 20px 0;">
          <p style="color: #666; margin: 0 0 10px 0;">Bizi Takip Edin:</p>
          <div style="display: inline-block;">
            <a href="https://www.instagram.com/beykenthinkhub" style="text-decoration: none; color: #000; margin: 0 10px;">📷 Instagram</a>
            <a href="https://www.linkedin.com/company/thinkhub" style="text-decoration: none; color: #000; margin: 0 10px;">💼 LinkedIn</a>
          </div>
        </div>
        
        <div style="border-top: 2px solid #ddd; margin-top: 30px; padding-top: 20px; text-align: center; color: #666; font-size: 12px;">
          <p style="margin: 5px 0;">
            Bu otomatik bir mesajdır, lütfen yanıtlamayın.
          </p>
          <p style="margin: 5px 0;">
            © ${new Date().getFullYear()} ThinkHub - Beykent Üniversitesi
          </p>
          <p style="margin: 5px 0;">
            Email: info@thinkhub.com
          </p>
        </div>
      </div>
    `,
  };

  try {
    // 1. Yöneticiye bildirim maili gönder
    await transporter.sendMail(mailOptions);
    
    // 2. Kullanıcıya teşekkür maili gönder
    await transporter.sendMail(autoReplyOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Mesajınız başarıyla gönderildi!' 
    });
  } catch (error) {
    console.error('Email gönderme hatası:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Email gönderilirken bir hata oluştu. Lütfen tekrar deneyin.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server çalışıyor!' });
});

// Catch-all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor...`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔧 API: http://localhost:${PORT}/api`);
});

