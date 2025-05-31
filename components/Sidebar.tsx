
import React, { useState } from 'react';
import { ProductCategory, Product, Article, SelectedItem, Event, DiscussionTopic } from '../types'; // Added Event, DiscussionTopic
import { CATEGORY_IMAGES } from '../constants';

interface SidebarProps {
  products: Product[];
  articles: Article[];
  featuredArticles: Article[]; 
  events: Event[];
  topics: DiscussionTopic[];
  onSelectItem: (item: SelectedItem) => void;
  onShowFavorites: () => void;
  onShowAdminPanel: () => void;
  onShowCalendar: () => void;
  onShowDiscussionForum: () => void;
  onShowDonatePage: () => void; 
  onShowGetFoodPage: () => void; 
  currentUserIsAdmin: boolean;
}

interface AccordionSectionProps {
  title: string;
  icon?: string;
  count?: number;
  children: React.ReactNode; 
  initiallyOpen?: boolean;
  isTopLevel?: boolean;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, icon, count, children, initiallyOpen = false, isTopLevel = false }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <li className={isTopLevel ? "border-b border-green-200" : ""}>
      <h3
        className={`p-3 text-base font-semibold cursor-pointer flex justify-between items-center transition-all duration-300 ease-in-out 
                    ${isTopLevel ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white' 
                                 : 'hover:bg-lime-100 text-green-700'}`}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${title.replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center">
          {icon && <img src={icon} alt={title} className="w-7 h-7 mr-2 rounded-md shadow-sm border-2 border-green-300 object-cover" />}
          <span>{title}</span>
          {count !== undefined && <span className={`ml-2 text-xs font-bold px-2 py-0.5 rounded-full ${isTopLevel ? 'bg-lime-400 text-green-800' : 'bg-green-500 text-white'}`}>{count}</span>}
        </div>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-90' : ''} ${isTopLevel ? 'text-lime-300' : 'text-green-500'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      </h3>
      {isOpen && (
        <ul id={`accordion-content-${title.replace(/\s+/g, '-')}`} className={`pl-4 transition-all duration-500 ease-in-out ${isTopLevel ? 'bg-green-50' : 'bg-lime-50'}`}>
          {children}
        </ul>
      )}
    </li>
  );
};

