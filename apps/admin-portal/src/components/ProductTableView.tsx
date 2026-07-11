import { useProductsStore, Product } from '../stores/products';
import { Edit2, Trash2, Eye } from 'lucide-react';

interface ProductTableViewProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

export default function ProductTableView({ products, onEdit }: ProductTableViewProps) {
  const { deleteProduct } = useProductsStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-500/10 text-emerald-400';
      case 'draft':
        return 'bg-amber-500/10 text-amber-400';
      case 'archived':
        return 'bg-slate-700/50 text-slate-300';
      default:
        return 'bg-slate-700/50 text-slate-300';
    }
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return 'text-red-400';
    if (stock <= 5) return 'text-amber-400';
    return 'text-emerald-400';
  };

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12">
        <div className="text-center">
          <p className="text-slate-400 mb-2">No products found</p>
          <p className="text-sm text-slate-500">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-800/50 border-b border-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Product</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">SKU</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Category</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300">Price</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-slate-300">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-300">Status</th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-slate-800/30 transition"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      {product.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{product.name}</p>
                      <p className="text-xs text-slate-400">{product.description.substring(0, 40)}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-300 font-mono text-sm">{product.sku}</td>
                <td className="px-6 py-4 text-slate-300">{product.category}</td>
                <td className="px-6 py-4 text-right text-white font-medium">${product.price.toFixed(2)}</td>
                <td className={`px-6 py-4 text-right font-medium ${getStockColor(product.stock)}`}>
                  {product.stock}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-400 transition"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-400 transition"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer with pagination placeholder */}
      <div className="px-6 py-4 border-t border-slate-800 bg-slate-800/30 flex items-center justify-between">
        <p className="text-sm text-slate-400">Showing {products.length} products</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded transition">Previous</button>
          <button className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm rounded transition">Next</button>
        </div>
      </div>
    </div>
  );
}
