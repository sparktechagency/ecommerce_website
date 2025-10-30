import { baseApi } from "../../api/baseApi";
export interface User {
  fullName: string;
  image?: string;
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user?: User; // optional user info
}

export interface ReviewData {
  totalRatings: number;
  averageRating: number;
  reviews: Review[];
}

// export interface GetProductReviewsResponse {
//   success: boolean;
//   statusCode: number;
//   message: string;
//   data: ReviewData;
// }


export interface GetProductReviewsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Review[]; // <-- array directly
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}


// For POST review
export interface PostReviewRequest {
  productId: string;
  rating: number;
  comment: string;
}

export interface PostReviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Review; // the newly created review
}


// types/review.ts

export interface GetProductReviewsRequest {
  productId: string;
  rating?: number; // optional, for filtering by rating
}


export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query<GetProductReviewsResponse, GetProductReviewsRequest>({
      query: ({ productId, rating }) => ({
        url: `/reviews/products/${productId}`,
        params: rating && rating > 0 ? { rating } : undefined,
      }),
    }),

    postReview: builder.mutation<PostReviewResponse, PostReviewRequest>({
      query: (body) => ({
        url: `/reviews`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetProductReviewsQuery, usePostReviewMutation } = reviewApi;
