// src/data.ts

// 1. Senin Bilgilerin (Aynı)
export const CURRENT_USER = {
  id: "me",
  name: "Mehmet Fatih",
  handle: "@fatihkarakus",
  avatar: fatihPP,
  banner: fatihBanner,
  bio: "Beytrium projesinin teknik mimarı ve proje lideri. Backend sistemleri, veritabanı mimarisi ve ekip koordinasyonu benden sorulur. 🚀💻",
  following: 42,
  followers: 108,
  joined: "Ekim 2023",
  title: "Proje Lideri & Backend",
  joinedClubs: ["tech", "sport"],
  isClub: false // YENİ: Öğrenciler paylaşım yapamaz
};

// 2. Diğer Kullanıcılar (Aynı)
export const OTHER_USERS = [
  {
    id: "yagiz",
    name: "Yağız Türkmen",
    handle: "@yagizturkmen",
    avatar: yagizPP,
    banner: yagizBanner,
    bio: "Beytrium'un görsel dünyasının yaratıcısı. Kullanıcı deneyimi (UX) ve arayüz tasarımı (UI) ile projeye hayat veriyorum. 🎨✨",
    following: 15,
    followers: 86,
    joined: "Kasım 2023",
    title: "UI/UX Tasarımcı"
  },

  {
    id: "ahmet",
    name: "Ahmet Yılmaz",
    handle: "@ahmetyilmaz",
    avatar: ahmetPP,
    banner: ahmetBanner,
    bio: "Gastronomi ve Mutfak Sanatları 👨‍🍳 | Kampüsün en iyi gurmesi. Yemek yapmayı ve yemeyi severim. 🍔🍕",
    following: 124,
    followers: 210,
    joined: "Eylül 2023",
    title: "Öğrenci 🎓",
    joinedClubs: ["sport"]
  },
  // YENİ: Ayşe Demir
  {
    id: "ayse",
    name: "Ayşe Demir",
    handle: "@aysedemir",
    avatar: ayseDemirPP,
    banner: ayseDemirBanner,
    bio: "Mimarlık 2. Sınıf 📐 | Çizim masası başında sabahlayanlardan. Sanat ve kahve bağımlısı. ☕✨",
    following: 340,
    followers: 512,
    joined: "Ocak 2024",
    title: "Öğrenci 🎓",
  },
  // YENİ: Efecan Efe
  {
    id: "efecan",
    name: "Efecan Efe",
    handle: "@efecanefe",
    avatar: efecanPP,
    banner: efecanBanner,
    bio: "Full Stack Geliştirici. Hem frontend hem backend dünyasında, verilerle analizler yaparak sistemin en verimli halini kurguluyorum. �💻",
    following: 150,
    followers: 320,
    joined: "Şubat 2024",
    title: "Full Stack Developer",
    joinedClubs: ["tech", "startup"]
  },
  // YENİ: Yiğit Yetim
  {
    id: "yigit",
    name: "Yiğit Yetim",
    handle: "@yigityetim",
    avatar: yigitPP,
    banner: yigitBanner,
    bio: "Yönetim Paneli ve Backend Geliştiricisi. Sistemin yönetimini kolaylaştıran modülleri ve API entegrasyonlarını kodluyorum. 🐍⚙️",
    following: 210,
    followers: 450,
    joined: "Mart 2024",
    title: "Backend & Yönetim Paneli Geliştiricisi",
    joinedClubs: ["tech", "esports"]
  },
  // YENİ: Muhammed Nur Kaya
  {
    id: "muhammed",
    name: "Muhammed Nur Kaya",
    handle: "@muhammednur",
    avatar: muhammedPP,
    banner: muhammedBanner,
    bio: "Proje Sunumu ve Süreç Analizi. Endüstriyel bakış açısıyla sistemin verimliliğini optimize ediyor ve Beytrium'u temsil ediyorum. 🎤📈",
    following: 180,
    followers: 290,
    joined: "Nisan 2024",
    title: "Sunum",
    joinedClubs: ["startup", "sport"]
  }
];





// Helper (Aynı)
export const GET_USER = (id: string) => {
  if (id === 'me') return CURRENT_USER;
  return OTHER_USERS.find(u => u.id === id);
};

