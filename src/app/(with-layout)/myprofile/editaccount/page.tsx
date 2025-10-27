// "use client";

// import { useEffect } from "react";
// import { Form, Input, message } from "antd";
// import { useEditUserProfileMutation, useGetUserProfileQuery } from "@/redux/features/auth/authApi";

// // Form values type
// interface EditFormValues {
//   fullName: string;
//   phoneNumber: string;
//   street?: string;
//   city?: string;
//   state?: string;
//   zip?: string;
// }

// const EditAccount = () => {
//   const [form] = Form.useForm<EditFormValues>();
//   const { data: userData, isLoading: isLoadingProfile, isError } = useGetUserProfileQuery(undefined);
//   const [editProfile, { isLoading: isUpdating }] = useEditUserProfileMutation();

//   // Prefill form when user data is loaded
//   useEffect(() => {
//     if (userData?.data) {
//       const user = userData.data;
//       form.setFieldsValue({
//         fullName: user.fullName,
//         phoneNumber: user.phoneNumber,
//         street: user.address?.street || "",
//         city: user.address?.city || "",
//         state: user.address?.state || "",
//         zip: user.address?.zip || "",
//       });
//     }
//   }, [userData, form]);

//   const onFinish = async (values: EditFormValues) => {
//     try {
//       await editProfile({ fullName: values.fullName, phoneNumber: values.phoneNumber }).unwrap();
//       message.success("Profile updated successfully!");
//     } catch (error: unknown) {
//       if (
//         typeof error === "object" &&
//         error !== null &&
//         "data" in error &&
//         typeof (error as { data: { message?: string } }).data.message === "string"
//       ) {
//         message.error((error as { data: { message: string } }).data.message);
//       } else {
//         message.error("Failed to update profile.");
//       }
//     }
//   };

//   if (isLoadingProfile) return <p>Loading...</p>;
//   if (isError || !userData?.data) return <p>Failed to load user data.</p>;

//   const user = userData.data;

//   return (
//     <div className="space-y-8">
//       <h2 className="text-xl font-medium">Edit Account</h2>

//       <Form<EditFormValues> form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
//         {/* Full Name */}
//         <Form.Item
//           label="Full Name"
//           name="fullName"
//           rules={[{ required: true, message: "Please input your name!" }]}
//         >
//           <Input placeholder="Enter your full name" className="h-12" />
//         </Form.Item>

//         {/* Email - disabled */}
//         <Form.Item label="Email">
//           <Input value={user.email} disabled className="h-12 bg-gray-100 cursor-not-allowed" />
//         </Form.Item>

//         {/* Phone */}
//         <Form.Item
//           label="Phone Number"
//           name="phoneNumber"
//           rules={[
//             { required: true, message: "Please input your phone number!" },
//             { pattern: /^\+?\d{10,15}$/, message: "Please enter a valid phone number!" },
//           ]}
//         >
//           <Input placeholder="Enter your phone number" className="h-12" />
//         </Form.Item>

//         {/* Address fields (optional, disabled) */}
//         <h3 className="text-lg font-medium mt-4">Address (optional)</h3>
//         <Form.Item label="Street" name="street">
//           <Input placeholder="Street" className="h-12" disabled />
//         </Form.Item>
//         <Form.Item label="City" name="city">
//           <Input placeholder="City" className="h-12" disabled />
//         </Form.Item>
//         <Form.Item label="State" name="state">
//           <Input placeholder="State" className="h-12" disabled />
//         </Form.Item>
//         <Form.Item label="ZIP Code" name="zip">
//           <Input placeholder="ZIP Code" className="h-12" disabled />
//         </Form.Item>

//         <Form.Item className="mt-6">
//           <button
//             type="submit"
//             disabled={isUpdating}
//             className="bg-primary w-full py-3 rounded-md cursor-pointer text-white disabled:opacity-50"
//           >
//             {isUpdating ? "Updating..." : "Update Profile"}
//           </button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default EditAccount;



"use client";

import { useEffect } from "react";
import { Form, Input, notification } from "antd";
import { useEditUserProfileMutation, useGetUserProfileQuery } from "@/redux/features/auth/authApi";

// Form values type
interface EditFormValues {
  fullName: string;
  phoneNumber: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

const EditAccount = () => {
  const [form] = Form.useForm<EditFormValues>();
  const [api, contextHolder] = notification.useNotification();

  const { data: userData, isLoading: isLoadingProfile, isError } = useGetUserProfileQuery(undefined);
  const [editProfile, { isLoading: isUpdating }] = useEditUserProfileMutation();

  // Prefill form when user data is loaded
  useEffect(() => {
    if (userData?.data) {
      const user = userData.data;
      form.setFieldsValue({
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        street: user.address?.street || "",
        city: user.address?.city || "",
        state: user.address?.state || "",
        zip: user.address?.zip || "",
      });
    }
  }, [userData, form]);

  const onFinish = async (values: EditFormValues) => {
    try {
      await editProfile({ fullName: values.fullName, phoneNumber: values.phoneNumber }).unwrap();
      
      // ✅ Show success notification
      api.open({
        type: "success",
        message: "Profile Updated",
        description: "Your profile is updated successfully!",
        placement: "topRight",
      });

      // ✅ Reload the page
      window.location.reload();
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as { data: { message?: string } }).data.message === "string"
      ) {
        api.open({
          type: "error",
          message: "Update Failed",
          description: (error as { data: { message: string } }).data.message,
          placement: "topRight",
        });
      } else {
        api.open({
          type: "error",
          message: "Update Failed",
          description: "Failed to update profile. Please try again.",
          placement: "topRight",
        });
      }
    }
  };

  if (isLoadingProfile) return <p>Loading...</p>;
  if (isError || !userData?.data) return <p>Failed to load user data.</p>;

  const user = userData.data;

  return (
    <div className="space-y-8">
      {contextHolder}
      <h2 className="text-xl font-medium">Edit Account</h2>

      <Form<EditFormValues> form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
        {/* Full Name */}
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Enter your full name" className="h-12" />
        </Form.Item>

        {/* Email - disabled */}
        <Form.Item label="Email">
          <Input value={user.email} disabled className="h-12 bg-gray-100 cursor-not-allowed" />
        </Form.Item>

        {/* Phone */}
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
            { pattern: /^\+?\d{10,15}$/, message: "Please enter a valid phone number!" },
          ]}
        >
          <Input placeholder="Enter your phone number" className="h-12" />
        </Form.Item>

        {/* Address fields (optional, disabled) */}
        <h3 className="text-lg font-medium mt-4">Address (optional)</h3>
        <Form.Item label="Street" name="street">
          <Input placeholder="Street" className="h-12" disabled />
        </Form.Item>
        <Form.Item label="City" name="city">
          <Input placeholder="City" className="h-12" disabled />
        </Form.Item>
        <Form.Item label="State" name="state">
          <Input placeholder="State" className="h-12" disabled />
        </Form.Item>
        <Form.Item label="ZIP Code" name="zip">
          <Input placeholder="ZIP Code" className="h-12" disabled />
        </Form.Item>

        <Form.Item className="mt-6">
          <button
            type="submit"
            disabled={isUpdating}
            className="bg-primary w-full py-3 rounded-md cursor-pointer text-white disabled:opacity-50"
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditAccount;
