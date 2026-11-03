import React, { Component, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft, ArrowRight, BadgeCheck, Check, CheckCircle2, ChevronRight, ClipboardList,
  Clock3, Heart, Home, Mail, MapPin, Moon, Package, Plus, Minus, Search, Settings,
  ShieldCheck, ShoppingBag, ShoppingCart, Star, Sun, Tag, Trash2, Truck, UserRound, X,
  LoaderCircle, Instagram, Facebook
} from "lucide-react";

// ============================================================================
// 01. IMPORTS — React, React DOM, and Lucide icons.
// ============================================================================

// ============================================================================
// 02. APP CONFIGURATION — Change this object to rebrand the template.
// ============================================================================

const APP_CONFIG = {
  name: "ASRI Collection",
  tagline: "Tampil Elegan, Setiap Hari",
  description: "Pilihan fashion dan kebutuhan harian dengan gaya yang elegan.",
  locale: "id-ID",
  currency: "IDR",
  contactEmail: "hello@example.com",
  contactPhone: "+62 812 0000 0000",
  shipping: { flatRate: 52000 },
  features: { search: true, categories: true, wishlist: true, reviews: true, coupons: true, darkMode: true, guestCheckout: true, tracking: true, returns: true },
  integrations: { mode: "demo", supabaseEnabled: false, paymentEnabled: false, shippingEnabled: false },
  storagePrefix: "asri-ecommerce-v1",
};

// ============================================================================
// 03. CONSTANTS AND ENUMS
// ============================================================================

const CATEGORIES = [
  { id: "all", name: "Semua Produk" },
  { id: "fashion", name: "Fashion" },
  { id: "bags", name: "Tas" },
  { id: "shoes", name: "Sepatu" },
  { id: "accessories", name: "Aksesori" },
  { id: "beauty", name: "Kecantikan" },
];
const SORT_OPTIONS = [
  { value: "featured", label: "Rekomendasi" },
  { value: "newest", label: "Terbaru" },
  { value: "price-low", label: "Harga terendah" },
  { value: "price-high", label: "Harga tertinggi" },
  { value: "rating", label: "Rating tertinggi" },
];
const PAYMENT_METHODS = [
  { id: "qris", label: "QRIS", detail: "Simulasi pembayaran QRIS" },
  { id: "va", label: "Virtual Account", detail: "Simulasi transfer bank" },
  { id: "retail", label: "Gerai Retail", detail: "Simulasi pembayaran retail" },
];
const ORDER_STATUS = { PENDING: "pending", PROCESSING: "processing", SHIPPED: "shipped", COMPLETED: "completed", CANCELLED: "cancelled" };
const PAYMENT_STATUS = { PENDING: "pending", PAID: "paid", FAILED: "failed", EXPIRED: "expired", REFUNDED: "refunded" };

// ============================================================================
// 04. DESIGN TOKENS
// ============================================================================

const DESIGN_TOKENS = {
  primary: "#16803D",
  accent: "#F15A24",
  contentMax: "1180px",
  radius: "18px",
};

// ============================================================================
// 05. GLOBAL CSS — All styling stays in App.jsx; no external stylesheet.
// ============================================================================

