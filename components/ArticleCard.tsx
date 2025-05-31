
import React from 'react';
import { Article, UserArticleInteraction } from '../types';

interface ArticleCardProps {
  article: Article;
  interaction?: UserArticleInteraction;
  onToggleFavorite: (articleId: string) => void;
  onViewArticle: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, interaction, onToggleFavorite, onViewArticle }) => {
  const isFavorited = interaction?.isFavorited || false;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-orange-300/50 m-2 border border-lime-200">
      <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-orange-700 cursor-pointer hover:text-orange-600" onClick={() => onViewArticle(article)}>{article.title}</h3>
          <button
            onClick={() => onToggleFavorite(article.id)}
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
        <p className="text-xs text-gray-500 mb-1">By {article.author} on {new Date(article.date).toLocaleDateString()}</p>
        <p className="text-gray-600 text-sm mb-3 leading-relaxed line-clamp-3">{article.content}</p>
        <button
            onClick={() => onViewArticle(article)}
            className="text-orange-600 hover:text-orange-500 font-semibold py-1.5 px-3 rounded-lg transition-colors duration-200 border border-orange-500 hover:border-orange-400 text-sm"
        >
            Read More
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