function Sidebar({ 
    products, articles, featuredArticles, events, topics, 
    onSelectItem, onShowFavorites, onShowAdminPanel, onShowCalendar, onShowDiscussionForum, 
    onShowDonatePage, onShowGetFoodPage, 
    currentUserIsAdmin 
}: SidebarProps): JSX.Element {
  const productCategories = Object.values(ProductCategory);

  const topLevelLinkClasses = "block py-3 px-4 font-semibold flex items-center bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-500 transition-colors duration-150";
  const topLevelIconClasses = "w-5 h-5 mr-2 text-lime-300";
  const topLevelBadgeClasses = "ml-auto bg-lime-400 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full";


  return (
    <aside className="w-full md:w-80 bg-lime-100 shadow-xl flex-shrink-0 h-full overflow-y-auto">
      <div className="p-4 text-center bg-gradient-to-r from-green-600 to-emerald-600">
        <h2 className="text-2xl font-bold text-white">Explore</h2>
      </div>
      
      <div className="p-4 space-y-3 border-b border-green-200">
        <button 
          onClick={onShowDonatePage} 
          className="w-full py-2.5 px-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2"><path d="M11.645 20.91a.75.75 0 0 0 1.09 0l.752-.705c.27-.25.524-.51.772-.778a50.64 50.64 0 0 0 4.197-5.043c1.48-2.068 1.986-4.568 1.498-6.823-.488-2.254-2.264-4.148-4.616-4.616-2.352-.47-4.803.018-6.871 1.498a.751.751 0 0 1-1.042 0c-2.068-1.48-4.52-1.968-6.871-1.498-2.352.468-4.128 2.362-4.616 4.616-.488 2.255.018 4.755 1.498 6.823a50.64 50.64 0 0 0 4.197 5.043c.248.268.502.528.772.778l.752.705Z" /></svg>
          Donate Food
        </button>
        <button 
          onClick={onShowGetFoodPage} 
          className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2"><path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.763.746-1.856 1.705l-.094.948a23.852 23.852 0 0 0 .093 6.424l.078.624c.14.92.91 1.649 1.855 1.649h12.962c.945 0 1.715-.728 1.855-1.649l.078-.624a23.852 23.852 0 0 0 .093-6.424l-.094-.948C19.276 7.496 18.473 6.75 17.513 6.75H15.5V6c0-1.24-.988-2.25-2.225-2.25h-.55C11.488 3.75 10.5 4.76 10.5 6v.75H7.5Zm0 1.5h8V6c0-.414-.32-.75-.725-.75h-.55c-.405 0-.725.336-.725.75v1.5Zm9.063 3.932a.75.75 0 1 0-1.06-1.061l-2.562 2.561-1.44-1.439a.75.75 0 0 0-1.06 1.06l1.969 1.969a.75.75 0 0 0 1.06 0l3.094-3.093Z" clipRule="evenodd" /></svg>
          Get Food
        </button>
      </div>

      <nav>
        <ul className="text-green-700">
          <AccordionSection title="Product Categories" initiallyOpen={true} isTopLevel={true}>
             <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onSelectItem({ type: 'all_products', id: 'all' }); }}
                  className="block py-2.5 px-4 hover:bg-lime-200 hover:text-green-600 rounded-md transition-colors duration-150 font-medium"
                >
                  All Products
                </a>
              </li>
            {productCategories.map(category => {
              const categoryProducts = products.filter(p => p.category === category);
              return (
                <AccordionSection 
                  key={category} 
                  title={category} 
                  icon={CATEGORY_IMAGES[category]}
                  count={categoryProducts.length}
                >
                  {categoryProducts.map(product => (
                    <li key={product.id}>
                      <a
                        href="#"
                        onClick={(e) => { e.preventDefault(); onSelectItem({ type: 'product', id: product.id }); }}
                        className="block py-2 px-4 text-sm hover:bg-lime-200 hover:text-green-600 rounded-md transition-colors duration-150 truncate"
                        title={product.name}
                      >
                        {product.name}
                      </a>
                    </li>
                  ))}
                   <li>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); onSelectItem({ type: 'category', id: category }); }}
                      className="block py-2 px-4 text-green-600 font-semibold hover:bg-lime-200 rounded-md transition-colors duration-150 text-sm"
                    >
                      View All {category}
                    </a>
                  </li>
                </AccordionSection>
              );
            })}
          </AccordionSection>

          <AccordionSection title="Articles" count={articles.length} initiallyOpen={false} isTopLevel={true}>
             <li>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onSelectItem({ type: 'all_articles', id: 'all' }); }}
                  className="block py-2.5 px-4 hover:bg-lime-200 hover:text-green-600 rounded-md transition-colors duration-150 font-medium"
                >
                  All Articles
                </a>
              </li>
            {articles.map(article => (
              <li key={article.id}>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onSelectItem({ type: 'article', id: article.id }); }}
                  className="block py-2 px-4 text-sm hover:bg-lime-200 hover:text-green-600 rounded-md transition-colors duration-150 truncate"
                  title={article.title}
                >
                  {article.title}
                </a>
              </li>
            ))}
          </AccordionSection>
           <li className="border-t border-green-200">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onShowCalendar(); }}
                  className={topLevelLinkClasses}
                >
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={topLevelIconClasses}>
                    <path fillRule="evenodd" d="M5.25 2.25A2.25 2.25 0 0 0 3 4.5v15A2.25 2.25 0 0 0 5.25 21.75h13.5A2.25 2.25 0 0 0 21 19.5V4.5A2.25 2.25 0 0 0 18.75 2.25H5.25ZM7.5 6a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Z" clipRule="evenodd" />
                  </svg>
                  Upcoming Events <span className={topLevelBadgeClasses}>{events.length}</span>
                </a>
           </li>
           <li className="border-t border-b border-green-200">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onShowDiscussionForum(); }}
                  className={topLevelLinkClasses}
                >
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={topLevelIconClasses}>
                    <path d="M4.913 2.658c.424.423.424 1.112 0 1.535L2.255 6.85h19.49c.414 0 .75.336.75.75s-.336.75-.75.75H2.255l2.658 2.658c.424.423.424 1.112 0 1.535a1.083 1.083 0 0 1-1.536 0L1.003 9.948a1.082 1.082 0 0 1 0-1.535L3.377 6.04a1.083 1.083 0 0 1 1.535-.382ZM21.997 12.752a1.082 1.082 0 0 1 0 1.535L19.623 16.65c-.424.423-1.112.423-1.535 0a1.083 1.083 0 0 1 0-1.535l2.658-2.658H2.255c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h19.49l-2.658-2.658c-.424-.423-.424-1.112 0-1.535a1.083 1.083 0 0 1 1.535 0l2.374 2.373Z" />
                  </svg>
                  Discussion Forum <span className={topLevelBadgeClasses}>{topics.length}</span>
                </a>
           </li>
          
          <li className="mt-4 px-4 pb-4">
            <button
              onClick={onShowFavorites}
              className="w-full flex items-center justify-center py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 mb-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                <path d="M11.645 20.91a.75.75 0 0 0 1.09 0l.752-.705c.27-.25.524-.51.772-.778a50.64 50.64 0 0 0 4.197-5.043c1.48-2.068 1.986-4.568 1.498-6.823-.488-2.254-2.264-4.148-4.616-4.616-2.352-.47-4.803.018-6.871 1.498a.751.751 0 0 1-1.042 0c-2.068-1.48-4.52-1.968-6.871-1.498-2.352.468-4.128 2.362-4.616 4.616-.488 2.255.018 4.755 1.498 6.823a50.64 50.64 0 0 0 4.197 5.043c.248.268.502.528.772.778l.752.705Z" />
              </svg>
              My Favorites
            </button>
            {currentUserIsAdmin && (
              <button
                onClick={onShowAdminPanel}
                className="w-full flex items-center justify-center py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-150"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.905 1.523L9.17 8.69c-.05.213-.11.423-.18.632a9.009 9.009 0 0 0-1.047.893c-.424.38-.79.799-1.135 1.253a9.009 9.009 0 0 0-1.484.935L4.29 12.28a2.25 2.25 0 0 0-3.22.565c-.426.566-.349 1.356.176 1.846l.003.002s.117.104.26.196c.207.132.423.27.65.414a9.073 9.073 0 0 0 .96 1.456c.313.476.65.928.999 1.373a9.008 9.008 0 0 0 1.172 1.272l.218.217c.353.353.724.676 1.106.971.381.296.77.57 1.166.82H12c.396-.25.785-.525 1.166-.82l.218-.217c.353-.353.724-.676 1.106-.971.313-.299.612-.61.904-.924a9.008 9.008 0 0 0 1.172-1.272c.35-.445.686-.897.999-1.373.297-.45.59-.896.96-1.456a9.073 9.073 0 0 0 .65-.414c.143-.092.26-.196.26-.196s.003-.002.003-.002c.524-.49.602-1.28.176-1.846a2.25 2.25 0 0 0-3.22-.565l-2.08 1.04a9.009 9.009 0 0 0-1.484-.935c-.345-.454-.71-.873-1.135-1.253a9.009 9.009 0 0 0-1.047-.893c-.07-.209-.13-.419-.18-.632l-.003-.012a2.25 2.25 0 0 0-1.905-1.523h-.17Z" clipRule="evenodd" />
                    <path d="M12 11.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  </svg>
                Admin Panel
              </button>
            )}
          </li>
        </ul>
      </nav>

      {/* Featured Articles Section */}
      {featuredArticles.length > 0 && (
        <div className="p-4 mt-4 border-t border-green-200">
          <h3 className="text-lg font-semibold text-green-700 mb-3">Featured Articles</h3>
          <ul className="space-y-2">
            {featuredArticles.map(article => (
              <li key={article.id} className="p-2 bg-lime-50 rounded-md hover:bg-lime-200 transition-colors">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); onSelectItem({ type: 'article', id: article.id }); }}
                  className="text-sm text-green-600 hover:text-emerald-700 font-medium block"
                  title={article.title}
                >
                  <img src={article.image} alt={article.title} className="w-full h-24 object-cover rounded mb-1.5 shadow-sm"/>
                  {article.title}
                </a>
                <p className="text-xs text-gray-500 line-clamp-2">{article.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;