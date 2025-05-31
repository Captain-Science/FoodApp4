import React, { useState, useMemo, useEffect } from 'react';
import { Product, ProductStatus, ProductCategory } from '../types';

interface AdminProductManagerProps {
  products: Product[];
  onUpdateProductStatus: (productId: string, statusToUpdate: ProductStatus, isChecked: boolean) => void;
  onBulkUpdateProductStatus: (productIds: string[], statusToModify: ProductStatus, action: 'add' | 'remove') => void;
  onDeleteProduct: (productId: string) => void;
}

const AdminProductManager: React.FC<AdminProductManagerProps> = ({ products, onUpdateProductStatus, onBulkUpdateProductStatus, onDeleteProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [bulkStatusAction, setBulkStatusAction] = useState<'add' | 'remove'>('add');
  const [bulkStatusToApply, setBulkStatusToApply] = useState<ProductStatus>(ProductStatus.NewProduct); // Default

  const allStatuses = useMemo(() => Object.values(ProductStatus), []);
  const allCategories = useMemo(() => Object.values(ProductCategory), []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategory]);

  // Effect to clear selection when filter changes
  useEffect(() => {
    setSelectedProductIds([]);
  }, [searchTerm, selectedCategory]);


  const handleSelectAllFiltered = () => {
    setSelectedProductIds(filteredProducts.map(p => p.id));
  };

  const handleUnselectAllFiltered = () => {
    setSelectedProductIds([]);
  };

  const handleProductSelection = (productId: string, isChecked: boolean) => {
    setSelectedProductIds(prev =>
      isChecked ? [...prev, productId] : prev.filter(id => id !== productId)
    );
  };
  
  const handleApplyBulkStatus = () => {
    if (selectedProductIds.length === 0) {
      alert("No products selected for bulk update.");
      return;
    }
    if (window.confirm(`Are you sure you want to ${bulkStatusAction} status '${bulkStatusToApply}' for ${selectedProductIds.length} products?`)) {
        onBulkUpdateProductStatus(selectedProductIds, bulkStatusToApply, bulkStatusAction);
        setSelectedProductIds([]); // Clear selection after applying
    }
  };


  if (!products || products.length === 0) {
    return <p className="text-gray-500">No products available to manage.</p>;
  }

  const inputClass = "p-2.5 bg-white border border-lime-300 rounded-md text-green-800 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm placeholder-gray-400";
  const buttonClass = (color: 'green' | 'red' | 'blue' | 'gray' = 'green', extraClasses: string = '') =>
    `py-2 px-4 text-sm font-semibold rounded-md transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${extraClasses}
     ${color === 'green' ? 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400' : ''}
     ${color === 'red' ? 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400' : ''}
     ${color === 'blue' ? 'bg-sky-500 hover:bg-sky-600 text-white focus:ring-sky-400' : ''}
     ${color === 'gray' ? 'bg-gray-300 hover:bg-gray-400 text-gray-700 focus:ring-gray-400' : ''}
    `;

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-lime-100 rounded-lg border border-lime-200">
        <input
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${inputClass} w-full`}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'all')}
          className={`${inputClass} w-full`}
        >
          <option value="all">All Categories</option>
          {allCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>

      {/* Bulk Actions */}
      {filteredProducts.length > 0 && (
        <div className="mb-6 p-4 bg-lime-100 rounded-lg border border-lime-200 space-y-3">
           <h4 className="text-md font-semibold text-emerald-700 mb-2">Bulk Actions for Filtered Products ({selectedProductIds.length} selected)</h4>
          <div className="flex flex-wrap gap-2 items-center">
            <button onClick={handleSelectAllFiltered} className={buttonClass('blue', 'text-xs')}>Select All ({filteredProducts.length})</button>
            <button onClick={handleUnselectAllFiltered} className={buttonClass('gray', 'text-xs')}>Unselect All</button>
          </div>
          {selectedProductIds.length > 0 && (
            <div className="mt-3 pt-3 border-t border-lime-200 flex flex-wrap gap-x-4 gap-y-2 items-end">
              <div className="flex-grow min-w-[150px]">
                <label className="block text-xs font-medium text-green-700 mb-0.5">Status to Modify:</label>
                <select value={bulkStatusToApply} onChange={e => setBulkStatusToApply(e.target.value as ProductStatus)} className={`${inputClass} w-full text-sm py-1.5`}>
                  {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex-grow min-w-[100px]">
                 <label className="block text-xs font-medium text-green-700 mb-0.5">Action:</label>
                <select value={bulkStatusAction} onChange={e => setBulkStatusAction(e.target.value as 'add' | 'remove')} className={`${inputClass} w-full text-sm py-1.5`}>
                  <option value="add">Add Status</option>
                  <option value="remove">Remove Status</option>
                </select>
              </div>
              <button onClick={handleApplyBulkStatus} className={buttonClass('green', 'self-end py-1.5')}>Apply to Selected</button>
            </div>
          )}
        </div>
      )}


      {filteredProducts.length === 0 && (
        <p className="text-gray-500 text-center py-4">
          {searchTerm || selectedCategory !== 'all' ? 'No products match your current filters.' : 'No products available.'}
        </p>
      )}

      {/* Product List */}
      <div className="space-y-4">
      {filteredProducts.map(product => (
        <div key={product.id} className="p-4 border border-lime-200 rounded-lg bg-white shadow-sm">
          <div className="flex justify-between items-start mb-3">
            <div>
                <label htmlFor={`select-${product.id}`} className="flex items-center cursor-pointer">
                    <input
                        id={`select-${product.id}`}
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-emerald-600 border-lime-300 rounded focus:ring-emerald-500 mr-2"
                        checked={selectedProductIds.includes(product.id)}
                        onChange={(e) => handleProductSelection(product.id, e.target.checked)}
                    />
                    <h4 className="text-lg font-semibold text-emerald-700">{product.name} <span className="text-xs text-gray-500">({product.category})</span></h4>
                </label>
            </div>
            <button onClick={() => onDeleteProduct(product.id)} className={buttonClass('red', 'text-xs px-3 py-1')}>Delete Product</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-1.5">
            {allStatuses.map(status => {
              const isChecked = product.status?.includes(status) || false;
              return (
                <label key={status} className="flex items-center space-x-1.5 cursor-pointer p-1 hover:bg-lime-50 rounded text-xs">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => onUpdateProductStatus(product.id, status, e.target.checked)}
                    className="form-checkbox h-3.5 w-3.5 text-emerald-600 border-lime-300 rounded focus:ring-emerald-500"
                  />
                  <span className="text-green-700">{status}</span>
                </label>
              );
            })}
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default AdminProductManager;