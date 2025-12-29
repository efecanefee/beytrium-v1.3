// src/pages/Feed.tsx
import { useState, useEffect } from 'react';
import { POSTS, CLUBS, CURRENT_USER, GET_USER } from '../data';
import { Link } from 'react-router-dom';
import { HiHeart, HiChatBubbleOvalLeft, HiShare, HiSparkles, HiPaperAirplane } from 'react-icons/hi2';

// Rastgele yorum içerikleri (Genişletildi)
const RANDOM_COMMENTS = [
    "Harika bir paylaşım! 🔥",
    "Tebrikler 👏",
    "Çok iyi düşünülmüş.",
    "Başarılarınızın devamını dilerim.",
    "Etkinlik takvimi ne zaman açıklanacak?",
    "Kaçırdık ya, tekrarı olur mu?",
    "Fotoğraflar EFSANE! 📸",
    "Emeğinize sağlık arkadaşlar.",
    "Biletler nereden temin ediliyor?",
    "Harika bir atmosfer vardı.",
    "Gelecek dönem için başvuru alıyor musunuz?",
    "Çok eğlendik, teşekkürler! 🎉",
    "Sunum dosyalarını paylaşabilir misiniz?",
    "Videoları youtube'a yükleyecek misiniz?",
    "Süper bir organizasyondu.",
    "Katılım sertifikası verilecek mi? 📜",
    "Yurt dışı imkanları hakkında bilgi verir misiniz?",
    "Staj imkanı sağlıyor musunuz?",
    "Mentörlük programı devam ediyor mu?",
    "Tasarım harika olmuş. 🎨",
    "Logo efsane duruyor.",
    "Başarılarınız daim olsun. 🚀",
    "Beklentimin çok üzerindeydi.",
    "Konuşmacılar çok donanımlıydı.",
    "İkramlar için teşekkürler :)"
];

