import { useState } from 'react';
import { useProductsStore, Product } from '../stores/products';
import { X } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const { addProduct, updateProduct } = useProductsStore();
  const [formData, setFormData] = useState(
    product || {
      name: '',
      sku: '',
      price: 0,
      cost: 0,
      stock: 0,
      category: 'Electronics',
      status: 'draft' as const,
      description: '',
    },
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'cost' || name === 'stock' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product?.id) {
      updateProduct(product.id, formData);
    } else {
      addProduct(formData);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-slate-800 bg-slate-900">
          <h2 className="text-xl font-semibold text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Product Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Wireless Headphones"
              />
              <FormField
                label="SKU"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="e.g., WH-001"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Product description..."
                rows={3}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Pricing & Inventory</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField
                label="Price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
              />
              <FormField
                label="Cost"
                name="cost"
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={handleChange}
                placeholder="0.00"
              />
              <FormField
                label="Stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
              />
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Margin</label>
                <div className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-medium">
                  {formData.price && formData.cost
                    ? `${((((formData.price - formData.cost) / formData.price) * 100) || 0).toFixed(1)}%`
                    : '0%'}
                </div>
              </div>
            </div>
          </div>

          {/* Category & Status */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Classification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Electronics</option>
                  <option>Accessories</option>
                  <option>Fashion</option>
                  <option>Home</option>
                  <option>Sports</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              {product ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({ label, ...props }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
