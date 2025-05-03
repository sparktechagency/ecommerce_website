import { Breadcrumb } from "antd";
import Link from "next/link";
import our_story from '../../../public/our_story.png'
import Image from "next/image";
import delivery from '../../../public/service/delivery.svg'
import customer_service from '../../../public/service/customer_service.svg'
import money_back from '../../../public/service/money_back.svg'

const About = () => {
    return (
        <div className=" relative">
            <div className=" container mx-auto py-16 ">
                <div>
                    <Breadcrumb
                        items={[
                            {
                                title: <Link href="/">Home</Link>,
                            },
                            {
                                title: <Link href="/about">About</Link>,
                            }
                        ]}
                    />
                </div>
                <div className=" flex">
                    <div className=" w-1/2 h-[700px] flex flex-col justify-center">
                        <h2 className=" text-5xl font-bold">Our Story</h2>
                        <p className=" mt-5 text-lg">At Sparedoc, we&apos;re transforming the way you shop for car parts. As a trusted e-commerce platform, we offer a wide selection of genuine and aftermarket auto components, accessories, and tools. Whether you&apos;re a car owner, garage professional, or enthusiast, we make it easy to find everything your vehicle needs — quickly, reliably, and all in one place.</p>
                    </div>
                    <div>
                        <Image src={our_story} className=" absolute right-0 top-34 w-[850px]" height={500} width={500} alt="banner" />
                    </div>
                </div>

                <div className=' px-3 xl:px-0 xl:w-[1100px] mx-auto py-16 md:py-32'>
                    <div className=' flex flex-col md:flex-row gap-16 md:gap-0 justify-between'>
                        <div className=' flex flex-col justify-center items-center'>
                            <Image src={delivery} height={500} width={500} alt='delivery' className='w-18 bg-primary rounded-full p-3 outline-[14px] outline-[#fff1e8] mb-10' />
                            <h2 className=' text-xl font-bold mb-2 dark:text-white'>FAST DELIVERY</h2>
                            <p className='  dark:text-white'>Free delivery for all orders over $140</p>
                        </div>
                        <div className=' flex flex-col justify-center items-center'>
                            <Image src={customer_service} height={500} width={500} alt='delivery' className='w-18 bg-primary rounded-full p-3 outline-[14px] outline-[#fff1e8] mb-10' />
                            <h2 className=' text-xl font-bold mb-2 dark:text-white'>24/7 CUSTOMER SERVICE</h2>
                            <p className='  dark:text-white'>Friendly 24/7 customer support</p>
                        </div>
                        <div className=' flex flex-col justify-center items-center'>
                            <Image src={money_back} height={500} width={500} alt='delivery' className='w-18 bg-primary rounded-full p-3 outline-[14px] outline-[#fff1e8] mb-10' />
                            <h2 className=' text-xl font-bold mb-2 dark:text-white'>MONEY BACK GUARANTEE</h2>
                            <p className='  dark:text-white'>We reurn money within 30 days</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;