// BANNER IMPORTS

import voleybolPoster from './assets/Ekler/Kampüs içi voleybol turnuvası.png';
import romeoPoster from './assets/Ekler/Romeo ve Juliet (etkinlik istekleri).png';
import salsaPoster from './assets/Ekler/Salsa.png';

// PP IMPORTS
import yigitPP from './assets/Ekler/pp/Yiğit/Yiğit.png';
import ayseDemirPP from './assets/Ekler/pp/Ayşe Demir/Ayşe Demir.png';
import canerPP from './assets/Ekler/pp/Caner Erkin/Caner Erkin.png';
import muhammedPP from './assets/Ekler/pp/Muhammed/Muhammed.png';
import efecanPP from './assets/Ekler/pp/Efecan/Efecan.png';
import mehmetDemirPP from './assets/Ekler/pp/Mehmet Demir/Mehmet Demir.png';
import aliVeliPP from './assets/Ekler/pp/Ali Veli/Ali Veli.png';
import cananPP from './assets/Ekler/pp/Canan Can/Canan Can.png';
import ayseYilmazPP from './assets/Ekler/pp/Ayşe Yılmaz/Ayşe Yılmaz.png';
import trollPP from './assets/Ekler/pp/Troll hesap/Troll.png';
import ahmetPP from './assets/Ekler/pp/Ahmet/Ahmet.png';
import yagizPP from './assets/Ekler/pp/Yağız/Yağız.png';
import fatihPP from './assets/Ekler/pp/Fatih/Fatih.png';
import mehmetOzPP from './assets/Ekler/pp/Mehmet Öz/Mehmet Öz.png';

// BANNER IMPORTS
import fatihBanner from './assets/Ekler/pp/Fatih/Fatih arkaplan 2.jpg';
import yagizBanner from './assets/Ekler/pp/Yağız/Yağız arkaplan.jpg';
import efecanBanner from './assets/Ekler/pp/Efecan/Efecan arkaplan.jpg';
import yigitBanner from './assets/Ekler/pp/Yiğit/Yiğit arkaplan.jpg';
import muhammedBanner from './assets/Ekler/pp/Muhammed/Muhammed arkaplan.jpg';
import ayseDemirBanner from './assets/Ekler/pp/Ayşe Demir/Ayşe Demir arkaplan.jpg';
import ahmetBanner from './assets/Ekler/pp/Ahmet/Ahmet arkaplan.jpg';

// CLUB BANNERS
import techBanner from './assets/Ekler/Kulüpler/Teknoloji/Teknoloji Kulubü1.jpg';
import artBanner from './assets/Ekler/Kulüpler/Sanat Ve Tasarım/Sanat ve Tasarım Kulubü1.jpg';
import sportBanner from './assets/Ekler/Kulüpler/Spor/Spor Kulubü1.jpg';
import danceBanner from './assets/Ekler/Kulüpler/Dans/ai_dance_bg.png';
import theatreBanner from './assets/Ekler/Kulüpler/Tiyatro/ai_theatre_bg.png';

// CLUB LOGO IMPORTS
import techLogo from './assets/Ekler/Kulüpler/Teknoloji/Teknoloji Kulubü.png';
import artLogo from './assets/Ekler/Kulüpler/Sanat Ve Tasarım/Sanat ve Tasarım Kulubü.png';
import sportLogo from './assets/Ekler/Kulüpler/Spor/Spor Kulubü.png';
import startupLogo from './assets/Ekler/Kulüpler/Girişimcilik/Girişimcilik Kulubü.png';
import aiLogo from './assets/Ekler/Kulüpler/Yazılım ve Yapay Zeka (süper admin düzelt)/Yazılım ve Yapay Zeka Kulubü.png';
import musicLogo from './assets/Ekler/Kulüpler/Müzik/Müzik Kulubü.png';
import mediaLogo from './assets/Ekler/Kulüpler/Sinema ve Fotoğrafçılık (süper admin düzelt)/Sinema ve Fotoğrafçılık Kulubü.png';
import theatreLogo from './assets/Ekler/Kulüpler/Tiyatro/Tiyatro Kulubü.png';
import libraryLogo from './assets/Ekler/Kulüpler/Edebiyat ve Kitap/Edebiyat Ve Kitap Kulübü.png';
import esportsLogo from './assets/Ekler/Kulüpler/E-Spor/E-Spor Kulübü.png';
import natureLogo from './assets/Ekler/Kulüpler/Doğa ve Gezi/Doğa ve Gezi Kulübü.png';
import danceLogo from './assets/Ekler/Kulüpler/Dans/Dans Kulübü.png';
import pawsLogo from './assets/Ekler/Kulüpler/Hayvan Dostları/Hayvan Dostları Kulubü.png';
import helpLogo from './assets/Ekler/Kulüpler/Sosyal Yardımlaşma/Sosyal Yardımlaşma Kulubü.png';

