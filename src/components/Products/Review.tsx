/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import Image from "next/image"
import { Rate, Input, Button, Select, Form } from "antd"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"

const { TextArea } = Input
const { Option } = Select

const reviews = [
  {
    id: 1,
    name: "Annette Black",
    date: "29 January, 2023",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40&text=A",
    comment:
      "Absolutely impressed with this tyre! I replaced my old ones with the WP 17/20 and immediately noticed the difference. The ride feels much smoother, and the grip on the road is fantastic, even in the rain. Highly recommend for anyone who drives regularly.",
  },
  {
    id: 2,
    name: "Darrell Steward",
    date: "15 January, 2023",
    rating: 5,
    avatar: "/placeholder.svg?height=40&width=40&text=D",
    comment:
      "Great quality tyre at a reasonable price. I've been using it for over 3 months now and it still looks and feels new. Road noise is minimal and the handling has improved a lot. Just wish the delivery was a bit faster, but otherwise no complaints!",
  },
  {
    id: 3,
    name: "Jerome Bell",
    date: "01 January, 2023",
    rating: 4,
    avatar: "/placeholder.svg?height=40&width=40&text=J",
    comment:
      "WP never disappoints! These tyres feel super sturdy and have excellent traction. I drive through a mix of city and rough roads, and they've held up really well. No punctures or wear issues so far. Would definitely buy again for my second car.",
  },
]

export default function Reviews() {
  const [form] = Form.useForm()
  const [currentPage, setCurrentPage] = useState(3)
  const totalPages = 24

  const handleSubmit = (values: any) => {
    console.log("Submitted values:", values)
    // Here you would typically send the data to your backend
    alert("Review submitted successfully!")
    form.resetFields()
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-green-50 rounded-lg p-6 mb-8">
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold">4.5</div>
          <Rate disabled defaultValue={4.5} allowHalf className="text-yellow-400" />
          <div className="text-gray-500 mt-1">Overall Rating</div>
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm font-medium text-gray-700 mb-1">Rating</div>
        <Select
          defaultValue="all"
          style={{ width: "100%", maxWidth: "200px" }}
          className="border border-gray-200 rounded"
        >
          <Option value="all">All Rating</Option>
          <Option value="5">5 Stars</Option>
          <Option value="4">4 Stars</Option>
          <Option value="3">3 Stars</Option>
          <Option value="2">2 Stars</Option>
          <Option value="1">1 Star</Option>
        </Select>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                <Image src={review.avatar || "/placeholder.svg"} alt={review.name} width={40} height={40} />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
                  <h3 className="font-medium">{review.name}</h3>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
                <div className="mb-2">
                  <Rate disabled defaultValue={review.rating} />
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center my-8 space-x-2">
        <Button
          icon={<LeftOutlined />}
          className="flex items-center justify-center border rounded"
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        />
        <span className="text-sm text-gray-600">
          {currentPage} of {totalPages}
        </span>
        <Button
          icon={<RightOutlined />}
          className="flex items-center justify-center border rounded"
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold mb-6">Add a Review</h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="rating" label="Your Rating" className="mb-4">
            <Rate />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Form.Item name="name" label="Your Name" rules={[{ required: true, message: "Please enter your name" }]}>
              <Input placeholder="Robert Smith" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Your Email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="robert@gmail.com" />
            </Form.Item>
          </div>

          <Form.Item name="review" label="Review" rules={[{ required: true, message: "Please write your review" }]}>
            <TextArea rows={6} placeholder="Write your review here..." />
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end">
            <Button type="primary" htmlType="submit" className="bg-orange-500 hover:bg-orange-600 border-orange-500">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
