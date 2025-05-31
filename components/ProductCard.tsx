
import React from 'react';
import { Product, UserProductInteraction, ProductStatus } from '../types';

interface ProductCardProps {
  product: Product;
  interaction?: UserProductInteraction;
  onToggleFavorite: (productId: string) => void;
  onVote: (productId: string, voteType: 'up' | 'down') => void;
  onOpenReviews: (product: Product) => void;
}

const getStatusBadgeColor = (status: ProductStatus) => {
  switch (status) {
    // Positive / Freshness / Quality
    case ProductStatus.NewProduct:
    case ProductStatus.ProductType_Fresh:
    case ProductStatus.Organic:
    case ProductStatus.NoLimit:
      return 'bg-green-100 text-green-700 border-green-300';
    
    // Informational / Special Diet
    case ProductStatus.OnSale:
    case ProductStatus.LowSodium:
    case ProductStatus.GlutenFree:
    case ProductStatus.Vegan:
      return 'bg-sky-100 text-sky-700 border-sky-300';
      
    // Warning / Attention
    case ProductStatus.LimitedSupply:
    case ProductStatus.ExpiringSoon:
      return 'bg-yellow-100 text-yellow-700 border-yellow-400';

    // Negative / Caution
    case ProductStatus.OutOfStock:
    case ProductStatus.Discontinued:
      return 'bg-red-100 text-red-700 border-red-300';

    // Ingredients of Concern / Allergens
    case ProductStatus.ContainsSoy:
    case ProductStatus.ContainsSeedOils:
    case ProductStatus.HighFructoseCornSyrup:
    case ProductStatus.GMO:
      return 'bg-orange-100 text-orange-700 border-orange-300';

    // Product Types / Packaging
    case ProductStatus.ProductType_Frozen:
    case ProductStatus.ByTheCase:
    case ProductStatus.ProductType_Canned:
    case ProductStatus.ProductType_Packaged:
    case ProductStatus.ProductType_Refrigerated:
    case ProductStatus.ProductType_ShelfStable:
    case ProductStatus.ProductType_DryGoods:
      return 'bg-indigo-100 text-indigo-700 border-indigo-300';
      
    default:
      return 'bg-gray-100 text-gray-700 border-gray-300';
  }
};


