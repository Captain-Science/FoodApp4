import React, { useState, useEffect, useCallback } from 'react';
import { Product, Article, User, Review, UserProductInteraction, UserArticleInteraction, ViewMode, SelectedItem, ProductCategory, Event, DiscussionTopic, DiscussionPost, ProductStatus, HeaderNotice, RankedProduct } from './types';
import { INITIAL_PRODUCTS, INITIAL_ARTICLES, INITIAL_USERS, INITIAL_EVENTS, INITIAL_DISCUSSION_TOPICS, INITIAL_DISCUSSION_POSTS, HEADER_NOTICES as INITIAL_HEADER_NOTICES } from './constants';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import ArticleCard from './components/ArticleCard';
import ReviewModal from './components/ReviewModal';
import AdminPanel from './components/AdminPanel';
import CalendarView from './components/CalendarView';
import DiscussionForumView from './components/DiscussionForumView';
import DiscussionThreadView from './components/DiscussionThreadView';
import DonateFoodPage from './components/DonateFoodPage';
import GetFoodPage from './components/GetFoodPage';


function App(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [discussionTopics, setDiscussionTopics] = useState<DiscussionTopic[]>([]);
  const [discussionPosts, setDiscussionPosts] = useState<DiscussionPost[]>([]);
  const [headerNotices, setHeaderNotices] = useState<HeaderNotice[]>(INITIAL_HEADER_NOTICES);
  const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.AllProducts);
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>({type: 'all_products', id: 'all'});
  const [selectedProductForReview, setSelectedProductForReview] = useState<Product | null>(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [topRankedProducts, setTopRankedProducts] = useState<RankedProduct[]>([]);


  useEffect(() => {
    const safeParse = <T,>(key: string, fallback: T[]): T[] => {
      try {
        const storedData = localStorage.getItem(key);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          // Basic check if it's an array, adjust if other structures are expected for some keys
          return Array.isArray(parsedData) ? parsedData : fallback;
        }
        return fallback;
      } catch (error) {
        console.error(`Error parsing ${key} from localStorage:`, error);
        return fallback; // Fallback to initial data if parsing fails
      }
    };

    const loadData = () => {
      setProducts(safeParse<Product>('groceryAppProducts', INITIAL_PRODUCTS));
      setArticles(safeParse<Article>('groceryAppArticles', INITIAL_ARTICLES));
      setEvents(safeParse<Event>('groceryAppEvents', INITIAL_EVENTS));
      setDiscussionTopics(safeParse<DiscussionTopic>('groceryAppDiscussionTopics', INITIAL_DISCUSSION_TOPICS));
      setDiscussionPosts(safeParse<DiscussionPost>('groceryAppDiscussionPosts', INITIAL_DISCUSSION_POSTS));
      
      const initialUsers = safeParse<User>('groceryAppUsers', INITIAL_USERS);
      setUsers(initialUsers);

      setHeaderNotices(safeParse<HeaderNotice>('groceryAppHeaderNotices', INITIAL_HEADER_NOTICES));

      const lastUserId = localStorage.getItem('groceryAppLastUser');
      const userToLoad = initialUsers.find((u: User) => u.id === lastUserId) || initialUsers[0] || null;
      setCurrentUser(userToLoad);
    };
    loadData();
  }, []);

  useEffect(() => { if (products.length > 0) localStorage.setItem('groceryAppProducts', JSON.stringify(products)); }, [products]);
  useEffect(() => { if (articles.length > 0) localStorage.setItem('groceryAppArticles', JSON.stringify(articles)); }, [articles]);
  useEffect(() => { if (events.length > 0) localStorage.setItem('groceryAppEvents', JSON.stringify(events)); }, [events]);
  useEffect(() => { if (discussionTopics.length > 0) localStorage.setItem('groceryAppDiscussionTopics', JSON.stringify(discussionTopics)); }, [discussionTopics]);
  useEffect(() => { if (discussionPosts.length > 0) localStorage.setItem('groceryAppDiscussionPosts', JSON.stringify(discussionPosts)); }, [discussionPosts]);
  useEffect(() => { if (headerNotices.length > 0) localStorage.setItem('groceryAppHeaderNotices', JSON.stringify(headerNotices)); }, [headerNotices]);
  
  useEffect(() => { 
    if (users.length > 0) localStorage.setItem('groceryAppUsers', JSON.stringify(users));
    if (currentUser) {
        const updatedCurrentUser = users.find(u => u.id === currentUser.id);
        if (updatedCurrentUser) setCurrentUser(updatedCurrentUser); // Ensure currentUser state is in sync with users array
        localStorage.setItem('groceryAppLastUser', currentUser.id);
    }
  }, [users, currentUser]);

  useEffect(() => {
    if (headerNotices.length === 0) return;
    const noticeInterval = setInterval(() => {
      setCurrentNoticeIndex(prevIndex => (prevIndex + 1) % headerNotices.length);
    }, 7000); // Change notice every 7 seconds
    return () => clearInterval(noticeInterval);
  }, [headerNotices]); // Removed headerNotices.length as headerNotices is sufficient

  const getAverageRating = (product: Product): number => {
    if (!product.reviews || product.reviews.length === 0) return 0;
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    return parseFloat((totalRating / product.reviews.length).toFixed(1));
  };

  const calculateProductScore = (product: Product): number => {
    const averageRating = getAverageRating(product);
    const score = (product.upvotes - product.downvotes) + (averageRating * 5);
    return parseFloat(score.toFixed(1));
  };

  useEffect(() => {
    const ranked: RankedProduct[] = products
      .map(p => ({
        ...p,
        averageRating: getAverageRating(p),
        score: calculateProductScore(p),
      }))
      .sort((a, b) => b.score - a.score) 
      .slice(0, 10); 
    setTopRankedProducts(ranked);
  }, [products]);


  const handleUserChange = (userId: string) => {
    const user = users.find(u => u.id === userId);
    setCurrentUser(user || null);
  };

  const handleSelectItem = useCallback((item: SelectedItem) => {
    setSelectedItem(item);
    if (item.type === 'product') setViewMode(ViewMode.Product);
    else if (item.type === 'category') setViewMode(ViewMode.Category);
    else if (item.type === 'article') setViewMode(ViewMode.Article);
    else if (item.type === 'all_products') setViewMode(ViewMode.AllProducts);
    else if (item.type === 'all_articles') setViewMode(ViewMode.AllArticles);
    else if (item.type === 'discussion_topic') {
        setViewMode(ViewMode.DiscussionThread);
        setDiscussionTopics(prevTopics => prevTopics.map(t => t.id === item.id ? {...t, viewCount: (t.viewCount || 0) + 1} : t));
    }
    setShowMobileSidebar(false);
  }, []);

  const handleShowFavorites = useCallback(() => {
    setViewMode(ViewMode.Favorites);
    setSelectedItem(null);
    setShowMobileSidebar(false);
  }, []);
  
  const handleShowAdminPanel = useCallback(() => {
    if (currentUser?.isAdmin) {
      setViewMode(ViewMode.Admin);
      setSelectedItem(null);
      setShowMobileSidebar(false);
    }
  }, [currentUser]);

  const handleShowCalendar = useCallback(() => {
    setViewMode(ViewMode.Calendar);
    setSelectedItem(null);
    setShowMobileSidebar(false);
  }, []);

  const handleShowDiscussionForum = useCallback(() => {
    setViewMode(ViewMode.DiscussionForum);
    setSelectedItem(null);
    setShowNewTopicForm(false); 
    setShowMobileSidebar(false);
  }, []);

  const handleShowDonatePage = useCallback(() => {
    setViewMode(ViewMode.DonateFoodPage);
    setSelectedItem(null);
    setShowMobileSidebar(false);
  }, []);

  const handleShowGetFoodPage = useCallback(() => {
    setViewMode(ViewMode.GetFoodPage);
    setSelectedItem(null);
    setShowMobileSidebar(false);
  }, []);

  const toggleFavoriteProduct = (productId: string) => {
    if (!currentUser) return;
    setUsers(prevUsers => prevUsers.map(user => {
      if (user.id === currentUser.id) {
        const interactions = user.productInteractions[productId] || { thumbsState: 'none', isFavorited: false };
        return {
          ...user,
          productInteractions: {
            ...user.productInteractions,
            [productId]: { ...interactions, isFavorited: !interactions.isFavorited },
          },
        };
      }
      return user;
    }));
  };
  
  const toggleFavoriteArticle = (articleId: string) => {
    if (!currentUser) return;
     setUsers(prevUsers => prevUsers.map(user => {
      if (user.id === currentUser.id) {
        const interactions = user.articleInteractions[articleId] || { isFavorited: false };
        return {
          ...user,
          articleInteractions: {
            ...user.articleInteractions,
            [articleId]: { ...interactions, isFavorited: !interactions.isFavorited },
          },
        };
      }
      return user;
    }));
  };

  const handleProductVote = (productId: string, voteType: 'up' | 'down') => {
    if (!currentUser) return;
    setProducts(prevProducts => prevProducts.map(p => {
      if (p.id === productId) {
        const userInteraction = currentUser.productInteractions[productId] || { thumbsState: 'none', isFavorited: false };
        let newUpvotes = p.upvotes;
        let newDownvotes = p.downvotes;

        if (voteType === 'up') {
          if (userInteraction.thumbsState === 'up') { newUpvotes--; } 
          else { newUpvotes++; if (userInteraction.thumbsState === 'down') newDownvotes--; }
        } else { 
          if (userInteraction.thumbsState === 'down') { newDownvotes--; } 
          else { newDownvotes++; if (userInteraction.thumbsState === 'up') newUpvotes--; }
        }
        return { ...p, upvotes: Math.max(0, newUpvotes), downvotes: Math.max(0, newDownvotes) };
      }
      return p;
    }));

    setUsers(prevUsers => prevUsers.map(user => {
      if (user.id === currentUser.id) {
        const interactions = user.productInteractions[productId] || { thumbsState: 'none', isFavorited: false };
        const newThumbsState = interactions.thumbsState === voteType ? 'none' : voteType;
        return {
          ...user,
          productInteractions: {
            ...user.productInteractions,
            [productId]: { ...interactions, thumbsState: newThumbsState },
          },
        };
      }
      return user;
    }));
  };

  const handleAddReview = (productId: string, reviewText: string, rating: number) => {
    if (!currentUser) return;
    const newReview: Review = {
      id: `review-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: currentUser.id,
      userName: currentUser.name,
      rating,
      text: reviewText,
      date: new Date().toISOString().split('T')[0],
    };
    setProducts(prevProducts => prevProducts.map(p => 
      p.id === productId ? { ...p, reviews: [...p.reviews, newReview] } : p
    ));
    setSelectedProductForReview(null); 
  };
  
  const handleEditReview = (productId: string, reviewId: string, reviewText: string, rating: number) => {
    if (!currentUser) return;
     setProducts(prevProducts => prevProducts.map(p => {
        if (p.id === productId) {
            return {
                ...p,
                reviews: p.reviews.map(r => 
                    r.id === reviewId && r.userId === currentUser.id 
                    ? { ...r, text: reviewText, rating: rating, date: new Date().toISOString().split('T')[0] } 
                    : r
                ),
            };
        }
        return p;
    }));
    setSelectedProductForReview(null); 
  };

  const handleDeleteReview = (productId: string, reviewId: string) => {
    const product = products.find(p => p.id === productId);
    const review = product?.reviews.find(r => r.id === reviewId);

    if (!currentUser || (!currentUser.isAdmin && review?.userId !== currentUser.id)) {
        alert("You can only delete your own reviews, or an administrator can delete any review.");
        return;
    }
    if (window.confirm("Are you sure you want to delete this review? This action cannot be undone.")) {
        setProducts(prevProducts => prevProducts.map(p => {
            if (p.id === productId) {
                return {
                    ...p,
                    reviews: p.reviews.filter(r => r.id !== reviewId),
                };
            }
            return p;
        }));
    }
  };

  const handleAddProduct = (newProductData: Omit<Product, 'id' | 'upvotes' | 'downvotes' | 'reviews'>) => {
    const newProduct: Product = {
      ...newProductData,
      status: newProductData.status || [],
      id: `${newProductData.category}_${newProductData.name.replace(/\s+/g, '')}_${Date.now()}`,
      upvotes: 0, downvotes: 0, reviews: [],
    };
    setProducts(prev => [newProduct, ...prev]);
    alert('Product added successfully!');
  };

  const handleAddArticle = (newArticleData: Omit<Article, 'id'>) => {
    const newArticle: Article = {
      ...newArticleData,
      id: `article_${newArticleData.title.replace(/\s+/g, '')}_${Date.now()}`,
    };
    setArticles(prev => [newArticle, ...prev]);
    alert('Article added successfully!');
  };

  const handleAddEvent = (newEventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
        ...newEventData,
        id: `event_${newEventData.title.replace(/\s+/g, '')}_${Date.now()}`,
    };
    setEvents(prev => [newEvent, ...prev].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
    alert('Event added successfully!');
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
        setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleDeleteArticle = (articleId: string) => {
     if (window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
        setArticles(prev => prev.filter(a => a.id !== articleId));
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    if (window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
        setEvents(prev => prev.filter(e => e.id !== eventId));
    }
  };

  const handleUpdateProductStatus = (productId: string, statusToUpdate: ProductStatus, isChecked: boolean) => {
    setProducts(prevProducts => prevProducts.map(p => {
        if (p.id === productId) {
            const currentStatus = p.status || [];
            let newStatus: ProductStatus[];
            if (isChecked) {
                newStatus = [...new Set([...currentStatus, statusToUpdate])];
            } else {
                newStatus = currentStatus.filter(s => s !== statusToUpdate);
            }
            return { ...p, status: newStatus };
        }
        return p;
    }));
  };

  const handleBulkUpdateProductStatus = (productIds: string[], statusToModify: ProductStatus, action: 'add' | 'remove') => {
    setProducts(prevProducts => prevProducts.map(p => {
        if (productIds.includes(p.id)) {
            const currentStatus = p.status || [];
            let newStatus: ProductStatus[];
            if (action === 'add') {
                newStatus = [...new Set([...currentStatus, statusToModify])];
            } else {
                newStatus = currentStatus.filter(s => s !== statusToModify);
            }
            return { ...p, status: newStatus };
        }
        return p;
    }));
    alert(`Status '${statusToModify}' ${action === 'add' ? 'added to' : 'removed from'} ${productIds.length} products.`);
  };
  
  const handleAddDiscussionTopic = (title: string, firstPostContent: string) => {
    if (!currentUser || !title.trim() || !firstPostContent.trim()) {
        alert("Title and first post content are required.");
        return;
    }
    const now = new Date().toISOString();
    const newTopicId = `topic-${Date.now()}`;
    const newTopic: DiscussionTopic = {
        id: newTopicId,
        title,
        createdByUserId: currentUser.id,
        createdByUserName: currentUser.name,
        createdAt: now,
        lastReplyAt: now,
        replyCount: 1, 
        viewCount: 0,
    };
    const firstPost: DiscussionPost = {
        id: `post-${Date.now()}`,
        topicId: newTopicId,
        userId: currentUser.id,
        userName: currentUser.name,
        content: firstPostContent,
        date: now,
    };
    setDiscussionTopics(prev => [newTopic, ...prev]);
    setDiscussionPosts(prev => [firstPost, ...prev]);
    setShowNewTopicForm(false);
    setViewMode(ViewMode.DiscussionThread);
    setSelectedItem({type: 'discussion_topic', id: newTopicId});
    alert('Topic created successfully!');
  };

  const handleAddDiscussionPost = (topicId: string, content: string) => {
      if (!currentUser || !content.trim()) return;
      const now = new Date().toISOString();
      const newPost: DiscussionPost = {
          id: `post-${Date.now()}`,
          topicId,
          userId: currentUser.id,
          userName: currentUser.name,
          content,
          date: now,
      };
      setDiscussionPosts(prev => [newPost, ...prev]);
      setDiscussionTopics(prevTopics => prevTopics.map(t => 
          t.id === topicId ? { ...t, replyCount: t.replyCount + 1, lastReplyAt: now } : t
      ));
  };

  const handleDeleteDiscussionPost = (topicId: string, postId: string) => {
    const postToDelete = discussionPosts.find(p => p.id === postId);
    if (!currentUser || (!currentUser.isAdmin && postToDelete?.userId !== currentUser.id)) {
        alert("You can only delete your own posts or an administrator can delete any post.");
        return;
    }
    if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
        setDiscussionPosts(prevPosts => prevPosts.filter(p => p.id !== postId));
        setDiscussionTopics(prevTopics => prevTopics.map(t =>
            t.id === topicId ? { ...t, replyCount: Math.max(0, t.replyCount - 1) } : t
        ));
    }
  };

  const handleAddHeaderNotice = (notice: Omit<HeaderNotice, 'id'>) => {
    const newNotice: HeaderNotice = { ...notice, id: `notice-${Date.now()}`};
    setHeaderNotices(prev => [newNotice, ...prev]);
  };

  const handleUpdateHeaderNotice = (updatedNotice: HeaderNotice) => {
    setHeaderNotices(prev => prev.map(n => n.id === updatedNotice.id ? updatedNotice : n));
  };

  const handleDeleteHeaderNotice = (noticeId: string) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
        setHeaderNotices(prev => prev.filter(n => n.id !== noticeId));
    }
  };
  
  const featuredArticles = articles.filter(article => article.isFeatured).slice(0, 3);

  const handleFormSubmit = (formType: 'donate' | 'getFood', data: any) => { 
    console.log(`${formType} form submitted:`, data); 
    alert('Thank you! Your request has been noted. We will be in touch if a backend is implemented.');
    setViewMode(ViewMode.AllProducts); 
  };

  const renderContent = () => { 
    let itemsToDisplay: React.ReactNode[] = [];
    let title = "Explore Products & Articles";
    let mainContentAreaClasses = "grid grid-cols-1 gap-4 md:gap-6";
    if (viewMode !== ViewMode.Admin && viewMode !== ViewMode.Article && viewMode !== ViewMode.DiscussionThread && viewMode !== ViewMode.Calendar && viewMode !== ViewMode.DonateFoodPage && viewMode !== ViewMode.GetFoodPage) {
        mainContentAreaClasses += " md:grid-cols-2 xl:grid-cols-3";
    }

    switch (viewMode) {
      case ViewMode.AllProducts:
        title = "All Products";
        itemsToDisplay = products.map(p => ( <ProductCard key={p.id} product={p} interaction={currentUser?.productInteractions[p.id]} onToggleFavorite={toggleFavoriteProduct} onVote={handleProductVote} onOpenReviews={setSelectedProductForReview} /> ));
        break;
      case ViewMode.AllArticles:
        title = "All Articles";
        itemsToDisplay = articles.map(a => ( <ArticleCard key={a.id} article={a} interaction={currentUser?.articleInteractions[a.id]} onToggleFavorite={toggleFavoriteArticle} onViewArticle={(articleItem) => handleSelectItem({ type: 'article', id: articleItem.id })} /> ));
        break;
      case ViewMode.Category:
        if (selectedItem && selectedItem.type === 'category') {
          title = `Products in ${selectedItem.id}`;
          itemsToDisplay = products.filter(p => p.category === selectedItem.id) .map(p => ( <ProductCard key={p.id} product={p} interaction={currentUser?.productInteractions[p.id]} onToggleFavorite={toggleFavoriteProduct} onVote={handleProductVote} onOpenReviews={setSelectedProductForReview} /> ));
        }
        break;
      case ViewMode.Product:
        if (selectedItem && selectedItem.type === 'product') {
          const product = products.find(p => p.id === selectedItem.id);
          if (product) { title = product.name; itemsToDisplay = [(<ProductCard key={product.id} product={product} interaction={currentUser?.productInteractions[product.id]} onToggleFavorite={toggleFavoriteProduct} onVote={handleProductVote} onOpenReviews={setSelectedProductForReview} />)]; }
        }
        break;
      case ViewMode.Article:
        if (selectedItem && selectedItem.type === 'article') {
          const articleToView = articles.find(a => a.id === selectedItem.id);
          if (articleToView) {
            title = articleToView.title;
            itemsToDisplay = [( 
              <div key={articleToView.id} className="bg-white rounded-xl shadow-2xl p-6 md:p-8 m-2 text-green-800 border border-lime-200">
                <img src={articleToView.image} alt={articleToView.title} className="w-full h-64 object-cover rounded-lg mb-6"/>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-3xl font-bold text-orange-700">{articleToView.title}</h2>
                     <button onClick={() => toggleFavoriteArticle(articleToView.id)} title={currentUser?.articleInteractions[articleToView.id]?.isFavorited ? "Remove from favorites" : "Add to favorites"} className={`p-2 rounded-full transition-colors duration-200 ${ currentUser?.articleInteractions[articleToView.id]?.isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500' }`} > 
                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                         <path d="M11.645 20.91a.75.75 0 0 0 1.09 0l.752-.705c.27-.25.524-.51.772-.778a50.64 50.64 0 0 0 4.197-5.043c1.48-2.068 1.986-4.568 1.498-6.823-.488-2.254-2.264-4.148-4.616-4.616-2.352-.47-4.803.018-6.871 1.498a.751.751 0 0 1-1.042 0c-2.068-1.48-4.52-1.968-6.871-1.498-2.352.468-4.128 2.362-4.616 4.616-.488 2.255.018 4.755 1.498 6.823a50.64 50.64 0 0 0 4.197 5.043c.248.268.502.528.772.778l.752.705Z" />
                        </svg>
                    </button>
                </div>
                <p className="text-sm text-gray-500 mb-2">By {articleToView.author} on {new Date(articleToView.date).toLocaleDateString()}</p>
                <div className="prose max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: articleToView.content.replace(/\n/g, '<br/>') }}></div>
              </div>
            )];
          }
        }
        break;
      case ViewMode.Favorites:
        title = "My Favorites";
        if (currentUser) {
          const favProducts = products.filter(p => currentUser.productInteractions[p.id]?.isFavorited).map(p => ( <ProductCard key={`fav-${p.id}`} product={p} interaction={currentUser.productInteractions[p.id]} onToggleFavorite={toggleFavoriteProduct} onVote={handleProductVote} onOpenReviews={setSelectedProductForReview} /> ));
          const favArticles = articles.filter(a => currentUser.articleInteractions[a.id]?.isFavorited).map(a => ( <ArticleCard key={`fav-${a.id}`} article={a} interaction={currentUser.articleInteractions[a.id]} onToggleFavorite={toggleFavoriteArticle} onViewArticle={(articleItem) => handleSelectItem({ type: 'article', id: articleItem.id })} /> ));
          itemsToDisplay = [...favProducts, ...favArticles];
        }
        if(itemsToDisplay.length === 0) { itemsToDisplay = [<p key="no-favs" className="text-gray-500 text-center col-span-full py-8">You haven't favorited any items yet.</p>]; }
        break;
      case ViewMode.Admin:
         title = "Administration";
         itemsToDisplay = currentUser?.isAdmin ? [<AdminPanel 
            key="adminpanel" 
            products={products} 
            articles={articles}
            events={events}
            headerNotices={headerNotices}
            topProducts={topRankedProducts} 
            onAddProduct={handleAddProduct} 
            onAddArticle={handleAddArticle} 
            onAddEvent={handleAddEvent} 
            onAddHeaderNotice={handleAddHeaderNotice}
            onUpdateHeaderNotice={handleUpdateHeaderNotice}
            onDeleteHeaderNotice={handleDeleteHeaderNotice}
            onDeleteProduct={handleDeleteProduct}
            onDeleteArticle={handleDeleteArticle}
            onDeleteEvent={handleDeleteEvent}
            onUpdateProductStatus={handleUpdateProductStatus} 
            onBulkUpdateProductStatus={handleBulkUpdateProductStatus}
            />] : [];
        break;
      case ViewMode.Calendar:
        title = "Upcoming Events";
        itemsToDisplay = [<CalendarView key="calendarview" events={events} />];
        mainContentAreaClasses = "grid grid-cols-1 gap-4 md:gap-6";
        break;
      case ViewMode.DiscussionForum:
        title = "Discussion Forum";
        const newTopicForm = (
            <form key="new-topic-form" onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const topicTitle = (form.elements.namedItem('topicTitle') as HTMLInputElement).value;
                const topicContent = (form.elements.namedItem('topicContent') as HTMLTextAreaElement).value;
                handleAddDiscussionTopic(topicTitle, topicContent);
                form.reset();
            }} className="mb-6 p-4 bg-lime-50 rounded-lg shadow border border-lime-200">
                <h3 className="text-lg font-semibold text-emerald-600 mb-3">Start a New Topic</h3>
                <input type="text" name="topicTitle" placeholder="Topic Title" required 
                       className="w-full p-2.5 mb-2 bg-white border border-lime-300 rounded-md text-green-800 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm placeholder-gray-400" />
                <textarea name="topicContent" placeholder="Your first post..." rows={3} required 
                          className="w-full p-2.5 mb-2 bg-white border border-lime-300 rounded-md text-green-800 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm placeholder-gray-400"></textarea>
                <div className="flex justify-end space-x-2">
                    <button type="button" onClick={() => setShowNewTopicForm(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md transition-colors">Cancel</button>
                    <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition-colors">Create Topic</button>
                </div>
            </form>
        );
        itemsToDisplay = [
            showNewTopicForm ? newTopicForm : null,
            <DiscussionForumView 
                key="forumview" 
                topics={discussionTopics} 
                onSelectTopic={(topicId) => handleSelectItem({type: 'discussion_topic', id: topicId})}
                onStartNewTopic={() => setShowNewTopicForm(true)}
            />
        ].filter(Boolean) as React.ReactNode[];
        mainContentAreaClasses = "grid grid-cols-1 gap-4 md:gap-6";
        break;
      case ViewMode.DiscussionThread:
        if (selectedItem && selectedItem.type === 'discussion_topic') {
            const topic = discussionTopics.find(t => t.id === selectedItem.id);
            const postsForTopic = discussionPosts.filter(p => p.topicId === selectedItem.id).sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            if (topic) {
                title = topic.title;
                itemsToDisplay = [<DiscussionThreadView 
                                    key={`thread-${topic.id}`}
                                    topic={topic} 
                                    posts={postsForTopic} 
                                    currentUser={currentUser}
                                    onAddPost={handleAddDiscussionPost}
                                    onBackToForum={handleShowDiscussionForum}
                                    isAdmin={currentUser?.isAdmin || false}
                                    onDeletePost={handleDeleteDiscussionPost}
                                  />];
            } else {
                title = "Topic Not Found";
                itemsToDisplay = [<p key="topic-not-found" className="text-gray-400">Could not load the discussion topic.</p>];
            }
        }
        mainContentAreaClasses = "grid grid-cols-1 gap-4 md:gap-6";
        break;
      case ViewMode.DonateFoodPage:
        title = "Donate Food";
        itemsToDisplay = [<DonateFoodPage key="donatefood" onSubmit={(data) => handleFormSubmit('donate', data)} />];
        mainContentAreaClasses = "max-w-2xl mx-auto";
        break;
      case ViewMode.GetFoodPage:
        title = "Get Food";
        itemsToDisplay = [<GetFoodPage key="getfood" onSubmit={(data) => handleFormSubmit('getFood', data)} />];
        mainContentAreaClasses = "max-w-2xl mx-auto";
        break;
      default:
        itemsToDisplay = [<p key="select-item" className="text-gray-400">Select an item from the menu.</p>];
    }

    return (
      <div className="p-4 md:p-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-emerald-600 mb-6 md:mb-8">{title}</h1>
        {itemsToDisplay.length > 0 ? (
            <div className={mainContentAreaClasses}>
                {itemsToDisplay}
            </div>
        ) : (
             <p className="text-gray-500 text-center col-span-full py-8">No items to display for this selection.</p>
        )}
      </div>
    );
  };
  
  const productForReviewModal = selectedProductForReview ? products.find(p => p.id === selectedProductForReview.id) : null;

  if (!currentUser && users.length > 0) { 
     setCurrentUser(users[0]); 
     return <div className="flex items-center justify-center h-screen bg-lime-50 text-green-800 text-xl">Initializing user...</div>; 
  }
   if (users.length === 0) { 
     return <div className="flex items-center justify-center h-screen bg-lime-50 text-red-600 text-xl">Error: No user data available. Application cannot start.</div>;
   }
   if (!currentUser) { 
     return <div className="flex items-center justify-center h-screen bg-lime-50 text-red-600 text-xl">Error: Current user not set. Application cannot start.</div>;
   }


  return (
    <div className="flex flex-col h-screen">
      <header className="bg-blue-600 shadow-lg p-5 md:p-7 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center">
           <button onClick={() => setShowMobileSidebar(!showMobileSidebar)} className="md:hidden mr-3 p-2 text-sky-200 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"> <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /> </svg>
          </button>
          <div className="text-xl md:text-2xl font-bold text-white mr-3 md:mr-5">APP LOGO</div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Grocery Reviews
          </h1>
          <div className="hidden lg:block w-24 h-12 bg-sky-200 ml-5 rounded text-blue-700 text-sm flex items-center justify-center">Site Img</div>
        </div>
        {headerNotices.length > 0 && headerNotices[currentNoticeIndex] && (
            <div className="text-sm md:text-base lg:text-lg text-black bg-yellow-400 px-4 py-2 rounded hidden sm:block truncate max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg" title={headerNotices[currentNoticeIndex].message}>
            <strong className="font-semibold">{headerNotices[currentNoticeIndex].title}</strong> {headerNotices[currentNoticeIndex].message}
            </div>
        )}
        <div className="flex items-center space-x-2 md:space-x-4">
          <select value={currentUser.id} onChange={(e) => handleUserChange(e.target.value)} className="bg-blue-500 text-white text-sm md:text-base p-2 md:p-2.5 rounded-md focus:ring-sky-300 focus:border-sky-300 cursor-pointer border border-blue-400" aria-label="Select user" >
            {users.map(u => <option key={u.id} value={u.id}>{u.name} {u.isAdmin ? '(Admin)' : ''}</option>)}
          </select>
          <button onClick={() => alert("Logout functionality would be here.")} className="bg-red-500 hover:bg-red-600 text-white text-sm md:text-base font-semibold py-2 px-3 md:py-2.5 md:px-4 rounded-lg shadow-md transition-colors" >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <div className="hidden md:block w-80 h-full flex-shrink-0">
           <Sidebar 
            products={products} 
            articles={articles} 
            featuredArticles={featuredArticles}
            events={events}
            topics={discussionTopics}
            onSelectItem={handleSelectItem}
            onShowFavorites={handleShowFavorites}
            onShowAdminPanel={handleShowAdminPanel}
            onShowCalendar={handleShowCalendar}
            onShowDiscussionForum={handleShowDiscussionForum}
            onShowDonatePage={handleShowDonatePage}
            onShowGetFoodPage={handleShowGetFoodPage}
            currentUserIsAdmin={currentUser.isAdmin}
          />
        </div>
        {showMobileSidebar && (
            <div className="md:hidden fixed inset-0 z-30 flex">
                <div className="w-full max-w-xs bg-lime-100 h-full shadow-2xl overflow-y-auto">
                     <Sidebar 
                        products={products} 
                        articles={articles} 
                        featuredArticles={featuredArticles}
                        events={events}
                        topics={discussionTopics}
                        onSelectItem={handleSelectItem}
                        onShowFavorites={handleShowFavorites}
                        onShowAdminPanel={handleShowAdminPanel}
                        onShowCalendar={handleShowCalendar}
                        onShowDiscussionForum={handleShowDiscussionForum}
                        onShowDonatePage={handleShowDonatePage}
                        onShowGetFoodPage={handleShowGetFoodPage}
                        currentUserIsAdmin={currentUser.isAdmin}
                      />
                </div>
                <div className="flex-1 bg-black/50" onClick={() => setShowMobileSidebar(false)}></div>
            </div>
        )}

        <main className="flex-1 overflow-y-auto bg-lime-100 shadow-inner-left">
          {renderContent()}
        </main>
      </div>
      
      <footer className="bg-blue-700 text-center p-3 md:p-4 text-xs md:text-sm text-sky-100 border-t border-blue-600">
        <div className="space-x-3 mb-2">
            <a href="#" className="hover:text-white hover:underline">About Us</a>
            <span className="text-blue-300">|</span>
            <a href="#" className="hover:text-white hover:underline">Contact Us</a>
            <span className="text-blue-300">|</span>
            <a href="#" className="hover:text-white hover:underline">Privacy Policy</a>
            <span className="text-blue-300">|</span>
            <a href="#" className="hover:text-white hover:underline">Terms of Service</a>
        </div>
        &copy; {new Date().getFullYear()} Grocery Product Reviews. All rights reserved.
      </footer>

      {productForReviewModal && currentUser && (
        <ReviewModal 
          product={productForReviewModal} 
          currentUser={currentUser}
          onClose={() => setSelectedProductForReview(null)}
          onAddReview={handleAddReview}
          onEditReview={handleEditReview}
          isAdmin={currentUser.isAdmin || false} 
          onDeleteReview={handleDeleteReview}
        />
      )}
    </div>
  );
}

export default App;