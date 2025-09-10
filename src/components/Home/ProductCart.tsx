"use clinet"
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from 'next/image';
import { Rate } from 'antd';
import { IoIosHeartEmpty } from 'react-icons/io';
import Link from 'next/link';
import { Imageurl } from '@/utils/Imageurl';
import { useDispatch, useSelector } from 'react-redux';
import { addRemoveToWishlist } from '@/redux/features/wishlist/wishlistSlice';

interface ProductCartProps {
  product: any
  id: any;
  image: any;
  title: string;
  price: number;
  rating: number;
  reviews: number;
}

const ProductCart = ({ product, id, image, title, price, rating, reviews }: ProductCartProps) => {
  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.wishlist)
  const isAdded = products.products.some((product: any) => product._id === id);

  return (
    <div className='relative'>
      <Link href={`/product/${id}`}>
        <Image
          src={`${Imageurl}/${image}`}
          height={500}
          width={500}
          alt={title}
          className='w-full h-[300px] object-cover cursor-pointer'
        />
      </Link>
      <IoIosHeartEmpty onClick={() => dispatch(addRemoveToWishlist(product))} className={`${isAdded ? "bg-primary text-white" : "bg-[#e6fbef]"} p-2 w-10 h-10 rounded-full top-2 right-2 absolute cursor-pointer`} />
      <div className='mt-6 pb-2 md:pb-5'>
        <h2 className='text-sm md:text-xl mb-1 md:mb-4 font-semibold dark:text-white'>{title}</h2>
        <div className='flex flex-col md:flex-row items-start md:text-lg md:items-center gap-0 md:gap-3 font-semibold'>
          <p className='text-primary mb-1 md:mb-0 text-md'>${price}</p>
          <Rate disabled defaultValue={rating} />
          <p className='dark:text-white'>({reviews})</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