export const CLUBS = [
  {
    id: "tech",
    name: "Teknoloji Kulübü",
    handle: "@beykenttech",
    avatar: techLogo,
    description: "Yazılım, donanım ve geleceğin teknolojileri.",
    about: "Teknoloji dünyasındaki en son gelişmeleri takip ediyor, yazılım ve donanım projeleri geliştiriyoruz. Hackathonlar ve teknik gezilerle teoriyi pratiğe döküyoruz.",
    followers: 2450,
    events: 42,
    banner: techBanner,
    president: { name: "Yiğit Yetim", role: "Kulüp Başkanı", avatar: yigitPP }
  },
  {
    id: "art",
    name: "Sanat Kulübü",
    handle: "@beykentart",
    avatar: artLogo,
    description: "Renklerin ve çizgilerin buluşma noktası.",
    about: "Sanatın her dalında üretim yapmayı hedefleyen yaratıcı ruhların buluşma noktası. Sergiler, atölye çalışmaları ve sanat söyleşileri düzenliyoruz.",
    followers: 890,
    events: 15,
    banner: artBanner,
    president: { name: "Ayşe Demir", role: "Kulüp Başkanı", avatar: ayseDemirPP }
  },
  {
    id: "sport",
    name: "Spor Kulübü",
    handle: "@beykentsport",
    avatar: sportLogo,
    description: "Sağlam kafa sağlam vücutta bulunur.",
    about: "Sporun birleştirici gücüne inanıyoruz. Kampüs içi turnuvalar, doğa yürüyüşleri ve sağlıklı yaşam etkinlikleriyle hem fiziksel hem zihinsel zindeliği hedefliyoruz.",
    followers: 3100,
    events: 56,
    banner: sportBanner,
    president: { name: "Caner Erkin", role: "Kulüp Başkanı", avatar: canerPP }
  },
  // YENİ KULÜPLER
  {
    id: "startup",
    name: "Girişimcilik Kulübü",
    handle: "@beykentstartup",
    avatar: startupLogo,
    description: "Fikirlerin gerçeğe dönüştüğü yer.",
    about: "Girişimcilik ekosistemine adım atmak isteyenler için bir kuluçka merkeziyiz. Fikirlerinizi iş modeline dönüştürmeniz için mentorluk ve eğitim destekleri sunuyoruz.",
    followers: 1150,
    events: 28,
    banner: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    president: { name: "Muhammed Nur", role: "Kulüp Başkanı", avatar: muhammedPP }
  },
  {
    id: "ai",
    name: "Yapay Zeka Kulübü",
    handle: "@beykentai",
    avatar: aiLogo,
    description: "Geleceği kodluyoruz ve öğreniyoruz.",
    about: "Yapay zeka ve makine öğrenmesi alanlarında derinleşmek isteyenler için teknik eğitimler ve proje grupları oluşturuyoruz. Geleceği kodlarken bize katılın.",
    followers: 1800,
    events: 34,
    banner: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    president: { name: "Efecan Efe", role: "Kulüp Başkanı", avatar: efecanPP }
  },
  {
    id: "music",
    name: "Müzik Kulübü",
    handle: "@beykentmusic",
    avatar: musicLogo,
    description: "Ritmi hisset, müziğe kulak ver.",
    about: "Müziğin ritmini kampüse taşıyoruz. Enstrüman eğitimleri, koro çalışmaları ve konser etkinlikleriyle notaların gücünü keşfediyoruz.",
    followers: 1650,
    events: 22,
    banner: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
    president: { name: "Mehmet Demir", role: "Kulüp Başkanı", avatar: mehmetDemirPP }
  },
  {
    id: "media",
    name: "Sinema ve Medya",
    handle: "@beykentmedia",
    avatar: mediaLogo,
    description: "Anı yakala, hikayeni anlat.",
    about: "Kadrajımızda hayat var. Kısa film projeleri, fotoğrafçılık gezileri ve sinema günleriyle görsel dünyanızı zenginleştiriyoruz.",
    followers: 920,
    events: 18,
    banner: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80",
    president: { name: "Ali Veli", role: "Kulüp Başkanı", avatar: aliVeliPP }
  },
  {
    id: "theatre",
    name: "Tiyatro Kulübü",
    handle: "@beykenttheatre",
    avatar: theatreLogo,
    description: "Sahne senin, perdeni aç.",
    about: "Sahne tozunu yutmak isteyenler buraya! Oyunculuk eğitimleri, skeç çalışmaları ve yıl sonu gösterileriyle tiyatro tutkusunu yaşıyoruz.",
    followers: 750,
    events: 12,
    banner: theatreBanner,
    president: { name: "Canan Can", role: "Kulüp Başkanı", avatar: cananPP }
  },
  {
    id: "library",
    name: "Edebiyat ve Kitap",
    handle: "@beykentlibrary",
    avatar: libraryLogo,
    description: "Satırların arasındaki dünyayı keşfet.",
    about: "Kitapların büyülü dünyasında yolculuğa çıkıyoruz. Yazar buluşmaları, kitap tahlilleri ve kütüphane gezileriyle edebiyat severleri bir araya getiriyoruz.",
    followers: 550,
    events: 8,
    banner: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    president: { name: "Ayşe Yılmaz", role: "Kulüp Başkanı", avatar: ayseYilmazPP }
  },
  {
    id: "esports",
    name: "E-Spor Kulübü",
    handle: "@beykentesports",
    avatar: esportsLogo,
    description: "Oyun başlasın, takımını kur.",
    about: "Rekabetçi oyun dünyasının kalbi burada atıyor. Takımını kur, turnuvalara katıl ve e-spor dünyasında adını duyur.",
    followers: 4200,
    events: 64,
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    president: { name: "Troll Hesap", role: "Kulüp Başkanı", avatar: trollPP }
  },
  {
    id: "nature",
    name: "Doğa ve Gezi",
    handle: "@beykentnature",
    avatar: natureLogo,
    description: "Doğayı keşfet, sınırlarını zorla.",
    about: "Şehrin gürültüsünden uzaklaşıp doğaya dönüyoruz. Kampçılık, trekking ve çevre bilinci etkinlikleriyle yeşili koruyor ve keşfediyoruz.",
    followers: 880,
    events: 14,
    banner: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
    president: { name: "Ahmet Yılmaz", role: "Kulüp Başkanı", avatar: ahmetPP }
  },
  {
    id: "dance",
    name: "Dans Kulübü",
    handle: "@beykentdance",
    avatar: danceLogo,
    description: "Adımların ritmi, dansın enerjisi.",
    about: "Dansın enerjisiyle özgürleşiyoruz. Latin, Hip-hop, Modern Dans gibi farklı türlerde eğitimler ve gösterilerle sahnedeyiz.",
    followers: 1250,
    events: 26,
    banner: danceBanner,
    president: { name: "Yağız Türkmen", role: "Kulüp Başkanı", avatar: yagizPP }
  },
  {
    id: "paws",
    name: "Hayvan Dostları",
    handle: "@beykentpaws",
    avatar: pawsLogo,
    description: "Pati dostlarımız için buradayız.",
    about: "Kampüsümüzdeki patili dostlarımızın sesi oluyoruz. Besleme etkinlikleri, barınak ziyaretleri ve farkındalık çalışmaları yapıyoruz.",
    followers: 1950,
    events: 38,
    banner: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
    president: { name: "Mehmet Fatih", role: "Kulüp Başkanı", avatar: fatihPP }
  },
  {
    id: "help",
    name: "Sosyal Yardımlaşma",
    handle: "@beykenthelp",
    avatar: helpLogo,
    description: "Birlikte daha güçlüyüz.",
    about: "İyiliği yaymak için yola çıktık. Sosyal sorumluluk projeleri, yardım kampanyaları ve gönüllülük esaslı çalışmalarla topluma katkı sağlıyoruz.",
    followers: 2150,
    events: 45,
    banner: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
    president: { name: "Mehmet Öz", role: "Kulüp Başkanı", avatar: mehmetOzPP }
  }
];

