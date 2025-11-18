import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Plus, Search, Bell, Home, User, Users, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore.js';
import { Avatar } from "antd"
import loginlogo from "@/assets/logo/loginlogo.svg"
import Logo from "@/assets/logo/Logo.svg"
const LandingPage = () => {
    const { signOut } = useAuthStore();
    const [activeTab, setActiveTab] = useState('feed');
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/signin');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
    const user = useAuthStore((state) => state.user);
    console.log("Current User in LandingPage:", user);
    // mock data for posts
    const posts = [
        {
            id: 1,
            author: {
                name: 'John Doe',
                username: '@johndoe',
                avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff'
            },
            content: 'Just launched my new project! 🚀 Really excited to share this with the community. What do you think?',
            image: null,
            timestamp: '2h ago',
            likes: 124,
            comments: 23,
            shares: 8,
            isLiked: false,
            isBookmarked: false
        },
        {
            id: 2,
            author: {
                name: 'Mike Chen',
                username: '@mikechen',
                avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=ec4899&color=fff'
            },
            content: 'Beautiful sunset today! Sometimes we need to pause and appreciate the little moments. 🌅',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
            timestamp: '4h ago',
            likes: 342,
            comments: 45,
            shares: 12,
            isLiked: true,
            isBookmarked: false
        },
        {
            id: 3,
            author: {
                name: 'Emma Davis',
                username: '@emmad',
                avatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=10b981&color=fff'
            },
            content: 'Quick tip for developers: Always write clean, maintainable code. Your future self will thank you! 💻',
            image: null,
            timestamp: '6h ago',
            likes: 89,
            comments: 15,
            shares: 5,
            isLiked: false,
            isBookmarked: true
        }
    ];

    const suggestedUsers = [
        { name: 'Alex Turner', username: '@alexturner', avatar: 'https://ui-avatars.com/api/?name=Alex+Turner&background=f59e0b&color=fff' },
        { name: 'Lisa Wang', username: '@lisawang', avatar: 'https://ui-avatars.com/api/?name=Lisa+Wang&background=8b5cf6&color=fff' },
        { name: 'Tom Harris', username: '@tomh', avatar: 'https://ui-avatars.com/api/?name=Tom+Harris&background=ef4444&color=fff' }
    ];

    const trendingTopics = [
        { tag: '#WebDevelopment', posts: '12.5K posts' },
        { tag: '#ReactJS', posts: '8.3K posts' },
        { tag: '#TechNews', posts: '15.2K posts' },
        { tag: '#Innovation', posts: '9.7K posts' }
    ];

    const PostCard = ({ post }) => {
        const [liked, setLiked] = useState(post.isLiked);
        const [bookmarked, setBookmarked] = useState(post.isBookmarked);
        const [likesCount, setLikesCount] = useState(post.likes);

        const handleLike = () => {
            setLiked(!liked);
            setLikesCount(liked ? likesCount - 1 : likesCount + 1);
        };

        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 hover:shadow-md transition-shadow">
                {/* Post Header */}
                <div className="flex items-start justify-between p-4">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            {user.username.charAt(0).toUpperCase()}
                        </Avatar>
                        <div>
                            <h3 className="font-semibold text-gray-900 hover:underline cursor-pointer">
                                {user.displayName}
                            </h3>
                            <p className="text-sm text-gray-500">{user.username} · {post.timestamp}</p>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100">
                        <MoreHorizontal size={20} />
                    </button>
                </div>

                {/* Post Content */}
                <div className="px-4 pb-3">
                    <p className="text-gray-800 leading-relaxed">{post.content}</p>
                </div>

                {/* Post Image */}
                {post.image && (
                    <div className="px-4 pb-3">
                        <img
                            src={post.image}
                            alt="Post content"
                            className="w-full rounded-lg object-cover max-h-96"
                        />
                    </div>
                )}

                {/* Post Actions */}
                <div className="px-4 py-3 border-t border-gray-100">
                    <div className="flex items-center justify-between text-gray-500">
                        <button
                            onClick={handleLike}
                            className={`flex items-center gap-2 hover:text-red-500 transition-colors ${liked ? 'text-red-500' : ''}`}
                        >
                            <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
                            <span className="text-sm font-medium">{likesCount}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
                            <MessageCircle size={20} />
                            <span className="text-sm font-medium">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 hover:text-green-500 transition-colors">
                            <Share2 size={20} />
                            <span className="text-sm font-medium">{post.shares}</span>
                        </button>
                        <button
                            onClick={() => setBookmarked(!bookmarked)}
                            className={`hover:text-yellow-500 transition-colors ${bookmarked ? 'text-yellow-500' : ''}`}
                        >
                            <Bookmark size={20} fill={bookmarked ? 'currentColor' : 'none'} />
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-8">
                            <Link to="/" className="text-2xl font-bold text-indigo-600">
                                <img src={loginlogo} alt="MORA Logo" className="w-8 h-8 inline-block mr-2" />
                            </Link>

                            {/* Search Bar */}
                            <div className="hidden md:block">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Navigation Icons */}
                        <div className="flex items-center gap-6">
                            <button className="text-gray-600 hover:text-indigo-600 transition-colors">
                                <Home size={24} />
                            </button>
                            <button className="text-gray-600 hover:text-indigo-600 transition-colors">
                                <Users size={24} />
                            </button>
                            <button className="text-gray-600 hover:text-indigo-600 relative transition-colors">
                                <Bell size={24} />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    3
                                </span>
                            </button>
                            <button className="text-gray-600 hover:text-indigo-600 transition-colors">
                                <User size={24} />
                            </button>
                            <button className="text-gray-600 hover:text-indigo-600 transition-colors">
                                <Settings size={24} />
                            </button>
                            <button className="text-gray-600 hover:text-indigo-600 transition-colors">
                                <LogOut size={24} onClick={handleLogout} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav >

            {/* Main Content */}
            < div className="max-w-7xl mx-auto px-4 py-6" >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Sidebar - User Profile */}
                    <aside className="lg:col-span-3 hidden lg:block">
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
                            <div className="flex flex-col items-center">
                                <Avatar size={80} className="bg-indigo-600 text-white text-3xl font-bold">
                                    {user.username.charAt(0).toUpperCase()}
                                </Avatar>

                                <h2 className="text-xl font-bold text-gray-900">{user.displayName}</h2>
                                <p className="text-gray-500 text-sm mb-4">@{user.username}</p>
                                <div className="w-full border-t border-gray-200 pt-4 mt-2">
                                    <div className="flex justify-around text-center">
                                        <div>
                                            <p className="text-xl font-bold text-gray-900">245</p>
                                            <p className="text-xs text-gray-500">Posts</p>
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold text-gray-900">1.2K</p>
                                            <p className="text-xs text-gray-500">Followers</p>
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold text-gray-900">583</p>
                                            <p className="text-xs text-gray-500">Following</p>
                                        </div>
                                    </div>
                                </div>

                                <button className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                                    View Profile
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Center - Feed */}
                    <main className="lg:col-span-6">
                        {/* Create Post */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
                            <div className="flex items-center gap-3">
                                <Avatar >
                                    {user.username.charAt(0).toUpperCase()}
                                </Avatar>
                                <input
                                    type="text"
                                    placeholder="What's on your mind?"
                                    className="flex-1 bg-gray-100 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                <button className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition-colors">
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Feed Tabs */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4">
                            <div className="flex border-b border-gray-200">
                                <button
                                    onClick={() => setActiveTab('feed')}
                                    className={`flex-1 py-3 font-medium transition-colors ${activeTab === 'feed'
                                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    For You
                                </button>
                                <button
                                    onClick={() => setActiveTab('following')}
                                    className={`flex-1 py-3 font-medium transition-colors ${activeTab === 'following'
                                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Following
                                </button>
                            </div>
                        </div>

                        {/* Posts Feed */}
                        <div>
                            {posts.map(post => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>
                    </main>

                    {/* Right Sidebar */}
                    <aside className="lg:col-span-3 hidden lg:block">
                        <div className="sticky top-24 space-y-4">
                            {/* Trending Topics */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                <h3 className="font-bold text-gray-900 mb-4">Trending Topics</h3>
                                <div className="space-y-3">
                                    {trendingTopics.map((topic, index) => (
                                        <div key={index} className="hover:bg-gray-50 p-2 rounded-lg cursor-pointer transition-colors">
                                            <p className="font-semibold text-indigo-600">{topic.tag}</p>
                                            <p className="text-sm text-gray-500">{topic.posts}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Suggested Users */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                <h3 className="font-bold text-gray-900 mb-4">Suggested for you</h3>
                                <div className="space-y-3">
                                    {suggestedUsers.map((user, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.username}</p>
                                                </div>
                                            </div>
                                            <button className="text-indigo-600 hover:bg-indigo-50 px-4 py-1 rounded-full text-sm font-medium transition-colors">
                                                Follow
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Links */}
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                                <div className="text-xs text-gray-500 space-y-2">
                                    <div className="flex flex-wrap gap-2">
                                        <a href="#" className="hover:underline">About</a>
                                        <span>·</span>
                                        <a href="#" className="hover:underline">Help</a>
                                        <span>·</span>
                                        <a href="#" className="hover:underline">Privacy</a>
                                        <span>·</span>
                                        <a href="#" className="hover:underline">Terms</a>
                                    </div>
                                    <p className="text-gray-400">© 2025 MORA Community</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </ div>
        </div >
    );
};

export default LandingPage;
