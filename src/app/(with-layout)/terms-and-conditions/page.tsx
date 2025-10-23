"use client";

import { useGetTermsAndConditionsQuery } from "@/redux/features/terms/termsApi";
import { Breadcrumb, Spin } from "antd";
import Link from "next/link";

const TermsAndConditions = () => {
  const { data, isLoading, isError } = useGetTermsAndConditionsQuery();
  const terms = data?.data;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-red-500 text-lg">
          Failed to load Terms & Conditions.
        </p>
      </div>
    );

  return (
    <div className="container mx-auto py-16 px-3 md:px-0">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          {
            title: (
              <Link href="/">
                <p className="dark:text-white">Home</p>
              </Link>
            ),
          },
          {
            title: (
              <Link href="/terms-and-conditions">
                <p className="dark:text-white">Terms & Conditions</p>
              </Link>
            ),
          },
        ]}
      />

      {/* Page Heading */}
      <h1 className="text-4xl md:text-5xl font-bold my-8 dark:text-white">
        {terms?.heading || "Terms & Conditions"}
      </h1>

      {/* Content */}
      <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg">
        <p>{terms?.content || "No terms and conditions available."}</p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
