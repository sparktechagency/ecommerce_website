"use client";
import Link from "next/link";
import { Form, Input } from "antd";

const ChangeAddress = () => {
    interface AddressFormValues {
        street: string;
        city: string;
        state: string;
        zip: string;
    }

    const [form] = Form.useForm<AddressFormValues>();

    const onFinish = (values: AddressFormValues): void => {
        console.log("Success:", values);
    };

    return (
        <div className="space-y-8">
            <h2 className="text-xl font-medium">Change Address</h2>

            <Form<AddressFormValues>
                form={form}
                name="changeAddress"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label={<p className="dark:text-white">Street Address</p>}
                    name="street"
                    rules={[{ required: true, message: "Please enter your street address!" }]}
                >
                    <Input placeholder="123 Main St" className="h-12" />
                </Form.Item>

                <Form.Item
                    label={<p className="dark:text-white">City</p>}
                    name="city"
                    rules={[{ required: true, message: "Please enter your city!" }]}
                >
                    <Input placeholder="Enter city" className="h-12" />
                </Form.Item>

                <Form.Item
                    label={<p className="dark:text-white">State</p>}
                    name="state"
                    rules={[{ required: true, message: "Please enter your state!" }]}
                >
                    <Input placeholder="Enter state" className="h-12" />
                </Form.Item>

                <Form.Item
                    label={<p className="dark:text-white">Zip Code</p>}
                    name="zip"
                    rules={[
                        { required: true, message: "Please enter your zip code!" },
                        { pattern: /^\d{5}$/, message: "Please enter a valid 5-digit zip code!" },
                    ]}
                >
                    <Input placeholder="12345" className="h-12" />
                </Form.Item>

                <Form.Item className="mt-6">
                    <Link href="/">
                        <button className="bg-primary w-full py-3 rounded-md cursor-pointer text-white">
                            Update Address
                        </button>
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangeAddress;
