"use client";

const HeroCategorySkeleton = () => {
  return (
    <div>
      {/* Mobile - 2 columns */}
      <div className="grid grid-cols-2 md:hidden gap-3 pt-5">
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse w-full"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse w-full"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse w-full"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse w-full"></div>
      </div>

      {/* Desktop - vertical */}
      <div className="hidden md:flex flex-col gap-5 pt-10 h-[420px]">
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse w-full"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse w-full"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse w-full"></div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-md animate-pulse w-full"></div>
      </div>
    </div>
  );
};

export default HeroCategorySkeleton;