const GLOBAL_CSS = [
":root{font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;color:#17211b;background:#f7f9f7;font-synthesis:none;text-rendering:optimizeLegibility;--primary:#16803d;--accent:#f15a24;--ink:#17211b;--muted:#68736b;--border:#e7ece8;--surface:#fff;--canvas:#f7f9f7;--shadow:0 12px 35px rgba(20,45,28,.08}",
"*,*:before,*:after{box-sizing:border-box}html,body,#root{margin:0;min-height:100%;width:100%}body{min-width:320px;background:var(--canvas)}button,input,select,textarea{font:inherit}button{cursor:pointer}button:disabled{cursor:not-allowed;opacity:.5}img{display:block;max-width:100%}a{color:inherit;text-decoration:none}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:3px solid #16803d44;outline-offset:2px}",
".app{min-height:100vh;background:var(--canvas);color:var(--ink)}.app[data-theme=dark]{--ink:#edf4ef;--muted:#a8b5ac;--border:#2a3b30;--surface:#17231b;--canvas:#101912;--shadow:0 12px 35px #0004}.app[data-theme=dark] .header,.app[data-theme=dark] .footer,.app[data-theme=dark] .card,.app[data-theme=dark] .panel,.app[data-theme=dark] .mobile-nav{background:var(--surface)}",
".container{width:min(100% - 36px,var(--content-max,1180px));margin:auto}.header{position:sticky;top:0;z-index:30;background:#ffffffef;backdrop-filter:blur(16px);border-bottom:1px solid var(--border)}.header-main{height:72px;display:flex;align-items:center;gap:22px}.brand{display:flex;align-items:center;gap:9px;border:0;background:none;color:var(--ink);font-weight:900;font-size:18px;white-space:nowrap}.brand-mark{width:36px;height:36px;border-radius:12px;background:var(--primary);color:white;display:grid;place-items:center}.brand em{font-style:normal;color:var(--primary)}.search{position:relative;flex:1;max-width:440px}.search svg{position:absolute;left:13px;top:13px;color:var(--muted)}.search input{width:100%;height:42px;border:1px solid var(--border);border-radius:12px;background:var(--canvas);color:var(--ink);padding:0 12px 0 40px}.header-actions{margin-left:auto;display:flex;gap:8px}.icon-btn{position:relative;width:40px;height:40px;border:1px solid var(--border);border-radius:12px;background:var(--surface);color:var(--ink);display:grid;place-items:center}.count{position:absolute;right:-5px;top:-5px;background:var(--accent);color:white;border-radius:20px;min-width:18px;height:18px;padding:0 4px;font-size:10px;display:grid;place-items:center}.nav{border-top:1px solid var(--border)}.nav-inner{height:42px;display:flex;align-items:center;gap:25px}.nav button,.link-btn{border:0;background:none;color:var(--muted);font-size:12px;font-weight:750;padding:8px 0}.nav button.active,.nav button:hover,.link-btn{color:var(--primary)}",
".btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;border:1px solid transparent;border-radius:11px;padding:11px 15px;font-size:12px;font-weight:800;transition:.18s}.btn-primary{background:var(--primary);color:#fff}.btn-primary:hover{background:#11652f}.btn-secondary{background:var(--surface);border-color:var(--border);color:var(--ink)}.btn-soft{background:#16803d12;color:var(--primary)}.btn-danger{background:#fff0ed;color:#bd3b28}.btn-sm{padding:8px 10px;font-size:11px}.btn-block{width:100%}",
".page{padding:30px 0 70px;min-height:58vh}.heading{display:flex;align-items:end;justify-content:space-between;gap:16px;margin-bottom:22px}.eyebrow{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;font-weight:900;color:var(--primary)}h1{font-size:clamp(27px,4vw,42px);letter-spacing:-1.5px;line-height:1.1;margin:8px 0}h2{font-size:23px;letter-spacing:-.7px;margin:0 0 8px}h3{font-size:15px;margin:0 0 10px}p{margin:0 0 10px}.muted{color:var(--muted)}.small{font-size:12px}.tiny{font-size:10px}.section{margin-top:42px}.section-head{display:flex;align-items:end;justify-content:space-between;gap:12px;margin-bottom:16px}.section-head p{font-size:12px;color:var(--muted);margin:0}",
".hero{position:relative;overflow:hidden;min-height:320px;border-radius:24px;background:linear-gradient(120deg,#123f28,#16803d 65%,#68a77a);color:white;padding:42px;display:flex;align-items:center}.hero-copy{position:relative;z-index:1;max-width:520px}.hero .eyebrow{color:#c9f1d5}.hero p{color:#ffffffd4;line-height:1.7;font-size:13px;max-width:410px}.hero-art{position:absolute;right:5%;bottom:-15px;width:34%;height:90%;border-radius:45% 45% 10px 10px;background:#ffffff20;display:grid;place-items:center;color:#ffffffaa}.hero-art svg{width:45%;height:45%}.hero-actions{display:flex;gap:9px;margin-top:20px;flex-wrap:wrap}.hero .btn-secondary{background:white;color:var(--primary)}",
".category-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:11px}.category{border:1px solid var(--border);background:var(--surface);color:var(--ink);border-radius:15px;padding:15px 8px;display:grid;justify-items:center;gap:8px}.category:hover{border-color:var(--primary);background:#16803d0b}.category-icon{width:40px;height:40px;border-radius:13px;background:#16803d12;color:var(--primary);display:grid;place-items:center}.category strong{font-size:11px}",
".grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.product{min-width:0;overflow:hidden;border:1px solid var(--border);border-radius:17px;background:var(--surface);transition:.2s}.product:hover{transform:translateY(-3px);box-shadow:var(--shadow)}.product-image{position:relative;aspect-ratio:1;background:#edf1ed}.product-image img{width:100%;height:100%;object-fit:cover}.sale{position:absolute;top:9px;left:9px;background:var(--accent);color:white;padding:5px 7px;border-radius:6px;font-size:10px;font-weight:900}.wish-btn{position:absolute;right:9px;top:9px;width:33px;height:33px;border:0;border-radius:50%;background:#fffffff0;color:#58645b;display:grid;place-items:center}.wish-btn.active{color:#e34d65}.product-body{padding:12px}.product-category{font-size:9px;text-transform:uppercase;letter-spacing:.8px;color:var(--muted);font-weight:800}.product-name{display:block;text-align:left;border:0;background:none;color:var(--ink);font-size:12px;font-weight:800;line-height:1.45;min-height:36px;padding:5px 0}.price{font-size:13px;color:var(--primary);font-weight:900}.old-price{font-size:10px;color:var(--muted);text-decoration:line-through;margin-left:6px;font-weight:500}.meta{display:flex;justify-content:space-between;gap:5px;color:var(--muted);font-size:9px;margin-top:8px}.rating{display:inline-flex;align-items:center;gap:3px;color:#b7791f}.product-actions{display:flex;gap:6px;margin-top:10px}.product-actions .btn{flex:1}",
".toolbar{display:flex;gap:9px;flex-wrap:wrap;margin:18px 0}.field,.select,.textarea{width:100%;border:1px solid var(--border);border-radius:10px;padding:11px 12px;background:var(--surface);color:var(--ink);font-size:12px}.toolbar .field{max-width:320px}.toolbar .select{width:auto;min-width:155px}.field-wrap{display:grid;gap:6px}.label{font-size:11px;font-weight:800}.error{font-size:10px;color:#bd3b28}.card,.panel{background:var(--surface);border:1px solid var(--border);border-radius:17px;padding:19px}.row{display:flex;align-items:center;gap:10px}.between{display:flex;align-items:center;justify-content:space-between;gap:12px}.stack{display:grid;gap:13px}.divider{height:1px;background:var(--border);margin:13px 0}.empty{text-align:center;padding:48px 18px;border:1px dashed var(--border);border-radius:17px;background:var(--surface)}.empty-icon{width:54px;height:54px;margin:0 auto 13px;border-radius:17px;background:#16803d12;color:var(--primary);display:grid;place-items:center}.empty p{max-width:360px;margin:0 auto 15px;color:var(--muted);font-size:12px;line-height:1.6}",
".detail-grid,.cart-grid,.checkout-grid{display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:start}.detail-photo{width:100%;aspect-ratio:1;object-fit:cover;border-radius:20px;background:#edf1ed}.thumbs,.options{display:flex;gap:8px;flex-wrap:wrap;margin-top:9px}.thumb{width:62px;height:62px;border:2px solid transparent;border-radius:10px;overflow:hidden;padding:0;background:none}.thumb.active{border-color:var(--primary)}.thumb img{width:100%;height:100%;object-fit:cover}.option{border:1px solid var(--border);border-radius:9px;padding:8px 12px;background:var(--surface);color:var(--ink);font-size:11px}.option.active{border-color:var(--primary);color:var(--primary);background:#16803d0c}.detail-price{font-size:25px;color:var(--primary);font-weight:950;margin:12px 0}.detail-actions{display:flex;gap:8px;margin-top:20px}.detail-actions .btn{flex:1}.tabs{display:flex;gap:20px;border-bottom:1px solid var(--border);margin:26px 0 16px}.tab{border:0;border-bottom:2px solid transparent;background:none;color:var(--muted);padding:10px 0;font-size:12px;font-weight:800}.tab.active{border-color:var(--primary);color:var(--primary)}",
".quantity{display:inline-flex;align-items:center;gap:12px;border:1px solid var(--border);border-radius:10px;padding:7px 9px}.quantity button{border:0;background:none;color:var(--ink);display:grid;place-items:center}.cart-line{display:grid;grid-template-columns:76px 1fr auto;align-items:center;gap:12px;padding:13px 0;border-bottom:1px solid var(--border)}.cart-line img{width:76px;height:76px;object-fit:cover;border-radius:11px}.summary-line{display:flex;justify-content:space-between;gap:12px;margin:12px 0;color:var(--muted);font-size:12px}.summary-total{border-top:1px solid var(--border);padding-top:13px;color:var(--ink);font-size:16px;font-weight:900}.sticky{position:sticky;top:130px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.full{grid-column:1/-1}.radio{display:flex;align-items:start;gap:10px;border:1px solid var(--border);border-radius:11px;padding:12px;margin:8px 0}.radio.selected{border-color:var(--primary);background:#16803d0b}",
".badge{display:inline-flex;border-radius:30px;padding:5px 9px;background:#fff3d9;color:#98620a;font-size:9px;font-weight:900;text-transform:uppercase}.badge.success{background:#e6f6eb;color:#16733a}.badge.info{background:#e9f1ff;color:#285ea8}.badge.danger{background:#ffeded;color:#b53b3b}.order-card{display:flex;align-items:center;justify-content:space-between;gap:14px}.timeline{border-left:2px solid var(--border);margin:17px 0 0 8px;padding-left:19px}.timeline-item{position:relative;padding:0 0 22px}.timeline-item:before{content:'';position:absolute;left:-26px;top:2px;width:10px;height:10px;border-radius:50%;background:var(--primary);box-shadow:0 0 0 4px #16803d20}",
".footer{background:#14271b;color:#e9f1eb;margin-top:42px;padding:35px 0 20px}.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:25px}.footer p,.footer a{color:#b9c9bd;font-size:11px;line-height:1.8}.footer-bottom{border-top:1px solid #ffffff26;margin-top:22px;padding-top:15px;color:#b9c9bd;font-size:10px}.mobile-nav{display:none}.toast{position:fixed;right:18px;bottom:20px;z-index:100;background:#172a1e;color:white;padding:12px 16px;border-radius:12px;box-shadow:var(--shadow);display:flex;align-items:center;gap:8px;font-size:12px}.modal-backdrop{position:fixed;inset:0;z-index:90;background:#09140c88;display:grid;place-items:center;padding:16px}.modal{width:min(460px,100%);background:var(--surface);border-radius:18px;padding:22px;color:var(--ink)}",
"@media(max-width:900px){.grid{grid-template-columns:repeat(3,minmax(0,1fr))}.category-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}",
"@media(max-width:767px){.container{width:min(100% - 28px,620px)}.header-main{height:62px;gap:8px}.brand{font-size:15px}.brand-mark{width:33px;height:33px}.search{display:none}.nav{display:none}.page{padding:22px 0 88px}.hero{min-height:300px;padding:25px 20px;border-radius:19px}.hero-copy{max-width:78%}.hero-art{right:-10%;width:43%;opacity:.5}.hero h1{font-size:30px}.grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.product-body{padding:9px}.product-name{font-size:11px;min-height:34px}.price{font-size:11px}.product-actions .btn{padding:7px 5px;font-size:10px}.category-grid{grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}.category{padding:11px 4px}.category strong{font-size:10px}.heading{align-items:start;flex-direction:column}.detail-grid,.cart-grid,.checkout-grid{grid-template-columns:1fr;gap:16px}.sticky{position:static}.cart-line{grid-template-columns:60px 1fr auto;gap:8px}.cart-line img{width:60px;height:60px}.form-grid{grid-template-columns:1fr}.full{grid-column:auto}.footer-grid{grid-template-columns:1fr 1fr}.footer-grid>div:first-child{grid-column:1/-1}.mobile-nav{display:flex;position:fixed;bottom:0;left:0;right:0;z-index:35;height:65px;padding-bottom:env(safe-area-inset-bottom);background:var(--surface);border-top:1px solid var(--border);justify-content:space-around;align-items:center}.mobile-nav button{border:0;background:none;color:var(--muted);display:grid;justify-items:center;gap:3px;font-size:9px;min-width:52px}.mobile-nav button.active{color:var(--primary);font-weight:900}.toast{left:12px;right:12px;bottom:76px;justify-content:center}.section{margin-top:30px}}",
"@media(prefers-reduced-motion:reduce){*,*:before,*:after{scroll-behavior:auto!important;animation-duration:.01ms!important;transition-duration:.01ms!important}}",
].join("\n");

