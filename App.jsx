import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  User, 
  Home, 
  Grid, 
  Filter, 
  Star, 
  ChevronLeft, 
  Plus, 
  Minus, 
  X, 
  Check, 
  CreditCard, 
  Truck, 
  ShieldCheck, 
  ArrowRight,
  SlidersHorizontal,
  Share2,
  Package,
  Clock,
  ChevronRight,
  Bell,
  MapPin,
  ThumbsUp,
  MessageSquare,
  Shield,
  RotateCcw
} from 'lucide-react';

// Sample Data
const CATEGORIES = [
  { id: 'all', name: 'Semua' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'elektronik', name: 'Elektronik' },
  { id: 'sepatu', name: 'Sepatu' },
  { id: 'kecantikan', name: 'Kecantikan' },
  { id: 'aksesoris', name: 'Aksesoris' }
];

const PRODUCTS = [
  {
    id: 1,
    name: 'Jaket Oversized Denim Premium',
    category: 'fashion',
    price: 349000,
    originalPrice: 499000,
    rating: 4.8,
    reviewsCount: 124,
    sold: '1.2k',
    isNew: true,
    discount: '30%',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Jaket denim berkualitas tinggi dengan bahan katun 100% tebal namun tetap nyaman dan adem saat digunakan sehari-hari. Cocok untuk gaya casual modern.',
    specifications: [
      { label: 'Bahan', value: '100% Cotton Premium Denim' },
      { label: 'Fit', value: 'Oversized Fit' },
      { label: 'Instruksi Cuci', value: 'Cuci dingin, Jangan pakai pemutih' },
      { label: 'Negara Asal', value: 'Indonesia' }
    ],
    reviews: [
      { id: 1, user: 'Rian S.', rating: 5, date: '2 hari lalu', comment: 'Bahannya sangat halus dan pas banget di badan! Sangat worth it dengan harganya.', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100' },
      { id: 2, user: 'Anisa K.', rating: 4, date: '1 minggu lalu', comment: 'Jahitannya rapi, pengiriman cepat. Hanya saja warnanya sedikit lebih terang dari foto.', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Blue Light', hex: '#87CEEB' },
      { name: 'Dark Indigo', hex: '#1A237E' },
      { name: 'Black Washed', hex: '#333333' }
    ]
  },
  {
    id: 2,
    name: 'Wireless Earbuds Active Noise Cancelling',
    category: 'elektronik',
    price: 599000,
    originalPrice: 899000,
    rating: 4.9,
    reviewsCount: 350,
    sold: '3.4k',
    isNew: false,
    discount: '33%',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Nikmati kualitas suara jernih bas mendalam dengan fitur ANC terkini. Baterai tahan hingga 28 jam dengan charging case.',
    specifications: [
      { label: 'Bluetooth', value: 'V5.3 Ultra Fast' },
      { label: 'Daya Baterai', value: 'Up to 28 Jam Total' },
      { label: 'Garansi', value: '1 Tahun Resmi' }
    ],
    reviews: [
      { id: 1, user: 'Budi T.', rating: 5, date: 'Kemarin', comment: 'Bass mantap, noise cancelling beneran kedap!', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100' }
    ],
    sizes: ['Standard'],
    colors: [
      { name: 'Matte Black', hex: '#111111' },
      { name: 'Pearl White', hex: '#F5F5F5' }
    ]
  },
  {
    id: 3,
    name: 'Sneakers Casual Lightweight Sport',
    category: 'sepatu',
    price: 429000,
    originalPrice: 550000,
    rating: 4.7,
    reviewsCount: 89,
    sold: '850',
    isNew: true,
    discount: '22%',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Sepatu kets ringan super empuk dirancang khusus untuk kenyamanan jalan jauh maupun aktivitas olahraga ringan harian.',
    specifications: [
      { label: 'Insole', value: 'Memory Foam Tech' },
      { label: 'Outsole', value: 'Rubber Anti-Slip' }
    ],
    reviews: [
      { id: 1, user: 'Deni M.', rating: 5, date: '3 hari lalu', comment: 'Empuk banget solnya, cocok buat jogging pagi.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' }
    ],
    sizes: ['39', '40', '41', '42', '43'],
    colors: [
      { name: 'Crimson Red', hex: '#D32F2F' },
      { name: 'Core Black', hex: '#212121' }
    ]
  },
  {
    id: 4,
    name: 'Smartwatch Fitness & Heart Rate Tracker',
    category: 'elektronik',
    price: 780000,
    originalPrice: 1200000,
    rating: 4.9,
    reviewsCount: 512,
    sold: '2.1k',
    isNew: false,
    discount: '35%',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Pantau kesehatan dan aktivitas harian secara akurat. Layar AMOLED responsif serta tahan air hingga kedalaman 50 meter.',
    specifications: [
      { label: 'Layar', value: 'AMOLED 1.43 Inch' },
      { label: 'Water Resistant', value: '5 ATM (50 Meter)' }
    ],
    reviews: [
      { id: 1, user: 'Maya L.', rating: 5, date: '4 hari lalu', comment: 'Aplikasi pendukungnya sangat gampang terkoneksi.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' }
    ],
    sizes: ['41mm', '45mm'],
    colors: [
      { name: 'Space Gray', hex: '#424242' },
      { name: 'Rose Gold', hex: '#B76E79' }
    ]
  },
  {
    id: 5,
    name: 'Serum Hydrating Face Care Glow 30ml',
    category: 'kecantikan',
    price: 129000,
    originalPrice: 169000,
    rating: 4.8,
    reviewsCount: 640,
    sold: '5k+',
    isNew: false,
    discount: '23%',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Serum wajah dengan Niacinamide dan Hyaluronic Acid untuk mencerahkan, melembabkan, serta meremajakan kulit wajah.',
    specifications: [
      { label: 'Volume', value: '30 ml' },
      { label: 'BPOM', value: 'NA1822010992' }
    ],
    reviews: [],
    sizes: ['30ml', '50ml'],
    colors: [
      { name: 'Clear Glow', hex: '#E0F7FA' }
    ]
  },
  {
    id: 6,
    name: 'Kacamata Hitam Polarized UV400 Protection',
    category: 'aksesoris',
    price: 185000,
    originalPrice: 250000,
    rating: 4.6,
    reviewsCount: 77,
    sold: '430',
    isNew: true,
    discount: '26%',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600'
    ],
    description: 'Kacamata gaya unisex dengan lensa polarized UV400 melindungi mata dari paparan sinar matahari terik.',
    specifications: [
      { label: 'Lensa', value: 'Polarized TAC UV400' }
    ],
    reviews: [],
    sizes: ['All Size'],
    colors: [
      { name: 'Classic Black', hex: '#000000' },
      { name: 'Tortoise Shell', hex: '#8B4513' }
    ]
  }
];

// Helper Function for Rupiah Formatting
const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(number);
};

export default function App() {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState('home'); // home, explore, wishlist, profile
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // E-commerce Functional State
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([1, 4]); // Pre-filled product IDs
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [toastMessage, setToastMessage] = useState('');

  // Toast Notification Trigger
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Cart Handlers
  const addToCart = (product, size, color, qty = 1) => {
    const chosenSize = size || product.sizes[0];
    const chosenColor = color || product.colors[0].name;

    const existingIndex = cart.findIndex(
      item => item.id === product.id && item.selectedSize === chosenSize && item.selectedColor === chosenColor
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += qty;
      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
          quantity: qty
        }
      ]);
    }
    showToast('Produk berhasil ditambahkan ke keranjang!');
  };

  const updateCartQuantity = (index, delta) => {
    const updated = [...cart];
    updated[index].quantity += delta;
    if (updated[index].quantity <= 0) {
      updated.splice(index, 1);
    }
    setCart(updated);
  };

  const toggleWishlist = (productId, e) => {
    if (e) e.stopPropagation();
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToast('Dihapus dari Wishlist');
    } else {
      setWishlist([...wishlist, productId]);
      showToast('Ditambahkan ke Wishlist');
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Filtering Products
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-100 h-full font-sans text-slate-800 flex flex-col justify-center items-center selection:bg-indigo-500 selection:text-white">
      {/* Mobile Frame Container */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl relative flex flex-col overflow-hidden">

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* MAIN ROUTING LOGIC */}
        {isCheckoutPage ? (
          <CheckoutView 
            cart={cart}
            cartTotal={cartTotal}
            onBack={() => setIsCheckoutPage(false)}
            onSuccess={() => {
              setCart([]);
              setIsCheckoutPage(false);
              setOrderSuccess(true);
            }}
          />
        ) : orderSuccess ? (
          <OrderSuccessView onDone={() => {
            setOrderSuccess(false);
            setActiveTab('home');
          }} />
        ) : selectedProduct ? (
          <ProductDetailView 
            product={selectedProduct}
            allProducts={PRODUCTS}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onBack={() => setSelectedProduct(null)}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onToggleWishlist={(e) => toggleWishlist(selectedProduct.id, e)}
            onAddToCart={(size, color, qty) => {
              addToCart(selectedProduct, size, color, qty);
            }}
            onBuyNow={(size, color, qty) => {
              addToCart(selectedProduct, size, color, qty);
              setSelectedProduct(null);
              setIsCartOpen(true);
            }}
          />
        ) : (
          <>
            {/* Header Sticky */}
            <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-100 flex flex-col gap-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-indigo-600 text-white p-1.5 rounded-xl">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h1 className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">NEXUS<span className="text-indigo-600">STORE</span></h1>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium mt-0.5">
                      <MapPin className="w-3 h-3 text-indigo-500" /> Dikirim ke <strong className="text-slate-600">Jakarta Selatan</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-full hover:bg-slate-100 text-slate-600 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
                  </button>
                  <button 
                    onClick={() => setIsCartOpen(true)}
                    className="p-2 rounded-full hover:bg-slate-100 text-slate-600 relative"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Cari sepatu, jaket, gadget..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-100 text-slate-800 pl-10 pr-4 py-2 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-400"
                />
              </div>
            </header>

            {/* Content Body Based on Tab */}
            <main className="flex-1 overflow-y-auto">
              {activeTab === 'home' && (
                <HomeView 
                  categories={CATEGORIES}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  products={filteredProducts}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  wishlist={wishlist}
                  onToggleWishlist={toggleWishlist}
                  onAddToCart={(p, e) => {
                    e.stopPropagation();
                    addToCart(p);
                  }}
                />
              )}

              {activeTab === 'explore' && (
                <ExploreView 
                  products={PRODUCTS} 
                  onSelectProduct={(p) => setSelectedProduct(p)}
                />
              )}

              {activeTab === 'wishlist' && (
                <WishlistView 
                  wishlistIds={wishlist}
                  products={PRODUCTS}
                  onSelectProduct={(p) => setSelectedProduct(p)}
                  onToggleWishlist={toggleWishlist}
                  onAddToCart={(p) => addToCart(p)}
                />
              )}

              {activeTab === 'profile' && <ProfileView />}
            </main>

            {/* Bottom Navigation */}
            <nav className="w-full max-w-md bg-white border-t border-slate-100 px-6 py-2 flex justify-between items-center z-40 shadow-lg flex-shrink-0">
              <NavItem 
                icon={<Home className="w-5 h-5" />} 
                label="Beranda" 
                active={activeTab === 'home'} 
                onClick={() => setActiveTab('home')} 
              />
              <NavItem 
                icon={<Grid className="w-5 h-5" />} 
                label="Eksplor" 
                active={activeTab === 'explore'} 
                onClick={() => setActiveTab('explore')} 
              />
              <NavItem 
                icon={<Heart className="w-5 h-5" />} 
                label="Wishlist" 
                active={activeTab === 'wishlist'} 
                badge={wishlist.length}
                onClick={() => setActiveTab('wishlist')} 
              />
              <NavItem 
                icon={<User className="w-5 h-5" />} 
                label="Akun" 
                active={activeTab === 'profile'} 
                onClick={() => setActiveTab('profile')} 
              />
            </nav>
          </>
        )}

        {/* Cart Drawer / Overlay */}
        {isCartOpen && (
          <CartDrawer 
            cart={cart}
            onClose={() => setIsCartOpen(false)}
            onUpdateQty={updateCartQuantity}
            cartTotal={cartTotal}
            onCheckout={() => {
              setIsCartOpen(false);
              setIsCheckoutPage(true);
            }}
          />
        )}

      </div>
    </div>
  );
}

