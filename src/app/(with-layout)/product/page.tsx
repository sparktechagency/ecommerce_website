"use client";

import ProductCart from "@/components/Home/ProductCart";
import { Input, Pagination, Select } from "antd";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

// Product image imports (local placeholders)
import wheel from '../../../../public/products/wheels.jpg';
import sparksPlug from '../../../../public/products/car-sparks-plug.jpg';


// ------------------- Type Definitions -------------------
interface Seller {
  userId: string;
  companyName: string;
  logo: string | null;
}

interface Category {
  id: string;
  name: string;
}

interface Brand {
  id: string;
  brandName: string;
  brandImage: string | null;
}

interface Product {
  id: string;
  productName: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  productImages: string[];
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  seller: Seller;
  category: Category;
  brand: Brand;
  _count: {
    review: number;
  };
}

// ------------------- Component -------------------
const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Example placeholder products (local images)
  const products: Product[] = [
    {
      id: "1",
      productName: "Wheels",
      description: "High quality wheels",
      price: 250,
      discount: 0,
      stock: 100,
      productImages: [wheel.src],
      isVisible: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: { userId: "1", companyName: "Wheel Co", logo: null },
      category: { id: "1", name: "Car Parts" },
      brand: { id: "1", brandName: "Toyota", brandImage: null },
      _count: { review: 12 },
    },
    {
      id: "2",
      productName: "Spark Plug",
      description: "High quality spark plug",
      price: 35,
      discount: 0,
      stock: 200,
      productImages: [sparksPlug.src],
      isVisible: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      seller: { userId: "2", companyName: "Spark Co", logo: null },
      category: { id: "1", name: "Car Parts" },
      brand: { id: "2", brandName: "Honda", brandImage: null },
      _count: { review: 5 },
    },
  ];

  return (
    <div className="container mx-auto py-8 md:py-16">
      {/* Vehicle selectors */}
      <div className="container mx-auto shadow-md border-t-[10px] border-t-[#f56100] border border-[#FCCEB0] py-14">
        <div className="text-center">
          <h2 className="text-4xl font-semibold dark:text-white">Select Your Vehicle</h2>
          <p className="text-[#5A5B54] mt-3 dark:text-gray-300">For finding the correct part</p>
        </div>
        <div className="px-4 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          <div className="flex items-center w-full">
            <span className="bg-[#f56100] py-[10px] px-4 text-white">1</span>
            <Select
              placeholder="Year"
              className="w-full"
              options={[{ value: '2025', label: '2025' }, { value: '2024', label: '2024' }]}
            />
          </div>
          <div className="flex items-center w-full">
            <span className="bg-[#f56100] py-[10px] px-4 text-white">2</span>
            <Select
              placeholder="Brand"
              className="w-full"
              options={[{ value: 'toyota', label: 'Toyota' }, { value: 'honda', label: 'Honda' }]}
            />
          </div>
          <div className="flex items-center w-full">
            <span className="bg-[#f56100] py-[10px] px-4 text-white">3</span>
            <Select
              placeholder="Model"
              className="w-full"
              options={[{ value: 'camry', label: 'Camry' }, { value: 'accord', label: 'Accord' }]}
            />
          </div>
          <div className="flex items-center w-full">
            <span className="bg-[#f56100] py-[10px] px-4 text-white">4</span>
            <Select
              placeholder="Engine Power"
              className="w-full"
              options={[{ value: '150', label: '150 HP' }, { value: '200', label: '200 HP' }]}
            />
          </div>
        </div>
      </div>

      {/* Search and title */}
      <div className="mt-10 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <span className="bg-primary h-10 px-[10px] rounded-md" />
          <p className="text-primary font-semibold text-lg">Our Products</p>
        </div>
        <div className="w-[280px]">
          <Input placeholder="Search product" suffix={<CiSearch size={20} />} />
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto mt-10 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-10">
          {products.map((product) => (
            <ProductCart key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={products.length}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default ProductPage;
