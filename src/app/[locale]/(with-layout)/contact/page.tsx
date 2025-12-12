"use client";

import { Breadcrumb, ConfigProvider, Form, FormProps, Input, Spin, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import Link from "next/link";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { useGetContactUsInfoQuery } from "@/redux/features/contactUs/contactUsApi";
import { useCreateSupportMutation } from "@/redux/features/support/supportApi";
import { useTranslations } from "next-intl";


type FieldType = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const Contact = () => {
  const  t  = useTranslations();
  const { data, isLoading, isError } = useGetContactUsInfoQuery();
  const contact = data?.data;
  const [form] = Form.useForm<FieldType>();
  const [createSupport, { isLoading: isSubmitting }] = useCreateSupportMutation();
  const [api, contextHolder] = notification.useNotification();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      if (!values.email || !values.phone || !values.message) return;

      await createSupport({
        userEmail: values.email,
        userPhone: values.phone,
        message: values.message,
      }).unwrap();

      api.open({
        type: "success",
        message: t('Support Submitted'),
        description: t('Your message has been submitted successfully!'),
        placement: "topRight",
      });
      form.resetFields();
    } catch (err: unknown) {
      let description = 'Could not submit your message. Please try again.';
      if (
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        typeof (err as { data: { message?: string } }).data.message === "string"
      ) {
        description = (err as { data: { message: string } }).data.message;
      }

      api.open({
        type: "error",
        message: t('Failed'),
        description,
        placement: "topRight",
      });
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-red-500 text-lg">{t('contact.errorMessage')}</p>
      </div>
    );

  return (
    <div className="relative px-3 md:px-0">
      {contextHolder}
      <div className="container mx-auto py-16">
        <Breadcrumb
          items={[
            { title: <Link href="/"><p className="dark:text-white">{t('contact.breadcrumb.home')}</p></Link> },
            { title: <Link href="/contact"><p className="dark:text-white">{t('contact.breadcrumb.contact')}</p></Link> },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-10 mt-10">
          {/* Contact Info */}
          <div className="w-full lg:w-[33%] xl:w-[27%] pt-12 shadow-lg dark:shadow dark:shadow-white px-10 py-10 rounded-md dark:text-white">
            <div className="border-b pb-7">
              <div className="flex gap-4 items-center">
                <FiPhone className="bg-primary text-white p-2 rounded-full" size={40} />
                <p className="font-semibold text-xl">{t('contact.callToUs.title')}</p>
              </div>
              <p className="text-lg py-5">{t('contact.callToUs.description')}</p>
              <p className="text-lg">{t('contact.callToUs.phone')}: {contact?.phoneNumber || "+8801611112222"}</p>
            </div>

            <div className="mt-8">
              <div className="flex gap-4 items-center">
                <MdOutlineEmail className="bg-primary text-white p-2 rounded-full" size={40} />
                <p className="font-semibold text-xl">{t('contact.writeToUs.title')}</p>
              </div>
              <p className="text-lg py-6">{t('contact.writeToUs.description')}</p>
              <p className="text-lg pt-0 pb-6">{t('contact.writeToUs.email')}: {contact?.email || "support@example.com"}</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-[67%] xl:w-[70%] pt-12 shadow-lg dark:shadow dark:shadow-white px-8 py-5 rounded-md">
            <ConfigProvider
              theme={{
                components: { Input: { colorBgContainer: "#f2fcf6", controlHeight: 44 } },
              }}
            >
              <Form<FieldType>
                form={form}
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
              >
                <div className="flex flex-col md:flex-row gap-5">
                  <Form.Item<FieldType> name="name" className="w-full">
                    <Input placeholder={t('contact.form.name')} />
                  </Form.Item>
                  <Form.Item<FieldType> name="email" className="w-full" rules={[{ required: true, message: t('contact.form.email') }]}>
                    <Input placeholder={t('contact.form.email')} />
                  </Form.Item>
                  <Form.Item<FieldType> name="phone" className="w-full" rules={[{ required: true, message: t('contact.form.phone') }]}>
                    <Input placeholder={t('contact.form.phone')} />
                  </Form.Item>
                </div>

                <Form.Item<FieldType> name="message" rules={[{ required: true, message: t('contact.form.message') }]}>
                  <TextArea rows={8} placeholder={t('contact.form.message')} />
                </Form.Item>

                <div className="flex justify-end mt-10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-white px-10 md:px-14 py-2 md:py-4 cursor-pointer rounded"
                  >
                    {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                  </button>
                </div>
              </Form>
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
