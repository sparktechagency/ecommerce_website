"use client";

import { Skeleton } from "antd";

const ProfileLayoutSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto py-10 md:py-16 px-3 md:px-0 space-y-10">
      {/* Avatar Skeleton */}
      <div className="flex justify-center">
        <Skeleton.Avatar active size={140} shape="circle" />
      </div>

      {/* Name Skeleton */}
      <Skeleton.Input active size="large" className="mx-auto w-1/3" />

      {/* Two-column content skeleton */}
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
        <div className="space-y-4">
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayoutSkeleton;