const Feed = () => {
    const [headerStyle, setHeaderStyle] = useState({ opacity: 1, scale: 1, blur: 0 });

    // Postları state'e taşıyoruz ki beğeni/yorum güncelleyebilelim
    const [posts, setPosts] = useState(() => {
        return POSTS.map(post => ({
            ...post,
            isLiked: false,
            likesCount: post.likes,
            showComments: false,
            loadedComments: [] as any[] // Yüklenen yorumlar
        }));
    });

    useEffect(() => {
        const mainContainer = document.querySelector('main');
        if (!mainContainer) return;

        const handleScroll = () => {
            const scrollTop = mainContainer.scrollTop;
            const scrollFactor = Math.min(1, scrollTop / 200);

            const newOpacity = Math.max(0, 1 - scrollFactor);
            const newScale = 1 - (scrollFactor * 0.1);
            const newBlur = scrollFactor * 8;

            setHeaderStyle({
                opacity: newOpacity,
                scale: newScale,
                blur: newBlur
            });
        };

        mainContainer.addEventListener('scroll', handleScroll);
        return () => mainContainer.removeEventListener('scroll', handleScroll);
    }, []);

    // Beğeni İşlemi
    const handleLike = (postId: number) => {
        setPosts(currentPosts => currentPosts.map(post => {
            if (post.id === postId) {
                const isLiked = !post.isLiked;
                return {
                    ...post,
                    isLiked,
                    likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1
                };
            }
            return post;
        }));
    };

    // Yorum Butonu İşlemi
    const handleCommentClick = (postId: number, commentCount: number) => {
        setPosts(currentPosts => currentPosts.map(post => {
            if (post.id === postId) {
                // Eğer yorumlar zaten açıksa kapat
                if (post.showComments) {
                    return { ...post, showComments: false };
                }

                // Yorumlar kapalıysa ve henüz yüklenmemişse rastgele yorum üret
                let newComments = post.loadedComments;
                if (newComments.length === 0 && commentCount > 0) {
                    // Kulüp Başkanlarını Al
                    const clubPresidents = CLUBS.map(c => c.president).filter(Boolean);

                    newComments = Array.from({ length: commentCount }).map((_, i) => {
                        // Rastgele bir kulüp başkanı seç
                        const randomUser = clubPresidents[Math.floor(Math.random() * clubPresidents.length)];
                        // Rastgele yorum metni
                        const randomText = RANDOM_COMMENTS[Math.floor(Math.random() * RANDOM_COMMENTS.length)];

                        return {
                            id: i,
                            user: randomUser,
                            text: randomText,
                            date: `${Math.floor(Math.random() * 59) + 1} dk`
                        };
                    });
                }

                return {
                    ...post,
                    showComments: true,
                    loadedComments: newComments
                };
            }
            return post;
        }));
    };

    return (
        <div className="min-h-full pb-10">

            {/* HEADER */}
            <div
                className="sticky top-4 z-20 px-4 mb-6 transition-all duration-100 ease-out origin-top"
                style={{
                    opacity: headerStyle.opacity,
                    transform: `scale(${headerStyle.scale})`,
                    filter: `blur(${headerStyle.blur}px)`,
                    pointerEvents: headerStyle.opacity < 0.1 ? 'none' : 'auto'
                }}
            >
                <div className="bg-[#fbca1f] border-4 border-black rounded-xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-black p-2 rounded-lg text-white">
                            <HiSparkles className="w-5 h-5" />
                        </div>
                        <h1 className="text-2xl font-black text-black tracking-wide uppercase">ANA AKIŞ</h1>
                    </div>
                    <span className="text-xs font-bold bg-white border-2 border-black px-2 py-1 rounded-md hidden sm:block">
                        {new Date().toLocaleDateString('tr-TR')}
                    </span>
                </div>
            </div>

            <div className="px-4 space-y-6 relative z-10 max-w-7xl mx-auto">

                {/* POST OLUŞTURMA ALANI */}
                {CURRENT_USER.isClub && (
                    <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 rounded-2xl p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] relative transition-colors">
                        <div className="absolute top-2 right-2 bg-teal-600 dark:bg-[#1ABCAA] text-white text-xs font-bold px-3 py-1 border-2 border-black rounded-full shadow-sm z-10 pointer-events-none transform rotate-3">
                            Düşüncelerini Paylaş!
                        </div>
                        <div className="flex gap-4 mt-2">
                            <div className="shrink-0">
                                <Link to="/home/profile">
                                    <img src={CURRENT_USER.avatar} alt="Me" className="w-14 h-14 rounded-full border-2 border-black bg-gray-100" />
                                </Link>
                            </div>
                            <div className="flex-1">
                                <textarea
                                    placeholder="Kampüste neler oluyor?"
                                    className="w-full bg-gray-50 dark:bg-gray-700 dark:text-white rounded-xl border-2 border-transparent focus:border-black dark:focus:border-gray-400 focus:bg-white dark:focus:bg-gray-600 p-3 text-lg font-medium outline-none resize-none h-28 placeholder-gray-500 dark:placeholder-gray-400 transition-all"
                                />
                                <div className="flex justify-between items-center mt-2">
                                    <div className="flex gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-black dark:border-gray-500 flex items-center justify-center cursor-pointer hover:bg-[#fbca1f] transition-colors text-black dark:text-white">📷</div>
                                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-black dark:border-gray-500 flex items-center justify-center cursor-pointer hover:bg-[#1ABCAA] transition-colors text-black dark:text-white">📍</div>
                                    </div>
                                    <button className="bg-black text-white px-8 py-2 font-black border-2 border-black dark:border-white rounded-full shadow-[4px_4px_0px_0px_#fbca1f] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                                        PAYLAŞ
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* POSTLAR */}
                <div className="space-y-6">
                    {posts.map((post) => {
                        let authorName, authorHandle, authorAvatar, authorTitle, authorId, isClub;
                        if ('authorId' in post) {
                            const user = GET_USER((post as any).authorId);
                            if (user) { authorName = user.name; authorHandle = user.handle; authorAvatar = user.avatar; authorTitle = (user as any).title; authorId = user.id; isClub = false; }
                        } else if ('clubId' in post) {
                            const club = CLUBS.find(c => c.id === (post as any).clubId);
                            authorName = club?.name; authorHandle = club?.handle; authorAvatar = club?.avatar; authorId = club?.id; isClub = true;
                        }
                        const profileLink = isClub ? `/home/club/${authorId}` : (authorId === 'me' ? '/home/profile' : `/home/user/${authorId}`);

                        return (
                            <article key={post.id} className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 rounded-2xl p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer group relative overflow-hidden">
                                <div className={`absolute left-0 top-0 bottom-0 w-3 ${isClub ? 'bg-[#fbca1f]' : 'bg-[#1ABCAA]'} border-r-2 border-black hidden dark:block`}></div>

                                <div className="flex gap-4 pl-5">
                                    <div className="shrink-0">
                                        <Link to={profileLink} onClick={(e) => e.stopPropagation()}>
                                            <img src={authorAvatar} alt={authorName} className="w-14 h-14 rounded-full border-2 border-black bg-white hover:opacity-80 transition-opacity object-cover" />
                                        </Link>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-x-2 mb-1">
                                            <Link to={profileLink} onClick={(e) => e.stopPropagation()} className="font-black text-lg hover:underline decoration-2 text-gray-800 dark:text-white">
                                                {authorName}
                                            </Link>
                                            <span className="text-gray-500 dark:text-gray-400 font-bold text-sm">{authorHandle}</span>
                                            <span className="text-gray-400 dark:text-gray-500">•</span>
                                            <span className="text-gray-500 dark:text-gray-400 text-sm font-bold hover:underline">{post.date}</span>
                                        </div>

                                        {authorTitle && !isClub && (
                                            <div className="mb-2 inline-block bg-[#fbca1f] px-2 py-0.5 border-2 border-black rounded text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 text-black">
                                                {authorTitle}
                                            </div>
                                        )}

                                        <p className="text-xl text-gray-800 dark:text-gray-100 mb-3 leading-normal font-medium whitespace-pre-wrap">
                                            {post.content}
                                        </p>

                                        {post.image && (
                                            <div className="mb-3 border-4 border-black rounded-xl overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                <img src={post.image} alt="Post content" className="w-full object-cover max-h-[500px]" />
                                            </div>
                                        )}

                                        <div className="flex justify-between max-w-md text-gray-500 mt-4 border-t-2 border-gray-100 dark:border-gray-700 pt-3">
                                            {/* YORUM BUTONU */}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleCommentClick(post.id, post.comments); }}
                                                className={`flex items-center gap-2 transition-colors group/btn ${post.showComments ? 'text-teal-600 dark:text-[#1ABCAA]' : 'hover:text-teal-600 dark:text-gray-400 dark:hover:text-[#1ABCAA]'}`}
                                            >
                                                <div className={`p-2 rounded-full transition-colors border-2 border-transparent group-hover/btn:border-black dark:group-hover/btn:border-white ${post.showComments ? 'bg-blue-50 dark:bg-blue-900/30 border-black dark:border-blue-400' : 'group-hover/btn:bg-blue-50 dark:group-hover/btn:bg-blue-900/30'}`}>
                                                    <HiChatBubbleOvalLeft className="w-5 h-5" />
                                                </div>
                                                <span className="font-bold text-sm text-gray-800 dark:text-white">{post.comments}</span>
                                            </button>

                                            {/* BEĞENİ BUTONU */}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleLike(post.id); }}
                                                className={`flex items-center gap-2 transition-colors group/btn ${post.isLiked ? 'text-red-500' : 'hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500'}`}
                                            >
                                                <div className={`p-2 rounded-full transition-colors border-2 border-transparent group-hover/btn:border-black dark:group-hover/btn:border-white ${post.isLiked ? 'bg-red-50 dark:bg-red-900/30 border-black dark:border-red-400' : 'group-hover/btn:bg-red-50 dark:group-hover/btn:bg-red-900/30'}`}>
                                                    <HiHeart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                                                </div>
                                                <span className="font-bold text-sm text-black dark:text-white">{post.likesCount}</span>
                                            </button>

                                            {/* PAYLAŞ BUTONU */}
                                            <button className="flex items-center gap-2 hover:text-[#fbca1f] transition-colors group/btn dark:text-gray-400 dark:hover:text-[#fbca1f]">
                                                <div className="p-2 rounded-full group-hover/btn:bg-yellow-50 dark:group-hover/btn:bg-yellow-900/30 transition-colors border-2 border-transparent group-hover/btn:border-black dark:group-hover/btn:border-white">
                                                    <HiShare className="w-5 h-5" />
                                                </div>
                                            </button>
                                        </div>

                                        {/* YORUMLAR BÖLÜMÜ */}
                                        {post.showComments && (
                                            <div className="mt-4 pt-4 border-t-2 border-gray-100 dark:border-gray-700 animate-fade-in bg-gray-50 dark:bg-gray-700/50 -mx-4 px-4 pb-2 border-b-2 border-black/5">
                                                <h4 className="font-black text-sm text-gray-500 dark:text-gray-300 mb-3">YORUMLAR ({post.comments})</h4>

                                                {post.loadedComments.length > 0 ? (
                                                    <div className="space-y-4">
                                                        {post.loadedComments.map((comment: any) => (
                                                            <div key={comment.id} className="flex gap-3">
                                                                <img src={comment.user.avatar} className="w-8 h-8 rounded-full border border-black bg-white" alt={comment.user.name} />
                                                                <div className="flex-1 bg-white dark:bg-gray-800 border-2 border-black/10 dark:border-gray-600 rounded-xl rounded-tl-none p-3 shadow-sm">
                                                                    <div className="flex justify-between items-baseline mb-1">
                                                                        <span className="font-bold text-sm text-black dark:text-white">{comment.user.name}</span>
                                                                        <span className="text-xs text-gray-400">{comment.date}</span>
                                                                    </div>
                                                                    <p className="text-sm text-gray-800 dark:text-gray-200">{comment.text}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-center text-gray-400 italic text-sm py-2">Henüz yorum yok. İlk yorumu sen yap!</p>
                                                )}

                                                {/* Yorum Yap Input */}
                                                <div className="mt-4 flex gap-2">
                                                    <img src={CURRENT_USER.avatar} className="w-8 h-8 rounded-full border border-black bg-white" alt="Me" />
                                                    <div className="flex-1 relative">
                                                        <input
                                                            type="text"
                                                            placeholder="Yorum yaz..."
                                                            className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-full py-2 pl-4 pr-10 text-sm focus:border-black dark:focus:border-white focus:outline-none transition-colors"
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                        <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600 dark:hover:text-[#1ABCAA] transition-colors">
                                                            <HiPaperAirplane className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Feed;