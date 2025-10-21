"use client";

import { Skeleton, Breadcrumb } from "antd";
import Link from "next/link";

const CartSkeleton = () => {
  return (
    <div className="container mx-auto py-16 px-3 md:px-0">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            title: (
              <Link href={`/`}>
                <p className="dark:text-white">Home</p>
              </Link>
            ),
          },
          {
            title: (
              <Link href={`/cart`}>
                <p className="dark:text-white">Cart</p>
              </Link>
            ),
          },
        ]}
      />

      {/* Table Header Skeleton */}
      <div className="mt-8 overflow-x-scroll md:overflow-x-visible">
        <div className="w-[850px] md:w-auto shadow px-8 py-6 rounded flex justify-between items-center mb-4">
          <Skeleton.Input active size="small" style={{ width: 60 }} />
          <Skeleton.Input active size="small" style={{ width: 200 }} />
          <Skeleton.Input active size="small" style={{ width: 100 }} />
          <Skeleton.Input active size="small" style={{ width: 100 }} />
          <Skeleton.Input active size="small" style={{ width: 100 }} />
        </div>

        {/* Cart items skeleton */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-[800px] md:w-auto shadow-[0px_5px_5px_rgba(0,0,0,0.03)] dark:shadow-[2px_2px_10px_2px_rgba(255,255,255,0.1)] px-8 py-6 rounded flex justify-between items-center mt-4"
          >
            <Skeleton.Input active size="small" style={{ width: 20 }} /> {/* Checkbox */}
            <div className="flex items-center gap-5 w-[100px] md:w-full">
              <Skeleton.Image active style={{ width: 60, height: 60 }} />
              <Skeleton.Input active size="small" style={{ width: 150 }} />
            </div>
            <Skeleton.Input active size="small" style={{ width: 80 }} />
            <Skeleton.Input active size="small" style={{ width: 80 }} />
            <Skeleton.Input active size="small" style={{ width: 80 }} />
          </div>
        ))}
      </div>

      {/* Footer skeleton (Coupon + Total) */}
      <div className="mt-10 flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex items-start gap-3">
          <Skeleton.Input active size="large" style={{ width: 300 }} />
          <Skeleton.Button active size="large" style={{ width: 192 }} />
        </div>

        <div className="w-full flex lg:justify-end mt-8 lg:mt-0">
          <div className="w-full sm:w-[450px] border border-gray-600 dark:border-white rounded-md p-6">
            <Skeleton.Input active size="large" style={{ width: 200 }} className="mb-4" />
            <Skeleton active paragraph={{ rows: 3 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSkeleton;
