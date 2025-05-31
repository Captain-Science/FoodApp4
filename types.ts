
export enum ProductCategory {
  Fruits = "Fruits",
  Vegetables = "Vegetables",
  Dairy = "Dairy",
  Bakery = "Bakery",
  Pantry = "Pantry",
  Frozen = "Frozen Foods", // This is a category
  Beverages = "Beverages",
  CannedGoods = "Canned Goods",
  DryGoods = "Dry Goods & Pasta",
  MeatSeafood = "Meat & Seafood",
}

export enum ProductStatus {
  // General Statuses
  OutOfStock = "Out of Stock",
  NoLimit = "No Limit",
  LimitedSupply = "Limited Supply",
  Discontinued = "Discontinued",
  ExpiringSoon = "Expiring Soon",
  ComingSoon = "Coming Soon",
  NewProduct = "New Product",
  OnSale = "On Sale",
  ByTheCase = "Available by the case",
  Perishable = "Perishable",

  // Dietary/Informational
  ContainsSoy = "Contains Soy",
  ContainsSeedOils = "Contains Seed Oils",
  LowSodium = "Low Sodium",
  HighFructoseCornSyrup = "HFCS",
  GMO = "Contains GMO",
  Organic = "Organic",
  GlutenFree = "Gluten-Free",
  Vegan = "Vegan",

  // Product Types (replacing/clarifying some previous statuses)
  ProductType_Fresh = "Fresh",
  ProductType_Frozen = "Frozen", // This indicates the product itself is frozen
  ProductType_Canned = "Canned",
  ProductType_Packaged = "Packaged", // For items like chips, crackers
  ProductType_Refrigerated = "Refrigerated",
  ProductType_ShelfStable = "Shelf-Stable",
  ProductType_DryGoods = "Dry Goods",
}

export interface Review {
  id: string;
  userId: string;
  userName:string;
  rating: number; // 1-5
  text: string;
  date: string;
}

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  image: string;
  info: string;
  upvotes: number;
  downvotes: number;
  reviews: Review[];
  status: ProductStatus[];
}

export interface RankedProduct extends Product {
  averageRating: number;
  score: number;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  image: string;
  isFeatured?: boolean; // Added for featured articles
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO string for date
  time?: string; // e.g., "10:00 AM - 2:00 PM"
  location?: string;
  description: string;
  image?: string;
}

export interface UserProductInteraction {
  thumbsState: 'up' | 'down' | 'none';
  isFavorited: boolean;
}

export interface UserArticleInteraction {
  isFavorited: boolean;
}

export interface User {
  id: string;
  name: string;
  isAdmin: boolean;
  productInteractions: Record<string, UserProductInteraction>; // productId as key
  articleInteractions: Record<string, UserArticleInteraction>; // articleId as key
}

export enum ViewMode {
  Category = "Category",
  Product = "Product",
  Article = "Article",
  Favorites = "Favorites",
  Admin = "Admin",
  AllProducts = "AllProducts",
  AllArticles = "AllArticles",
  Calendar = "Calendar",
  DiscussionForum = "DiscussionForum",
  DiscussionThread = "DiscussionThread",
  DonateFoodPage = "DonateFoodPage",
  GetFoodPage = "GetFoodPage",
}

export interface SelectedItem {
  type: 'product' | 'article' | 'category' | 'all_products' | 'all_articles' | 'event' | 'discussion_topic';
  id: string;
}

export interface HeaderNotice {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'promo';
}


// Discussion Forum Types
export interface DiscussionPost {
  id: string;
  topicId: string;
  userId: string;
  userName: string;
  content: string;
  date: string; // ISO string
}

export interface DiscussionTopic {
  id: string;
  title: string;
  createdByUserId: string;
  createdByUserName: string;
  createdAt: string; // ISO string
  lastReplyAt?: string; // ISO string
  replyCount: number;
  viewCount: number;
}
