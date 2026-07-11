export interface ApiClientConfig {
  baseURL: string;
  token?: string;
  timeout?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pages: number;
}

export class ApiClient {
  private baseURL: string;
  private token?: string;
  private timeout: number;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL;
    this.token = config.token;
    this.timeout = config.timeout || 30000;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(method: string, path: string, data?: any): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${path}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          errorData.message || response.statusText,
          response.status,
          errorData,
        );
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof ApiError) throw error;
      throw new ApiError(error.message || 'Network error', 0, error);
    }
  }

  async get<T = any>(path: string): Promise<T> {
    return this.request<T>('GET', path);
  }

  async post<T = any>(path: string, data: any): Promise<T> {
    return this.request<T>('POST', path, data);
  }

  async put<T = any>(path: string, data: any): Promise<T> {
    return this.request<T>('PUT', path, data);
  }

  async patch<T = any>(path: string, data: any): Promise<T> {
    return this.request<T>('PATCH', path, data);
  }

  async delete<T = any>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }

  // Product API Methods
  async createProduct<T = any>(data: any): Promise<T> {
    return this.post<T>('/products', data);
  }

  async getProducts<T = any>(
    storeId: string,
    page?: number,
    limit?: number,
    search?: string,
    category?: string,
    status?: string,
  ): Promise<PaginatedResponse<T>> {
    const params = new URLSearchParams({
      storeId,
      page: (page || 1).toString(),
      limit: (limit || 10).toString(),
    });

    if (search) params.append('search', search);
    if (category) params.append('category', category);
    if (status) params.append('status', status);

    return this.get<PaginatedResponse<T>>(`/products?${params.toString()}`);
  }

  async getProduct<T = any>(id: string): Promise<T> {
    return this.get<T>(`/products/${id}`);
  }

  async updateProduct<T = any>(id: string, data: any): Promise<T> {
    return this.patch<T>(`/products/${id}`, data);
  }

  async deleteProduct(id: string): Promise<{ success: boolean; message: string }> {
    return this.delete(`/products/${id}`);
  }

  async getProductCategories(storeId: string): Promise<string[]> {
    return this.get<string[]>(`/products/categories?storeId=${storeId}`);
  }

  async getProductStats(
    storeId: string,
  ): Promise<{
    totalProducts: number;
    totalValue: number;
    lowStockCount: number;
    outOfStockCount: number;
  }> {
    return this.get(`/products/stats?storeId=${storeId}`);
  }

  async updateProductStock(
    id: string,
    quantity: number,
  ): Promise<{ stock: number }> {
    return this.patch(`/products/${id}/stock`, { quantity });
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
  }
}

export function createApiClient(config: ApiClientConfig): ApiClient {
  return new ApiClient(config);
}
