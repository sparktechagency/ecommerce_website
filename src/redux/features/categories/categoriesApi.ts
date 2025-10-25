import { baseApi } from "../../api/baseApi"

// ========================
// Types
// ========================

export interface Category {
  id: string
  userId: string
  name: string
  iconUrl: string
  createdAt: string
  updatedAt: string
  _count?: {
    product: number
  }
}

export interface Brand {
  id: string
  brandName: string
  brandImage: string | null
}

export interface Seller {
  userId: string
  companyName: string
  logo: string | null
}

export interface Product {
  id: string
  productName: string
  price: number
  discount?: number
  productImages?: string[]
  stock?: number
  avgRating?: number
  totalSold?: number
  brand?: Brand
  seller?: Seller
   _count: { review: number };
}

export interface MetaData {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface CategoriesResponse {
  success: boolean
  statusCode: number
  message: string
  data: Category[]
  meta: MetaData
}

export interface SingleCategoryResponse {
  success: boolean
  statusCode: number
  message: string
  data: Category
}

export interface ProductsResponse {
  success: boolean
  statusCode: number
  message: string
  data: Product[]
}

// ========================
// API
// ========================

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories
    getAllCategories: builder.query<CategoriesResponse, { page?: number; limit?: number } | void>({
      query: (params) => {
        const { page = 1, limit = 10 } = params || {}
        return {
          url: `/categories?page=${page}&limit=${limit}`,
          method: "GET",
        }
      },
    }),

    // Get single category by ID
    getCategoryById: builder.query<SingleCategoryResponse, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
    }),

    // Get products by category ID
    getProductsByCategory: builder.query<ProductsResponse, string>({
      query: (categoryId) => ({
        url: `/products/category-wise/${categoryId}`,
        method: "GET",
      }),
    }),
  }),
})

// ========================
// Hooks
// ========================

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetProductsByCategoryQuery,
} = categoriesApi

export default categoriesApi
