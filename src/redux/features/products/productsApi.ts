// import { baseApi } from "../../api/baseApi";

// const productsApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({

//         // SignUp: builder.mutation({
//         //     query: (LogInData) => ({
//         //         url: '/auth/signup',
//         //         method: 'POST',
//         //         body: LogInData,
//         //     }),
//         // }),
//         getAllProducts: builder.query({
//             query: () => ({
//                 url: `/products`,
//                 method: 'GET',
//             }),
//         }),
//         getSingleProduct: builder.query({
//             query: (id) => ({
//                 url: `/products/${id}`,
//                 method: 'GET',
//             }),
//         }),
//         // SignUp: builder.mutation({
//         //     query: (LogInData) => ({
//         //         url: '/auth/signup',
//         //         method: 'POST',
//         //         body: LogInData,
//         //     }),
//         // }),
//         getReviewOfProducts: builder.query({
//             query: ({id, params}) => ({
//                 url: `/reviews/product/${id}`,
//                 method: 'GET',
//                 params,
//             }),
//         }),

//     }),
// });

// export const {
//     useGetAllProductsQuery,
//     useGetSingleProductQuery,
//     useGetReviewOfProductsQuery,
// } = productsApi;



// import { baseApi } from "../../api/baseApi";

// const productsApi = baseApi.injectEndpoints({
//     endpoints: (builder) => ({


//         getAllProducts: builder.query({
//             query: () => ({
//                 url: `/products`,
//                 method: 'GET',
//             }),
//         }),
//         getSingleProduct: builder.query({
//             query: (id) => ({
//                 url: `/products/${id}`,
//                 method: 'GET',
//             }),
//         }),
//           getProductByEngine: builder.query({
//             query: (id) => ({
//                 url: `/products/vehicles/${id}`,
//                 method: 'GET',
//             }),
//         }),

//         getReviewOfProducts: builder.query({
//             query: ({id, params}) => ({
//                 url: `/reviews/product/${id}`,
//                 method: 'GET',
//                 params,
//             }),
//         }),

//     }),
// });

// export const {
//     useGetAllProductsQuery,
//     useGetSingleProductQuery,
//     useGetReviewOfProductsQuery,
//     useGetProductByEngineQuery,
// } = productsApi;



import { baseApi } from "../../api/baseApi";


export interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
}

export interface Product {
    id: string;
    productName: string;
    productImages: string[];
    price: number;
    brandName: string;
    // add other fields as needed
}

export interface Category {
    id: string;
    name: string;
    iconUrl: string;
    products: Product[];
}

export interface Vehicle {
    brandName: string;
    modelName: string;
    engineCode: string;
    // add other fields as needed
}

export interface VehicleProductsData {
    vehicle: Vehicle;
    categories: Category[];
}

const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<Product[], void>({
            query: () => ({
                url: `/products`,
                method: "GET",
            }),
        }),

        // getSingleProduct: builder.query<Product, string>({
        //   query: (id) => ({
        //     url: `/products/${id}`,
        //     method: "GET",
        //   }),
        // }),

        getSingleProduct: builder.query<ApiResponse<Product>, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "GET",
            }),
        }),


        getProductByEngine: builder.query<VehicleProductsData, string>({
            query: (id) => ({
                url: `/products/vehicles/${id}`,
                method: "GET",
            }),
        }),

        getReviewOfProducts: builder.query({
            query: ({ id, params }) => ({
                url: `/reviews/product/${id}`,
                method: "GET",
                params,
            }),
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useGetSingleProductQuery,
    useGetReviewOfProductsQuery,
    useGetProductByEngineQuery,
} = productsApi;


