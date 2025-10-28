// // // // redux/features/order/seller/orderApi.ts
// // // import { baseApi } from "../../api/baseApi";

// // // // 🧾 TypeScript types
// // // export interface UpdateOrderStatusPayload {
// // //   orderStatus: "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED";
// // // }

// // // export interface UpdateOrderStatusResponse {
// // //   success: boolean;
// // //   statusCode: number;
// // //   message: string;
// // //   data: {
// // //     orderId: string;
// // //     orderStatus: string;
// // //   };
// // // }

// // // // 🧩 API endpoint
// // // export const orderApi = baseApi.injectEndpoints({
// // //   endpoints: (builder) => ({
// // //     updateOrderStatus: builder.mutation<
// // //       UpdateOrderStatusResponse,
// // //       { orderId: string; payload: UpdateOrderStatusPayload }
// // //     >({
// // //       query: ({ orderId, payload }) => ({
// // //         url: `/orders/update-order-status/${orderId}`,
// // //         method: "PATCH",
// // //         body: payload,
// // //       }),
// // //     }),
// // //   }),
// // // });

// // // export const { useUpdateOrderStatusMutation } = orderApi;



// // // redux/features/order/seller/orderApi.ts
// // import { baseApi } from "../../api/baseApi";

// // // 🧾 TypeScript types
// // export interface UpdateOrderStatusPayload {
// //     status: "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED";
// // }

// // // export interface Invoice {
// // //     Seller: string;
// // //     Email: string;
// // //   Contact Number: string | null;
// // // Address: string | null;
// // // Buyer: string;
// // //   Buyer Email: string;
// // //   Buyer Contact Number: string;
// // //   Buyer Address: string;
// // // "Invoice Number": string;
// // // "Invoice Date": string;
// // // "Product(s) Purchased": string;
// // // "Product ID(s)": string;
// // // "Product Price(s)": string;
// // // "Total Amount": string;
// // // "Payment Method": string;
// // // "Shipping Address": string;
// // // "Billing Address": string;
// // // }

// // export interface Snapshot {
// //     id: string;
// //     userId: string;
// //     addressLine: string;
// //     city: string;
// //     state: string;
// //     postalCode: string;
// //     country: string;
// //     apartmentNo: string | null;
// //     name: string | null;
// //     phoneNumber: string | null;
// //     email: string | null;
// //     type: "SHIPPING" | "BILLING";
// //     createdAt: string;
// //     updatedAt: string;
// // }

// // export interface UpdateOrderStatusResponse {
// //     success: boolean;
// //     statusCode: number;
// //     message: string;
// //     data: {
// //         id: string;
// //         userId: string;
// //         sellerId: string;
// //         paymentId: string;
// //         shippingId: string;
// //         billingId: string;
// //         totalAmount: number;
// //         status: string;
// //         paymentStatus: string;
// //         transactionId: string | null;
// //         notes: string | null;
// //         // invoice: Invoice;
// //         createdAt: string;
// //         updatedAt: string;
// //         shippingSnapshot: Snapshot;
// //         billingSnapshot: Snapshot;
// //     };
// // }

// // // 🧩 API endpoint


// // export const orderApi = baseApi.injectEndpoints({
// //   endpoints: (builder) => ({
// //     updateOrderStatus: builder.mutation<
// //       any, // API response
// //       { orderId: string; status: "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED" }
// //     >({
// //       query: ({ orderId, status }) => ({
// //         url: `/orders/update-order-status/${orderId}`,
// //         method: "PATCH",
// //         body: { status },
// //       }),
// //     }),
// //   }),
// // });

// // export const { useUpdateOrderStatusMutation } = orderApi;




// // redux/features/order/seller/orderApi.ts
// import { baseApi } from "@/redux/api/baseApi";

// export const orderApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     updateOrderStatus: builder.mutation<any, { orderId: string; status: string }>({
//       query: ({ orderId, status }) => ({
//         url: `/orders/update-order-status/${orderId}`,
//         method: "PATCH",
//         body: { status },
//       }),
//     }),
//   }),
// });

// export const { useUpdateOrderStatusMutation } = orderApi;



// redux/features/order/seller/orderApi.ts
import { baseApi } from "@/redux/api/baseApi";

// ✅ Type for order status
// export type OrderStatus = "PENDING" | "PROCESSING" | "DELIVERED" | "CANCELLED";
export type OrderStatus = string;

// ✅ Type for Snapshot
export interface Snapshot {
  id: string;
  userId: string;
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  apartmentNo: string | null;
  name: string | null;
  phoneNumber: string | null;
  email: string | null;
  type: "SHIPPING" | "BILLING";
  createdAt: string;
  updatedAt: string;
}

// ✅ Type for API response
export interface UpdateOrderStatusResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    userId: string;
    sellerId: string;
    paymentId: string;
    shippingId: string;
    billingId: string;
    totalAmount: number;
    status: OrderStatus;
    paymentStatus: string;
    transactionId: string | null;
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    shippingSnapshot: Snapshot;
    billingSnapshot: Snapshot;

  };
}

// ✅ API endpoint
export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateOrderStatus: builder.mutation<
      UpdateOrderStatusResponse,
      { orderId: string; status: OrderStatus }
    >({
      query: ({ orderId, status }) => ({
        url: `/orders/update-order-status/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
    }),
  }),
});

export const { useUpdateOrderStatusMutation } = orderApi;
