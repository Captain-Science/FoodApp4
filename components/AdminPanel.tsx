
import React, { useState, useEffect } from 'react';
import { ProductCategory, Product, Article, Event, ProductStatus, HeaderNotice, RankedProduct } from '../types';
import AdminProductManager from './AdminProductManager';

interface AdminPanelProps {
  products: Product[];
  articles: Article[];
  events: Event[];
  headerNotices: HeaderNotice[];
  topProducts: RankedProduct[]; 
  onAddProduct: (product: Omit<Product, 'id' | 'upvotes' | 'downvotes' | 'reviews'>) => void;
  onAddArticle: (article: Omit<Article, 'id'>) => void;
  onAddEvent: (event: Omit<Event, 'id'>) => void;
  onAddHeaderNotice: (notice: Omit<HeaderNotice, 'id'>) => void;
  onUpdateHeaderNotice: (notice: HeaderNotice) => void;
  onDeleteHeaderNotice: (noticeId: string) => void;
  onDeleteProduct: (productId: string) => void;
  onDeleteArticle: (articleId: string) => void;
  onDeleteEvent: (eventId: string) => void;
  onUpdateProductStatus: (productId: string, statusToUpdate: ProductStatus, isChecked: boolean) => void;
  onBulkUpdateProductStatus: (productIds: string[], statusToModify: ProductStatus, action: 'add' | 'remove') => void;
}

