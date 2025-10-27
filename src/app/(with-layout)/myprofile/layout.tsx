// // "use client";

// // import { Avatar, Breadcrumb, Upload, UploadFile } from "antd";
// // import type { UploadChangeParam } from "antd/es/upload";

// // import Link from "next/link";
// // import { useState } from "react";
// // import { FaMapMarkerAlt, FaCamera, FaEnvelope, FaPhone } from "react-icons/fa";
// // import { useGetUserProfileQuery } from "@/redux/features/auth/authApi";
// // import { useGetContactUsInfoQuery } from "@/redux/features/contactUs/contactUsApi";
// // import ProfileLayoutSkeleton from "@/utils/ProfileLayoutSkeleton";

// // // Type for company contact info
// // interface CompanyInfo {
// //   phone: string;
// //   email: string;
// //   address: string;
// // }

// // // Type for user profile
// // interface UserProfile {
// //   fullName: string;
// //   image?: string;
// // }

// // // Props for ProfileLayout
// // interface ProfileLayoutProps {
// //   children: React.ReactNode;
// // }

// // const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
// //   const { data: userData, isLoading: isUserLoading, isError: isUserError } = useGetUserProfileQuery(undefined);
// //   const { data: companyData, isLoading: isCompanyLoading, isError: isCompanyError } = useGetContactUsInfoQuery(undefined);

// //   const [profilePic, setProfilePic] = useState<File | null>(null);

// //   // Safely typed profile picture URL
// //   const profilePicUrl: string = profilePic
// //     ? URL.createObjectURL(profilePic)
// //     : userData?.data?.image ?? "https://avatar.iran.liara.run/public/11";

// //   // Typed Upload handler
// //   const handleProfilePicUpload = (info: UploadChangeParam<UploadFile<File>>) => {
// //     const file = info.file.originFileObj;
// //     if (file) setProfilePic(file);
// //   };

// //   // Loading and error handling
// //   if (isUserLoading || isCompanyLoading) return <ProfileLayoutSkeleton></ProfileLayoutSkeleton>;
// //   if (isUserError || isCompanyError || !userData?.data || !companyData?.data) return <p>Failed to load profile.</p>;

// //   const user: UserProfile = userData.data;
// //   const company: CompanyInfo = companyData.data;

// //   return (
// //     <div className="dark:text-white">
// //       {/* Breadcrumb */}
// //       <div className="container mx-auto py-10 md:py-16 px-3 md:px-0">
// //         <Breadcrumb
// //           items={[
// //             { title: <Link href="/"><p className="dark:text-white">Home</p></Link> },
// //             { title: <Link href="/myprofile"><p className="dark:text-white text-black">My Account</p></Link> },
// //           ]}
// //         />
// //       </div>

// //       {/* Profile Avatar */}
// //       <div className="flex justify-center items-center text-white w-full mx-auto p-5 gap-5 rounded-md">
// //         <div className="relative">
// //           <Avatar size={140} src={profilePicUrl} className="dark:border-2 dark:border-primary shadow-xl" />
// //           <Upload<File>
// //             showUploadList={false}
// //             beforeUpload={() => false}
// //             onChange={handleProfilePicUpload}
// //             className="absolute bottom-2 right-2 bg-primary px-4 py-[5px] rounded-full cursor-pointer"
// //           >
// //             <FaCamera className="text-white mt-[5px] w-6" />
// //           </Upload>
// //         </div>
// //       </div>

// //       {/* User Name */}
// //       <div>
// //         <h2 className="text-center text-4xl font-semibold">{user.fullName}</h2>
// //       </div>

// //       {/* Main Content */}
// //       <div className="py-10 md:py-16 px-3 md:px-0">
// //         <div className="container mx-auto px-4 py-8">
// //           <div className="grid lg:grid-cols-2 gap-12">
// //             {/* Left Column - Welcome & Contact Section */}
// //             <div className="space-y-8">
// //               <div className="space-y-2">
// //                 <h1 className="text-2xl font-medium">Welcome to your account!</h1>
// //                 <p className="text-gray-600 dark:text-gray-300">
// //                   Update your details, manage addresses and keep your account secure.
// //                 </p>
// //               </div>

