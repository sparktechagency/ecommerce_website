"use client";
import { Breadcrumb, Spin } from "antd";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { RiLinkedinLine } from "react-icons/ri";
import our_story from "../../../../../public/our_story.png";
import { useGetAboutUsQuery } from "@/redux/features/aboutUs/aboutUsApi";
import { useGetFoundingTeamsQuery } from "@/redux/features/foundingTeam/foundingTeam";
import ServiceFeatures from "@/components/Home/ServiceFeatures";
import { useTranslations } from "next-intl";
const removeHTMLTags = (str: string) => {
  return str.replace(/<\/?[^>]+(>|$)/g, ""); // Regex to remove all HTML tags
};

const About = () => {
const t = useTranslations('nav')
  const { data, isLoading, isError } = useGetAboutUsQuery();
  const about = data?.data;
  const { data: teamData, isLoading: isTeamLoading, isError: isTeamError } = useGetFoundingTeamsQuery();
  const teamMembers = teamData?.data || [];

  if (isLoading || isTeamLoading)
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );

  if (isError || isTeamError)
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-red-500 text-lg">Failed to load content.</p>
      </div>
    );

  return (
    <div className="relative px-3 md:px-0">
      <div className="container mx-auto py-16">
        <Breadcrumb
          items={[
            {
              title: (
                <Link href="/">
                  <p className="dark:text-white">{t('home')}</p>
                </Link>
              ),
            },
            {
              title: (
                <Link href="/about">
                  <p className="dark:text-white">{t('about')}</p>
                </Link>
              ),
            },
          ]}
        />

        {/* Our Story Section */}
        <div className="flex dark:text-white items-start">
          <div className="md:w-1/2 h-[400px] 2xl:h-[700px] flex flex-col justify-center">
            <h2 className="text-5xl font-bold">{about?.heading || "Our Story"}</h2>
         <p className="mt-5 text-lg">
              {/* Remove HTML tags from about?.content */}
              {removeHTMLTags(about?.content || "At Sparedoc, we're transforming the way you shop for car parts. As a trusted e-commerce platform, we offer a wide selection of genuine and aftermarket auto components, accessories, and tools.")}
            </p>
          </div>
          <div className="relative">
            <Image
              src={our_story}
              className="hidden lg:block w-[450px] 2xl:w-[750px]"
              height={500}
              width={500}
              alt="our story"
            />
          </div>
        </div>

        {/* Founding Team Section */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-14 dark:text-white">
          {teamMembers.map((member) => (
            <div key={member.id}>
              <Image
                src={member.image}
                alt={member.name}
                width={500}
                height={500}
              />
              <div className="mt-4">
                <h2 className="text-2xl md:text-3xl lg:text-4xl mb-2">{member.name}</h2>
                <p className="text-md md:text-lg lg:text-xl mb-3">{member.role}</p>
                <div className="flex gap-4 items-center">
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                      <FaXTwitter size={25} className="hover:text-primary transition" />
                    </a>
                  )}
                  {member.instagram && (
                    <a href={member.instagram} target="_blank" rel="noopener noreferrer">
                      <FaInstagram size={25} className="hover:text-primary transition" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                      <RiLinkedinLine size={25} className="hover:text-primary transition" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Service Section */}
        <ServiceFeatures></ServiceFeatures>
      </div>
    </div>
  );
};

export default About;
