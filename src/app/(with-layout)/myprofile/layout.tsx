// "use client";

// import { Avatar, Breadcrumb, Upload } from "antd";
// import Link from "next/link";
// import { useState } from "react";
// import { FaMapMarkerAlt, FaCamera, FaEnvelope, FaPhone } from "react-icons/fa";
// import { useGetUserProfileQuery } from "@/redux/features/auth/authApi"; // your queries
// import { useGetContactUsInfoQuery } from "@/redux/features/contactUs/contactUsApi";

// const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
//   const { data: userData, isLoading: isUserLoading, isError: isUserError } = useGetUserProfileQuery(undefined);
//   const { data: companyData, isLoading: isCompanyLoading, isError: isCompanyError } = useGetContactUsInfoQuery(undefined);

//   const [profilePic, setProfilePic] = useState<File | null>(null);

//   const profilePicUrl = profilePic
//     ? URL.createObjectURL(profilePic)
//     : userData?.data?.image || "https://avatar.iran.liara.run/public/11";

//   const handleProfilePicUpload = (e: { file: File }) => {
//     setProfilePic(e.file);
//   };

//   if (isUserLoading || isCompanyLoading) return <p>Loading...</p>;
//   if (isUserError || isCompanyError || !userData?.data || !companyData?.data) return <p>Failed to load profile.</p>;
// // phoneNumber, email, address
//   const { fullName,  } = userData.data;
//   const { phone: companyPhone, email: companyEmail, address: companyAddress } = companyData.data;

//   return (
//     <div className="dark:text-white">
//       <div className="container mx-auto py-10 md:py-16 px-3 md:px-0">
//         <Breadcrumb
//           items={[
//             { title: <Link href={`/`}><p className="dark:text-white">Home</p></Link> },
//             { title: <Link href={`/myprofile`}><p className="dark:text-white text-black">My Account</p></Link> },
//           ]}
//         />
//       </div>

//       <div className="flex justify-center items-center text-white w-full mx-auto p-5 gap-5 rounded-md">
//         <div className="relative">
//           <Avatar size={140} src={profilePicUrl} className="dark:border-2 dark:border-primary shadow-xl" />
//           <Upload
//             showUploadList={false}
//             beforeUpload={() => false}
//             onChange={handleProfilePicUpload}
//             className="absolute bottom-2 right-2 bg-primary px-4 py-[5px] rounded-full cursor-pointer"
//           >
//             <FaCamera className="text-white mt-[5px] w-6" />
//           </Upload>
//         </div>
//       </div>

//       <div>
//         <h2 className="text-center text-4xl font-semibold">{fullName}</h2>
//       </div>

//       <div className="py-10 md:py-16 px-3 md:px-0">
//         <div className="container mx-auto px-4 py-8">
//           <div className="grid lg:grid-cols-2 gap-12">
//             {/* Left Column - Welcome & Contact Section */}
//             <div className="space-y-8">
//               <div className="space-y-2">
//                 <h1 className="text-2xl font-medium">Welcome to your account!</h1>
//                 <p className="text-gray-600 dark:text-gray-300">
//                   Update your details, manage addresses and keep your account secure.
//                 </p>
//               </div>

//               <div className="space-y-4">
//                 <p>
//                   If you need any help <span className="text-orange-500">contact us:</span>
//                 </p>

//                 <div className="flex items-center gap-3">
//                   <FaPhone className="text-gray-700 dark:text-white" />
//                   <span>{companyPhone}</span>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <FaEnvelope className="text-gray-700 dark:text-white" />
//                   <span>{companyEmail}</span>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <FaMapMarkerAlt className="text-gray-700 mt-1 dark:text-white" />
//                   <span>{companyAddress}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             {children}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileLayout;


"use client";

import { Avatar, Breadcrumb, Upload, UploadFile } from "antd";
import type { UploadChangeParam } from "antd/es/upload";

import Link from "next/link";
import { useState } from "react";
import { FaMapMarkerAlt, FaCamera, FaEnvelope, FaPhone } from "react-icons/fa";
import { useGetUserProfileQuery } from "@/redux/features/auth/authApi";
import { useGetContactUsInfoQuery } from "@/redux/features/contactUs/contactUsApi";

// Type for company contact info
interface CompanyInfo {
  phone: string;
  email: string;
  address: string;
}

// Type for user profile
interface UserProfile {
  fullName: string;
  image?: string;
}

// Props for ProfileLayout
interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  const { data: userData, isLoading: isUserLoading, isError: isUserError } = useGetUserProfileQuery(undefined);
  const { data: companyData, isLoading: isCompanyLoading, isError: isCompanyError } = useGetContactUsInfoQuery(undefined);

  const [profilePic, setProfilePic] = useState<File | null>(null);

  // Safely typed profile picture URL
  const profilePicUrl: string = profilePic
    ? URL.createObjectURL(profilePic)
    : userData?.data?.image ?? "https://avatar.iran.liara.run/public/11";

  // Typed Upload handler
  const handleProfilePicUpload = (info: UploadChangeParam<UploadFile<File>>) => {
    const file = info.file.originFileObj;
    if (file) setProfilePic(file);
  };

  // Loading and error handling
  if (isUserLoading || isCompanyLoading) return <p>Loading...</p>;
  if (isUserError || isCompanyError || !userData?.data || !companyData?.data) return <p>Failed to load profile.</p>;

  const user: UserProfile = userData.data;
  const company: CompanyInfo = companyData.data;

  return (
    <div className="dark:text-white">
      {/* Breadcrumb */}
      <div className="container mx-auto py-10 md:py-16 px-3 md:px-0">
        <Breadcrumb
          items={[
            { title: <Link href="/"><p className="dark:text-white">Home</p></Link> },
            { title: <Link href="/myprofile"><p className="dark:text-white text-black">My Account</p></Link> },
          ]}
        />
      </div>

      {/* Profile Avatar */}
      <div className="flex justify-center items-center text-white w-full mx-auto p-5 gap-5 rounded-md">
        <div className="relative">
          <Avatar size={140} src={profilePicUrl} className="dark:border-2 dark:border-primary shadow-xl" />
          <Upload<File>
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleProfilePicUpload}
            className="absolute bottom-2 right-2 bg-primary px-4 py-[5px] rounded-full cursor-pointer"
          >
            <FaCamera className="text-white mt-[5px] w-6" />
          </Upload>
        </div>
      </div>

      {/* User Name */}
      <div>
        <h2 className="text-center text-4xl font-semibold">{user.fullName}</h2>
      </div>

      {/* Main Content */}
      <div className="py-10 md:py-16 px-3 md:px-0">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Welcome & Contact Section */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl font-medium">Welcome to your account!</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Update your details, manage addresses and keep your account secure.
                </p>
              </div>

              <div className="space-y-4">
                <p>
                  If you need any help <span className="text-orange-500">contact us:</span>
                </p>

                <div className="flex items-center gap-3">
                  <FaPhone className="text-gray-700 dark:text-white" />
                  <span>{company.phone}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-gray-700 dark:text-white" />
                  <span>{company.email}</span>
                </div>

                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-gray-700 mt-1 dark:text-white" />
                  <span>{company.address}</span>
                </div>
              </div>
            </div>

            {/* Right Column - children */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
