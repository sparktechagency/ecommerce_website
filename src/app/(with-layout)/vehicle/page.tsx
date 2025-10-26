
"use client";

import { useState } from "react";
import { Input } from "antd";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useGetProductByEngineQuery } from "@/redux/features/products/productsApi";

// --- Types ---
interface Product {
  id: string;
  productName: string;
  productImages: string[];
  price: number;
  brandName: string;
}

interface Category {
  id: string;
  name: string;
  iconUrl: string;
  products: Product[];
}

interface Vehicle {
  engineId: string;
  hp: number;
  kw: number;
  ccm: number;
  engineCode: string;
  generationId: string;
  generationName: string;
  modelId: string;
  modelName: string;
  brandId: string;
  brandName: string;
}

interface VehicleProductsData {
  vehicle: Vehicle;
  categories: Category[];
}

interface VehicleProductsApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: VehicleProductsData;
}

// --- Component ---
export default function VehicleProductsPage() {
  const [brandFilter, setBrandFilter] = useState("");
  const searchParams = useSearchParams();
  const engineId = searchParams.get("engineId") || "";

  // Type the API response
  const { data: apiResponse, isLoading, isError } =
    useGetProductByEngineQuery(engineId) as {
      data?: VehicleProductsApiResponse;
      isLoading: boolean;
      isError: boolean;
    };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !apiResponse?.data) return <p>Failed to load products.</p>;

  const { vehicle, categories } = apiResponse.data;

  const filterByBrand = (products: Product[]) =>
    brandFilter
      ? products.filter((p) =>
          p.brandName.toLowerCase().includes(brandFilter.toLowerCase())
        )
      : products;

  return (
    <main className="min-h-screen bg-white p-8 container mx-auto">
      {/* Vehicle Info */}
      <h1 className="text-3xl font-bold text-slate-900 mb-8">
        {vehicle.brandName} {vehicle.modelName} ({vehicle.engineCode})
      </h1>

      <div className="flex gap-16">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0">
          <div className="border border-slate-300 rounded p-6">
            <label className="block text-sm font-semibold text-slate-900 mb-4">
              Filter Brand:
            </label>
            <Input
              type="text"
              placeholder="Enter brand"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="w-full border-slate-300 mb-6"
            />
            <button
              onClick={() => setBrandFilter("")}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Show All
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 space-y-8">
          {categories.map((category: Category) => (
            <div key={category.id}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-xl font-semibold">{category.name}</h2>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filterByBrand(category.products).map((product: Product) => (
                  <div
                    key={product.id}
                    className="border rounded p-3 flex flex-col hover:shadow-lg transition"
                  >
                    <Image
                      src={product.productImages[0] || "/placeholder.svg"}
                      alt={product.productName}
                      width={300}
                      height={128}
                      className="object-cover rounded mb-2"
                    />
                    <h3 className="font-medium text-sm mb-1">{product.productName}</h3>
                    <p className="text-xs text-gray-500 mb-1">Brand: {product.brandName}</p>
                    <p className="font-semibold text-sm">${product.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
