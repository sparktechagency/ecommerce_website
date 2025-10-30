
"use client";

import { useEffect, useState } from "react";
import { Form, Input, Select, Upload, Spin, Modal, message } from "antd";
import { useGetSingleProductQuery } from "@/redux/features/products/productsApi";

import { IoMdArrowRoundBack } from "react-icons/io";
import { SlCloudUpload } from "react-icons/sl";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Heading from "@tiptap/extension-heading";
import TipTapMenu from "./TipTapMenu";
import Image from "next/image";
import { useUpdateProductMutation } from "@/redux/features/seller/product/productApi";

interface EditProductModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  productId: string;
}

// Form values
interface ProductFormValues {
  productName?: string;
  price?: number | string;
  discount?: number | string;
  stock?: number | string;
  description?: string;
}

// API Product type
interface Product {
  _id: string;
  productName: string;
  price: number;
  discount: number;
  stock: number;
  description: string;
  isVisible: boolean;
  categoryId: string;
  brandId: string;
  // Add any other fields returned by your API
}

const { TextArea } = Input;

const EditProductModal: React.FC<EditProductModalProps> = ({
    isModalOpen,
    handleOk,
    handleCancel,
    productId,
}) => {
    const [form] = Form.useForm();
    const [nextComponent, setNextComponent] = useState("details");
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const profilePicUrl = profilePic ? URL.createObjectURL(profilePic) : null;

    const { data, isLoading, isError } = useGetSingleProductQuery(productId);
    const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

    // TipTap editor
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: { HTMLAttributes: { class: "list-disc ml-2" } },
                heading: false,
            }),
            Highlight.configure({ HTMLAttributes: { class: "my-custom-class" } }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Heading.configure({ levels: [1, 2, 3] }),
        ],
        content: "",
        editorProps: { attributes: { class: "min-h-[400px] rounded-md bg-slate-50 py-2 px-3" } },
    });

    // Prefill form
    useEffect(() => {
        if (data?.data) {
            const product = data.data;
            form.setFieldsValue({
                productName: product.productName,
                price: product.price,
                discount: product.discount,
                stock: product.stock,
                description: product.description,
            });

            if (product.description && editor) {
                editor.commands.setContent(product.description);
            }
        }
    }, [data, form, editor]);

    const handleProfilePicUpload = (e: any) => setProfilePic(e.file);




const handleSubmit = async () => {
  try {
    const values = await form.validateFields();

    if (!data?.data) return message.error("Product data not loaded.");

    const product = data.data;

    // Only include fields you want to send, skip nulls
    const bodyData: any = {
      productName: values.productName ?? product.productName,
      price: values.price ?? product.price,
      discount: values.discount ?? product.discount,
      stock: values.stock ?? product.stock,
      description: editor?.getHTML() || product.description,
      isVisible: product.isVisible,
      categoryId: product.categoryId,
      brandId: product.brandId,
      // Add more mandatory fields as needed
    };

    const formData = new FormData();
    formData.append("bodyData", JSON.stringify(bodyData));

    if (profilePic) {
      formData.append("productImages", profilePic);
    }

    await updateProduct({ productId, formData }).unwrap();
    message.success("Product updated successfully!");
    handleOk();
  } catch (err: any) {
    console.error(err);
    message.error(err?.data?.message || "Failed to update product");
  }
};

    
    
    return (
        <Modal
            closable={{ "aria-label": "Custom Close Button" }}
            className="w-full md:w-[800px]"
            footer={false}
            width={1000}
            open={isModalOpen}
            onCancel={handleCancel}
        >
            <div className="container mx-auto p-5">
                <div className="flex items-center justify-between mb-2 mt-3">
                    {nextComponent !== "details" && (
                        <IoMdArrowRoundBack
                            onClick={() => setNextComponent("details")}
                            className="mb-4 cursor-pointer"
                            size={30}
                        />
                    )}
                    <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <Spin size="large" />
                    </div>
                ) : isError ? (
                    <p className="text-red-500">Failed to load product details.</p>
                ) : nextComponent === "details" ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
                            <div className="flex items-center w-full">
                                <span className="bg-[#f56100] py-[11px] px-4 text-white">1</span>
                                <Select placeholder="Year" className="w-full" />
                            </div>
                            <div className="flex items-center w-full">
                                <span className="bg-[#f56100] py-[11px] px-4 text-white">2</span>
                                <Select placeholder="Brand" className="w-full" />
                            </div>
                            <div className="flex items-center w-full">
                                <span className="bg-[#f56100] py-[11px] px-4 text-white">3</span>
                                <Select placeholder="Model" className="w-full" />
                            </div>
                            <div className="flex items-center w-full">
                                <span className="bg-[#f56100] py-[11px] px-4 text-white">4</span>
                                <Select placeholder="Engine Power" className="w-full" />
                            </div>
                        </div>

                        <div className="mt-8">
                            <Form form={form} layout="vertical" className="mx-auto p-5 bg-white rounded-md">
                                <Form.Item label="Product Name" name="productName">
                                    <Input placeholder="Enter product name" />
                                </Form.Item>

                                <Form.Item label="Price" name="price">
                                    <Input placeholder="Enter price" />
                                </Form.Item>

                                <Form.Item label="Discount" name="discount">
                                    <Input placeholder="Enter discount" />
                                </Form.Item>

                                <Form.Item label="Stock" name="stock">
                                    <Input placeholder="Enter stock quantity" />
                                </Form.Item>

                                <Form.Item label="Description" name="description">
                                    <TextArea rows={4} />
                                </Form.Item>

                                <Form.Item>
                                    <button
                                        onClick={() => setNextComponent("description")}
                                        className="w-full bg-primary py-3 rounded-2xl mt-3 text-white cursor-pointer"
                                    >
                                        Next
                                    </button>
                                </Form.Item>
                            </Form>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <h2 className="text-xl">Description</h2>
                            <div className="h-auto rounded-2xl border border-dashed border-primary mt-4 mb-5 px-3 py-3">
                                <TipTapMenu editor={editor} />
                                <EditorContent editor={editor} />
                            </div>
                        </div>
                        <div className="mb-5">
                            <h2 className="text-xl">Product Images</h2>
                            <div className="h-30 flex items-center justify-center rounded-2xl border border-dashed border-primary mt-4">
                                {profilePic ? (
                                    <Image
                                        src={profilePicUrl || ""}
                                        width={500}
                                        height={500}
                                        alt="image"
                                        className="border-4 w-32"
                                    />
                                ) : (
                                    <Upload
                                        showUploadList={false}
                                        beforeUpload={() => false}
                                        onChange={handleProfilePicUpload}
                                    >
                                        <SlCloudUpload className="cursor-pointer" size={32} />
                                    </Upload>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={isUpdating}
                            className="w-full bg-primary py-3 rounded-2xl mt-3 text-white cursor-pointer"
                        >
                            {isUpdating ? "Updating..." : "Upload Product"}
                        </button>
                    </>
                )}
            </div>
        </Modal>
    );
};

export default EditProductModal;
