


"use client";

import AddProductModal from "@/components/Seller/MyProduct/AddProductModal";
import MyProductCart from "@/components/Seller/MyProduct/MyProductCart";
import MyProductSkeleton from "@/components/Seller/MyProduct/MyProductSkeleton";
// import SelectProduct from "@/components/Seller/MyProduct/SelectProduct";
import { useGetMyProductsQuery, useDeleteProductMutation } from "@/redux/features/seller/product/productApi";

import { useState } from "react";
import { IoAdd } from "react-icons/io5";
import { message } from "antd";

const MyProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, error, refetch } = useGetMyProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const showModal = () => setIsModalOpen(true);
  // const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  // const handleOk = (newProduct?: any) => {
  //   window.location.reload();
  //   setIsModalOpen(false);

  //   if (newProduct) {
  //     message.success("Product added successfully!");
  //     refetch(); // refresh product list after adding
  //     window.location.reload();
  //   }
  // };

  const handleOk = () => {
    setIsModalOpen(false);          // close modal first
    console.log('here');
    message.success("Product added successfully!"); // optional message
    setTimeout(() => {
      window.location.reload();     // reload page after message
    }, 200);                        // small delay so message renders
  };


  const handleDelete = async (productId: string) => {
    try {
      const response = await deleteProduct(productId).unwrap();
      message.success(response.message || "Product deleted successfully!");
      refetch(); // refresh product list
    } catch (err) {
      console.error("Delete error:", err);
      message.error("Failed to delete product");
    }
  };

  if (isLoading) return <MyProductSkeleton />;
  if (error) return <p className="text-center mt-20 text-red-500">Error loading products</p>;

  const products = data?.data || [];

  return (
    <div className="container mx-auto py-8 md:py-16 px-4 md:px-0">
      {/* <SelectProduct /> */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-10 mt-20">
        {/* Add Product Card */}
        <div className="overflow-hidden rounded">
          <div className="relative bg-[#f2fcf6] px-4 py-8 cursor-pointer" onClick={showModal}>
            <div className="flex h-58 items-center justify-center">
              <IoAdd size={120} />
            </div>
          </div>
          <button
            onClick={showModal}
            className="flex gap-2 w-full items-center justify-center bg-primary py-3 text-white rounded-b cursor-pointer"
          >
            <IoAdd size={25} />
            Add Product
          </button>
          <AddProductModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        </div>

        {/* Dynamic Products */}
        {products.map((product) => (
          <MyProductCart
            key={product.id}
            id={product.id}
            name={product.productName}
            description={product.description}
            price={product.price}
            discount={product.discount}
            stock={product.stock}
            images={product.productImages}
            isVisible={product.isVisible}
            onDelete={() => handleDelete(product.id)} // ✅ pass delete function
          />
        ))}
      </div>
    </div>
  );
};

export default MyProduct;
