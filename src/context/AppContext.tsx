import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  OrderStatus,
  Conversation,
  Message,
  UserAccount,
  CustomSelection,
  ShippingAddress,
  DigitalProof,
  SubCategory,
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_SUBCATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
  INITIAL_USER,
  INITIAL_USERS,
} from '../data/initialData';
import { AuthProvider } from '../types';
import { Language, TRANSLATIONS } from '../data/translations';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  updatePassword as firebaseUpdatePassword,
  getFirebaseAuthErrorMessage,
} from '../firebase';

export type StorePage = 'home' | 'shop' | 'templates' | 'welcome-kit' | 'bulk-order' | 'login' | 'signup' | 'account' | 'profile' | 'google_oauth';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof TRANSLATIONS.kr, params?: Record<string, string | number>) => string;

  // Multi-page navigation (KOJIN Custom, KOJIN Shop, 1-Min Templates, Welcome Kit, Bulk Order)
  currentPage: StorePage;
  setCurrentPage: (page: StorePage) => void;

  products: Product[];
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  
  cart: CartItem[];
  addToCart: (product: Product, customization: CustomSelection, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  orders: Order[];
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  placeOrder: (shipping: ShippingAddress, paymentMethod: string, notes?: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus, milestoneTitle?: string, milestoneDesc?: string) => void;
  approveProof: (orderId: string, proofId: string) => void;
  requestProofRevision: (orderId: string, proofId: string, feedback: string) => void;
  uploadProof: (orderId: string, proofData: { title: string; previewNote: string; mockupConfig: CustomSelection }) => void;

  // Subcategories & Filters (MARPPLE Layout)
  subCategories: SubCategory[];
  activeSubCategory: string;
  setActiveSubCategory: (slug: string) => void;
  activeColorFilter: string;
  setActiveColorFilter: (color: string) => void;
  activePriceFilter: string;
  setActivePriceFilter: (price: string) => void;
  sortOption: 'recommended' | 'popular' | 'lowPrice' | 'highPrice' | 'newest';
  setSortOption: (sort: 'recommended' | 'popular' | 'lowPrice' | 'highPrice' | 'newest') => void;
  bulkOnlyFilter: boolean;
  setBulkOnlyFilter: (bulk: boolean) => void;
  resetFilters: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;

  conversations: Conversation[];
  messages: Message[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  isChatDrawerOpen: boolean;
  setIsChatDrawerOpen: (open: boolean) => void;
  openChatWithArtisan: (
    artisanId: string,
    artisanName: string,
    artisanRole: string,
    artisanAvatar: string,
    orderId?: string,
    orderNumber?: string,
    productTitle?: string
  ) => void;
  sendMessage: (
    conversationId: string,
    text: string,
    role?: 'customer' | 'artisan' | 'admin',
    proofInfo?: { id: string; title: string }
  ) => void;

  user: UserAccount;
  updateUser: (updates: Partial<UserAccount>) => void;
  users: UserAccount[];
  currentUser: UserAccount | null;
  isAuthLoading: boolean;
  loginWithEmail: (email: string, password?: string) => Promise<boolean>;
  loginWithGoogle: (emailParam?: string, nameParam?: string, avatarParam?: string) => Promise<boolean>;
  resetTestData: () => void;
  registerUser: (params: {
    name: string;
    email: string;
    password?: string;
    birthDate?: string;
    phone?: string;
    authProvider?: AuthProvider;
  }) => Promise<boolean>;
  updateUserProfile: (updates: Partial<UserAccount>) => Promise<void>;
  changeEmailPassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  logoutCustomer: () => Promise<void>;

  // Access Control & Purchase Flow Restriction Guards
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalReason: string;
  requireAuth: (reason: string, onAuthorized?: () => void) => boolean;

  appMode: 'store' | 'admin';
  setAppMode: (mode: 'store' | 'admin') => void;
  adminView: 'dashboard' | 'orders' | 'messages' | 'products' | 'categories' | 'customers' | 'security';
  setAdminView: (view: 'dashboard' | 'orders' | 'messages' | 'products' | 'categories' | 'customers' | 'security') => void;

  adminPassword: string;
  isAdminAuthenticated: boolean;
  isAdminLoginModalOpen: boolean;
  setIsAdminLoginModalOpen: (open: boolean) => void;
  verifyAndLoginAdmin: (pwd: string) => boolean;
  adminLogout: () => void;
  changeAdminPassword: (currentPwd: string, newPwd: string) => boolean;
  resetAdminPassword: () => void;

  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (cat: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;

  toast: { message: string; type?: 'info' | 'success' | 'alert' } | null;
  showToast: (message: string, type?: 'info' | 'success' | 'alert') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANGUAGE: 'atelier_lang_v3',
  PRODUCTS: 'atelier_products_v3',
  CATEGORIES: 'atelier_categories_v3',
  ORDERS: 'atelier_orders_v3',
  CONVERSATIONS: 'atelier_conversations_v3',
  MESSAGES: 'atelier_messages_v3',
  USER: 'atelier_user_v3',
  USERS: 'kojin_users_v2',
  CURRENT_USER: 'kojin_current_user_v2',
  ADMIN_PASSWORD: 'kojin_admin_pwd_v2',
  CART: 'atelier_cart_v3',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language (Korean main by default!)
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return (saved === 'en' || saved === 'kr') ? saved : 'kr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  };

  const t = useCallback(
    (key: keyof typeof TRANSLATIONS.kr, params?: Record<string, string | number>): string => {
      const dict = TRANSLATIONS[language] || TRANSLATIONS.kr;
      let text = (dict as any)[key] || (TRANSLATIONS.kr as any)[key] || key;
      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        });
      }
      return text;
    },
    [language]
  );

  // Multi-page Storefront Navigation (KOJIN Custom, KOJIN Shop, 1-Min Templates, Welcome Kit, Bulk Order)
  const [currentPage, setCurrentPageState] = useState<StorePage>('home');
  const setCurrentPage = (page: StorePage) => {
    setCurrentPageState(page);
    setSelectedOrderId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Products & Categories (Normalizing any legacy artist names to '관리자' and syncing multi-theme options)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!saved) return INITIAL_PRODUCTS;
    try {
      const parsed: Product[] = JSON.parse(saved);
      return parsed.map((p) => {
        const fresh = INITIAL_PRODUCTS.find((init) => init.id === p.id);
        return {
          ...p,
          artisanName: '관리자',
          artisanRole: 'KOJIN 제작 관리자',
          artisanRoleKr: 'KOJIN 제작 관리자',
          badge: p.badge?.replace('마플', 'KOJIN') || p.badge,
          badgeKr: p.badgeKr?.replace('마플', 'KOJIN') || p.badgeKr,
          customizationOptions: fresh ? fresh.customizationOptions : p.customizationOptions,
          searchKeywords: fresh ? fresh.searchKeywords : p.searchKeywords,
          description: fresh ? fresh.description : p.description,
          descriptionKr: fresh ? fresh.descriptionKr : p.descriptionKr,
        };
      });
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Subcategories & Filters (MARPPLE Layout)
  const [subCategories] = useState<SubCategory[]>(INITIAL_SUBCATEGORIES);
  const [activeSubCategory, setActiveSubCategory] = useState<string>('all');
  const [activeColorFilter, setActiveColorFilter] = useState<string>('all');
  const [activePriceFilter, setActivePriceFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<'recommended' | 'popular' | 'lowPrice' | 'highPrice' | 'newest'>('recommended');
  const [bulkOnlyFilter, setBulkOnlyFilter] = useState<boolean>(false);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('atelier_wishlist_v1');
    return saved ? JSON.parse(saved) : ['prod-acrylic-keyring'];
  });

  useEffect(() => {
    localStorage.setItem('atelier_wishlist_v1', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? '찜 목록에서 제외되었습니다.' : '찜한 상품에 추가되었습니다! (♥)', 'info');
      return next;
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const resetFilters = () => {
    setActiveCategory('all');
    setActiveSubCategory('all');
    setActiveColorFilter('all');
    setActivePriceFilter('all');
    setSearchQuery('');
    setBulkOnlyFilter(false);
    setSortOption('recommended');
    showToast('검색 및 필터가 초기화되었습니다.', 'info');
  };

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CART);
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!saved) return INITIAL_ORDERS;
    try {
      const parsed: Order[] = JSON.parse(saved);
      // Clean up legacy mock orders previously attached to koen.nakano@gmail.com
      return parsed.map((ord) => {
        if (ord.customerEmail === 'koen.nakano@gmail.com') {
          return { ...ord, customerEmail: 'sample.archive@kojinstudio.com' };
        }
        return ord;
      });
    } catch {
      return INITIAL_ORDERS;
    }
  });
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Chat & Messaging
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState<boolean>(false);

  // Customer User Directory & Real Firebase Authentication
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserAccount>(INITIAL_USER);
  const [users, setUsers] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('kojin_customer_directory_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Access Control & Protected Flow Modal
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalReason, setAuthModalReason] = useState<string>('장바구니 담기 및 결제는 회원 로그인 후 이용 가능합니다.');
  const [pendingAuthorizedCallback, setPendingAuthorizedCallback] = useState<(() => void) | null>(null);

  const requireAuth = (reason: string, onAuthorized?: () => void): boolean => {
    if (currentUser) {
      if (onAuthorized) onAuthorized();
      return true;
    }
    setAuthModalReason(reason);
    if (onAuthorized) {
      setPendingAuthorizedCallback(() => onAuthorized);
    }
    setIsAuthModalOpen(true);
    return false;
  };

  // Sync with Firebase Authentication onAuthStateChanged
  useEffect(() => {
    // Remove obsolete mock storage
    localStorage.removeItem('kojin_users_v2');
    localStorage.removeItem('atelier_users_v2');

    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        const isGoogle = fbUser.providerData.some((p) => p.providerId === 'google.com');
        const providerId = fbUser.providerData[0]?.providerId || (isGoogle ? 'google.com' : 'password');

        let localProfile: any = {};
        try {
          const saved = localStorage.getItem(`kojin_profile_${fbUser.uid}`);
          if (saved) localProfile = JSON.parse(saved);
        } catch {}

        const userAccount: UserAccount = {
          id: fbUser.uid,
          name: localProfile.name || fbUser.displayName || fbUser.email?.split('@')[0] || 'KOJIN 고객님',
          email: fbUser.email || '',
          phone: localProfile.phone || fbUser.phoneNumber || '',
          avatar:
            fbUser.photoURL ||
            localProfile.avatar ||
            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          photoURL: fbUser.photoURL || undefined,
          memberSince: fbUser.metadata.creationTime
            ? new Date(fbUser.metadata.creationTime).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
              })
            : '2026년 10월',
          birthDate: localProfile.birthDate || '미등록',
          authProvider: isGoogle ? 'google' : 'email',
          providerId: providerId,
          role: 'customer',
          savedAddresses: localProfile.savedAddresses || [],
        };

        setCurrentUser(userAccount);
        setUser(userAccount);

        // Keep directory updated for Admin CMS
        setUsers((prev) => {
          const idx = prev.findIndex((u) => u.id === userAccount.id);
          const next = idx >= 0 ? prev.map((u, i) => (i === idx ? userAccount : u)) : [userAccount, ...prev];
          localStorage.setItem('kojin_customer_directory_v1', JSON.stringify(next));
          return next;
        });
      } else {
        setCurrentUser(null);
        setUser(INITIAL_USER);
      }
      setIsAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const executePendingPostLogin = () => {
    if (pendingAuthorizedCallback) {
      const cb = pendingAuthorizedCallback;
      setPendingAuthorizedCallback(null);
      setTimeout(() => cb(), 150);
    }
  };

  const loginWithGoogle = async (
    _emailParam?: string,
    _nameParam?: string,
    _avatarParam?: string
  ): Promise<boolean> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const name = result.user.displayName || result.user.email?.split('@')[0] || '고객';
      showToast(`🎉 ${name}님, Google 계정으로 로그인되었습니다!`, 'success');
      setIsAuthModalOpen(false);
      executePendingPostLogin();
      return true;
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        showToast('Google 로그인 창이 닫혔습니다.', 'info');
        return false;
      }
      const msg = getFirebaseAuthErrorMessage(err?.code || '');
      showToast(msg, 'alert');
      return false;
    }
  };

  const loginWithEmail = async (email: string, password?: string): Promise<boolean> => {
    if (!password) {
      showToast('비밀번호를 입력해주세요.', 'alert');
      return false;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email.trim(), password);
      const name = result.user.displayName || result.user.email?.split('@')[0] || '고객';
      showToast(`${name}님, 환영합니다! 로그인되었습니다.`, 'success');
      setIsAuthModalOpen(false);
      executePendingPostLogin();
      return true;
    } catch (err: any) {
      const msg = getFirebaseAuthErrorMessage(err?.code || '');
      showToast(msg, 'alert');
      return false;
    }
  };

  const registerUser = async (params: {
    name: string;
    email: string;
    password?: string;
    birthDate?: string;
    phone?: string;
    authProvider?: AuthProvider;
  }): Promise<boolean> => {
    if (!params.password) {
      showToast('비밀번호를 입력해주세요.', 'alert');
      return false;
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, params.email.trim(), params.password);
      if (params.name.trim() && result.user) {
        await firebaseUpdateProfile(result.user, { displayName: params.name.trim() });
      }

      // Persist additional metadata
      const profileData = {
        name: params.name.trim(),
        phone: params.phone?.trim() || '',
        birthDate: params.birthDate?.trim() || '미등록',
        savedAddresses: [],
      };
      localStorage.setItem(`kojin_profile_${result.user.uid}`, JSON.stringify(profileData));

      showToast(`🎉 ${params.name.trim()}님, KOJIN 회원가입 및 로그인이 완료되었습니다!`, 'success');
      setIsAuthModalOpen(false);
      executePendingPostLogin();
      return true;
    } catch (err: any) {
      const msg = getFirebaseAuthErrorMessage(err?.code || '');
      showToast(msg, 'alert');
      return false;
    }
  };

  const updateUserProfile = async (updates: Partial<UserAccount>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    setUser(updated);

    if (auth.currentUser && updates.name) {
      try {
        await firebaseUpdateProfile(auth.currentUser, { displayName: updates.name });
      } catch (e) {
        console.warn('Profile name update in auth:', e);
      }
    }

    localStorage.setItem(`kojin_profile_${updated.id}`, JSON.stringify(updated));
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    showToast('회원 정보가 성공적으로 수정되었습니다.', 'success');
  };

  const changeEmailPassword = async (
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!auth.currentUser) return { success: false, error: '로그인이 필요합니다.' };
    try {
      await firebaseUpdatePassword(auth.currentUser, newPassword);
      showToast('비밀번호가 성공적으로 변경되었습니다.', 'success');
      return { success: true };
    } catch (err: any) {
      const msg = getFirebaseAuthErrorMessage(err?.code || '');
      showToast(msg, 'alert');
      return { success: false, error: msg };
    }
  };

  const logoutCustomer = async () => {
    try {
      await firebaseSignOut(auth);
      setCurrentUser(null);
      setUser(INITIAL_USER);
      setCurrentPage('home');
      showToast('로그아웃 되었습니다.', 'info');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const resetTestData = () => {
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    setOrders(INITIAL_ORDERS);
    showToast('주문 테스트 데이터가 초기화되었습니다.', 'info');
  };

  // Admin Security & Password Management (Initial password: 5696)
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_PASSWORD) || '5696';
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return typeof sessionStorage !== 'undefined' && sessionStorage.getItem('kojin_admin_auth') === 'true';
  });

  const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = useState<boolean>(false);

  const verifyAndLoginAdmin = (pwd: string): boolean => {
    if (pwd.trim() === adminPassword) {
      setIsAdminAuthenticated(true);
      if (typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('kojin_admin_auth', 'true');
      }
      setIsAdminLoginModalOpen(false);
      setAppModeState('admin');
      window.location.hash = '#admin';
      showToast('관리자 인증에 성공했습니다.', 'success');
      return true;
    } else {
      showToast('관리자 비밀번호가 일치하지 않습니다.', 'alert');
      return false;
    }
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.removeItem('kojin_admin_auth');
    }
    setAppModeState('store');
    if (window.location.hash === '#admin') {
      history.replaceState(null, '', ' ');
    }
    showToast('관리자 로그아웃 되었습니다.', 'info');
  };

  const changeAdminPassword = (currentPwd: string, newPwd: string): boolean => {
    if (currentPwd.trim() !== adminPassword) {
      showToast('현재 비밀번호가 일치하지 않습니다.', 'alert');
      return false;
    }
    if (!newPwd || newPwd.trim().length < 4) {
      showToast('새 비밀번호는 최소 4자리 이상이어야 합니다.', 'alert');
      return false;
    }
    setAdminPassword(newPwd.trim());
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, newPwd.trim());
    showToast('관리자 비밀번호가 성공적으로 변경되었습니다!', 'success');
    return true;
  };

  const resetAdminPassword = () => {
    setAdminPassword('5696');
    localStorage.setItem(STORAGE_KEYS.ADMIN_PASSWORD, '5696');
    showToast('관리자 비밀번호가 초기값(5696)으로 재설정되었습니다.', 'info');
  };

  const [appMode, setAppModeState] = useState<'store' | 'admin'>(() => {
    if (
      typeof window !== 'undefined' &&
      (window.location.hash === '#admin' || window.location.pathname.includes('/admin')) &&
      typeof sessionStorage !== 'undefined' &&
      sessionStorage.getItem('kojin_admin_auth') === 'true'
    ) {
      return 'admin';
    }
    return 'store';
  });

  const setAppMode = (mode: 'store' | 'admin') => {
    if (mode === 'admin') {
      if (!isAdminAuthenticated) {
        setIsAdminLoginModalOpen(true);
        return;
      }
      setAppModeState('admin');
      window.location.hash = '#admin';
    } else {
      setAppModeState('store');
      if (window.location.hash === '#admin') {
        history.replaceState(null, '', ' ');
      }
    }
  };

  const [adminView, setAdminView] = useState<'dashboard' | 'orders' | 'messages' | 'products' | 'categories' | 'customers' | 'security'>('dashboard');
  const [toast, setToast] = useState<{ message: string; type?: 'info' | 'success' | 'alert' } | null>(null);

  // Alternative Admin Access: Hash listener & Keyboard shortcut listener
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        if (!isAdminAuthenticated) {
          setIsAdminLoginModalOpen(true);
        } else {
          setAppModeState('admin');
          showToast(
            language === 'kr'
              ? '공방 관리자 모드로 전환되었습니다. (#admin)'
              : 'Switched to Admin CMS mode. (#admin)',
            'info'
          );
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+A or Ctrl+Shift+A for discreet staff access
      if ((e.altKey && e.key.toLowerCase() === 'a') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a')) {
        e.preventDefault();
        if (appMode === 'store') {
          if (!isAdminAuthenticated) {
            setIsAdminLoginModalOpen(true);
          } else {
            setAppModeState('admin');
            window.location.hash = '#admin';
            showToast(
              language === 'kr'
                ? '단축키(Alt+A)로 관리자 CMS 모드 진입'
                : 'Admin CMS toggled via shortcut (Alt+A)',
              'info'
            );
          }
        } else {
          setAppModeState('store');
          history.replaceState(null, '', ' ');
          showToast(
            language === 'kr' ? '고객 스토어 화면으로 복귀' : 'Returned to Storefront',
            'info'
          );
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('keydown', handleKeyDown);

    // Initial check
    if (window.location.hash === '#admin') {
      if (!isAdminAuthenticated) {
        setIsAdminLoginModalOpen(true);
      } else {
        setAppModeState('admin');
      }
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [language]);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }, [user]);

  const showToast = (message: string, type: 'info' | 'success' | 'alert' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Cart operations
  const performAddToCart = (product: Product, customization: CustomSelection, quantity = 1) => {
    const itemId = `ci-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newItem: CartItem = {
      id: itemId,
      productId: product.id,
      product,
      customization,
      quantity,
      unitPrice: product.price,
      totalPrice: product.price * quantity,
    };
    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
    showToast(language === 'kr' ? `'${product.titleKr || product.title}' 상품이 장바구니에 담겼습니다!` : `Added "${product.title}" to your bag`, 'success');
  };

  const addToCart = (product: Product, customization: CustomSelection, quantity = 1) => {
    if (!currentUser) {
      requireAuth('장바구니 담기 및 주문 제작은 회원 로그인 후 이용하실 수 있습니다.', () => {
        performAddToCart(product, customization, quantity);
      });
      return;
    }
    performAddToCart(product, customization, quantity);
  };

  const setIsCartOpenGuarded = (open: boolean) => {
    if (open && !currentUser) {
      requireAuth('장바구니 조회를 위해 먼저 로그인해주세요.', () => {
        setIsCartOpen(true);
      });
      return;
    }
    setIsCartOpen(open);
  };

  const setIsCheckoutOpenGuarded = (open: boolean) => {
    if (open && !currentUser) {
      requireAuth('주문 결제를 진행하시려면 먼저 로그인해주세요.', () => {
        setIsCheckoutOpen(true);
      });
      return;
    }
    setIsCheckoutOpen(open);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId
          ? { ...item, quantity: qty, totalPrice: item.unitPrice * qty }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order operations
  const placeOrder = (
    shipping: ShippingAddress,
    paymentMethod: string,
    customerNotes?: string
  ): Order => {
    const buyerName = shipping.fullName || (currentUser ? currentUser.name : user.name);
    const buyerEmail = (currentUser ? currentUser.email : user.email);
    const orderNum = `KOJIN-${Math.floor(1000 + Math.random() * 9000)}`;
    const orderId = `ord-${Date.now()}`;
    const subtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
    const tax = Number((subtotal * 0.1).toFixed(2));
    const shippingFee = 0; // Complimentary shipping
    const total = Number((subtotal + tax + shippingFee).toFixed(2));

    const defaultArtisan = {
      id: 'team-kojin',
      name: '관리자 (KOJIN 제작 관리팀)',
      role: '품질 검수 & 정밀 가공 책임자',
      avatar: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80',
      studioLocation: 'KOJIN Studio Seoul',
    };

    const newOrder: Order = {
      id: orderId,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      items: [...cart],
      customerName: buyerName,
      customerEmail: buyerEmail,
      shippingAddress: shipping,
      status: 'placed',
      assignedArtisan: defaultArtisan,
      proofs: [],
      trackingNumber: `ATLR-${Math.floor(1000 + Math.random() * 9000)}-US`,
      carrier: 'Artisan Parcel Priority',
      estimatedDelivery: 'In 5-7 business days',
      subtotal,
      shippingFee,
      tax,
      total,
      paymentMethod,
      customerNotes,
      milestones: [
        {
          stage: 'placed',
          title: 'Order Placed & Custom Specs Transmitted',
          description: `Received bespoke specifications for ${cart.length} item(s). Hand-queued in workshop.`,
          timestamp: 'Just now',
          completed: true,
          current: true,
        },
        {
          stage: 'artisan_review',
          title: 'Artisan Review & Die Prep',
          description: `${defaultArtisan.name} will inspect typography and verify material readiness.`,
          timestamp: 'Pending review',
          completed: false,
          current: false,
        },
        {
          stage: 'proof_ready',
          title: 'Digital Proofing',
          description: 'A digital proof will be sent for your approval before tooling starts.',
          timestamp: 'Expected within 24h',
          completed: false,
          current: false,
        },
        {
          stage: 'in_crafting',
          title: 'Handcrafting & Laser Inscription',
          description: 'Precision machining, hand-stitching, debossing, and fine oiling.',
          timestamp: 'Pending proof approval',
          completed: false,
          current: false,
        },
        {
          stage: 'quality_check',
          title: 'Artisan Inspection & Conditioning',
          description: 'Tolerance testing, microfiber wrap, and artisan wax seal certificate.',
          timestamp: 'Estimated Day 4',
          completed: false,
          current: false,
        },
        {
          stage: 'shipped',
          title: 'Dispatched with Tracking',
          description: 'Courier collection and express transit.',
          timestamp: 'Estimated Day 5',
          completed: false,
          current: false,
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    setSelectedOrderId(newOrder.id);

    // Auto-create initial artisan conversation for this order
    const convId = `conv-${orderId}`;
    const newConv: Conversation = {
      id: convId,
      orderId,
      orderNumber: orderNum,
      productTitle: newOrder.items[0]?.product.title || 'Custom Order',
      customerId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      customerAvatar: user.avatar,
      artisanId: defaultArtisan.id,
      artisanName: defaultArtisan.name,
      artisanRole: defaultArtisan.role,
      artisanAvatar: defaultArtisan.avatar,
      lastMessage: `Thank you for order ${orderNum}! I am reviewing your custom specifications now.`,
      lastMessageAt: new Date().toISOString(),
      unreadCountCustomer: 1,
      unreadCountAdmin: 0,
    };

    const initialArtisanMsg: Message = {
      id: `msg-${Date.now()}`,
      conversationId: convId,
      senderId: defaultArtisan.id,
      senderName: defaultArtisan.name,
      senderRole: 'artisan',
      senderAvatar: defaultArtisan.avatar,
      text: `안녕하세요 ${buyerName} 고객님! KOJIN 제작 관리팀입니다. 주문번호 #${orderNum}의 커스텀 사양을 안전하게 접수했습니다. 전문 디자이너가 정밀 디지털 시안을 제작하여 시안 탭에 업로드해 드릴 예정입니다. 질문이나 추가 요청사항이 있으시면 언제든지 메시지를 남겨주세요!`,
      orderId,
      orderNumber: orderNum,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setConversations((prev) => [newConv, ...prev]);
    setMessages((prev) => [...prev, initialArtisanMsg]);

    showToast(`주문 #${orderNum}이 접수되었습니다! 전문 제작 관리자가 1:1 배정되었습니다.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    milestoneTitle?: string,
    milestoneDesc?: string
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;

        const updatedMilestones = ord.milestones.map((m) => {
          if (m.stage === status) {
            return {
              ...m,
              completed: true,
              current: true,
              timestamp: 'Just now',
              description: milestoneDesc || m.description,
              title: milestoneTitle || m.title,
            };
          }
          return {
            ...m,
            current: false,
          };
        });

        return {
          ...ord,
          status,
          milestones: updatedMilestones,
        };
      })
    );
    showToast(`Order status updated to "${status.replace('_', ' ')}"`, 'info');
  };

  const approveProof = (orderId: string, proofId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          status: 'in_crafting',
          proofs: ord.proofs.map((p) =>
            p.id === proofId ? { ...p, status: 'approved' } : p
          ),
          milestones: ord.milestones.map((m) => {
            if (m.stage === 'proof_ready') {
              return { ...m, completed: true, current: false, description: 'Proof approved by customer.' };
            }
            if (m.stage === 'in_crafting') {
              return { ...m, completed: false, current: true, timestamp: 'Crafting started' };
            }
            return m;
          }),
        };
      })
    );

    // Notify in chat
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      const conv = conversations.find((c) => c.orderId === orderId);
      if (conv) {
        sendMessage(
          conv.id,
          'I have approved the digital proof! Ready for handcrafting.',
          'customer'
        );
      }
    }
    showToast('Digital proof approved! Your piece is now entering workshop production.', 'success');
  };

  const requestProofRevision = (orderId: string, proofId: string, feedback: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        return {
          ...ord,
          proofs: ord.proofs.map((p) =>
            p.id === proofId
              ? { ...p, status: 'revision_requested', customerFeedback: feedback }
              : p
          ),
        };
      })
    );

    const conv = conversations.find((c) => c.orderId === orderId);
    if (conv) {
      sendMessage(
        conv.id,
        `Revision request for proof: "${feedback}"`,
        'customer'
      );
    }
    showToast('Revision notes sent to your artisan.', 'info');
  };

  const uploadProof = (
    orderId: string,
    proofData: { title: string; previewNote: string; mockupConfig: CustomSelection }
  ) => {
    const newProof: DigitalProof = {
      id: `proof-${Date.now()}`,
      version: 1,
      title: proofData.title,
      previewNote: proofData.previewNote,
      mockupConfig: proofData.mockupConfig,
      status: 'pending_customer_approval',
      uploadedAt: new Date().toISOString(),
    };

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const newProofs = [...ord.proofs, newProof];
        newProof.version = newProofs.length;

        const updatedMilestones = ord.milestones.map((m) => {
          if (m.stage === 'proof_ready') {
            return {
              ...m,
              completed: false,
              current: true,
              timestamp: 'Proof uploaded',
              description: `Proof v${newProof.version} uploaded by artisan. Awaiting review.`,
            };
          }
          return m;
        });

        return {
          ...ord,
          status: 'proof_ready',
          proofs: newProofs,
          milestones: updatedMilestones,
        };
      })
    );

    // Notify customer in chat
    const conv = conversations.find((c) => c.orderId === orderId);
    if (conv) {
      sendMessage(
        conv.id,
        `I've uploaded a new digital proof (${proofData.title}) for your review! Please check the proof tab in your order tracker to review or approve.`,
        'artisan',
        { id: newProof.id, title: newProof.title }
      );
    }

    showToast('Digital proof uploaded and transmitted to customer.', 'success');
  };

  // Messaging operations
  const openChatWithArtisan = (
    artisanId: string,
    artisanName: string,
    artisanRole: string,
    artisanAvatar: string,
    orderId?: string,
    orderNumber?: string,
    productTitle?: string
  ) => {
    let existing = conversations.find(
      (c) =>
        (orderId && c.orderId === orderId) ||
        (!orderId && c.artisanId === artisanId && !c.orderId)
    );

    if (!existing) {
      const newConvId = `conv-${Date.now()}`;
      existing = {
        id: newConvId,
        orderId,
        orderNumber,
        productTitle,
        customerId: user.id,
        customerName: user.name,
        customerEmail: user.email,
        customerAvatar: user.avatar,
        artisanId,
        artisanName,
        artisanRole,
        artisanAvatar,
        lastMessage: 'Conversation opened',
        lastMessageAt: new Date().toISOString(),
        unreadCountCustomer: 0,
        unreadCountAdmin: 0,
      };
      setConversations((prev) => [existing!, ...prev]);
    }

    setActiveConversationId(existing.id);
    setIsChatDrawerOpen(true);
  };

  const sendMessage = (
    conversationId: string,
    text: string,
    role: 'customer' | 'artisan' | 'admin' = 'customer',
    proofInfo?: { id: string; title: string }
  ) => {
    if (!text.trim()) return;

    const conv = conversations.find((c) => c.id === conversationId);
    const newMsg: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      conversationId,
      senderId: role === 'customer' ? user.id : (conv?.artisanId || 'admin'),
      senderName: role === 'customer' ? user.name : (conv?.artisanName || 'Artisan Lead'),
      senderRole: role,
      senderAvatar: role === 'customer' ? user.avatar : (conv?.artisanAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'),
      text: text.trim(),
      orderId: conv?.orderId,
      orderNumber: conv?.orderNumber,
      proofId: proofInfo?.id,
      proofTitle: proofInfo?.title,
      timestamp: new Date().toISOString(),
      read: role === 'customer' ? false : true,
    };

    setMessages((prev) => [...prev, newMsg]);

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          lastMessage: text.trim(),
          lastMessageAt: new Date().toISOString(),
          unreadCountAdmin: role === 'customer' ? c.unreadCountAdmin + 1 : c.unreadCountAdmin,
          unreadCountCustomer: role !== 'customer' ? c.unreadCountCustomer + 1 : c.unreadCountCustomer,
        };
      })
    );

    if (role === 'customer') {
      showToast('Message transmitted to artisan workbench', 'info');
    }
  };

  const updateUser = (updates: Partial<UserAccount>) => {
    setUser((prev) => ({ ...prev, ...updates }));
    showToast('Profile details updated', 'success');
  };

  // Product Catalog CMS operations
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const prod: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
    };
    setProducts((prev) => [prod, ...prev]);
    showToast(`Added "${prod.title}" to artisan catalog`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  const addCategory = (cat: Omit<Category, 'id'>) => {
    const newCat: Category = {
      ...cat,
      id: `cat-${Date.now()}`,
    };
    setCategories((prev) => [...prev, newCat]);
    showToast(`Category "${newCat.name}" created`, 'success');
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    showToast('Category updated', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentPage,
        setCurrentPage,
        products,
        categories,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen: setIsCartOpenGuarded,
        isCheckoutOpen,
        setIsCheckoutOpen: setIsCheckoutOpenGuarded,
        orders,
        selectedOrderId,
        setSelectedOrderId,
        placeOrder,
        updateOrderStatus,
        approveProof,
        requestProofRevision,
        uploadProof,
        subCategories,
        activeSubCategory,
        setActiveSubCategory,
        activeColorFilter,
        setActiveColorFilter,
        activePriceFilter,
        setActivePriceFilter,
        sortOption,
        setSortOption,
        bulkOnlyFilter,
        setBulkOnlyFilter,
        resetFilters,
        wishlist,
        toggleWishlist,
        isWishlisted,
        conversations,
        messages,
        activeConversationId,
        setActiveConversationId,
        isChatDrawerOpen,
        setIsChatDrawerOpen,
        openChatWithArtisan,
        sendMessage,
        user,
        updateUser,
        users,
        currentUser,
        isAuthLoading,
        loginWithEmail,
        loginWithGoogle,
        resetTestData,
        registerUser,
        updateUserProfile,
        changeEmailPassword,
        logoutCustomer,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalReason,
        requireAuth,
        appMode,
        setAppMode,
        adminView,
        setAdminView,
        adminPassword,
        isAdminAuthenticated,
        isAdminLoginModalOpen,
        setIsAdminLoginModalOpen,
        verifyAndLoginAdmin,
        adminLogout,
        changeAdminPassword,
        resetAdminPassword,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
