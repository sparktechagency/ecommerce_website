"use client"
import { JSX, useState } from "react"
import { Button, Form, Input } from "antd"
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa"
import type React from "react"

// Define TypeScript interfaces for form values
interface SignUpFormValues {
  fullName: string
  email: string
  phoneNumber: string
  password: string
}

export default function SignUpForm(): JSX.Element {
  const [form] = Form.useForm<SignUpFormValues>()
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)

  const onFinish = (values: SignUpFormValues): void => {
    console.log("Success:", values)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-md shadow-md bg-white p-6 rounded-lg">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">SIGN UP</h1>
        </div>

        <Form<SignUpFormValues> form={form} name="signup" layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[{ required: true, message: "Please input your full name!" }]}
          >
            <Input placeholder="Enter your full name" className="h-10" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" className="h-10" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Please input your phone number!" }]}
          >
            <Input placeholder="Enter your mobile number" className="h-10" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="h-10"
              iconRender={(visible: boolean): React.ReactNode => (visible ? <FaEye /> : <FaEyeSlash />)}
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>

          <Form.Item className="mt-6">
            <Button
              type="primary"
              htmlType="submit"
              block
              className="h-10 bg-orange-500 hover:bg-orange-600 border-orange-500"
            >
              SIGN UP
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4">
          <Button
            block
            className="h-10 flex items-center justify-center mb-3"
            onClick={(): void => console.log("Google sign up clicked")}
          >
            <FaGoogle className="mr-2" /> Sign up with Google
          </Button>

          <Button
            block
            className="h-10 flex items-center justify-center"
            onClick={(): void => console.log("Facebook sign up clicked")}
          >
            <FaFacebook className="mr-2" /> Sign up with Facebook
          </Button>
        </div>

        <div className="text-center mt-4">
          <span className="text-sm">
            Already have an account?{" "}
            <a href="#" className="text-blue-500">
              Log in
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}