// //               <div className="space-y-4">
// //                 <p>
// //                   If you need any help <span className="text-orange-500">contact us:</span>
// //                 </p>

// //                 <div className="flex items-center gap-3">
// //                   <FaPhone className="text-gray-700 dark:text-white" />
// //                   <span>{company.phone}</span>
// //                 </div>

// //                 <div className="flex items-center gap-3">
// //                   <FaEnvelope className="text-gray-700 dark:text-white" />
// //                   <span>{company.email}</span>
// //                 </div>

// //                 <div className="flex items-start gap-3">
// //                   <FaMapMarkerAlt className="text-gray-700 mt-1 dark:text-white" />
// //                   <span>{company.address}</span>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Right Column - children */}
// //             {children}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfileLayout;


// "use client";

// import { Avatar, Breadcrumb, Upload, UploadFile, message, Spin } from "antd";
// import type { UploadChangeParam } from "antd/es/upload";
// import Link from "next/link";
// import { useState } from "react";
// import { FaMapMarkerAlt, FaCamera, FaEnvelope, FaPhone } from "react-icons/fa";
// import {
//   useGetUserProfileQuery,
//   useUpdateProfileImageMutation,
// } from "@/redux/features/auth/authApi";
// import { useGetContactUsInfoQuery } from "@/redux/features/contactUs/contactUsApi";
// import ProfileLayoutSkeleton from "@/utils/ProfileLayoutSkeleton";

// interface CompanyInfo {
//   phone: string;
//   email: string;
//   address: string;
// }

// interface UserProfile {
//   fullName: string;
//   image?: string;
// }

// interface ProfileLayoutProps {
//   children: React.ReactNode;
// }

// const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
//   console.log("🧩 ProfileLayout mounted");

//   const {
//     data: userData,
//     isLoading: isUserLoading,
//     isError: isUserError,
//     refetch: refetchUser,
//   } = useGetUserProfileQuery(undefined);

//   const {
//     data: companyData,
//     isLoading: isCompanyLoading,
//     isError: isCompanyError,
//   } = useGetContactUsInfoQuery(undefined);

//   const [updateProfileImage, { isLoading: isUploading }] =
//     useUpdateProfileImageMutation();

//   const [profilePicPreview, setProfilePicPreview] = useState<string | null>(
//     null
//   );

//   // ------------------------------
//   // Handle Profile Image Upload
//   // ------------------------------
//   const handleProfilePicUpload = async (
//     info: UploadChangeParam<UploadFile<File>>
//   ) => {
//     console.log("📤 Upload triggered:", info);

//     const file = info.file?.originFileObj || info.file as unknown as File;
//     console.log("🗂️ Selected file:", file);

//     if (!file) {
//       console.warn("⚠️ No file found in upload event!");
//       return;
//     }

//     console.log("📄 File details:", {
//       name: file.name,
//       type: file.type,
//       size: file.size,
//     });

//     // Validate
//     const validTypes = ["image/jpeg", "image/png", "image/jpg"];
//     if (!validTypes.includes(file.type)) {
//       console.error("❌ Invalid type:", file.type);
//       return message.error("Only JPG, JPEG, or PNG files allowed.");
//     }
//     if (file.size > 3 * 1024 * 1024) {
//       console.error("❌ Too large:", file.size);
//       return message.error("File must be smaller than 3MB.");
//     }

//     // Local preview
//     const previewUrl = URL.createObjectURL(file);
//     console.log("🖼️ Preview URL:", previewUrl);
//     setProfilePicPreview(previewUrl);

//     try {
//       console.log("🚀 Uploading to API...");
//       const res = await updateProfileImage(file).unwrap(); // send single file
//       console.log("✅ API response:", res);

