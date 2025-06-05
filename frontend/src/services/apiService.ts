import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';

// Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  expiresIn: number;
}

export interface Category {
  id: string;
  name: string;
  postCount?: number;
}

export interface Tag {
  id: string;
  name: string;
  postCount?: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author?: {
    id: string;
    name: string;
  };
  category: Category;
  tags: Tag[];
  readingTime?: number;
  createdAt: string;
  updatedAt: string;
  status?: PostStatus;
}

export interface CreatePostRequest {
  title: string;
  content: string;
  categoryId: string;
  tagIds: string[];
  status: PostStatus;
}

export interface UpdatePostRequest extends CreatePostRequest {
  id: string;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

class ApiService {
  private api: AxiosInstance;
  private static instance: ApiService;

  private constructor() {
    const baseURL = "https://blog-platform-api.azurewebsites.net/api";

    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response?.data) {
      return error.response.data as ApiError;
    }
    return {
      status: 500,
      message: 'An unexpected error occurred',
    };
  }

  // --- Auth endpoints ---
  public async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>(
      '/auth/login',
      credentials
    );
    localStorage.setItem('token', response.data.token);
    return response.data;
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

  // --- Posts ---
  public async getPosts(params: {
    categoryId?: string;
    tagId?: string;
  }): Promise<Post[]> {
    const response = await this.api.get<Post[]>('/posts', { params });
    return response.data;
  }

  public async getPost(id: string): Promise<Post> {
    const response = await this.api.get<Post>(`/posts/${id}`);
    return response.data;
  }

  public async createPost(post: CreatePostRequest): Promise<Post> {
    const response = await this.api.post<Post>('/posts', post);
    return response.data;
  }

  public async updatePost(id: string, post: UpdatePostRequest): Promise<Post> {
    const response = await this.api.put<Post>(`/posts/${id}`, post);
    return response.data;
  }

  public async deletePost(id: string): Promise<void> {
    await this.api.delete(`/posts/${id}`);
  }

  public async getDrafts(params: {
    page?: number;
    size?: number;
    sort?: string;
  }): Promise<Post[]> {
    const response = await this.api.get<Post[]>('/posts/drafts', { params });
    return response.data;
  }

  // --- Categories ---
  public async getCategories(): Promise<Category[]> {
    const response = await this.api.get<Category[]>('/categories');
    return response.data;
  }

  public async createCategory(name: string): Promise<Category> {
    const response = await this.api.post<Category>('/categories', { name });
    return response.data;
  }

  public async updateCategory(id: string, name: string): Promise<Category> {
    const response = await this.api.put<Category>(`/categories/${id}`, {
      id,
      name,
    });
    return response.data;
  }

  public async deleteCategory(id: string): Promise<void> {
    await this.api.delete(`/categories/${id}`);
  }

  // --- Tags ---
  public async getTags(): Promise<Tag[]> {
    const response = await this.api.get<Tag[]>('/tags');
    return response.data;
  }

  public async createTags(names: string[]): Promise<Tag[]> {
    const response = await this.api.post<Tag[]>('/tags', { names });
    return response.data;
  }

  public async deleteTag(id: string): Promise<void> {
    await this.api.delete(`/tags/${id}`);
  }
}

export const apiService = ApiService.getInstance();