// Nav Item Component
function NavItem({ icon, label, active, onClick, badge }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 relative transition-colors ${
        active ? 'text-indigo-600 font-semibold' : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      <div className="relative">
        {icon}
        {badge > 0 && (
          <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
            {badge}
          </span>
        )}
      </div>
      <span className="text-[10px] tracking-tight">{label}</span>
    </button>
  );
}

// 1. HOME VIEW
function HomeView({ categories, selectedCategory, setSelectedCategory, products, onSelectProduct, wishlist, onToggleWishlist, onAddToCart }) {
  return (
    <div className="p-4 space-y-6">
      {/* Hero Banner Carousel */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-5 shadow-lg shadow-indigo-100">
        <div className="relative z-10 w-2/3 space-y-2">
          <span className="bg-white/20 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
            Promo Spesial
          </span>
          <h2 className="text-xl font-bold leading-tight">Diskon Hingga 50% Outfit Casual</h2>
          <p className="text-[11px] text-indigo-100">Dapatkan promo eksklusif gratis ongkir ke seluruh Indonesia hari ini.</p>
          <button className="mt-2 bg-white text-indigo-600 font-bold text-xs px-3.5 py-1.5 rounded-lg shadow-md hover:bg-indigo-50 transition-all">
            Belanja Sekarang
          </button>
        </div>
        <img 
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=300" 
          alt="Banner Offer" 
          className="absolute -right-4 -bottom-4 w-36 h-36 object-cover rounded-full opacity-90 border-4 border-white/20 pointer-events-none"
        />
      </div>

      {/* Kategori Horizontal Scroll */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-sm text-slate-900">Kategori Pilihan</h3>
          <span className="text-xs text-indigo-600 font-medium">Lihat Semua</span>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Flash Sale Header */}
      <div className="flex items-center justify-between bg-rose-50 p-3 rounded-xl border border-rose-100">
        <div className="flex items-center gap-2">
          <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">FLASH SALE</span>
          <div className="flex items-center gap-1 text-xs font-bold text-rose-700">
            <Clock className="w-3.5 h-3.5" />
            <span>02 : 45 : 12</span>
          </div>
        </div>
        <span className="text-[11px] text-rose-600 font-semibold flex items-center gap-0.5">
          Berakhir Segera <ChevronRight className="w-3 h-3" />
        </span>
      </div>

      {/* Grid Produk */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-sm text-slate-900">Rekomendasi Untukmu</h3>
          <button className="text-slate-400 p-1">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-400 text-xs">Tidak ada produk yang cocok ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isWishlisted={wishlist.includes(product.id)}
                onClick={() => onSelectProduct(product)}
                onToggleWishlist={(e) => onToggleWishlist(product.id, e)}
                onAddToCart={(e) => onAddToCart(product, e)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Component Card Produk
function ProductCard({ product, isWishlisted, onClick, onToggleWishlist, onAddToCart }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div className="relative aspect-square bg-slate-100 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button 
          onClick={onToggleWishlist}
          className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-md rounded-full text-slate-600 hover:text-rose-500 shadow-sm"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {product.discount && (
          <span className="absolute top-2 left-2 bg-rose-500 text-white font-bold text-[9px] px-1.5 py-0.5 rounded-md shadow-sm">
            {product.discount} OFF
          </span>
        )}
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between gap-2">
        <div>
          <h4 className="text-xs font-semibold text-slate-800 line-clamp-2 leading-snug">
            {product.name}
          </h4>
          <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-500">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-700">{product.rating}</span>
            <span>• Terjual {product.sold}</span>
          </div>
        </div>

        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-extrabold text-indigo-600">
              {formatRupiah(product.price)}
            </span>
          </div>
          {product.originalPrice && (
            <span className="text-[10px] text-slate-400 line-through">
              {formatRupiah(product.originalPrice)}
            </span>
          )}

          <div className="mt-2 flex gap-1">
            <button 
              onClick={onAddToCart}
              className="w-full bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white py-1.5 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
            >
              <Plus className="w-3 h-3" /> Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. EXPLORE VIEW
function ExploreView({ products, onSelectProduct }) {
  const [selectedCat, setSelectedCat] = useState('Semua');
  const categories = ['Semua', 'Fashion Trend', 'Gadget Hits', 'Sepatu & Style', 'Skincare Glow'];

  return (
    <div className="p-4 space-y-4">
      <h2 className="font-bold text-lg text-slate-900">Jelajahi Inspirasi</h2>
      
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {categories.map((c, idx) => (
          <button 
            key={idx}
            onClick={() => setSelectedCat(c)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              selectedCat === c ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {products.map((item) => (
          <div 
            key={item.id}
            onClick={() => onSelectProduct(item)}
            className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex gap-3 p-2 cursor-pointer hover:shadow-md transition-all"
          >
            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl bg-slate-100" />
            <div className="flex-1 flex flex-col justify-between py-1 pr-2">
              <div>
                <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wide">{item.category}</span>
                <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">{item.name}</h4>
                <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{item.description}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs font-bold text-slate-900">{formatRupiah(item.price)}</span>
                <span className="text-[10px] bg-emerald-50 text-emerald-600 font-bold px-2 py-0.5 rounded-full">
                  Gratis Ongkir
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. WISHLIST VIEW
function WishlistView({ wishlistIds, products, onSelectProduct, onToggleWishlist, onAddToCart }) {
  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg text-slate-900">Wishlist Saya</h2>
        <span className="text-xs text-slate-500">{wishlistedProducts.length} Barang</span>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <div className="w-16 h-16 bg-rose-50 text-rose-400 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <p className="text-xs font-semibold text-slate-600">Wishlist Anda Masih Kosong</p>
          <p className="text-[11px] text-slate-400 max-w-[200px] mx-auto">Simpan item favorit Anda untuk dibeli nanti.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {wishlistedProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              isWishlisted={true}
              onClick={() => onSelectProduct(product)}
              onToggleWishlist={(e) => onToggleWishlist(product.id, e)}
              onAddToCart={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// 4. PROFILE VIEW
function ProfileView() {
  return (
    <div className="p-4 space-y-5">
      {/* Profile Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-3 shadow-sm">
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" 
          alt="Avatar" 
          className="w-14 h-14 rounded-full object-cover border-2 border-indigo-600"
        />
        <div className="flex-1">
          <h3 className="font-bold text-sm text-slate-900">Siti Nurhaliza</h3>
          <p className="text-[11px] text-slate-400">siti.nur@example.com</p>
          <span className="inline-block mt-1 bg-indigo-50 text-indigo-600 text-[9px] font-bold px-2 py-0.5 rounded-full">
            Member Gold
          </span>
        </div>
      </div>

      {/* Transaction Status */}
      <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
        <h4 className="font-bold text-xs text-slate-900">Pesanan Saya</h4>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-50">
            <CreditCard className="w-5 h-5 text-indigo-600" />
            <span className="text-[10px] text-slate-600">Belum Bayar</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-50">
            <Package className="w-5 h-5 text-indigo-600" />
            <span className="text-[10px] text-slate-600">Dikemas</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-50">
            <Truck className="w-5 h-5 text-indigo-600" />
            <span className="text-[10px] text-slate-600">Dikirim</span>
          </div>
          <div className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-slate-50">
            <Star className="w-5 h-5 text-indigo-600" />
            <span className="text-[10px] text-slate-600">Ulasan</span>
          </div>
        </div>
      </div>

      {/* Menu Settings */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-100">
        <ProfileMenuItem icon={<MapPin className="w-4 h-4" />} title="Alamat Pengiriman" subtitle="3 Alamat Tersimpan" />
        <ProfileMenuItem icon={<CreditCard className="w-4 h-4" />} title="Metode Pembayaran" subtitle="E-Wallet & Bank Link" />
        <ProfileMenuItem icon={<ShieldCheck className="w-4 h-4" />} title="Keamanan Akun" subtitle="PIN & Biometrik Active" />
        <ProfileMenuItem icon={<Bell className="w-4 h-4" />} title="Notifikasi" subtitle="Promo & Transaksi" />
      </div>
    </div>
  );
}

function ProfileMenuItem({ icon, title, subtitle }) {
  return (
    <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
      <div className="flex items-center gap-3">
        <div className="text-slate-500 bg-slate-100 p-2 rounded-xl">{icon}</div>
        <div>
          <h5 className="text-xs font-semibold text-slate-800">{title}</h5>
          <p className="text-[10px] text-slate-400">{subtitle}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-300" />
    </div>
  );
}

// 5. PRODUCT DETAIL VIEW (FULLY EXPANDED & COMPREHENSIVE)
function ProductDetailView({ product, allProducts, isWishlisted, onBack, onSelectProduct, onToggleWishlist, onAddToCart, onBuyNow }) {
  const images = product.gallery || [product.image];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);
  const [quantity, setQuantity] = useState(1);
  const [activeDetailTab, setActiveDetailTab] = useState('desc'); // 'desc', 'specs', 'reviews'

  // Sync image if product prop changes
  useEffect(() => {
    setSelectedImage(product.gallery ? product.gallery[0] : product.image);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0].name);
    setQuantity(1);
  }, [product]);

  const relatedProducts = allProducts.filter(
    p => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="h-full bg-slate-50 flex flex-col justify-between overflow-hidden">
      {/* Top Floating Header */}
      <div className="sticky top-0 z-30 px-4 py-3 bg-white/90 backdrop-blur-md flex items-center justify-between border-b border-slate-100 flex-shrink-0">
        <button onClick={onBack} className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-xs font-bold text-slate-800">Detail Produk</span>
        <div className="flex gap-2">
          <button onClick={onToggleWishlist} className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-rose-50 transition-colors">
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <button className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {/* Main Product Gallery */}
        <div className="bg-white p-2">
          <div className="w-full aspect-square bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-100">
            <img src={selectedImage} alt={product.name} className="w-full h-full object-cover transition-all duration-300" />
            {product.discount && (
              <span className="absolute top-3 left-3 bg-rose-500 text-white font-bold text-xs px-2.5 py-1 rounded-lg shadow-md">
                Hemat {product.discount}
              </span>
            )}
          </div>

          {/* Thumbnail Selector */}
          {images.length > 1 && (
            <div className="flex gap-2 mt-3 px-1 overflow-x-auto no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === img ? 'border-indigo-600 scale-95 shadow-sm' : 'border-slate-200 opacity-60'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Detail Block */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                {product.category}
              </span>
              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Truck className="w-3 h-3" /> Gratis Ongkir
              </span>
            </div>
            <h2 className="text-base font-bold text-slate-900 leading-snug">{product.name}</h2>
            
            <div className="flex items-center gap-2 mt-2 text-xs">
              <div className="flex items-center gap-1 font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
              </div>
              <span className="text-slate-400">({product.reviewsCount} ulasan)</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-medium">Terjual {product.sold}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 pt-3 border-t border-slate-100">
            <span className="text-2xl font-black text-indigo-600">{formatRupiah(product.price)}</span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">{formatRupiah(product.originalPrice)}</span>
            )}
          </div>

          {/* Color Selection */}
          <div className="pt-2">
            <label className="text-xs font-bold text-slate-800 block mb-2">
              Warna: <span className="text-indigo-600 font-semibold">{selectedColor}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(c.name)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                    selectedColor === c.name 
                      ? 'border-indigo-600 bg-indigo-50/60 text-indigo-600 font-bold shadow-sm' 
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full border border-black/10 shadow-inner" style={{ backgroundColor: c.hex }}></span>
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="pt-2">
            <label className="text-xs font-bold text-slate-800 block mb-2">
              Ukuran: <span className="text-indigo-600 font-semibold">{selectedSize}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSize(s)}
                  className={`w-10 h-10 rounded-xl border text-xs font-bold transition-all flex items-center justify-center ${
                    selectedSize === s 
                      ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Counter */}
          <div className="pt-2 flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800">Jumlah Pesanan:</label>
            <div className="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-slate-600 hover:text-slate-900 disabled:opacity-40"
                disabled={quantity <= 1}
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-extrabold text-slate-800 min-w-[20px] text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="text-slate-600 hover:text-slate-900"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Value Guarantee Badges */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center text-[10px] text-slate-500">
            <div className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl">
              <Shield className="w-4 h-4 text-indigo-500" />
              <span>100% Original</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl">
              <RotateCcw className="w-4 h-4 text-indigo-500" />
              <span>7 Hari Retur</span>
            </div>
            <div className="flex flex-col items-center gap-1 p-2 bg-slate-50 rounded-xl">
              <Truck className="w-4 h-4 text-indigo-500" />
              <span>Cepat Sampai</span>
            </div>
          </div>
        </div>

        {/* Tabbed Detail Content (Deskripsi, Spesifikasi, Review) */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex border-b border-slate-100 text-xs font-bold">
            <button 
              onClick={() => setActiveDetailTab('desc')}
              className={`flex-1 py-3 text-center border-b-2 transition-all ${
                activeDetailTab === 'desc' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/30' : 'border-transparent text-slate-400'
              }`}
            >
              Deskripsi
            </button>
            <button 
              onClick={() => setActiveDetailTab('specs')}
              className={`flex-1 py-3 text-center border-b-2 transition-all ${
                activeDetailTab === 'specs' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/30' : 'border-transparent text-slate-400'
              }`}
            >
              Spesifikasi
            </button>
            <button 
              onClick={() => setActiveDetailTab('reviews')}
              className={`flex-1 py-3 text-center border-b-2 transition-all ${
                activeDetailTab === 'reviews' ? 'border-indigo-600 text-indigo-600 bg-indigo-50/30' : 'border-transparent text-slate-400'
              }`}
            >
              Ulasan ({product.reviewsCount})
            </button>
          </div>

          <div className="p-4 text-xs">
            {activeDetailTab === 'desc' && (
              <div className="space-y-2 leading-relaxed text-slate-600">
                <p>{product.description}</p>
                <p className="text-[11px] text-slate-400 italic mt-2">* Silahkan pilih variasi warna dan ukuran sebelum menekan tombol beli.</p>
              </div>
            )}

            {activeDetailTab === 'specs' && (
              <div className="divide-y divide-slate-100">
                {product.specifications ? (
                  product.specifications.map((spec, i) => (
                    <div key={i} className="py-2 flex justify-between">
                      <span className="text-slate-400">{spec.label}</span>
                      <span className="font-semibold text-slate-800">{spec.value}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 py-2">Spesifikasi standar produsen.</p>
                )}
              </div>
            )}

            {activeDetailTab === 'reviews' && (
              <div className="space-y-4">
                {/* Review Header Stats */}
                <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl">
                  <div className="text-center border-r border-slate-200 pr-4">
                    <span className="text-2xl font-black text-slate-900">{product.rating}</span>
                    <div className="flex text-amber-400 justify-center my-0.5">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400" />
                    </div>
                    <span className="text-[10px] text-slate-400">Rating Produk</span>
                  </div>
                  <div className="flex-1 text-[11px] text-slate-500 space-y-1">
                    <p><strong>98%</strong> pembeli merasa puas</p>
                    <p><strong>100%</strong> respon penjual cepat</p>
                  </div>
                </div>

                {/* User Reviews */}
                <div className="space-y-3">
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((rev) => (
                      <div key={rev.id} className="border-b border-slate-100 pb-3 last:border-none">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <img src={rev.avatar} alt={rev.user} className="w-6 h-6 rounded-full object-cover" />
                            <span className="font-bold text-slate-800 text-[11px]">{rev.user}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">{rev.date}</span>
                        </div>
                        <div className="flex text-amber-400 mb-1">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-2.5 h-2.5 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-slate-600 text-[11px] leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-center py-4">Belum ada ulasan tertulis.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-3 px-1">
            <h3 className="font-bold text-xs text-slate-900 px-3">Produk Serupa</h3>
            <div className="flex gap-3 overflow-x-auto no-scrollbar px-3 pb-2">
              {relatedProducts.map((rel) => (
                <div 
                  key={rel.id} 
                  onClick={() => onSelectProduct(rel)}
                  className="w-36 bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm flex-shrink-0 cursor-pointer"
                >
                  <img src={rel.image} alt={rel.name} className="w-full h-28 object-cover" />
                  <div className="p-2 space-y-1">
                    <h4 className="text-[11px] font-semibold text-slate-800 line-clamp-1">{rel.name}</h4>
                    <span className="text-xs font-bold text-indigo-600 block">{formatRupiah(rel.price)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="w-full bg-white border-t border-slate-100 p-3 flex gap-2 z-40 shadow-2xl flex-shrink-0">
        <button 
          onClick={() => onAddToCart(selectedSize, selectedColor, quantity)}
          className="flex-1 bg-indigo-50 text-indigo-600 font-bold text-xs py-3 rounded-xl hover:bg-indigo-100 transition-colors flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-4 h-4" /> + Keranjang
        </button>
        <button 
          onClick={() => onBuyNow(selectedSize, selectedColor, quantity)}
          className="flex-1 bg-indigo-600 text-white font-bold text-xs py-3 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
        >
          Beli Sekarang
        </button>
      </div>
    </div>
  );
}

// 6. CART DRAWER
function CartDrawer({ cart, onClose, onUpdateQty, cartTotal, onCheckout }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl animate-slide-left">
        {/* Cart Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">Keranjang Belanja</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-20 space-y-2">
              <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-xs font-semibold text-slate-600">Keranjang Anda Kosong</p>
              <p className="text-[10px] text-slate-400">Pilih produk menarik dan tambahkan ke sini.</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex gap-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-white" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">{item.name}</h4>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {item.selectedColor} | Size: {item.selectedSize}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-extrabold text-indigo-600">{formatRupiah(item.price)}</span>
                    <div className="flex items-center gap-2 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      <button onClick={() => onUpdateQty(index, -1)} className="text-slate-500 hover:text-slate-800">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-slate-800">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(index, 1)} className="text-slate-500 hover:text-slate-800">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart Footer Summary */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-white space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Total Harga</span>
              <span className="text-base font-extrabold text-slate-900">{formatRupiah(cartTotal)}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-indigo-600 text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              Lanjut ke Checkout <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// 7. CHECKOUT VIEW
function CheckoutView({ cart, cartTotal, onBack, onSuccess }) {
  const [selectedPayment, setSelectedPayment] = useState('qris');
  const shippingFee = 15000;
  const grandTotal = cartTotal + shippingFee;

  return (
    <div className="h-full bg-slate-50 flex flex-col justify-between overflow-hidden">
      {/* Header */}
      <div className="sticky top-0 z-20 px-4 py-3 bg-white flex items-center gap-3 border-b border-slate-100 flex-shrink-0">
        <button onClick={onBack} className="p-1.5 rounded-full bg-slate-100 text-slate-700">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-sm font-bold text-slate-900">Pengiriman & Pembayaran</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Alamat Pengiriman */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-indigo-600" /> Alamat Pengiriman
            </span>
            <span className="text-[11px] text-indigo-600 font-medium">Ubah</span>
          </div>
          <div className="text-xs text-slate-600 space-y-0.5 pt-1">
            <p className="font-bold text-slate-800">Siti Nurhaliza (0812-3456-7890)</p>
            <p className="text-[11px]">Jl. Jendral Sudirman No. 45, Kebayoran Baru, Jakarta Selatan, 12190</p>
          </div>
        </div>

        {/* Ringkasan Item */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 space-y-2">
          <h3 className="text-xs font-bold text-slate-900 mb-2">Ringkasan Pesanan</h3>
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between items-center text-xs py-1">
              <div className="flex gap-2 items-center">
                <span className="font-bold text-slate-700">{item.quantity}x</span>
                <span className="text-slate-600 line-clamp-1 max-w-[180px]">{item.name}</span>
              </div>
              <span className="font-semibold text-slate-800">{formatRupiah(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>

        {/* Metode Pembayaran */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 space-y-2">
          <h3 className="text-xs font-bold text-slate-900 mb-2">Pilih Pembayaran</h3>
          
          <PaymentOption 
            id="qris" 
            title="QRIS (Instant Settlement)" 
            subtitle="Scan BCA, GoPay, OVO, ShopeePay"
            selected={selectedPayment === 'qris'}
            onClick={() => setSelectedPayment('qris')}
          />
          <PaymentOption 
            id="va" 
            title="Virtual Account Bank" 
            subtitle="BCA, Mandiri, BRI, BNI"
            selected={selectedPayment === 'va'}
            onClick={() => setSelectedPayment('va')}
          />
          <PaymentOption 
            id="cod" 
            title="Bayar di Tempat (COD)" 
            subtitle="Bayar tunai saat kurir sampai"
            selected={selectedPayment === 'cod'}
            onClick={() => setSelectedPayment('cod')}
          />
        </div>

        {/* Detail Pembayaran */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-500">
            <span>Subtotal Produk</span>
            <span>{formatRupiah(cartTotal)}</span>
          </div>
          <div className="flex justify-between text-slate-500">
            <span>Biaya Pengiriman</span>
            <span>{formatRupiah(shippingFee)}</span>
          </div>
          <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-2 border-t border-slate-100">
            <span>Total Pembayaran</span>
            <span className="text-indigo-600">{formatRupiah(grandTotal)}</span>
          </div>
        </div>
      </div>

      {/* Floating Checkout Action */}
      <div className="w-full bg-white border-t border-slate-100 p-3 z-30 flex-shrink-0">
        <button 
          onClick={onSuccess}
          className="w-full bg-indigo-600 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all flex justify-center items-center gap-2"
        >
          Bayar Sekarang ({formatRupiah(grandTotal)})
        </button>
      </div>
    </div>
  );
}

function PaymentOption({ id, title, subtitle, selected, onClick }) {
  return (
    <div 
      onClick={onClick}
      className={`p-3 rounded-xl border flex items-start justify-between cursor-pointer transition-all ${
        selected ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-100 bg-slate-50/50'
      }`}
    >
      <div className="space-y-0.5">
        <h4 className="text-xs font-bold text-slate-800">{title}</h4>
        <p className="text-[10px] text-slate-400">{subtitle}</p>
      </div>
      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
        selected ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
      }`}>
        {selected && <Check className="w-2.5 h-2.5 text-white" />}
      </div>
    </div>
  );
}

// 8. ORDER SUCCESS VIEW
function OrderSuccessView({ onDone }) {
  return (
    <div className="h-full bg-white p-6 flex flex-col justify-between items-center text-center">
      <div className="my-auto space-y-4">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-100">
          <Check className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Pesanan Berhasil!</h2>
          <p className="text-xs text-slate-500 max-w-[240px] mx-auto">
            Pembayaran Anda telah diterima. Kami sedang menyiapkan pesanan Anda.
          </p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
          <p className="font-semibold text-slate-800">No. Pesanan: #NEX-889021</p>
          <p className="text-[11px] text-slate-400">Estimasi Tiba: 2 - 3 Hari Kerja</p>
        </div>
      </div>

      <button 
        onClick={onDone}
        className="w-full bg-indigo-600 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
}