export const POSTS = [
  // (Post verileri aynı, önceki koddan kopyalayabilirsin)
  {
    id: 100,
    authorId: "me",
    content: "Ekip arkadaşlarıma özverili çalışmaları için teşekkür ediyorum. Beytrium projesiyle kampüsteki iletişimi bambaşka bir boyuta taşıyoruz! 💻🔥",
    image: null,
    date: "10sn",
    likes: 24,
    comments: 3,
    isClub: false
  },
  {
    id: 98,
    authorId: "efecan",
    content: "Hem arayüzde hem de arkada hummalı bir çalışma yürüttük. Beytrium sadece bir başlangıç! 💻✨ Geri bildirimlerinizi bekliyorum. #FullStack #Beykent",
    image: null,
    date: "5dk",
    likes: 42,
    comments: 6,
    isClub: false
  },
  {
    id: 97,
    authorId: "yigit",
    content: "Yönetim paneli ve sistem altyapısı hazır. 🛠️ Beytrium ile kulüpler artık çok daha organize. İlk izlenimleriniz neler? 🐍",
    image: null,
    date: "15dk",
    likes: 38,
    comments: 4,
    isClub: false
  },
  {
    id: 96,
    authorId: "muhammed",
    content: "Bu projeyi sizlere sunmak büyük bir keyifti. Beytrium'un hikayesi yeni başlıyor! 🎤 Sahne sizin, yorumlarınızı merakla bekliyoruz. 🚀",
    image: null,
    date: "30dk",
    likes: 56,
    comments: 8,
    isClub: false
  },
  {
    id: 99,
    authorId: "yagiz",
    content: "Beytrium projesinin ilk versiyonu yayında! Herkesi bekleriz. 🚀 Tasarımlar hakkında yorumlarınızı bekliyorum!",
    image: null,
    date: "2dk",
    likes: 124,
    comments: 7,
    isClub: false
  },
  {
    id: 1,
    clubId: "tech",
    content: "Yapay Zeka webinarımız başlıyor! Osman Yavaş ile sağlıkta AI devrimini konuşacağız. 🤖⚕️ #yapayzeka #beykent",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    date: "2s",
    likes: 45,
    comments: 5,
    isClub: true
  },
  {
    id: 101,
    clubId: "tech",
    content: "📢 Python ile Veri Analizi eğitim serimiz haftaya başlıyor! Kayıtlar standımızda. Kontenjan sınırlıdır! 🐍📊",
    image: null,
    date: "3s",
    likes: 32,
    comments: 3,
    isClub: true
  },
  {
    id: 2,
    clubId: "art",
    content: "Bu haftaki workshop'ta suluboya tekniklerine giriş yapıyoruz. Malzemeler bizden! 🎨",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    date: "4s",
    likes: 89,
    comments: 6,
    isClub: true
  },
  {
    id: 3,
    clubId: "sport",
    content: "Kampüs içi voleybol turnuvası kayıtları açıldı! Takımını kur gel, kupayı kaldır. 🏐🏆",
    image: voleybolPoster,
    date: "1g",
    likes: 156,
    comments: 11,
    isClub: true
  },
  // YENİ KULÜP GÖNDERİLERİ
  {
    id: 10,
    clubId: "startup",
    content: "Kuluçka merkezimizde bu hafta 'Fikirden Ürüne' atölyesi var. Kendi girişiminizi kurmak için ilk adımı atın! 🚀💡 #Girişimcilik #BeykentStartup",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    date: "2s",
    likes: 85,
    comments: 9,
    isClub: true
  },
  {
    id: 11,
    clubId: "ai",
    content: "Yapay Zeka ve Etik tartışıyoruz. Geleceğin teknolojisi insanlığı nasıl etkileyecek? Cuma 14:00'te B-204'te hepinizi bekliyoruz. 🤖🧠 #AI #Ethics",
    image: null,
    date: "5s",
    likes: 64,
    comments: 8,
    isClub: true
  },
  {
    id: 12,
    clubId: "music",
    content: "Kampüs Akustik Konserleri başlıyor! 🎸 Sahne almak isteyen yetenekli arkadaşlarımız DM kutumuzu şenlendirebilir. 🎤🎶",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    date: "3dk",
    likes: 92,
    comments: 10,
    isClub: true
  },
  {
    id: 13,
    clubId: "media",
    content: "Kısa film yarışmamızın kazananları belli oldu! 🎬 Ödül törenine tüm sinemaseverleri bekliyoruz. Patlamış mısırlar bizden! 🍿📽️",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
    date: "12dk",
    likes: 45,
    comments: 5,
    isClub: true
  },
  {
    id: 14,
    clubId: "theatre",
    content: "Romeo ve Juliet provası tüm hızıyla devam ediyor. Prömiyer çok yakında! Sahne arkasından küçük bir kare... 🎭💔",
    image: romeoPoster,
    date: "1s",
    likes: 78,
    comments: 5,
    isClub: true
  },
  {
    id: 15,
    clubId: "library",
    content: "Bu ayın kitabı: Kafka - Dönüşüm. 🪲 Okuma grubumuza katılın, Gregor Samsa'nın hikayesini birlikte tartışalım. 📖☕",
    image: null,
    date: "4s",
    likes: 55,
    comments: 4,
    isClub: true
  },
  {
    id: 16,
    clubId: "esports",
    content: "LoL turnuvası final maçı bu akşam! 👊 Dev ekranda izlemeye davetlisiniz. Heyecan dorukta! 🎮🏆 #ESpor #LeagueOfLegends",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80",
    date: "6s",
    likes: 98,
    comments: 7,
    isClub: true
  },
  {
    id: 17,
    clubId: "nature",
    content: "Hafta sonu Belgrad Ormanı'ndayız! 🌲 Doğa yürüyüşü ve piknik etkinliğimize kayıtlar başladı. Şehrin gürültüsünden kaçış planı. 🔥🌭",
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80",
    date: "2g",
    likes: 88,
    comments: 8,
    isClub: true
  },
  {
    id: 18,
    clubId: "dance",
    content: "Salsa gecesi için hazır mısınız? 💃 Dans ayakkabılarınızı kapın gelin! Başlangıç seviyesi eğitimi de verilecektir. 🕺✨",
    image: salsaPoster,
    date: "5s",
    likes: 67,
    comments: 7,
    isClub: true
  },
  {
    id: 19,
    clubId: "paws",
    content: "Kampüs kedileri için kışlık yuva yapıyoruz. 🐈 Malzeme desteği ve yardım eli bekliyoruz! Minik dostlarımız üşümesin. 🐾🏠",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80",
    date: "6s",
    likes: 120,
    comments: 42,
    isClub: true
  },
  {
    id: 20,
    clubId: "help",
    content: "Köy okulları için kitap toplama kampanyamız başladı. 'Bir kitap da sen koy' diyerek geleceğe ışık tutalım. 📚🤝 #SosyalSorumluluk",
    image: null,
    date: "1s",
    likes: 110,
    comments: 35,
    isClub: true
  }
];

export const NOTIFICATIONS = [
  { id: 1, type: "like", user: "Ahmet Yılmaz", content: "gönderini beğendi", time: "2dk" },
  { id: 2, type: "follow", user: "Ayşe Demir", content: "seni takip etmeye başladı", time: "1s" },
  { id: 3, type: "event", user: "@beykenttech", content: "yeni bir etkinlik oluşturdu: AI Zirvesi", time: "3s" },
];

export const TRENDS = [
  { category: "Türkiye'de Gündem", tag: "#BeykentFest", count: "12.5B Tweet" },
  { category: "Teknoloji", tag: "#YapayZeka", count: "8.2B Tweet" },
  { category: "Spor", tag: "Voleybol Takımı", count: "3.4B Tweet" },
];