


"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";

import { TbEdit } from "react-icons/tb";
import EditProductModal from "./EditProductModal";

interface MyProductCartProps {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  images: string[];
  isVisible: boolean;
  onDelete?: (id: string) => void; // ✅ added
}

const MyProductCart: React.FC<MyProductCartProps> = ({
  id,
  name,
  description,
  price,
  discount,
  stock,
  images,
  isVisible,
  onDelete,
}) => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleCardClick = () => {
    router.push(`/product/${id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Added to cart", id);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id); // ✅ call parent delete
    }
  };

  const showEditModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditModalOpen(true);
  };

  const discountedPrice =
    discount > 0 ? price - price * (discount / 100) : price;

  return (
    <div
      onClick={handleCardClick}
      className="overflow-hidden rounded border border-white hover:shadow-lg transition cursor-pointer"
    >
      <div className="relative bg-[#f2fcf6] px-4 py-8">
        {discount > 0 && (
          <div className="absolute left-4 top-3 rounded text-md bg-orange-500 px-4 py-1 text-white">
            -{discount}%
          </div>
        )}

        <button
          onClick={handleRemove}
          className="absolute right-2 top-2"
          aria-label="Remove item"
        >
          <RiDeleteBin6Line
            size={40}
            className="bg-white rounded-full p-2 cursor-pointer"
          />
        </button>

        <button
          onClick={showEditModal}
          className="absolute left-2 top-2"
          aria-label="Edit item"
        >
          <TbEdit
            size={40}
            className="bg-white rounded-full p-2 cursor-pointer"
          />
        </button>

        <div className="flex h-58 items-center justify-center">
          <Image
            src={images[0] || "/placeholder.svg"}
            alt={name}
            width={200}
            height={200}
            className="w-[200px] object-contain"
          />
        </div>
      </div>

      <button
        className="flex gap-2 w-full items-center justify-center bg-primary py-3 text-white rounded-b cursor-pointer"
        onClick={handleAddToCart}
      >
        <HiOutlineShoppingCart size={25} />
        Add To Cart
      </button>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {name}
        </h3>
        <p className="text-gray-500 mt-1 text-sm">{description}</p>
        <div className="mt-1 flex items-center">
          <span className="text-xl font-bold text-orange-500">
            ${discountedPrice.toFixed(2)}
          </span>
          {discount > 0 && (
            <span className="ml-2 text-gray-500 line-through">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-600">Stock: {stock}</p>
        {!isVisible && (
          <p className="text-sm text-red-500 mt-1">Not Visible</p>
        )}
      </div>

      <EditProductModal
        isModalOpen={isEditModalOpen}
        handleOk={() => setIsEditModalOpen(false)}
        handleCancel={() => setIsEditModalOpen(false)}
        productId={id}  // ✅ pass the product ID here
      />

    </div>
  );
};

export default MyProductCart;
