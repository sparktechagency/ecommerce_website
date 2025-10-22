// import { baseApi } from "@/redux/api/baseApi";

// export const carBrandApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     // ✅ Get all car brands dynamically using query params
//     getCarBrands: builder.query({
//       query: ({ year, brandName, modelName, hp }) => {
//         const params = new URLSearchParams();
//         if (year) params.append("year", year);
//         if (brandName) params.append("brandName", brandName);
//         if (modelName) params.append("modelName", modelName);
//         if (hp) params.append("hp", hp);

//         return {
//           url: `/car-brands?${params.toString()}`,
//           method: "GET",
//         };
//       },
//     }),
//   }),
// });

// export const { useGetCarBrandsQuery } = carBrandApi;



import { baseApi } from "@/redux/api/baseApi";

// ✅ Define a type for the query parameters
interface CarBrandsQueryParams {
  year?: string;
  brandName?: string;
  modelName?: string;
  hp?: string | number;
}

export const carBrandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrandsByYear: builder.query({
      query: (year: string) => `/car-brands/brands/${year}`,
    }),
    getModelsByBrand: builder.query({
      query: ({ brandId, year }: { brandId: string; year: string }) =>
        `/car-brands/models/${brandId}/${year}`,
    }),
    getEnginesByModel: builder.query({
      query: (modelId: string) => `/car-brands/engines/${modelId}`,
    }),
    getCarBrands: builder.query({
      // <-- typed query parameters instead of `any`
      query: (params: CarBrandsQueryParams) => {
        const searchParams = new URLSearchParams();
        if (params.year) searchParams.append("year", params.year);
        if (params.brandName) searchParams.append("brandName", params.brandName);
        if (params.modelName) searchParams.append("modelName", params.modelName);
        if (params.hp) searchParams.append("hp", String(params.hp));

        return `/car-brands?${searchParams.toString()}`;
      },
    }),
  }),
});

export const {
  useGetBrandsByYearQuery,
  useGetModelsByBrandQuery,
  useGetEnginesByModelQuery,
  useGetCarBrandsQuery, // <-- exported for usage
} = carBrandApi;
