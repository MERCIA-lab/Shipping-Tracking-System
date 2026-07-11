import { useEffect, useState, useMemo } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, Eye, AlertCircle } from 'lucide-react';
import { useProductsStore, fetchProducts } from '../stores/products';
import ProductTableView from '../components/ProductTableView';
import ProductModal from '../components/ProductModal';

export default function Products() {
  const { products, loading, error } = useProductsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        useProductsStore.setState({ loading: true, error: null });
        const data = await fetchProducts();
        useProductsStore.setState({ products: data, loading: false });
      } catch (err: any) {
        useProductsStore.setState({ error: err.message || 'Failed to load products', loading: false });
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || product.category === categoryFilter;
      const matchesStatus = !statusFilter || product.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchTerm, categoryFilter, statusFilter]);

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const lowStockCount = products.filter((p) => p.stock <= 5).length;

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Products</h1>
          <p className="text-slate-400 mt-1">Manage your product catalog</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {loading && <p className="text-sm text-slate-400">Loading products...</p>}

      {/* Alert for Low Stock */}
      {lowStockCount > 0 && (
        <div className="bg-amber-500/10 border border-amber-500 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="text-amber-500" size={20} />
          <div>
            <p className="text-amber-500 font-medium">{lowStockCount} products have low stock</p>
            <p className="text-sm text-amber-400">Consider restocking these items</p>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatBox label="Total Products" value={products.length} />
        <StatBox label="Filtered Results" value={filteredProducts.length} />
        <StatBox label="Low Stock" value={lowStockCount} highlight="amber" />
        <StatBox
          label="Out of Stock"
          value={products.filter((p) => p.stock === 0).length}
          highlight="red"
        />
      </div>

      {/* Table */}
      <ProductTableView products={filteredProducts} onEdit={handleEdit} />

      {/* Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
}

function StatBox({ label, value, highlight }: any) {
  const highlightColor =
    highlight === 'amber' ? 'text-amber-400' : highlight === 'red' ? 'text-red-400' : 'text-blue-400';

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${highlightColor}`}>{value}</p>
    </div>
  );
}