//       message.success(res.message || "Profile image updated successfully!");
//       setProfilePicPreview(res.data.image);
//       console.log("🔁 Refetching user...");
//       await refetchUser();
//     } catch (error: unknown) {
//     if (
//       typeof error === "object" &&
//       error !== null &&
//       "data" in error &&
//       typeof (error as { data: { message?: string } }).data.message === "string"
//     ) {
//       message.error((error as { data: { message: string } }).data.message);
//     } else {
//       message.error("Failed to update profile.");
//     }
//   };

//   // ------------------------------
//   // Loading / Error Handling
//   // ------------------------------
//   console.log("🔄 Data states:", {
//     userData,
//     companyData,
//     isUserLoading,
//     isCompanyLoading,
//     isUserError,
//     isCompanyError,
//   });

//   if (isUserLoading || isCompanyLoading) return <ProfileLayoutSkeleton />;
//   if (
//     isUserError ||
//     isCompanyError ||
//     !userData?.data ||
//     !companyData?.data
//   ) {
//     console.error("❌ Failed to load user/company data");
//     return <p>Failed to load profile.</p>;
//   }

//   const user: UserProfile = userData.data;
//   const company: CompanyInfo = companyData.data;
//   const profilePicUrl = profilePicPreview || user.image;

//   console.log("🧠 profilePicUrl:", profilePicUrl);

//   // ------------------------------
//   // Render
//   // ------------------------------
//   return (
//     <div className="dark:text-white">
//       <div className="container mx-auto py-10 md:py-16 px-3 md:px-0">
//         <Breadcrumb
//           items={[
//             {
//               title: (
//                 <Link href="/">
//                   <p className="dark:text-white">Home</p>
//                 </Link>
//               ),
//             },
//             {
//               title: (
//                 <Link href="/myprofile">
//                   <p className="dark:text-white">My Account</p>
//                 </Link>
//               ),
//             },
//           ]}
//         />
//       </div>

//       {/* Avatar */}
//       <div className="flex justify-center items-center w-full p-5 gap-5">
//         <div className="relative">
//           <Avatar
//             size={140}
//             src={profilePicUrl}
//             className="dark:border-2 dark:border-primary shadow-xl"
//           />
//           {isUploading && (
//             <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
//               <Spin />
//             </div>
//           )}
//           <Upload
//             name="profileImage"
//             showUploadList={false}
//             beforeUpload={() => false}
//             onChange={handleProfilePicUpload}
//             accept=".jpg,.jpeg,.png"
//             maxCount={1}
//             multiple={false}
//             disabled={isUploading}
//             className="absolute bottom-2 right-2 bg-primary px-4 py-[5px] rounded-full cursor-pointer"
//           >
//             <button
//               type="button"
//               onClick={() => console.log("📸 Camera clicked")}
//               className="flex items-center justify-center"
//             >
//               <FaCamera className="text-white mt-[5px] w-6" />
//             </button>
//           </Upload>
//         </div>
//       </div>

//       <div>
//         <h2 className="text-center text-4xl font-semibold">{user.fullName}</h2>
//       </div>

//       {/* Main */}
//       <div className="py-10 md:py-16 px-3 md:px-0">
//         <div className="container mx-auto px-4 py-8">
//           <div className="grid lg:grid-cols-2 gap-12">
//             <div className="space-y-8">
//               <div className="space-y-2">
//                 <h1 className="text-2xl font-medium">Welcome to your account!</h1>
//                 <p className="text-gray-600 dark:text-gray-300">
//                   Update your details, manage addresses and keep your account secure.
//                 </p>
//               </div>

//               <div className="space-y-4">
//                 <p>
//                   If you need any help{" "}
//                   <span className="text-orange-500">contact us:</span>
//                 </p>

//                 <div className="flex items-center gap-3">
//                   <FaPhone className="text-gray-700 dark:text-white" />
//                   <span>{company.phone}</span>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <FaEnvelope className="text-gray-700 dark:text-white" />
//                   <span>{company.email}</span>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <FaMapMarkerAlt className="text-gray-700 mt-1 dark:text-white" />
//                   <span>{company.address}</span>
//                 </div>
//               </div>
//             </div>

//             {children}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileLayout;





"use client";

