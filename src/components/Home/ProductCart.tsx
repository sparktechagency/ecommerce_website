// "use client";

// import Image from "next/image";
// import { Rate } from "antd";
// import { IoIosHeartEmpty } from "react-icons/io";
// import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
// import { addRemoveToWishlist, Product } from "@/redux/features/wishlist/wishlistSlice";
// import { RootState } from "@/redux/store";

// // ------------------- Props -------------------
// interface ProductCartProps {
//   product: Product;
// }

// // ------------------- Component -------------------
// const ProductCart = ({ product }: ProductCartProps) => {
//   const discountPercentage = product.discount ?? 0;
//   const discount = discountPercentage / 100;
//   const price = product.price - product.price * discount;
//   const originalPrice = product.price;

//   const dispatch = useDispatch();
//   const wishlist = useSelector((state: RootState) => state.wishlist);
//   const isAdded = wishlist.products.some((p) => p.id === product.id);

//   const imageUrl =
//     product.productImages && product.productImages.length > 0
//       ? product.productImages[0]
//       : "/no-image.png";

//   return (
//     <div className="relative">
//       {discountPercentage > 0 && (
//         <div className="absolute left-4 top-3 rounded text-md bg-orange-500 px-2 shadow py-1 text-white">
//           -{discountPercentage}%
//         </div>
//       )}

//       <Link href={`/product/${product.id}`}>
//         <Image
//           src={imageUrl}
//           alt={product.productName}
//           height={500}
//           width={500}
//           className="w-full h-[300px] object-cover cursor-pointer rounded-xl"
//         />
//       </Link>

//       <IoIosHeartEmpty
//         onClick={() => dispatch(addRemoveToWishlist(product))}
//         className={`${
//           isAdded ? "bg-primary text-white" : "bg-[#e6fbef]"
//         } p-2 w-10 h-10 rounded-full top-2 right-2 absolute cursor-pointer`}
//       />

//       <div className="mt-6 pb-2 md:pb-5">
//         <h2 className="text-sm md:text-xl mb-1 md:mb-4 font-semibold dark:text-white">
//           {product.productName}
//         </h2>
//         <div className="flex flex-col md:flex-row items-start md:text-lg md:items-center gap-0 md:gap-3 font-semibold">
//           {discountPercentage > 0 ? (
//             <>
//               <span className="text-xl font-bold text-orange-500">
//                 ${price.toFixed(2)}
//               </span>
//               <span className="ml-2 text-gray-500 line-through">
//                 ${originalPrice.toFixed(2)}
//               </span>
//             </>
//           ) : (
//             <span className="text-xl font-bold text-orange-500">
//               ${price.toFixed(2)}
//             </span>
//           )}
//           <Rate disabled allowHalf defaultValue={product._count?.review ?? 0} />
//           <p className="dark:text-white">({product._count?.review ?? 0})</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCart;



"use client";

import Image from "next/image";
import { Rate } from "antd";
import { IoIosHeartEmpty } from "react-icons/io";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addRemoveToWishlist } from "@/redux/features/wishlist/wishlistSlice";
import { RootState } from "@/redux/store";

// ------------------- Product type -------------------
export interface Product {
  id: string;
  productName: string;
  price: number;
  discount?: number;
  productImages?: string[];
  _count: { review: number };
  // add seller, brand, category if needed
}

// ------------------- Props -------------------
interface ProductCartProps {
  product: Product;
}

// ------------------- Component -------------------
const ProductCart = ({ product }: ProductCartProps) => {
  const discountPercentage = product.discount ?? 0;
  const discount = discountPercentage / 100;
  const price = product.price - product.price * discount;
  const originalPrice = product.price;

  const dispatch = useDispatch();
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const isAdded = wishlist.products.some((p) => p.id === product.id);

  const imageUrl =
    product.productImages && product.productImages.length > 0
      ? product.productImages[0]
      : "/no-image.png";

  return (
    <div className="relative">
      {discountPercentage > 0 && (
        <div className="absolute left-4 top-3 rounded text-md bg-orange-500 px-2 shadow py-1 text-white">
          -{discountPercentage}%
        </div>
      )}

      <Link href={`/product/${product.id}`}>
        <Image
          src={imageUrl}
          alt={product.productName}
          height={500}
          width={500}
          className="w-full h-[300px] object-cover cursor-pointer rounded-xl"
        />
      </Link>

      <IoIosHeartEmpty
        onClick={() => dispatch(addRemoveToWishlist(product))}
        className={`${
          isAdded ? "bg-primary text-white" : "bg-[#e6fbef]"
        } p-2 w-10 h-10 rounded-full top-2 right-2 absolute cursor-pointer`}
      />

      <div className="mt-6 pb-2 md:pb-5">
        <h2 className="text-sm md:text-xl mb-1 md:mb-4 font-semibold dark:text-white">
          {product.productName}
        </h2>
        <div className="flex flex-col md:flex-row items-start md:text-lg md:items-center gap-0 md:gap-3 font-semibold">
          {discountPercentage > 0 ? (
            <>
              <span className="text-xl font-bold text-orange-500">
                ${price.toFixed(2)}
              </span>
              <span className="ml-2 text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-orange-500">
              ${price.toFixed(2)}
            </span>
          )}
          <Rate
            disabled
            allowHalf
            defaultValue={product._count?.review ?? 0}
          />
          <p className="dark:text-white">({product._count?.review ?? 0})</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
