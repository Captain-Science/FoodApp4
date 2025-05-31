import { Product, Article, User, ProductCategory, Review, ProductStatus, Event, HeaderNotice, DiscussionTopic, DiscussionPost } from './types';

const commonReviewId1 = `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
const commonReviewId2 = `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'Fruits_Apples',
    category: ProductCategory.Fruits,
    name: 'Crisp Red Apples',
    image: 'https://picsum.photos/seed/apples/300/200',
    info: 'Organic, locally sourced, sweet and juicy. Perfect for snacking or baking.',
    upvotes: 25,
    downvotes: 2,
    reviews: [
      { id: commonReviewId1, userId: 'user2', userName: 'Jane Doe', rating: 5, text: 'Absolutely delicious and so fresh!', date: '2023-10-01' },
      { id: `review-${Date.now()}-2`, userId: 'user1', userName: 'John Smith', rating: 4, text: 'Great apples, very crispy.', date: '2023-10-02' },
    ],
    status: [ProductStatus.Organic, ProductStatus.ProductType_Fresh, ProductStatus.NoLimit, ProductStatus.NewProduct],
  },
  {
    id: 'Fruits_Bananas',
    category: ProductCategory.Fruits,
    name: 'Ripe Bananas',
    image: 'https://picsum.photos/seed/bananas/300/200',
    info: 'Rich in potassium, naturally sweet. Ideal for smoothies or a quick energy boost.',
    upvotes: 40,
    downvotes: 1,
    reviews: [],
    status: [ProductStatus.ProductType_Fresh, ProductStatus.Perishable],
  },
  {
    id: 'Vegetables_Carrots',
    category: ProductCategory.Vegetables,
    name: 'Organic Carrots',
    image: 'https://picsum.photos/seed/carrots/300/200',
    info: 'Crunchy and sweet, packed with Vitamin A. Great for salads, roasting, or juicing.',
    upvotes: 30,
    downvotes: 0,
    reviews: [
      { id: commonReviewId2, userId: 'user1', userName: 'John Smith', rating: 5, text: 'Best carrots I have had in a while!', date: '2023-09-28' },
    ],
    status: [ProductStatus.Organic, ProductStatus.ProductType_Fresh, ProductStatus.OnSale],
  },
  {
    id: 'Vegetables_Broccoli',
    category: ProductCategory.Vegetables,
    name: 'Fresh Broccoli',
    image: 'https://picsum.photos/seed/broccoli/300/200',
    info: 'High in fiber and Vitamin C. Versatile for steaming, stir-frying, or adding to casseroles.',
    upvotes: 22,
    downvotes: 3,
    reviews: [],
    status: [ProductStatus.ProductType_Fresh, ProductStatus.LimitedSupply],
  },
  {
    id: 'Dairy_Milk',
    category: ProductCategory.Dairy,
    name: 'Organic Whole Milk',
    image: 'https://picsum.photos/seed/milk/300/200',
    info: 'Creamy and delicious, sourced from grass-fed cows. Perfect for cereals, coffee, or drinking.',
    upvotes: 50,
    downvotes: 1,
    reviews: [],
    status: [ProductStatus.Organic, ProductStatus.Perishable, ProductStatus.ProductType_Refrigerated, ProductStatus.ExpiringSoon],
  },
  {
    id: 'Bakery_Bread',
    category: ProductCategory.Bakery,
    name: 'Sourdough Bread',
    image: 'https://picsum.photos/seed/bread/300/200',
    info: 'Artisan sourdough with a tangy flavor and chewy crust. Made with natural starter.',
    upvotes: 35,
    downvotes: 2,
    reviews: [],
    status: [ProductStatus.ProductType_Fresh, ProductStatus.ContainsSoy],
  },
  {
    id: 'Pantry_OliveOil',
    category: ProductCategory.Pantry,
    name: 'Extra Virgin Olive Oil',
    image: 'https://picsum.photos/seed/oliveoil/300/200',
    info: 'Cold-pressed, rich flavor. Ideal for dressings, cooking, and dipping.',
    upvotes: 60,
    downvotes: 0,
    reviews: [],
    status: [ProductStatus.Organic, ProductStatus.NoLimit, ProductStatus.ProductType_ShelfStable],
  },
   {
    id: 'Frozen_Peas',
    category: ProductCategory.Frozen,
    name: 'Sweet Green Peas',
    image: 'https://picsum.photos/seed/frozenpeas/300/200',
    info: 'Quick-frozen to lock in freshness. Easy to prepare.',
    upvotes: 15,
    downvotes: 0,
    reviews: [],
    status: [ProductStatus.ProductType_Frozen, ProductStatus.GMO, ProductStatus.OnSale],
  },
  {
    id: 'Beverages_OrangeJuice',
    category: ProductCategory.Beverages,
    name: 'Fresh Orange Juice',
    image: 'https://picsum.photos/seed/orangejuice/300/200',
    info: '100% pure squeezed orange juice. No added sugar.',
    upvotes: 28,
    downvotes: 1,
    reviews: [],
    status: [ProductStatus.ProductType_Fresh, ProductStatus.Perishable, ProductStatus.HighFructoseCornSyrup, ProductStatus.ProductType_Refrigerated],
  },
  {
    id: 'CannedGoods_Tomatoes',
    category: ProductCategory.CannedGoods,
    name: 'Diced Tomatoes',
    image: 'https://picsum.photos/seed/cannedtomatoes/300/200',
    info: 'Organic diced tomatoes in juice. Perfect for sauces and stews.',
    upvotes: 18,
    downvotes: 0,
    reviews: [],
    status: [ProductStatus.Organic, ProductStatus.ProductType_Canned, ProductStatus.ProductType_ShelfStable],
  },
  {
    id: 'DryGoods_Pasta',
    category: ProductCategory.DryGoods,
    name: 'Whole Wheat Pasta',
    image: 'https://picsum.photos/seed/pasta/300/200',
    info: 'Nutritious whole wheat spaghetti. Cooks in 8-10 minutes.',
    upvotes: 22,
    downvotes: 1,
    reviews: [],
    status: [ProductStatus.ProductType_DryGoods, ProductStatus.ProductType_ShelfStable, ProductStatus.Vegan],
  },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'article1',
    title: 'The Benefits of a Diet Rich in Fruits',
    content: 'Discover how incorporating a variety of fruits into your daily meals can boost your health and well-being. From essential vitamins to powerful antioxidants, fruits are nature\'s powerhouses...',
    author: 'Dr. Health Nut',
    date: '2023-09-15',
    image: 'https://picsum.photos/seed/fruitdiet/400/250',
    isFeatured: true,
  },
  {
    id: 'article2',
    title: 'Understanding Organic Labels',
    content: 'Navigating the world of organic food labels can be confusing. This guide breaks down what different certifications mean and how to choose the best organic products for your family...',
    author: 'Eco Consumer Guide',
    date: '2023-09-20',
    image: 'https://picsum.photos/seed/organiclabels/400/250',
    isFeatured: true,
  },
  {
    id: 'article3',
    title: 'Seasonal Eating: Why It Matters',
    content: 'Eating foods that are in season not only tastes better but also supports local farmers and is often more nutritious. Learn about the benefits of seasonal eating and find tips for your area...',
    author: 'Local Harvest Magazine',
    date: '2023-10-05',
    image: 'https://picsum.photos/seed/seasonaleating/400/250',
    // isFeatured: false, // or omit
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user1',
    name: 'John Smith',
    isAdmin: false,
    productInteractions: {
      'Fruits_Apples': { thumbsState: 'up', isFavorited: true },
      'Vegetables_Carrots': { thumbsState: 'none', isFavorited: false },
    },
    articleInteractions: {
      'article1': { isFavorited: true },
    },
  },
  {
    id: 'user2',
    name: 'Jane Doe',
    isAdmin: true,
    productInteractions: {
      'Fruits_Apples': { thumbsState: 'none', isFavorited: false },
      'Dairy_Milk': { thumbsState: 'up', isFavorited: true },
    },
    articleInteractions: {
      'article2': { isFavorited: true },
      'article3': { isFavorited: false },
    },
  },
  {
    id: 'user3',
    name: 'Alice Wonderland',
    isAdmin: false,
    productInteractions: {},
    articleInteractions: {},
  }
];