function AdminPanel({
  products, articles, events, headerNotices, topProducts,
  onAddProduct, onAddArticle, onAddEvent,
  onAddHeaderNotice, onUpdateHeaderNotice, onDeleteHeaderNotice,
  onDeleteProduct, onDeleteArticle, onDeleteEvent,
  onUpdateProductStatus, onBulkUpdateProductStatus
}: AdminPanelProps): JSX.Element {
  // Product Form State
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState<ProductCategory>(ProductCategory.Fruits);
  const [productImage, setProductImage] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [productInitialStatuses, setProductInitialStatuses] = useState<ProductStatus[]>([]);

  // Article Form State
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const [articleAuthor, setArticleAuthor] = useState('');
  const [articleImage, setArticleImage] = useState('');

  // Event Form State
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventImage, setEventImage] = useState('');

  // Header Notice Form State
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeMessage, setNoticeMessage] = useState('');
  const [noticeType, setNoticeType] = useState<HeaderNotice['type']>('info');
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);


  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName.trim() || !productInfo.trim()) {
        alert("Product name and info are required.");
        return;
    }
    onAddProduct({
        name: productName,
        category: productCategory,
        image: productImage || `https://picsum.photos/seed/${productName.replace(/\s+/g, '').toLowerCase()}/300/200`,
        info: productInfo,
        status: productInitialStatuses
    });
    setProductName('');
    setProductCategory(ProductCategory.Fruits);
    setProductImage('');
    setProductInfo('');
    setProductInitialStatuses([]);
  };

  const handleAddArticleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     if (!articleTitle.trim() || !articleContent.trim() || !articleAuthor.trim()) {
        alert("Article title, content, and author are required.");
        return;
    }
    onAddArticle({ title: articleTitle, content: articleContent, author: articleAuthor, date: new Date().toISOString().split('T')[0], image: articleImage || `https://picsum.photos/seed/${articleTitle.replace(/\s+/g, '').toLowerCase()}/400/250` });
    setArticleTitle('');
    setArticleContent('');
    setArticleAuthor('');
    setArticleImage('');
  };

  const handleAddEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim() || !eventDate.trim() || !eventDescription.trim()) {
        alert("Event title, date, and description are required.");
        return;
    }
    onAddEvent({
        title: eventTitle,
        date: new Date(eventDate).toISOString(),
        time: eventTime,
        location: eventLocation,
        description: eventDescription,
        image: eventImage || `https://picsum.photos/seed/${eventTitle.replace(/\s+/g, '').toLowerCase()}/400/200`
    });
    setEventTitle('');
    setEventDate('');
    setEventTime('');
    setEventLocation('');
    setEventDescription('');
    setEventImage('');
  };

  const handleHeaderNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim() || !noticeMessage.trim()) {
      alert("Notice title and message are required.");
      return;
    }
    if (editingNoticeId) {
      onUpdateHeaderNotice({ id: editingNoticeId, title: noticeTitle, message: noticeMessage, type: noticeType });
      setEditingNoticeId(null);
      alert('Notice updated successfully!');
    } else {
      onAddHeaderNotice({ title: noticeTitle, message: noticeMessage, type: noticeType });
      alert('Notice added successfully!');
    }
    setNoticeTitle('');
    setNoticeMessage('');
    setNoticeType('info');
  };

  const handleEditNoticeClick = (notice: HeaderNotice) => {
    setEditingNoticeId(notice.id);
    setNoticeTitle(notice.title);
    setNoticeMessage(notice.message);
    setNoticeType(notice.type);
  };

  const handleCancelEditNotice = () => {
    setEditingNoticeId(null);
    setNoticeTitle('');
    setNoticeMessage('');
    setNoticeType('info');
  };


  const handleStatusCheckboxChange = (status: ProductStatus, checked: boolean) => {
    setProductInitialStatuses(prev =>
        checked ? [...prev, status] : prev.filter(s => s !== status)
    );
  };

  const inputClass = "w-full p-2.5 bg-white border border-lime-300 rounded-md text-green-800 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-green-700 mb-1";
  const formSectionClass = "space-y-5 p-6 bg-lime-50 rounded-lg shadow-md border border-lime-200";
   const buttonClass = (color: 'green' | 'orange' | 'amber' | 'red' | 'blue' | 'gray' = 'green', fullWidth: boolean = true, extraClasses: string = '') =>
    `py-2 px-4 text-white font-semibold rounded-md transition-colors shadow-sm
     ${fullWidth ? 'w-full' : ''}
     ${color === 'green' ? 'bg-green-500 hover:bg-green-600 focus:ring-green-400' : ''}
     ${color === 'orange' ? 'bg-orange-500 hover:bg-orange-600 focus:ring-orange-400' : ''}
     ${color === 'amber' ? 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-400' : ''}
     ${color === 'red' ? 'bg-red-500 hover:bg-red-600 focus:ring-red-400' : ''}
     ${color === 'blue' ? 'bg-sky-500 hover:bg-sky-600 focus:ring-sky-400' : ''}
     ${color === 'gray' ? 'bg-gray-300 hover:bg-gray-400 text-gray-800 focus:ring-gray-400' : ''}
     focus:outline-none focus:ring-2 focus:ring-offset-2 ${extraClasses}`;
  const tableCellClasses = "px-4 py-3 border-b border-lime-200 text-sm text-gray-700";
  const tableHeaderClasses = "px-4 py-3 border-b-2 border-lime-300 bg-lime-100 text-left text-xs font-semibold text-green-700 uppercase tracking-wider";


  return (
    <div className="p-4 md:p-6 bg-white shadow-xl rounded-lg text-green-800 space-y-10">
      <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">Admin Panel</h2>
      
      {/* Top Products Dashboard */}
      <div className="p-6 bg-lime-50 rounded-lg shadow-md border border-lime-200">
        <h3 className="text-2xl font-semibold text-purple-600 mb-6">Top Products Dashboard</h3>
        {topProducts.length === 0 ? <p className="text-gray-500">No product data to display rankings.</p> : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md shadow">
            <thead>
              <tr>
                <th className={tableHeaderClasses}>Rank</th>
                <th className={tableHeaderClasses}>Product Name</th>
                <th className={tableHeaderClasses}>Category</th>
                <th className={tableHeaderClasses}>Upvotes</th>
                <th className={tableHeaderClasses}>Downvotes</th>
                <th className={tableHeaderClasses}>Reviews</th>
                <th className={tableHeaderClasses}>Avg. Rating</th>
                <th className={tableHeaderClasses}>Score</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={product.id} className="hover:bg-lime-50/50">
                  <td className={`${tableCellClasses} text-center font-medium`}>{index + 1}</td>
                  <td className={tableCellClasses}>{product.name}</td>
                  <td className={tableCellClasses}>{product.category}</td>
                  <td className={`${tableCellClasses} text-center text-green-600`}>{product.upvotes}</td>
                  <td className={`${tableCellClasses} text-center text-red-600`}>{product.downvotes}</td>
                  <td className={`${tableCellClasses} text-center`}>{product.reviews.length}</td>
                  <td className={`${tableCellClasses} text-center font-semibold text-yellow-500`}>{product.averageRating.toFixed(1)} ★</td>
                  <td className={`${tableCellClasses} text-center font-bold text-purple-600`}>{product.score.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>


      {/* Add Content Forms */}
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        <form onSubmit={handleAddProductSubmit} className={formSectionClass}>
          <h3 className="text-xl font-semibold text-emerald-600 mb-4">Add New Product</h3>
          <div>
            <label htmlFor="productName" className={labelClass}>Product Name</label>
            <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label htmlFor="productCategory" className={labelClass}>Category</label>
            <select id="productCategory" value={productCategory} onChange={(e) => setProductCategory(e.target.value as ProductCategory)} className={inputClass} required>
              {Object.values(ProductCategory).map(cat => ( <option key={cat} value={cat}>{cat}</option> ))}
            </select>
          </div>
          <div>
            <label htmlFor="productImage" className={labelClass}>Image URL (optional)</label>
            <input type="url" id="productImage" value={productImage} onChange={(e) => setProductImage(e.target.value)} className={inputClass} placeholder="https://example.com/image.jpg" />
          </div>
          <div>
            <label htmlFor="productInfo" className={labelClass}>Product Info</label>
            <textarea id="productInfo" value={productInfo} onChange={(e) => setProductInfo(e.target.value)} rows={3} className={inputClass} required />
          </div>
           <div>
            <label className={labelClass}>Initial Product Statuses</label>
            <div className="grid grid-cols-2 gap-1 mt-1 max-h-32 overflow-y-auto p-2 border border-lime-200 rounded-md bg-white">
                {Object.values(ProductStatus).map(status => (
                    <label key={status} className="flex items-center space-x-1.5 text-xs cursor-pointer p-0.5 hover:bg-lime-50 rounded">
                        <input
                            type="checkbox"
                            className="form-checkbox h-3.5 w-3.5 text-emerald-500 border-lime-300 rounded focus:ring-emerald-400"
                            checked={productInitialStatuses.includes(status)}
                            onChange={(e) => handleStatusCheckboxChange(status, e.target.checked)}
                        />
                        <span>{status}</span>
                    </label>
                ))}
            </div>
          </div>
          <button type="submit" className={buttonClass('green')}>Add Product</button>
        </form>

        <form onSubmit={handleAddArticleSubmit} className={formSectionClass}>
          <h3 className="text-xl font-semibold text-orange-600 mb-4">Add New Article</h3>
          <div>
            <label htmlFor="articleTitle" className={labelClass}>Article Title</label>
            <input type="text" id="articleTitle" value={articleTitle} onChange={(e) => setArticleTitle(e.target.value)} className={inputClass} required />
          </div>
           <div>
            <label htmlFor="articleImage" className={labelClass}>Article Image URL (optional)</label>
            <input type="url" id="articleImage" value={articleImage} onChange={(e) => setArticleImage(e.target.value)} className={inputClass} placeholder="https://example.com/article-image.jpg" />
          </div>
          <div>
            <label htmlFor="articleAuthor" className={labelClass}>Author</label>
            <input type="text" id="articleAuthor" value={articleAuthor} onChange={(e) => setArticleAuthor(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label htmlFor="articleContent" className={labelClass}>Content</label>
            <textarea id="articleContent" value={articleContent} onChange={(e) => setArticleContent(e.target.value)} rows={5} className={inputClass} required />
          </div>
          <button type="submit" className={buttonClass('orange')}>Add Article</button>
        </form>

        <form onSubmit={handleAddEventSubmit} className={formSectionClass}>
          <h3 className="text-xl font-semibold text-amber-600 mb-4">Add New Event</h3>
          <div>
            <label htmlFor="eventTitle" className={labelClass}>Event Title</label>
            <input type="text" id="eventTitle" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label htmlFor="eventDate" className={labelClass}>Date</label>
            <input type="date" id="eventDate" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label htmlFor="eventTime" className={labelClass}>Time (e.g., 10:00 AM - 2:00 PM)</label>
            <input type="text" id="eventTime" value={eventTime} onChange={(e) => setEventTime(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="eventLocation" className={labelClass}>Location (optional)</label>
            <input type="text" id="eventLocation" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="eventImage" className={labelClass}>Event Image URL (optional)</label>
            <input type="url" id="eventImage" value={eventImage} onChange={(e) => setEventImage(e.target.value)} className={inputClass} placeholder="https://example.com/event-image.jpg" />
          </div>
          <div>
            <label htmlFor="eventDescription" className={labelClass}>Description</label>
            <textarea id="eventDescription" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} rows={3} className={inputClass} required />
          </div>
          <button type="submit" className={buttonClass('amber')}>Add Event</button>
        </form>
        
        <form onSubmit={handleHeaderNoticeSubmit} className={`${formSectionClass} lg:col-span-1 xl:col-span-1`}>
          <h3 className="text-xl font-semibold text-sky-600 mb-4">{editingNoticeId ? 'Edit Notice' : 'Add Header Notice'}</h3>
          <div>
            <label htmlFor="noticeTitle" className={labelClass}>Notice Title</label>
            <input type="text" id="noticeTitle" value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} className={inputClass} required />
          </div>
          <div>
            <label htmlFor="noticeMessage" className={labelClass}>Message</label>
            <textarea id="noticeMessage" value={noticeMessage} onChange={(e) => setNoticeMessage(e.target.value)} rows={3} className={inputClass} required />
          </div>
          <div>
            <label htmlFor="noticeType" className={labelClass}>Type</label>
            <select id="noticeType" value={noticeType} onChange={(e) => setNoticeType(e.target.value as HeaderNotice['type'])} className={inputClass} required>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
              <option value="promo">Promo</option>
            </select>
          </div>
          <div className="flex space-x-2 mt-4">
            <button type="submit" className={buttonClass('blue', false, 'flex-1')}> {editingNoticeId ? 'Update Notice' : 'Add Notice'} </button>
            {editingNoticeId && (
              <button type="button" onClick={handleCancelEditNotice} className={buttonClass('gray', false, 'flex-1')}> Cancel Edit </button>
            )}
          </div>
        </form>
      </div>


      {/* Manage Existing Content */}
      <div className="p-6 bg-lime-50 rounded-lg shadow-md border border-lime-200">
        <h3 className="text-2xl font-semibold text-sky-600 mb-6">Manage Header Notices</h3>
        {headerNotices.length === 0 ? <p className="text-gray-500">No notices to manage.</p> : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md shadow">
            <thead>
              <tr>
                <th className={tableHeaderClasses}>Title</th>
                <th className={tableHeaderClasses}>Message</th>
                <th className={tableHeaderClasses}>Type</th>
                <th className={tableHeaderClasses}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {headerNotices.map(notice => (
                <tr key={notice.id} className="hover:bg-lime-50/50">
                  <td className={tableCellClasses}>{notice.title}</td>
                  <td className={`${tableCellClasses} max-w-xs truncate`}>{notice.message}</td>
                  <td className={tableCellClasses}><span className={`px-2 py-0.5 text-xs font-medium rounded-full border bg-${notice.type === 'success' ? 'green' : notice.type === 'warning' ? 'yellow' : notice.type === 'promo' ? 'purple' : 'sky'}-100 text-${notice.type === 'success' ? 'green' : notice.type === 'warning' ? 'yellow' : notice.type === 'promo' ? 'purple' : 'sky'}-700 border-${notice.type === 'success' ? 'green' : notice.type === 'warning' ? 'yellow' : notice.type === 'promo' ? 'purple' : 'sky'}-300`}>{notice.type}</span></td>
                  <td className={`${tableCellClasses} space-x-1 whitespace-nowrap`}>
                    <button onClick={() => handleEditNoticeClick(notice)} className={buttonClass('gray', false, 'text-xs px-3 py-1')}>Edit</button>
                    <button onClick={() => onDeleteHeaderNotice(notice.id)} className={buttonClass('red', false, 'text-xs px-3 py-1')}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>


      <div className="p-6 bg-lime-50 rounded-lg shadow-md border border-lime-200">
        <h3 className="text-2xl font-semibold text-emerald-600 mb-6">Manage Existing Products</h3>
        <AdminProductManager
            products={products}
            onUpdateProductStatus={onUpdateProductStatus}
            onBulkUpdateProductStatus={onBulkUpdateProductStatus}
            onDeleteProduct={onDeleteProduct}
        />
      </div>

      <div className="p-6 bg-lime-50 rounded-lg shadow-md border border-lime-200">
        <h3 className="text-2xl font-semibold text-orange-600 mb-6">Manage Articles</h3>
        {articles.length === 0 ? <p className="text-gray-500">No articles to manage.</p> : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md shadow">
            <thead>
              <tr>
                <th className={tableHeaderClasses}>Title</th>
                <th className={tableHeaderClasses}>Author</th>
                <th className={tableHeaderClasses}>Date</th>
                <th className={tableHeaderClasses}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article.id} className="hover:bg-lime-50/50">
                  <td className={tableCellClasses}>{article.title}</td>
                  <td className={tableCellClasses}>{article.author}</td>
                  <td className={tableCellClasses}>{new Date(article.date).toLocaleDateString()}</td>
                  <td className={tableCellClasses}>
                    <button onClick={() => onDeleteArticle(article.id)} className={buttonClass('red', false) + " text-xs px-3 py-1"}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>

      <div className="p-6 bg-lime-50 rounded-lg shadow-md border border-lime-200">
        <h3 className="text-2xl font-semibold text-amber-600 mb-6">Manage Events</h3>
        {events.length === 0 ? <p className="text-gray-500">No events to manage.</p> : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-md shadow">
            <thead>
              <tr>
                <th className={tableHeaderClasses}>Title</th>
                <th className={tableHeaderClasses}>Date</th>
                <th className={tableHeaderClasses}>Location</th>
                <th className={tableHeaderClasses}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id} className="hover:bg-lime-50/50">
                  <td className={tableCellClasses}>{event.title}</td>
                  <td className={tableCellClasses}>{new Date(event.date).toLocaleDateString()} {event.time ? `(${event.time})` : ''}</td>
                  <td className={tableCellClasses}>{event.location || 'N/A'}</td>
                  <td className={tableCellClasses}>
                    <button onClick={() => onDeleteEvent(event.id)} className={buttonClass('red', false) + " text-xs px-3 py-1"}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {/* Placeholder for Contact Us Messages */}
      <div className="p-6 bg-lime-50 rounded-lg shadow-md border border-lime-200">
        <h3 className="text-2xl font-semibold text-cyan-600 mb-6">Form Submissions</h3>
        <p className="text-gray-500">
          This section will display messages submitted through "Contact Us", "Donate Food", and "Get Food" forms once backend and database integration is complete.
        </p>
        {/* Future: Display list/table of messages */}
      </div>

    </div>
  );
}

export default AdminPanel;