// ============================================================================
// 06. MOCK DATA / DATA SOURCE
// Demo products are replaceable through backendAdapter.getProducts().
// ============================================================================

const MOCK_PRODUCTS = [
  { id:"p-001", slug:"outer-linen-sage", name:"Outer Linen Sage", categoryId:"fashion", price:289000, compareAtPrice:359000, rating:4.9, reviewCount:28, sold:84, stock:18, availability:"available", isNew:true, image:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85", images:["https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85"], description:"Outer ringan dengan siluet bersih untuk tampilan kasual yang rapi dan nyaman digunakan sepanjang hari.", sizes:["S","M","L","XL"], colors:[{name:"Sage",hex:"#9aa98c"},{name:"Cream",hex:"#e8ddc9"}], specifications:[{label:"Material",value:"Linen blend"},{label:"Fit",value:"Relaxed fit"}] },
  { id:"p-002", slug:"everyday-tote-bag", name:"Everyday Tote Bag", categoryId:"bags", price:199000, compareAtPrice:249000, rating:4.8, reviewCount:42, sold:130, stock:25, availability:"available", isNew:true, image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85", images:["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85"], description:"Tote bag serbaguna dengan ruang penyimpanan praktis dan desain minimalis.", sizes:["One Size"], colors:[{name:"Natural",hex:"#c6aa83"},{name:"Black",hex:"#242424"}], specifications:[{label:"Material",value:"Canvas premium"},{label:"Ukuran",value:"35 × 38 cm"}] },
  { id:"p-003", slug:"classic-white-sneakers", name:"Classic White Sneakers", categoryId:"shoes", price:429000, compareAtPrice:null, rating:4.7, reviewCount:19, sold:61, stock:12, availability:"available", isNew:false, image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85", images:["https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85"], description:"Sneakers ringan untuk aktivitas harian dengan bantalan yang nyaman.", sizes:["38","39","40","41","42","43"], colors:[{name:"White",hex:"#f2f2f2"}], specifications:[{label:"Upper",value:"Synthetic leather"},{label:"Sole",value:"Rubber"}] },
  { id:"p-004", slug:"minimalist-watch", name:"Minimalist Watch", categoryId:"accessories", price:549000, compareAtPrice:649000, rating:4.9, reviewCount:36, sold:92, stock:9, availability:"available", isNew:false, image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85", images:["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85"], description:"Jam tangan minimalis dengan tampilan elegan dan mudah dipadukan.", sizes:["One Size"], colors:[{name:"Silver",hex:"#b9bec2"},{name:"Gold",hex:"#c4a36a"}], specifications:[{label:"Strap",value:"Stainless steel"}] },
  { id:"p-005", slug:"daily-care-serum", name:"Daily Care Serum", categoryId:"beauty", price:129000, compareAtPrice:159000, rating:4.8, reviewCount:57, sold:205, stock:0, availability:"coming_soon", isNew:true, image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85", images:["https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85"], description:"Serum perawatan harian dengan tekstur ringan. Produk contoh untuk katalog demo.", sizes:["30 ml"], colors:[{name:"Original",hex:"#d8c4aa"}], specifications:[{label:"Isi",value:"30 ml"}] },
  { id:"p-006", slug:"soft-knit-cardigan", name:"Soft Knit Cardigan", categoryId:"fashion", price:319000, compareAtPrice:null, rating:4.6, reviewCount:14, sold:38, stock:15, availability:"available", isNew:false, image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85", images:["https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85"], description:"Cardigan rajut lembut untuk layering yang nyaman dan timeless.", sizes:["S","M","L"], colors:[{name:"Oat",hex:"#c9bba5"},{name:"Charcoal",hex:"#454545"}], specifications:[{label:"Material",value:"Cotton knit blend"}] },
  { id:"p-007", slug:"structured-shoulder-bag", name:"Structured Shoulder Bag", categoryId:"bags", price:379000, compareAtPrice:449000, rating:4.9, reviewCount:23, sold:70, stock:7, availability:"available", isNew:true, image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85", images:["https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85"], description:"Tas bahu dengan bentuk terstruktur dan ruang utama yang praktis.", sizes:["One Size"], colors:[{name:"Tan",hex:"#a56e45"},{name:"Black",hex:"#222222"}], specifications:[{label:"Material",value:"Vegan leather"}] },
  { id:"p-008", slug:"everyday-sandals", name:"Everyday Sandals", categoryId:"shoes", price:189000, compareAtPrice:null, rating:4.5, reviewCount:11, sold:26, stock:20, availability:"available", isNew:false, image:"https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=900&q=85", images:["https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=900&q=85"], description:"Sandal kasual dengan desain sederhana untuk penggunaan sehari-hari.", sizes:["36","37","38","39","40"], colors:[{name:"Sand",hex:"#c9aa7a"}], specifications:[{label:"Material",value:"Synthetic upper"}] },
];

// ============================================================================
// 07. UTILITY FUNCTIONS
// ============================================================================

function money(value) {
  return new Intl.NumberFormat(APP_CONFIG.locale,{style:"currency",currency:APP_CONFIG.currency,maximumFractionDigits:0}).format(Number(value)||0);
}
function dateLabel(value) {
  return value ? new Intl.DateTimeFormat(APP_CONFIG.locale,{day:"numeric",month:"long",year:"numeric"}).format(new Date(value)) : "Belum tersedia";
}
function orderCode() { return "ASR-" + Date.now().toString(36).toUpperCase(); }
function categoryLabel(id) { return (CATEGORIES.find((item)=>item.id===id)||{}).name || "Lainnya"; }
function discountPercent(product) { return product.compareAtPrice>product.price ? Math.round((1-product.price/product.compareAtPrice)*100) : 0; }
function calculateTotals(items, shipping, discount) {
  const subtotal=items.reduce((sum,item)=>sum+item.price*item.quantity,0);
  const safeDiscount=Math.min(Math.max(0,discount||0),subtotal);
  return {subtotal,shipping,discount:safeDiscount,total:Math.max(0,subtotal+shipping-safeDiscount)};
}

// ============================================================================
// 08. VALIDATION AND FORMATTING
// ============================================================================

function validateCustomer(data) {
  const errors={};
  if(!data.name.trim()) errors.name="Nama penerima wajib diisi.";
  if(!/^[0-9+\-\s]{8,18}$/.test(data.phone.trim())) errors.phone="Nomor telepon tidak valid.";
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) errors.email="Email tidak valid.";
  if(!data.address.trim()) errors.address="Alamat wajib diisi.";
  if(!data.city.trim()) errors.city="Kota wajib diisi.";
  if(!/^[0-9]{5}$/.test(data.postalCode.trim())) errors.postalCode="Kode pos harus 5 digit.";
  return errors;
}

// ============================================================================
// 09. STORAGE MANAGEMENT
// ============================================================================

function storageKey(key){return APP_CONFIG.storagePrefix+":"+key;}
function readStorage(key,fallback){try{const raw=window.localStorage.getItem(storageKey(key));return raw?JSON.parse(raw):fallback;}catch{return fallback;}}
function writeStorage(key,value){try{window.localStorage.setItem(storageKey(key),JSON.stringify(value));}catch{/* Storage may be unavailable. */}}

// ============================================================================
// 10. APPLICATION STATE MANAGEMENT
// ============================================================================

function usePersistentState(key,initialValue){
  const [value,setValue]=useState(()=>readStorage(key,initialValue));
  useEffect(()=>{writeStorage(key,value);},[key,value]);
  return [value,setValue];
}
function useRoute(){
  const [path,setPath]=useState(()=>window.location.pathname+window.location.search);
  useEffect(()=>{const pop=()=>setPath(window.location.pathname+window.location.search);window.addEventListener("popstate",pop);return()=>window.removeEventListener("popstate",pop);},[]);
  const navigate=useCallback((next)=>{if(!next)return;window.history.pushState({}, "", next);setPath(next);window.scrollTo({top:0,behavior:"smooth"});},[]);
  return {path,navigate};
}

// ============================================================================
// 11. PRODUCT BUSINESS LOGIC
// ============================================================================

function filterProducts(products,filters){
  const q=filters.query.trim().toLowerCase();
  let result=products.filter((p)=>(!q||(p.name+" "+p.description).toLowerCase().includes(q))&&(filters.category==="all"||p.categoryId===filters.category)&&p.price>=filters.minPrice&&p.price<=filters.maxPrice);
  if(filters.sort==="price-low")result=[...result].sort((a,b)=>a.price-b.price);
  if(filters.sort==="price-high")result=[...result].sort((a,b)=>b.price-a.price);
  if(filters.sort==="rating")result=[...result].sort((a,b)=>b.rating-a.rating);
  if(filters.sort==="newest")result=[...result].sort((a,b)=>Number(b.isNew)-Number(a.isNew));
  return result;
}

// ============================================================================
// 12. CART BUSINESS LOGIC
// ============================================================================

function addCartItem(current,product,variant){
  if(!product||product.stock<1||product.availability!=="available")return current;
  const key=[product.id,variant.size,variant.color].join("|");
  const found=current.find((item)=>item.key===key);
  if(found)return current.map((item)=>item.key===key?{...item,quantity:Math.min(item.quantity+variant.quantity,product.stock)}:item);
  return [...current,{key,productId:product.id,slug:product.slug,name:product.name,image:product.image,price:product.price,stock:product.stock,size:variant.size,color:variant.color,quantity:Math.min(variant.quantity,product.stock)}];
}
function changeCartQuantity(current,key,quantity){
  if(quantity<=0)return current.filter((item)=>item.key!==key);
  return current.map((item)=>item.key===key?{...item,quantity:Math.min(quantity,item.stock)}:item);
}

// ============================================================================
// 13. WISHLIST BUSINESS LOGIC
// ============================================================================

function toggleWishlist(current,id){return current.includes(id)?current.filter((item)=>item!==id):[...current,id];}

// ============================================================================
// 14. PRICING AND PROMOTION LOGIC
// ============================================================================

function couponDiscount(code,subtotal){return code.trim().toUpperCase()==="ASRI10"&&subtotal>=200000?Math.min(Math.round(subtotal*.1),50000):0;}

// ============================================================================
// 15. CHECKOUT AND ORDER LOGIC
// ============================================================================

function makeDemoOrder(cart,customer,method,coupon){
  const subtotal=cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
  const totals=calculateTotals(cart,APP_CONFIG.shipping.flatRate,couponDiscount(coupon,subtotal));
  return {id:orderCode(),createdAt:new Date().toISOString(),customer:{...customer},items:cart.map((item)=>({...item})),totals,shippingMethod:"regular",payment:{provider:"demo",method,status:PAYMENT_STATUS.PENDING},status:ORDER_STATUS.PENDING,demo:true};
}

// ============================================================================
// 16. BACKEND ADAPTER — Demo adapter; replace with Supabase client calls later.
// ============================================================================

const backendAdapter={
  mode:APP_CONFIG.integrations.mode,
  async getProducts(){return MOCK_PRODUCTS;},
  async createOrder(order){return order;},
};

// ============================================================================
// 17. PAYMENT ADAPTER — No real invoice or payment is created in demo mode.
// ============================================================================

const paymentAdapter={
  enabled:APP_CONFIG.integrations.paymentEnabled,
  async createInvoice(){throw new Error("Payment gateway belum dikonfigurasi.");},
};

// ============================================================================
// 18. SHIPPING ADAPTER — Shipping rate is centralized in APP_CONFIG.
// ============================================================================

const shippingAdapter={async quote(){return APP_CONFIG.shipping.flatRate;}};

// ============================================================================
// 19. NOTIFICATION SYSTEM
// ============================================================================

const NotifyContext=createContext(()=>{});
function useNotify(){return useContext(NotifyContext);}

// ============================================================================
// 20. NAVIGATION AND ROUTING
// ============================================================================

function resolveRoute(path){
  const pathname=path.split("?")[0];
  let match=pathname.match(/^\/product\/([^/]+)$/);if(match)return{name:"product",slug:match[1]};
  match=pathname.match(/^\/orders\/([^/]+)\/tracking$/);if(match)return{name:"tracking",id:match[1]};
  match=pathname.match(/^\/orders\/([^/]+)$/);if(match)return{name:"order-detail",id:match[1]};
  const map={"/":"home","/shop":"shop","/categories":"categories","/search":"search","/cart":"cart","/wishlist":"wishlist","/checkout":"checkout","/payment/result":"payment-result","/orders":"orders","/profile":"profile","/addresses":"addresses","/settings":"settings","/returns":"returns"};
  return{name:map[pathname]||"not-found"};
}

// ============================================================================
// 21. PRIMITIVE UI COMPONENTS
// ============================================================================

function Button({children,variant="primary",size="",block=false,...props}){return <button className={"btn btn-"+variant+(size?" btn-"+size:"")+(block?" btn-block":"")} {...props}>{children}</button>;}
function IconButton({children,label,...props}){return <button className="icon-btn" aria-label={label} title={label} {...props}>{children}</button>;}
function Badge({children,tone=""}){return <span className={"badge"+(tone?" "+tone:"")}>{children}</span>;}
function Heading({eyebrow,title,description,action}){return <div className="heading"><div>{eyebrow&&<div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description&&<p className="muted small">{description}</p>}</div>{action}</div>;}
function Empty({icon,title,description,action}){return <div className="empty"><div className="empty-icon">{icon||<Package size={24}/>}</div><h3>{title}</h3><p>{description}</p>{action}</div>;}
function Field({label,error,className="",...props}){return <label className={"field-wrap "+className}><span className="label">{label}</span><input className="field" {...props}/>{error&&<span className="error">{error}</span>}</label>;}

// ============================================================================
// 22. FEEDBACK COMPONENTS
// ============================================================================

function Toast({message}){return message?<div className="toast" role="status"><CheckCircle2 size={17}/>{message}</div>:null;}
class AppErrorBoundary extends Component{
  constructor(props){super(props);this.state={failed:false};}
  static getDerivedStateFromError(){return{failed:true};}
  componentDidCatch(error){console.error("App render error:",error);}
  render(){return this.state.failed?<div className="container page"><Empty title="Terjadi kesalahan" description="Muat ulang aplikasi untuk mencoba kembali." action={<Button onClick={()=>window.location.reload()}>Muat ulang</Button>}/></div>:this.props.children;}
}

// ============================================================================
// 23. LAYOUT COMPONENTS
// ============================================================================

function Brand({navigate}){return <button className="brand" onClick={()=>navigate("/")}><span className="brand-mark"><ShoppingBag size={18}/></span><span>{APP_CONFIG.name}</span></button>;}
function Header({navigate,cartCount,wishlistCount,searchQuery,setSearchQuery,route}){
  const submit=(e)=>{e.preventDefault();navigate("/search?q="+encodeURIComponent(searchQuery));};
  const links=[["Beranda","/","home"],["Belanja","/shop","shop"],["Kategori","/categories","categories"],["Pesanan","/orders","orders"]];
  return <header className="header"><div className="container header-main"><Brand navigate={navigate}/><form className="search" onSubmit={submit}><Search size={16}/><input aria-label="Cari produk" placeholder="Cari produk..." value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/></form><div className="header-actions"><IconButton label="Wishlist" onClick={()=>navigate("/wishlist")}><Heart size={18}/>{wishlistCount>0&&<span className="count">{wishlistCount}</span>}</IconButton><IconButton label="Keranjang" onClick={()=>navigate("/cart")}><ShoppingCart size={18}/>{cartCount>0&&<span className="count">{cartCount}</span>}</IconButton><IconButton label="Profil" onClick={()=>navigate("/profile")}><UserRound size={18}/></IconButton></div></div><div className="nav"><div className="container nav-inner">{links.map(([label,path,name])=><button key={path} className={route.name===name?"active":""} onClick={()=>navigate(path)}>{label}</button>)}</div></div></header>;
}
function MobileNav({navigate,route}){
  const items=[["Home","/",<Home size={18}/>,"home"],["Belanja","/shop",<Search size={18}/>,"shop"],["Favorit","/wishlist",<Heart size={18}/>,"wishlist"],["Pesanan","/orders",<ClipboardList size={18}/>,"orders"],["Akun","/profile",<UserRound size={18}/>,"profile"]];
  return <nav className="mobile-nav">{items.map(([label,path,icon,name])=><button key={path} className={route.name===name?"active":""} onClick={()=>navigate(path)}>{icon}<span>{label}</span></button>)}</nav>;
}
function Footer({navigate}){return <footer className="footer"><div className="container"><div className="footer-grid"><div><Brand navigate={navigate}/><p>{APP_CONFIG.tagline}. {APP_CONFIG.description}</p><p className="row"><Mail size={13}/>{APP_CONFIG.contactEmail}</p><p className="row"><Instagram size={13}/><Facebook size={13}/></p></div><div><strong>Belanja</strong><p><a href="/shop" onClick={(e)=>{e.preventDefault();navigate("/shop");}}>Semua produk</a></p><p><a href="/categories" onClick={(e)=>{e.preventDefault();navigate("/categories");}}>Kategori</a></p><p><a href="/wishlist" onClick={(e)=>{e.preventDefault();navigate("/wishlist");}}>Wishlist</a></p></div><div><strong>Bantuan</strong><p><a href="/orders" onClick={(e)=>{e.preventDefault();navigate("/orders");}}>Pesanan</a></p><p><a href="/returns" onClick={(e)=>{e.preventDefault();navigate("/returns");}}>Pengembalian</a></p><p><a href="/profile" onClick={(e)=>{e.preventDefault();navigate("/profile");}}>Kontak</a></p></div></div><div className="footer-bottom">© {new Date().getFullYear()} {APP_CONFIG.name}. E-commerce template demo.</div></div></footer>;}

// ============================================================================
// 24. PRODUCT COMPONENTS
// ============================================================================

function ProductCard({product,wishlisted,onOpen,onWish,onAdd}){
  const discount=discountPercent(product);
  return <article className="product"><div className="product-image"><button style={{border:0,padding:0,background:"none",width:"100%",height:"100%"}} onClick={onOpen} aria-label={"Lihat "+product.name}><img src={product.image} alt={product.name} loading="lazy"/></button>{discount>0&&<span className="sale">-{discount}%</span>}<button className={"wish-btn"+(wishlisted?" active":"")} onClick={onWish} aria-label="Wishlist"><Heart size={16} fill={wishlisted?"currentColor":"none"}/></button></div><div className="product-body"><div className="product-category">{categoryLabel(product.categoryId)}</div><button className="product-name" onClick={onOpen}>{product.name}</button><div><span className="price">{money(product.price)}</span>{product.compareAtPrice&&<span className="old-price">{money(product.compareAtPrice)}</span>}</div><div className="meta"><span className="rating"><Star size={11} fill="currentColor"/>{product.rating} ({product.reviewCount})</span><span>{product.stock>0?"Stok "+product.stock:"Segera hadir"}</span></div><div className="product-actions"><Button size="sm" variant="soft" onClick={onOpen}>Detail</Button><Button size="sm" onClick={onAdd} disabled={product.stock<=0||product.availability!=="available"}><ShoppingBag size={12}/>Tambah</Button></div></div></article>;
}
function ProductGrid({products,wishlist,onOpen,onWish,onAdd}){return products.length?<div className="grid">{products.map((p)=><ProductCard key={p.id} product={p} wishlisted={wishlist.includes(p.id)} onOpen={()=>onOpen(p)} onWish={()=>onWish(p.id)} onAdd={()=>onAdd(p)}/>)}</div>:<Empty icon={<Search size={24}/>} title="Produk tidak ditemukan" description="Ubah kata kunci atau filter pencarian."/>;}
function Quantity({value,onChange,max=99}){return <div className="quantity"><button disabled={value<=1} onClick={()=>onChange(Math.max(1,value-1))}><Minus size={13}/></button><strong className="small">{value}</strong><button disabled={value>=max} onClick={()=>onChange(Math.min(max,value+1))}><Plus size={13}/></button></div>;}
function CartLine({item,onChange,onRemove}){return <div className="cart-line"><img src={item.image} alt={item.name}/><div><strong className="small">{item.name}</strong><p className="muted tiny" style={{margin:"4px 0"}}>{item.color} · {item.size}</p><strong className="price">{money(item.price)}</strong><div style={{marginTop:8}}><Quantity value={item.quantity} max={item.stock} onChange={onChange}/></div></div><IconButton label="Hapus" onClick={onRemove}><Trash2 size={15}/></IconButton></div>;}
function Summary({totals,action}){return <div className="panel sticky"><h3>Ringkasan belanja</h3><div className="summary-line"><span>Subtotal</span><strong>{money(totals.subtotal)}</strong></div>{totals.discount>0&&<div className="summary-line"><span>Diskon</span><strong>-{money(totals.discount)}</strong></div>}<div className="summary-line"><span>Pengiriman</span><strong>{money(totals.shipping)}</strong></div><div className="summary-line" style={{borderTop:"1px solid var(--border)",paddingTop:13,color:"var(--ink)",fontSize:16,fontWeight:900}}><span>Total</span><strong>{money(totals.total)}</strong></div>{action}</div>;}

// ============================================================================
// 25. SHOPPING COMPONENTS
// CartLine, Quantity, Summary, product selectors, and reusable product cards.
// ============================================================================

// ============================================================================
// 26. STOREFRONT PAGES
// ============================================================================

function HomePage({products,wishlist,navigate,onOpen,onWish,onAdd}){
  const featured=products.filter((p)=>p.stock>0).slice(0,4);
  return <div className="page container"><section className="hero"><div className="hero-copy"><div className="eyebrow">Koleksi pilihan</div><h1>{APP_CONFIG.tagline}</h1><p>{APP_CONFIG.description} Temukan pilihan favorit untuk melengkapi aktivitas dan gaya Anda.</p><div className="hero-actions"><Button variant="secondary" onClick={()=>navigate("/shop")}>Jelajahi koleksi <ArrowRight size={15}/></Button><Button variant="soft" onClick={()=>navigate("/categories")}>Lihat kategori</Button></div></div><div className="hero-art"><ShoppingBag/></div></section><section className="section"><div className="section-head"><div><div className="eyebrow">Jelajahi</div><h2>Kategori pilihan</h2><p>Temukan produk berdasarkan kebutuhan.</p></div><button className="link-btn" onClick={()=>navigate("/categories")}>Semua kategori <ArrowRight size={13}/></button></div><div className="category-grid">{CATEGORIES.filter((c)=>c.id!=="all").map((c)=><button className="category" key={c.id} onClick={()=>navigate("/shop?category="+c.id)}><span className="category-icon"><Tag size={18}/></span><strong>{c.name}</strong></button>)}</div></section><section className="section"><div className="section-head"><div><div className="eyebrow">Pilihan ASRI</div><h2>Produk unggulan</h2><p>Koleksi yang dapat Anda jelajahi hari ini.</p></div><button className="link-btn" onClick={()=>navigate("/shop")}>Lihat semua <ArrowRight size={13}/></button></div><ProductGrid products={featured} wishlist={wishlist} onOpen={onOpen} onWish={onWish} onAdd={onAdd}/></section></div>;
}
function CatalogPage({title,products,wishlist,filters,setFilters,onOpen,onWish,onAdd}){
  return <div className="page container"><Heading eyebrow="Katalog" title={title} description={products.length+" produk ditemukan."}/><div className="toolbar"><input className="field" style={{maxWidth:320}} placeholder="Cari nama produk..." value={filters.query} onChange={(e)=>setFilters((old)=>({...old,query:e.target.value}))}/><select className="select" style={{width:"auto"}} value={filters.category} onChange={(e)=>setFilters((old)=>({...old,category:e.target.value}))}>{CATEGORIES.map((c)=><option key={c.id} value={c.id}>{c.name}</option>)}</select><select className="select" style={{width:"auto"}} value={filters.sort} onChange={(e)=>setFilters((old)=>({...old,sort:e.target.value}))}>{SORT_OPTIONS.map((s)=><option key={s.value} value={s.value}>{s.label}</option>)}</select></div><ProductGrid products={products} wishlist={wishlist} onOpen={onOpen} onWish={onWish} onAdd={onAdd}/></div>;
}
function CategoriesPage({navigate}){return <div className="page container"><Heading eyebrow="Kategori" title="Belanja berdasarkan kategori" description="Pilih kategori untuk melihat koleksi produk."/><div className="category-grid">{CATEGORIES.filter((c)=>c.id!=="all").map((c)=><button className="category" key={c.id} onClick={()=>navigate("/shop?category="+c.id)}><span className="category-icon"><ShoppingBag/></span><strong>{c.name}</strong></button>)}</div></div>;}
function SearchPage(props){return <CatalogPage {...props} title="Hasil pencarian"/>;}
function ProductDetailPage({product,wishlist,onWish,onAdd,onBack,related,onOpen}){
  const [image,setImage]=useState(product.images[0]||product.image);
  const [size,setSize]=useState(product.sizes[0]);
  const [color,setColor]=useState(product.colors[0].name);
  const [quantity,setQuantity]=useState(1);
  const [tab,setTab]=useState("description");
  const notify=useNotify();
  useEffect(()=>{setImage(product.images[0]||product.image);setSize(product.sizes[0]);setColor(product.colors[0].name);setQuantity(1);setTab("description");},[product.id]);
  const add=()=>{onAdd(product,{size,color,quantity});notify("Produk ditambahkan ke keranjang.");};
  return <div className="page container"><button className="link-btn" onClick={onBack}><ArrowLeft size={14}/> Kembali ke katalog</button><div className="detail-grid section"><div><img className="detail-photo" src={image} alt={product.name}/><div className="thumbs">{product.images.map((src)=><button key={src} className={"thumb"+(image===src?" active":"")} onClick={()=>setImage(src)}><img src={src} alt={product.name}/></button>)}</div></div><div><div className="eyebrow">{categoryLabel(product.categoryId)}</div><h1 style={{fontSize:31}}>{product.name}</h1><div className="row"><span className="rating"><Star size={13} fill="currentColor"/>{product.rating}</span><span className="muted tiny">{product.reviewCount} ulasan · {product.sold} terjual</span></div><div className="detail-price">{money(product.price)}</div><p className="muted small" style={{lineHeight:1.8}}>{product.description}</p><div className="divider"/><div className="stack"><div><strong className="label">Ukuran</strong><div className="options">{product.sizes.map((v)=><button key={v} className={"option"+(size===v?" active":"")} onClick={()=>setSize(v)}>{v}</button>)}</div></div><div><strong className="label">Warna</strong><div className="options">{product.colors.map((v)=><button key={v.name} className={"option"+(color===v.name?" active":"")} onClick={()=>setColor(v.name)}>{v.name}</button>)}</div></div><div className="between"><div><strong className="label">Jumlah</strong><p className="muted tiny" style={{margin:"4px 0"}}>Stok: {product.stock}</p></div><Quantity value={quantity} max={Math.max(1,product.stock)} onChange={setQuantity}/></div></div><div className="detail-actions"><Button variant="secondary" onClick={()=>onWish(product.id)}><Heart size={15} fill={wishlist.includes(product.id)?"currentColor":"none"}/></Button><Button onClick={add} disabled={product.stock<=0||product.availability!=="available"}><ShoppingBag size={15}/>Tambah ke keranjang</Button></div>{product.stock<=0&&<p className="muted tiny">Produk belum tersedia untuk dibeli.</p>}</div></div><div className="tabs"><button className={"tab"+(tab==="description"?" active":"")} onClick={()=>setTab("description")}>Deskripsi</button><button className={"tab"+(tab==="specs"?" active":"")} onClick={()=>setTab("specs")}>Spesifikasi</button><button className={"tab"+(tab==="reviews"?" active":"")} onClick={()=>setTab("reviews")}>Ulasan</button></div>{tab==="description"&&<p className="muted small">{product.description}</p>}{tab==="specs"&&<div className="panel">{product.specifications.map((s)=><div className="between divider" key={s.label}><span className="muted small">{s.label}</span><strong className="small">{s.value}</strong></div>)}</div>}{tab==="reviews"&&<Empty icon={<Star/>} title="Ulasan produk" description="Ulasan pelanggan ditampilkan ketika sumber data ulasan diaktifkan."/>}{related.length>0&&<section className="section"><div className="section-head"><h2>Produk serupa</h2></div><ProductGrid products={related} wishlist={wishlist} onOpen={onOpen} onWish={onWish} onAdd={(p)=>onAdd(p,{size:p.sizes[0],color:p.colors[0].name,quantity:1})}/></section>}</div>;
}

// ============================================================================
// 27. CHECKOUT AND TRANSACTION PAGES
// ============================================================================

function CartPage({cart,update,remove,navigate}){
  const totals=calculateTotals(cart,APP_CONFIG.shipping.flatRate,0);
  return <div className="page container"><Heading eyebrow="Belanja" title="Keranjang Anda" description={cart.length+" jenis produk di keranjang."}/>{!cart.length?<Empty icon={<ShoppingCart/>} title="Keranjang masih kosong" description="Tambahkan produk yang Anda sukai sebelum checkout." action={<Button onClick={()=>navigate("/shop")}>Mulai belanja</Button>}/>:<div className="cart-grid"><div className="panel"><div className="between"><h3>Produk pilihan</h3><span className="muted tiny">{cart.length} item</span></div>{cart.map((item)=><CartLine key={item.key} item={item} onChange={(qty)=>update(item.key,qty)} onRemove={()=>remove(item.key)}/>)}</div><Summary totals={totals} action={<Button block onClick={()=>navigate("/checkout")}>Lanjut checkout <ArrowRight size={14}/></Button>}/></div>}</div>;
}
function CheckoutPage({cart,onPlaceOrder,navigate}){
  const [data,setData]=useState({name:"",phone:"",email:"",address:"",city:"",postalCode:""});
  const [method,setMethod]=useState("qris");
  const [coupon,setCoupon]=useState("");
  const [errors,setErrors]=useState({});
  const [busy,setBusy]=useState(false);
  const subtotal=cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
  const discount=couponDiscount(coupon,subtotal);
  const totals=calculateTotals(cart,APP_CONFIG.shipping.flatRate,discount);
  const update=(key,value)=>setData((old)=>({...old,[key]:value}));
  const submit=async(e)=>{e.preventDefault();const next=validateCustomer(data);setErrors(next);if(Object.keys(next).length||!cart.length)return;setBusy(true);try{await onPlaceOrder(data,method,coupon);}finally{setBusy(false);}};
  if(!cart.length)return <div className="page container"><Empty title="Keranjang kosong" description="Tambahkan produk sebelum checkout." action={<Button onClick={()=>navigate("/shop")}>Belanja sekarang</Button>}/></div>;
  return <div className="page container"><Heading eyebrow="Checkout" title="Informasi pengiriman" description="Checkout demo tanpa login. Pesanan tersimpan di browser ini."/><form className="checkout-grid" onSubmit={submit}><div className="stack"><section className="panel"><h3>Data penerima</h3><div className="form-grid"><Field className="full" label="Nama lengkap" value={data.name} onChange={(e)=>update("name",e.target.value)} error={errors.name} placeholder="Nama penerima"/><Field label="Nomor telepon" value={data.phone} onChange={(e)=>update("phone",e.target.value)} error={errors.phone} placeholder="08xxxxxxxxxx"/><Field label="Email" type="email" value={data.email} onChange={(e)=>update("email",e.target.value)} error={errors.email} placeholder="nama@email.com"/><label className="field-wrap full"><span className="label">Alamat lengkap</span><textarea className="textarea" rows="3" value={data.address} onChange={(e)=>update("address",e.target.value)} placeholder="Jalan, nomor rumah, RT/RW"/>{errors.address&&<span className="error">{errors.address}</span>}</label><Field label="Kota / Kabupaten" value={data.city} onChange={(e)=>update("city",e.target.value)} error={errors.city}/><Field label="Kode pos" value={data.postalCode} onChange={(e)=>update("postalCode",e.target.value)} error={errors.postalCode} placeholder="12345"/></div></section><section className="panel"><h3>Metode pembayaran demo</h3><p className="muted tiny">Pilihan berikut hanya disimpan pada pesanan demo. Tidak ada invoice atau transaksi nyata.</p>{PAYMENT_METHODS.map((p)=><label className={"radio"+(method===p.id?" selected":"")} key={p.id}><input type="radio" name="payment" checked={method===p.id} onChange={()=>setMethod(p.id)}/><span><strong className="small">{p.label}</strong><span className="muted tiny" style={{display:"block",marginTop:3}}>{p.detail}</span></span></label>)}</section></div><div className="stack"><section className="panel"><h3>Kode promo</h3><input className="field" value={coupon} onChange={(e)=>setCoupon(e.target.value)} placeholder="ASRI10"/><p className="muted tiny" style={{marginTop:7}}>ASRI10: diskon 10% untuk subtotal minimal Rp200.000, maksimal Rp50.000.</p></section><Summary totals={totals} action={<Button block type="submit" disabled={busy}>{busy?<LoaderCircle size={15}/> : <Check size={15}/>} {busy?"Memproses...":"Buat pesanan demo"}</Button>}/><p className="muted tiny">Ongkir demo: {money(APP_CONFIG.shipping.flatRate)}. Ubah melalui APP_CONFIG.shipping.flatRate.</p></div></form></div>;
}
function PaymentResultPage({order,navigate}){
  if(!order)return <div className="page container"><Empty title="Pesanan tidak ditemukan" description="ID pesanan tidak tersedia di browser ini." action={<Button onClick={()=>navigate("/orders")}>Lihat pesanan</Button>}/></div>;
  return <div className="page container"><div className="card" style={{maxWidth:620,margin:"30px auto",textAlign:"center",padding:34}}><div className="empty-icon"><Clock3 size={26}/></div><Badge>Menunggu pembayaran</Badge><h1 style={{fontSize:29,marginTop:17}}>Pesanan berhasil dibuat</h1><p className="muted small">Ini hanya simulasi. Pembayaran belum dilakukan dan tidak ada transaksi sungguhan.</p><div className="panel" style={{textAlign:"left",margin:"20px 0"}}><div className="between"><span className="muted small">Nomor pesanan</span><strong>{order.id}</strong></div><div className="divider"/><div className="between"><span className="muted small">Total demo</span><strong>{money(order.totals.total)}</strong></div><div className="divider"/><div className="between"><span className="muted small">Status pembayaran</span><Badge>Pending</Badge></div></div><div className="row" style={{justifyContent:"center",flexWrap:"wrap"}}><Button variant="secondary" onClick={()=>navigate("/orders/"+order.id)}>Detail pesanan</Button><Button onClick={()=>navigate("/")}>Beranda</Button></div></div></div>;
}

// ============================================================================
// 28. ACCOUNT AND ORDER PAGES
// ============================================================================

function OrdersPage({orders,navigate}){
  return <div className="page container"><Heading eyebrow="Akun" title="Pesanan saya" description="Riwayat pesanan demo yang tersimpan di browser ini."/>{!orders.length?<Empty icon={<ClipboardList/>} title="Belum ada pesanan" description="Pesanan dari checkout demo akan muncul di sini." action={<Button onClick={()=>navigate("/shop")}>Mulai belanja</Button>}/>:<div className="stack">{orders.map((o)=><div className="panel order-card" key={o.id}><div><div className="row"><strong>{o.id}</strong><Badge>{o.status}</Badge></div><p className="muted tiny" style={{margin:"6px 0"}}>{dateLabel(o.createdAt)} · {o.items.length} jenis produk</p><strong>{money(o.totals.total)}</strong></div><Button variant="secondary" size="sm" onClick={()=>navigate("/orders/"+o.id)}>Detail <ChevronRight size={13}/></Button></div>)}</div>}</div>;
}
function OrderDetailPage({order,navigate}){
  if(!order)return <div className="page container"><Empty title="Pesanan tidak ditemukan" description="Pesanan belum tersimpan di browser ini." action={<Button onClick={()=>navigate("/orders")}>Kembali</Button>}/></div>;
  return <div className="page container"><Heading eyebrow="Detail transaksi" title={order.id} description={"Dibuat "+dateLabel(order.createdAt)} action={<Badge>{order.status}</Badge>}/><div className="cart-grid"><div className="panel"><h3>Produk dipesan</h3>{order.items.map((item)=><div className="cart-line" key={item.key}><img src={item.image} alt={item.name}/><div><strong className="small">{item.name}</strong><p className="muted tiny">{item.color} · {item.size} · Qty {item.quantity}</p></div><strong className="small">{money(item.price*item.quantity)}</strong></div>)}<div className="divider"/><h3>Informasi penerima</h3><p className="small">{order.customer.name}<br/>{order.customer.phone}<br/>{order.customer.email}<br/>{order.customer.address}, {order.customer.city} {order.customer.postalCode}</p></div><div className="panel"><h3>Ringkasan</h3><div className="summary-line"><span>Subtotal</span><strong>{money(order.totals.subtotal)}</strong></div><div className="summary-line"><span>Pengiriman</span><strong>{money(order.totals.shipping)}</strong></div><div className="summary-line"><span>Diskon</span><strong>{money(order.totals.discount)}</strong></div><div className="summary-line"><span>Total</span><strong>{money(order.totals.total)}</strong></div><div className="divider"/><div className="between"><span className="muted small">Pembayaran</span><Badge>Pending</Badge></div><p className="muted tiny" style={{marginTop:8}}>Status ini bukan konfirmasi pembayaran sungguhan.</p><Button block variant="secondary" onClick={()=>navigate("/orders/"+order.id+"/tracking")}>Lihat tracking</Button></div></div></div>;
}
function TrackingPage({order}){
  if(!order)return <div className="page container"><Empty title="Pesanan tidak ditemukan" description="Tracking tidak tersedia."/></div>;
  const steps=["Pesanan dibuat","Menunggu pembayaran","Diproses","Dikirim","Selesai"];
  return <div className="page container"><Heading eyebrow="Pengiriman" title="Tracking pesanan" description={order.id}/><div className="panel" style={{maxWidth:620}}><Badge tone="info">Demo · Belum dikirim</Badge><div className="timeline">{steps.map((s,i)=><div className="timeline-item" key={s}><strong className="small">{s}</strong><p className="muted tiny" style={{marginTop:4}}>{i===0?dateLabel(order.createdAt):"Menunggu pembaruan status backend."}</p></div>)}</div></div></div>;
}
function WishlistPage({products,wishlist,onOpen,onWish,onAdd,navigate}){
  const saved=products.filter((p)=>wishlist.includes(p.id));
  return <div className="page container"><Heading eyebrow="Favorit" title="Wishlist" description={saved.length+" produk tersimpan."}/>{saved.length?<ProductGrid products={saved} wishlist={wishlist} onOpen={onOpen} onWish={onWish} onAdd={onAdd}/>:<Empty icon={<Heart/>} title="Wishlist masih kosong" description="Simpan produk favorit agar mudah ditemukan kembali." action={<Button onClick={()=>navigate("/shop")}>Jelajahi produk</Button>}/>}</div>;
}
function ProfilePage({orders,navigate}){
  return <div className="page container"><Heading eyebrow="Akun" title="Profil pelanggan" description="Template menggunakan guest checkout tanpa akun wajib."/><div className="cart-grid"><div className="panel"><div className="row"><div className="empty-icon" style={{margin:0}}><UserRound/></div><div><strong>Guest Customer</strong><p className="muted tiny" style={{margin:3}}>Profil mengikuti informasi checkout terakhir.</p></div></div><div className="divider"/><button className="link-btn" onClick={()=>navigate("/orders")}>Riwayat pesanan <ChevronRight size={13}/></button><br/><button className="link-btn" onClick={()=>navigate("/addresses")}>Alamat pengiriman <ChevronRight size={13}/></button><br/><button className="link-btn" onClick={()=>navigate("/settings")}>Pengaturan <ChevronRight size={13}/></button></div><div className="panel"><h3>Aktivitas pesanan</h3><strong style={{fontSize:30}}>{orders.length}</strong><p className="muted small">Pesanan tersimpan</p></div></div></div>;
}
function AddressesPage(){return <div className="page container"><Heading eyebrow="Akun" title="Alamat pengiriman" description="Alamat dimasukkan saat checkout dalam mode guest."/><Empty icon={<MapPin/>} title="Alamat mengikuti checkout" description="Penyimpanan buku alamat terpisah memerlukan backend atau preferensi pelanggan."/></div>;}
function SettingsPage({theme,setTheme}){
  return <div className="page container"><Heading eyebrow="Preferensi" title="Pengaturan aplikasi" description="Preferensi tampilan lokal."/><div className="panel" style={{maxWidth:580}}><h3>Tema tampilan</h3><div className="options"><button className={"option"+(theme==="light"?" active":"")} onClick={()=>setTheme("light")}><Sun size={14}/> Terang</button><button className={"option"+(theme==="dark"?" active":"")} onClick={()=>setTheme("dark")}><Moon size={14}/> Gelap</button><button className={"option"+(theme==="system"?" active":"")} onClick={()=>setTheme("system")}>System</button></div><p className="muted tiny" style={{marginTop:12}}>Tema tersimpan di LocalStorage.</p></div></div>;
}
function ReturnsPage({orders}){return <div className="page container"><Heading eyebrow="Bantuan" title="Pengembalian & refund" description="Informasi alur pengembalian untuk template."/><div className="panel" style={{maxWidth:700}}><div className="row"><ShieldCheck color="var(--primary)"/><strong>Ketentuan pengembalian</strong></div><p className="muted small" style={{lineHeight:1.8,marginTop:10}}>Hubungi layanan pelanggan dengan nomor pesanan dan alasan pengembalian. Persetujuan, pemeriksaan barang, dan refund harus diproses backend atau tim operasional toko.</p><div className="divider"/><strong className="small">Pesanan tersimpan: {orders.length}</strong><p className="muted tiny">Pengajuan return belum terhubung ke backend.</p></div></div>;
}

// ============================================================================
// 29. SYSTEM PAGES AND GLOBAL OVERLAYS
// ============================================================================

function NotFoundPage({navigate}){return <div className="page container"><Empty title="Halaman tidak ditemukan" description="Alamat yang dibuka tidak tersedia." action={<Button onClick={()=>navigate("/")}>Kembali ke beranda</Button>}/></div>;}

// ============================================================================
// 30. ROOT APPLICATION AND RENDER
// ============================================================================

function App(){
  const {path,navigate}=useRoute();
  const route=useMemo(()=>resolveRoute(path),[path]);
  const [products,setProducts]=useState(MOCK_PRODUCTS);
  const [cart,setCart]=usePersistentState("cart",[]);
  const [wishlist,setWishlist]=usePersistentState("wishlist",[]);
  const [orders,setOrders]=usePersistentState("orders",[]);
  const [theme,setTheme]=usePersistentState("theme","light");
  const [searchQuery,setSearchQuery]=useState("");
  const [filters,setFilters]=useState({query:"",category:"all",sort:"featured",minPrice:0,maxPrice:Number.MAX_SAFE_INTEGER});
  const [toast,setToast]=useState("");
  const [lastOrderId,setLastOrderId]=useState(null);

  useEffect(()=>{let active=true;backendAdapter.getProducts().then((data)=>{if(active&&Array.isArray(data))setProducts(data);}).catch((error)=>console.error("Catalog load failed:",error));return()=>{active=false;};},[]);
  useEffect(()=>{if(!toast)return undefined;const timer=window.setTimeout(()=>setToast(""),2600);return()=>window.clearTimeout(timer);},[toast]);
  useEffect(()=>{if(route.name==="shop"||route.name==="search"){const params=new URLSearchParams(path.split("?")[1]||"");const category=params.get("category");const q=params.get("q");if(category)setFilters((old)=>({...old,category}));if(q!==null){setFilters((old)=>({...old,query:q}));setSearchQuery(q);}}},[path,route.name]);

  const notify=useCallback((message)=>setToast(message),[]);
  const cartCount=useMemo(()=>cart.reduce((sum,item)=>sum+item.quantity,0),[cart]);
  const filtered=useMemo(()=>filterProducts(products,filters),[products,filters]);
  const orderId=route.id||new URLSearchParams(path.split("?")[1]||"").get("order")||lastOrderId;
  const order=orders.find((item)=>item.id===orderId)||null;
  const product=route.name==="product"?products.find((item)=>item.slug===route.slug)||null:null;
  const addToCart=useCallback((item,variant)=>{if(!item||item.stock<=0||item.availability!=="available"){notify("Produk belum tersedia.");return;}setCart((current)=>addCartItem(current,item,variant));notify("Produk ditambahkan ke keranjang.");},[setCart,notify]);
  const toggleWish=useCallback((id)=>{setWishlist((current)=>toggleWishlist(current,id));notify("Wishlist diperbarui.");},[setWishlist,notify]);
  const defaultAdd=(item)=>addToCart(item,{size:item.sizes[0],color:item.colors[0].name,quantity:1});
  const openProduct=(item)=>navigate("/product/"+item.slug);
  const placeOrder=async(customer,method,coupon)=>{const created=makeDemoOrder(cart,customer,method,coupon);const saved=await backendAdapter.createOrder(created);setOrders((current)=>[saved,...current]);setLastOrderId(saved.id);setCart([]);notify("Pesanan demo dibuat. Pembayaran masih pending.");navigate("/payment/result?order="+encodeURIComponent(saved.id));};

  let page;
  switch(route.name){
    case "home": page=<HomePage products={products} wishlist={wishlist} navigate={navigate} onOpen={openProduct} onWish={toggleWish} onAdd={defaultAdd}/>;break;
    case "shop": page=<CatalogPage title="Semua produk" products={filtered} wishlist={wishlist} filters={filters} setFilters={setFilters} onOpen={openProduct} onWish={toggleWish} onAdd={defaultAdd}/>;break;
    case "categories": page=<CategoriesPage navigate={navigate}/>;break;
    case "search": page=<SearchPage products={filtered} wishlist={wishlist} filters={filters} setFilters={setFilters} onOpen={openProduct} onWish={toggleWish} onAdd={defaultAdd}/>;break;
    case "product": page=product?<ProductDetailPage key={product.id} product={product} wishlist={wishlist} onWish={toggleWish} onAdd={addToCart} onBack={()=>navigate("/shop")} related={products.filter((p)=>p.categoryId===product.categoryId&&p.id!==product.id).slice(0,4)} onOpen={openProduct}/>:<NotFoundPage navigate={navigate}/>;break;
    case "cart": page=<CartPage cart={cart} update={(key,qty)=>setCart((current)=>changeCartQuantity(current,key,qty))} remove={(key)=>setCart((current)=>current.filter((item)=>item.key!==key))} navigate={navigate}/>;break;
    case "wishlist": page=<WishlistPage products={products} wishlist={wishlist} onOpen={openProduct} onWish={toggleWish} onAdd={defaultAdd} navigate={navigate}/>;break;
    case "checkout": page=<CheckoutPage cart={cart} onPlaceOrder={placeOrder} navigate={navigate}/>;break;
    case "payment-result": page=<PaymentResultPage order={order} navigate={navigate}/>;break;
    case "orders": page=<OrdersPage orders={orders} navigate={navigate}/>;break;
    case "order-detail": page=<OrderDetailPage order={order} navigate={navigate}/>;break;
    case "tracking": page=<TrackingPage order={order}/>;break;
    case "profile": page=<ProfilePage orders={orders} navigate={navigate}/>;break;
    case "addresses": page=<AddressesPage/>;break;
    case "settings": page=<SettingsPage theme={theme} setTheme={setTheme}/>;break;
    case "returns": page=<ReturnsPage orders={orders}/>;break;
    default: page=<NotFoundPage navigate={navigate}/>;
  }
  const resolvedTheme=theme==="system"?(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):theme;
  return <NotifyContext.Provider value={notify}><AppErrorBoundary><div className="app" data-theme={resolvedTheme} style={{"--content-max":DESIGN_TOKENS.contentMax}}><style>{GLOBAL_CSS}</style><Header navigate={navigate} cartCount={cartCount} wishlistCount={wishlist.length} searchQuery={searchQuery} setSearchQuery={setSearchQuery} route={route}/><main>{page}</main><Footer navigate={navigate}/><MobileNav navigate={navigate} route={route}/><Toast message={toast}/></div></AppErrorBoundary></NotifyContext.Provider>;
}

// Single-file entry: no main.jsx or other React source file is required.
const rootElement=document.getElementById("root");
if(rootElement&&!rootElement.hasChildNodes())createRoot(rootElement).render(<React.StrictMode><App/></React.StrictMode>);

export default App;