export const CATEGORY_IMAGES: Record<ProductCategory, string> = {
  [ProductCategory.Fruits]: 'https://picsum.photos/seed/categoryfruits/50/50',
  [ProductCategory.Vegetables]: 'https://picsum.photos/seed/categoryveg/50/50',
  [ProductCategory.Dairy]: 'https://picsum.photos/seed/categorydairy/50/50',
  [ProductCategory.Bakery]: 'https://picsum.photos/seed/categorybakery/50/50',
  [ProductCategory.Pantry]: 'https://picsum.photos/seed/categorypantry/50/50',
  [ProductCategory.Frozen]: 'https://picsum.photos/seed/categoryfrozen/50/50',
  [ProductCategory.Beverages]: 'https://picsum.photos/seed/categorybev/50/50',
  [ProductCategory.CannedGoods]: 'https://picsum.photos/seed/categorycanned/50/50',
  [ProductCategory.DryGoods]: 'https://picsum.photos/seed/categorydry/50/50',
  [ProductCategory.MeatSeafood]: 'https://picsum.photos/seed/categorymeat/50/50',
};

export const INITIAL_EVENTS: Event[] = [
  {
    id: 'event1',
    title: 'Farmers Market - Downtown',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
    time: '9:00 AM - 1:00 PM',
    location: 'Central Square',
    description: 'Join us for the weekly farmers market featuring fresh local produce, artisanal cheeses, and baked goods. Live music from 10 AM.',
    image: 'https://picsum.photos/seed/farmersmarket/400/200',
  },
  {
    id: 'event2',
    title: 'Organic Cooking Workshop',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days from now
    time: '6:00 PM - 8:00 PM',
    location: 'Community Kitchen Hub',
    description: 'Learn to prepare delicious and healthy meals using organic ingredients. Limited spots available, sign up now!',
    image: 'https://picsum.photos/seed/cookingworkshop/400/200',
  },
  {
    id: 'event3',
    title: 'Meet the Grower: Berry Farm Visit',
    date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days from now
    time: '1:00 PM - 4:00 PM',
    location: 'Sunshine Berry Farm',
    description: 'An exclusive tour of Sunshine Berry Farm. Meet the farmers, learn about sustainable practices, and pick your own berries.',
  }
];

