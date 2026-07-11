import { useState, useCallback } from 'react';
import { ApiClient } from '@imeek/api-sdk';

const apiClient = new ApiClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 30000,
});

export const useProductsApi = (storeId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = useCallback(
    async (product: any) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiClient.createProduct({
          ...product,
          storeId,
        });
        return result;
      } catch (err: any) {
        const message = err.message || 'Failed to create product';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [storeId],
  );

  const getProducts = useCallback(
    async (page?: number, limit?: number, search?: string, category?: string, status?: string) => {
      setLoading(true);
      setError(null);
      try {
        return await apiClient.getProducts(storeId, page, limit, search, category, status);
      } catch (err: any) {
        const message = err.message || 'Failed to fetch products';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [storeId],
  );

  const getProduct = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        return await apiClient.getProduct(id);
      } catch (err: any) {
        const message = err.message || 'Failed to fetch product';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const updateProduct = useCallback(
    async (id: string, product: any) => {
      setLoading(true);
      setError(null);
      try {
        return await apiClient.updateProduct(id, product);
      } catch (err: any) {
        const message = err.message || 'Failed to update product';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        return await apiClient.deleteProduct(id);
      } catch (err: any) {
        const message = err.message || 'Failed to delete product';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const getCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      return await apiClient.getProductCategories(storeId);
    } catch (err: any) {
      const message = err.message || 'Failed to fetch categories';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [storeId]);

  const getStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      return await apiClient.getProductStats(storeId);
    } catch (err: any) {
      const message = err.message || 'Failed to fetch stats';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [storeId]);

  return {
    loading,
    error,
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getCategories,
    getStats,
  };
};

export { apiClient };
