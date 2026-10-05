export type ProductType = 'phone_case' | 'key_ring' | 'apparel' | 'mirror' | 'leather_goods';

export interface CustomOptionChoice {
  label: string;
  value: string;
  hex?: string;
  extraPrice?: number;
}

export interface CustomizationOption {
  id: string;
  type: 'text' | 'monogram' | 'color' | 'font' | 'material' | 'device_model' | 'size' | 'finish' | 'character';
  label: string;
  required: boolean;
  options?: CustomOptionChoice[];
  maxLength?: number;
  placeholder?: string;
  helpText?: string;
}

export interface Product {
  id: string;
  title: string;
  titleKr?: string;
  slug: string;
  category: string;
  categoryKr?: string;
  categoryId: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  descriptionKr?: string;
  craftsmanshipDetails: string[];
  craftsmanshipDetailsKr?: string[];
  leadTimeDays: number;
  materials: string[];
  productType: ProductType;
  customizationOptions: CustomizationOption[];
  artisanName: string;
  artisanRole: string;
  artisanRoleKr?: string;
  artisanAvatar: string;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  inStock: boolean;
  badge?: string;
  badgeKr?: string;
  searchKeywords: string[];
  minQuantity?: number;
  bulkDiscount?: string;
  discountPercent?: number;
}

export interface SubCategory {
  id: string;
  name: string;
  nameKr: string;
  iconName: string;
  imageUrl?: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  nameKr?: string;
  slug: string;
  description: string;
  descriptionKr?: string;
  iconName: string;
  itemCount: number;
  featuredProductType: ProductType;
}

export interface CustomSelection {
  text?: string;
  monogram?: string;
  font?: string;
  material?: string;
  color?: string;
  colorHex?: string;
  deviceModel?: string;
  size?: string;
  finish?: string;
  foilColor?: string;
  character?: string;
  specialNotes?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  customization: CustomSelection;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus =
  | 'placed'
  | 'artisan_review'
  | 'proof_ready'
  | 'in_crafting'
  | 'quality_check'
  | 'shipped'
  | 'delivered';

export interface DigitalProof {
  id: string;
  version: number;
  title: string;
  previewNote: string;
  mockupConfig: CustomSelection;
  status: 'pending_customer_approval' | 'approved' | 'revision_requested';
  customerFeedback?: string;
  uploadedAt: string;
}

export interface OrderMilestone {
  stage: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  customerName: string;
  customerEmail: string;
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  assignedArtisan: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    studioLocation: string;
  };
  proofs: DigitalProof[];
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery: string;
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  paymentMethod: string;
  milestones: OrderMilestone[];
  customerNotes?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: 'customer' | 'artisan' | 'admin';
  senderAvatar: string;
  text: string;
  orderId?: string;
  orderNumber?: string;
  proofId?: string;
  proofTitle?: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  orderId?: string;
  orderNumber?: string;
  productTitle?: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  artisanId: string;
  artisanName: string;
  artisanRole: string;
  artisanAvatar: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCountCustomer: number;
  unreadCountAdmin: number;
}

export type AuthProvider = 'email' | 'google';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
  birthDate?: string;
  authProvider: AuthProvider;
  password?: string;
  savedAddresses: ShippingAddress[];
  role?: 'customer' | 'admin';
}