export const HEADER_NOTICES: HeaderNotice[] = [
  { id: 'notice1', title: 'Fresh Arrivals!', message: 'New batch of organic strawberries just in.', type: 'success' },
  { id: 'notice2', title: 'Weekend Sale', message: '20% off all bakery items this Saturday & Sunday.', type: 'promo' },
  { id: 'notice3', title: 'Store Update', message: 'Extended hours starting next week: 8 AM - 9 PM daily.', type: 'info'},
  { id: 'notice4', title: 'Recipe Contest', message: 'Submit your best healthy recipe for a chance to win!', type: 'promo' },
  { id: 'notice5', title: 'Weather Advisory', message: 'Possible delivery delays due to weather. Check status.', type: 'warning' },
];

export const INITIAL_DISCUSSION_TOPICS: DiscussionTopic[] = [
    {
        id: 'topic1',
        title: 'Favorite Healthy Recipes?',
        createdByUserId: 'user1',
        createdByUserName: 'John Smith',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        lastReplyAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
        replyCount: 2,
        viewCount: 15,
    },
    {
        id: 'topic2',
        title: 'Tips for Reducing Food Waste',
        createdByUserId: 'user2',
        createdByUserName: 'Jane Doe',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        replyCount: 0,
        viewCount: 8,
    }
];

export const INITIAL_DISCUSSION_POSTS: DiscussionPost[] = [
    {
        id: 'post1',
        topicId: 'topic1',
        userId: 'user2',
        userName: 'Jane Doe',
        content: 'I love making a big quinoa salad at the start of the week. So versatile!',
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
        id: 'post2',
        topicId: 'topic1',
        userId: 'user3',
        userName: 'Alice Wonderland',
        content: 'My go-to is overnight oats with lots of berries and nuts. Easy and filling.',
        date: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    }
];