const ProductCard: React.FC<ProductCardProps> = ({ product, interaction, onToggleFavorite, onVote, onOpenReviews }) => {
  const isFavorited = interaction?.isFavorited || false;
  const thumbsState = interaction?.thumbsState || 'none';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-emerald-300/50 m-2 flex flex-col md:flex-row border border-lime-200">
      <img src={product.image} alt={product.name} className="w-full md:w-1/3 h-56 md:h-auto object-cover"/>
      <div className="p-5 flex flex-col justify-between flex-grow">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-emerald-700">{product.name}</h3>
            <button
              onClick={() => onToggleFavorite(product.id)}
              title={isFavorited ? "Remove from favorites" : "Add to favorites"}
              className={`p-1.5 rounded-full transition-colors duration-200 ${
                isFavorited ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
              }`}
              aria-pressed={isFavorited}
              aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorited ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M11.645 20.91a.75.75 0 0 0 1.09 0l.752-.705c.27-.25.524-.51.772-.778a50.64 50.64 0 0 0 4.197-5.043c1.48-2.068 1.986-4.568 1.498-6.823-.488-2.254-2.264-4.148-4.616-4.616-2.352-.47-4.803.018-6.871 1.498a.751.751 0 0 1-1.042 0c-2.068-1.48-4.52-1.968-6.871-1.498-2.352.468-4.128 2.362-4.616 4.616-.488 2.255.018 4.755 1.498 6.823a50.64 50.64 0 0 0 4.197 5.043c.248.268.502.528.772.778l.752.705Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              )}
            </button>
          </div>
          <p className="text-green-700 mb-1 text-xs"><span className="font-semibold text-emerald-600">Category:</span> {product.category}</p>
          <p className="text-gray-600 mb-3 text-sm leading-relaxed">{product.info}</p>
          
          {product.status && product.status.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {product.status.map((statusItem: ProductStatus) => (
                <span key={statusItem} className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusBadgeColor(statusItem)}`}>
                  {statusItem}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => onVote(product.id, 'up')}
                title="Thumbs Up"
                aria-label="Thumbs Up"
                aria-pressed={thumbsState === 'up'}
                className={`p-1.5 rounded-full transition-colors duration-200 ${
                  thumbsState === 'up' ? 'text-green-600 bg-green-100' : 'text-gray-400 hover:text-green-500 hover:bg-green-50'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632a.75.75 0 0 1 .562-1.026l2.554-.958a.75.75 0 0 0 .562-1.026l-.958-2.554a.75.75 0 1 1 1.437-.539l1.8 4.802a.75.75 0 0 1-.538 1.002l-4.802 1.8a.75.75 0 0 1-.539-.166ZM18.75 3.528a.75.75 0 0 0-1.061 0l-1.082 1.082a.75.75 0 0 0 0 1.061l1.082 1.082a.75.75 0 1 0 1.061-1.061l-.53-.531.53-.53a.75.75 0 0 0 0-1.061Z" />
                  <path fillRule="evenodd" d="M5.25 3a2.25 2.25 0 0 0-2.25 2.25v10.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V14.055a.75.75 0 0 1 1.5 0v1.695a3.75 3.75 0 0 1-3.75 3.75H5.25a3.75 3.75 0 0 1-3.75-3.75V5.25a3.75 3.75 0 0 1 3.75-3.75h1.695a.75.75 0 0 1 0 1.5H5.25Z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="text-sm text-green-700 min-w-[20px] text-center">{product.upvotes}</span>
              <button
                onClick={() => onVote(product.id, 'down')}
                title="Thumbs Down"
                aria-label="Thumbs Down"
                aria-pressed={thumbsState === 'down'}
                className={`p-1.5 rounded-full transition-colors duration-200 ${
                  thumbsState === 'down' ? 'text-red-600 bg-red-100' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M16.507 5.25c.425 0 .82.236.975.632a.75.75 0 0 1-.562 1.026l-2.554.958a.75.75 0 0 0-.562 1.026l.958 2.554a.75.75 0 1 1-1.437.539l-1.8-4.802a.75.75 0 0 1 .538-1.002l4.802-1.8a.75.75 0 0 1 .539.166ZM5.25 20.472a.75.75 0 0 0 1.061 0l1.082-1.082a.75.75 0 0 0 0-1.061l-1.082-1.082a.75.75 0 1 0-1.061 1.061l.53.531-.53.53a.75.75 0 0 0 0 1.061Z" />
                  <path fillRule="evenodd" d="M18.75 21a2.25 2.25 0 0 0 2.25-2.25V7.945a.75.75 0 0 1-1.5 0v10.805a.75.75 0 0 1-.75.75H7.945a.75.75 0 0 1 0-1.5h10.805a.75.75 0 0 1 .75-.75V5.25a.75.75 0 0 1 .75-.75h1.5a2.25 2.25 0 0 1 2.25 2.25v13.5a2.25 2.25 0 0 1-2.25 2.25H5.25a2.25 2.25 0 0 1-2.25-2.25V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v1.695a.75.75 0 1 1-1.5 0V7.5a.75.75 0 0 0-.75-.75H5.25a.75.75 0 0 0-.75.75v13.5a.75.75 0 0 0 .75.75h13.5Z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="text-sm text-red-600 min-w-[20px] text-center">{product.downvotes}</span>
            </div>
            <button
              onClick={() => onOpenReviews(product)}
              className="text-orange-600 hover:text-orange-500 font-semibold py-1.5 px-3 rounded-lg transition-colors duration-200 border border-orange-500 hover:border-orange-400 text-sm"
            >
              Reviews ({product.reviews.length})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