import React, { useState } from "react";
import { Avatar, Breadcrumb, Upload, UploadFile, message, Spin } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import Link from "next/link";
import { FaMapMarkerAlt, FaCamera, FaEnvelope, FaPhone } from "react-icons/fa";
import {
  useGetUserProfileQuery,
  useUpdateProfileImageMutation,
} from "@/redux/features/auth/authApi";
import { useGetContactUsInfoQuery } from "@/redux/features/contactUs/contactUsApi";
import ProfileLayoutSkeleton from "@/utils/ProfileLayoutSkeleton";

interface CompanyInfo {
  phone: string;
  email: string;
  address: string;
}

interface UserProfile {
  fullName: string;
  image?: string;
}

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ children }) => {
  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    refetch: refetchUser,
  } = useGetUserProfileQuery(undefined);

  const {
    data: companyData,
    isLoading: isCompanyLoading,
    isError: isCompanyError,
  } = useGetContactUsInfoQuery(undefined);

  const [updateProfileImage, { isLoading: isUploading }] =
    useUpdateProfileImageMutation();

  const [profilePicPreview, setProfilePicPreview] = useState<string | null>(
    null
  );

  // Handle Profile Image Upload
  const handleProfilePicUpload = async (
    info: UploadChangeParam<UploadFile<File>>
  ) => {
    const file = info.file?.originFileObj || (info.file as unknown as File);
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      return message.error("Only JPG, JPEG, or PNG files allowed.");
    }
    if (file.size > 3 * 1024 * 1024) {
      return message.error("File must be smaller than 3MB.");
    }

    const previewUrl = URL.createObjectURL(file);
    setProfilePicPreview(previewUrl);

    try {
      const res = await updateProfileImage(file).unwrap();
      message.success(res.message || "Profile image updated successfully!");
      setProfilePicPreview(res.data.image);
      await refetchUser();
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data: { message?: string } }).data.message ===
          "string"
      ) {
        message.error((error as { data: { message: string } }).data.message);
      } else {
        message.error("Failed to update profile.");
      }
    }
  };

  // Loading / Error Handling
  if (isUserLoading || isCompanyLoading) return <ProfileLayoutSkeleton />;
  if (isUserError || isCompanyError || !userData?.data || !companyData?.data)
    return <p>Failed to load profile.</p>;

  const user: UserProfile = userData.data;
  const company: CompanyInfo = companyData.data;
  const profilePicUrl = profilePicPreview || user.image;

  return (
    <div className="dark:text-white">
      <div className="container mx-auto py-10 md:py-16 px-3 md:px-0">
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
                <Link href="/myprofile">
                  <p className="dark:text-white">My Account</p>
                </Link>
              ),
            },
          ]}
        />
      </div>

      {/* Avatar */}
      <div className="flex justify-center items-center w-full p-5 gap-5">
        <div className="relative">
          <Avatar
            size={140}
            src={profilePicUrl}
            className="dark:border-2 dark:border-primary shadow-xl"
          />
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full">
              <Spin />
            </div>
          )}
          <Upload
            name="profileImage"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleProfilePicUpload}
            accept=".jpg,.jpeg,.png"
            maxCount={1}
            multiple={false}
            disabled={isUploading}
            className="absolute bottom-2 right-2 bg-primary px-4 py-[5px] rounded-full cursor-pointer"
          >
            <button
              type="button"
              onClick={() => console.log("Camera clicked")}
              className="flex items-center justify-center"
            >
              <FaCamera className="text-white mt-[5px] w-6" />
            </button>
          </Upload>
        </div>
      </div>

      <div>
        <h2 className="text-center text-4xl font-semibold">{user.fullName}</h2>
      </div>

      {/* Main */}
      <div className="py-10 md:py-16 px-3 md:px-0">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-2xl font-medium">Welcome to your account!</h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Update your details, manage addresses and keep your account secure.
                </p>
              </div>

              <div className="space-y-4">
                <p>
                  If you need any help{" "}
                  <span className="text-orange-500">contact us:</span>
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

            {/* Right Column */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
