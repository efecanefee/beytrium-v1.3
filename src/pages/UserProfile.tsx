import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_USER, POSTS, CURRENT_USER, OTHER_USERS } from '../data';
import { HiMapPin, HiLink, HiCalendar, HiAcademicCap, HiUserPlus, HiChatBubbleLeftEllipsis, HiHeart, HiChatBubbleOvalLeft, HiShare, HiPaperAirplane } from 'react-icons/hi2';

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

const UserProfile = () => {
    const { id } = useParams();
    const user = GET_USER(id || '');

    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        if (user) {
            setPosts(POSTS.filter(p => p.authorId === user.id).map(post => ({
                ...post,
                isLiked: false,
                likesCount: post.likes,
                showComments: false,
                loadedComments: []
            })));
        }
    }, [user?.id]);

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
                if (post.showComments) return { ...post, showComments: false };
                let newComments = post.loadedComments;
                if (newComments.length === 0 && commentCount > 0) {
                    newComments = Array.from({ length: commentCount }).map((_, i) => ({
                        id: i,
                        user: OTHER_USERS[Math.floor(Math.random() * OTHER_USERS.length)],
                        text: RANDOM_COMMENTS[Math.floor(Math.random() * RANDOM_COMMENTS.length)],
                        date: `${Math.floor(Math.random() * 59) + 1}dk`
                    }));
                }
                return { ...post, showComments: true, loadedComments: newComments };
            }
            return post;
        }));
    };


    if (!user) return <div className="p-8 font-black text-2xl dark:text-white">Kullanıcı bulunamadı 😔</div>;

    return (
        <div className="p-4 md:p-8 min-h-full pb-20 animate-fade-in">

            {/* ÜST KAPAK & PROFİL RESMİ */}
            <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] mb-8">

                <div className="h-48 relative border-b-4 border-black dark:border-gray-600 bg-gray-200">
                    {(user as any).banner ? (
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${(user as any).banner})` }}></div>
                    ) : (
                        <div className="absolute inset-0 bg-[#1ABCAA] opacity-20" style={{ backgroundImage: 'radial-gradient(black 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    )}
                </div>

                <div className="px-8 pb-8">
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end -mt-16 mb-4 gap-6">
                        <div className="relative">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-32 h-32 rounded-full border-4 border-black bg-white"
                            />
                        </div>

                        <div className="flex-1 mb-2">
                            <h1 className="text-3xl font-black uppercase text-black dark:text-white">{user.name}</h1>
                            <p className="text-lg font-bold text-gray-500 dark:text-gray-400">{user.handle}</p>
                            {(user as any).title && (
                                <span className="inline-block mt-1 bg-[#fbca1f] text-black text-xs font-black px-2 py-1 rounded border-2 border-black transform -rotate-1 shadow-sm">
                                    {(user as any).title}
                                </span>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button className="bg-black text-white px-6 py-3 rounded-xl font-black border-2 border-black hover:bg-gray-800 transition-colors shadow-[4px_4px_0px_0px_#fbca1f] flex items-center gap-2">
                                <HiUserPlus className="w-5 h-5" /> TAKİP ET
                            </button>
                            <button className="bg-white text-black px-4 py-3 rounded-xl font-black border-2 border-black hover:bg-gray-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:scale-110 hover:-rotate-6 active:scale-95 active:rotate-0">
                                <HiChatBubbleLeftEllipsis className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* BİLGİLER */}
                    <div className="space-y-4">
                        <p className="text-xl font-medium text-gray-800 dark:text-gray-200 leading-relaxed max-w-2xl">
                            {(user as any).bio || "Kampüs hayatını dijitalleştiren bu harika platformun bir parçasıyım. İletişim, sanat ve teknoloji tutkunu. ✌️"}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm font-bold text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1"><HiAcademicCap className="w-5 h-5" /> Beykent Üniversitesi</div>
                            <div className="flex items-center gap-1"><HiMapPin className="w-5 h-5" /> Kampüs</div>
                            <div className="flex items-center gap-1"><HiLink className="w-5 h-5" /> beytrium.com</div>
                            <div className="flex items-center gap-1"><HiCalendar className="w-5 h-5" /> Katıldı: {(user as any).joined || '2024'}</div>
                        </div>

                        <div className="flex gap-8 pt-4 border-t-2 border-gray-100 dark:border-gray-700 mt-6">
                            <div><span className="font-black text-xl text-black dark:text-white">{(user as any).followers || 0}</span> <span className="text-gray-500 dark:text-gray-400 font-bold">Takipçi</span></div>
                            <div><span className="font-black text-xl text-black dark:text-white">{(user as any).following || 0}</span> <span className="text-gray-500 dark:text-gray-400 font-bold">Takip Edilen</span></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MOCK POST LİSTESİ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* BASİT TABLAR */}
                    <div className="flex gap-2 border-b-4 border-black dark:border-gray-600 pb-2">
                        <button className="px-6 py-2 font-black bg-[#fbca1f] text-black rounded-t-lg border-2 border-black border-b-0 relative top-0.5 z-10">GÖNDERİLER</button>
                        <button className="px-6 py-2 font-bold text-gray-500 dark:text-gray-400 hover:text-black hover:bg-[#1ABCAA] hover:border-black hover:border-2 hover:border-b-0 rounded-t-lg transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">MEDYA</button>
                        <button className="px-6 py-2 font-bold text-gray-500 dark:text-gray-400 hover:text-white hover:bg-[#ff4757] hover:border-black hover:border-2 hover:border-b-0 rounded-t-lg transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">BEĞENİLER</button>
                    </div>

                    <div className="space-y-6">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <article key={post.id} className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 rounded-2xl p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)] transition-all duration-300 cursor-pointer group relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#1ABCAA] border-r-2 border-black hidden dark:block"></div>
                                    <div className="flex gap-4 pl-5">
                                        <div className="shrink-0">
                                            <img src={user.avatar} alt={user.name} className="w-14 h-14 rounded-full border-2 border-black bg-white hover:opacity-80 transition-opacity object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-x-2 mb-1">
                                                <span className="font-black text-lg text-gray-800 dark:text-white">{user.name}</span>
                                                <span className="text-gray-500 dark:text-gray-400 font-bold text-sm">{user.handle}</span>
                                                <span className="text-gray-400 dark:text-gray-500">•</span>
                                                <span className="text-gray-500 dark:text-gray-400 text-sm font-bold hover:underline">{post.date}</span>
                                            </div>
                                            {(user as any).title && (
                                                <div className="mb-2 inline-block bg-[#fbca1f] px-2 py-0.5 border-2 border-black rounded text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 text-black">
                                                    {(user as any).title}
                                                </div>
                                            )}
                                            <p className="text-xl text-gray-800 dark:text-gray-100 mb-3 leading-normal font-medium whitespace-pre-wrap">{post.content}</p>
                                            {post.image && (
                                                <div className="mb-3 border-4 border-black rounded-xl overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                    <img src={post.image} alt="Post" className="w-full object-cover max-h-[500px]" />
                                                </div>
                                            )}
                                            <div className="flex justify-between max-w-md text-gray-500 mt-4 border-t-2 border-gray-100 dark:border-gray-700 pt-3">
                                                <button onClick={() => handleCommentClick(post.id, post.comments)} className={`flex items-center gap-2 transition-colors group/btn ${post.showComments ? 'text-teal-600 dark:text-[#1ABCAA]' : 'hover:text-teal-600 dark:text-gray-400 dark:hover:text-[#1ABCAA]'}`}>
                                                    <div className={`p-2 rounded-full transition-colors border-2 border-transparent group-hover/btn:border-black dark:group-hover/btn:border-white ${post.showComments ? 'bg-blue-50 dark:bg-blue-900/30 border-black dark:border-blue-400' : 'group-hover/btn:bg-blue-50 dark:group-hover/btn:bg-blue-900/30'}`}>
                                                        <HiChatBubbleOvalLeft className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-bold text-sm text-gray-800 dark:text-white">{post.comments}</span>
                                                </button>
                                                <button onClick={() => handleLike(post.id)} className={`flex items-center gap-2 transition-colors group/btn ${post.isLiked ? 'text-red-500' : 'hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500'}`}>
                                                    <div className={`p-2 rounded-full transition-colors border-2 border-transparent group-hover/btn:border-black dark:group-hover/btn:border-white ${post.isLiked ? 'bg-red-50 dark:bg-red-900/30 border-black dark:border-red-400' : 'group-hover/btn:bg-red-50 dark:group-hover/btn:bg-red-900/30'}`}>
                                                        <HiHeart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                                                    </div>
                                                    <span className="font-bold text-sm text-black dark:text-white">{post.likesCount}</span>
                                                </button>
                                                <button className="flex items-center gap-2 hover:text-[#fbca1f] transition-colors group/btn dark:text-gray-400 dark:hover:text-[#fbca1f]">
                                                    <div className="p-2 rounded-full group-hover/btn:bg-yellow-50 dark:group-hover/btn:bg-yellow-900/30 transition-colors border-2 border-transparent group-hover/btn:border-black dark:group-hover/btn:border-white">
                                                        <HiShare className="w-5 h-5" />
                                                    </div>
                                                </button>
                                            </div>
                                            {post.showComments && (
                                                <div className="mt-4 pt-4 border-t-2 border-gray-100 dark:border-gray-700 animate-fade-in bg-gray-50 dark:bg-gray-700/50 -mx-4 px-4 pb-2 border-b-2 border-black/5">
                                                    <h4 className="font-black text-sm text-gray-500 dark:text-gray-300 mb-3">YORUMLAR ({post.comments})</h4>
                                                    {post.loadedComments.map((comment: any) => (
                                                        <div key={comment.id} className="flex gap-3 mb-4">
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
                                                    <div className="mt-4 flex gap-2">
                                                        <img src={CURRENT_USER.avatar} className="w-8 h-8 rounded-full border border-black bg-white" alt="Me" />
                                                        <div className="flex-1 relative">
                                                            <input type="text" placeholder="Yorum yaz..." className="w-full border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-full py-2 pl-4 pr-10 text-sm focus:border-black dark:focus:border-white focus:outline-none transition-colors" />
                                                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600 dark:hover:text-[#1ABCAA] transition-colors"><HiPaperAirplane className="w-4 h-4" /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="bg-white dark:bg-gray-800 border-4 border-black dark:border-gray-600 rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)]">
                                <p className="text-gray-500 dark:text-gray-400 font-bold text-center py-8">Henüz gönderi yok.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;