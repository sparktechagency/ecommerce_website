const SingleProductSkeleton = () => {
  return (
    <div className="flex gap-5 py-16 container mx-auto">

      {/* Left Section: Product Image */}
      <div className="w-1/2 cursor-pointer flex flex-col gap-5">
        <div className="bg-gray-200 animate-pulse rounded-md w-full h-[500px]"></div>
      </div>

      {/* Right Section: Product Details */}
      <div className="w-1/2 flex flex-col gap-4 justify-start items-start p-5">
        <div className="bg-gray-200 animate-pulse h-8 w-1/3 mb-4 rounded"></div>

        {/* Product Tags or Ratings */}
        <div className="flex gap-3 items-center mt-3">
          <div className="bg-gray-200 animate-pulse h-5 w-16 rounded"></div>
          <div className="bg-gray-200 animate-pulse h-5 w-24 rounded"></div>
          <div className="text-[#7f7f7f]"></div>
          <div className="bg-gray-200 animate-pulse h-5 w-20 rounded"></div>
        </div>

        {/* Product Title or Description */}
        <div className="py-4">
          <div className="bg-gray-200 animate-pulse h-10 w-32 rounded"></div>
        </div>

        {/* Product Price or Info */}
        <div>
          <div className="bg-gray-200 animate-pulse h-6 w-full rounded"></div>
        </div>

        {/* Price and Quantity Controls */}
        <div className="text-2xl flex justify-between items-center mt-4 w-full">
          <div className="flex gap-1 items-center dark:text-white">
            <div className="bg-gray-200 animate-pulse h-5 w-16 rounded"></div>
          </div>
          <div className="flex gap-1 items-center dark:text-white">
            <div className="bg-gray-200 animate-pulse h-5 w-16 rounded"></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6 w-full">
          <div className="flex items-center">
            <h3 className="bg-gray-200 animate-pulse h-5 w-16 rounded"></h3>
            <div className="flex gap-3 items-center ml-3">
              <div className="bg-gray-200 animate-pulse h-8 w-12 rounded"></div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="py-[10px] rounded-l-md px-2 cursor-pointer bg-gray-200 animate-pulse h-8 w-10 rounded"></button>
            <button className="py-[6px]  px-6 dark:text-white bg-gray-200 animate-pulse h-8 w-12 rounded"></button>
            <button className="py-[10px] rounded-r-md px-2  cursor-pointer bg-gray-200 animate-pulse h-8 w-10 rounded"></button>
          </div>
        </div>

        {/* Additional buttons or options */}
        <div className="mt-6 flex justify-between items-center w-full">
          <div className="flex gap-4">
            <div className="bg-gray-200 animate-pulse h-8 w-32 rounded"></div>
            <div className="bg-gray-200 animate-pulse h-8 w-32 rounded"></div>
          </div>

          <div>
            <button className="cursor-pointer bg-gray-200 animate-pulse h-10 w-10 rounded"></button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SingleProductSkeleton;
