"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Edit } from "lucide-react";
import { useGetProfileQuery } from "@/redux/feature/settingAPI";
import { useEffect, useState } from "react";

export default function PersonalInformationPage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profileImage: "",
  });

  const { data: userProfile } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (userProfile) {
      setUser({
        name: userProfile?.full_name,
        email: userProfile?.email,
        phone: userProfile?.phone,
        profileImage: userProfile?.profile_pic,
      });
    }
  }, [userProfile]);

  return (
    <div className='flex min-h-screen bg-background2'>
      <div className='flex-1 w-full'>
        <main className='w-[98%] mx-auto p-4 md:p-6 bg-[#FFFFFF] rounded-md'>
          <div className=''>
            <div className='w-full bg-[#F2F6FF] mb-6 flex items-center justify-between p-6 rounded-xl'>
              <Link
                href='/setting'
                className='inline-flex items-center text-[#101010] hover:text-[#2a2c2c]'
              >
                <ArrowLeft className='mr-2 h-6 w-6' />
                <span className='text-2xl font-semibold'>
                  Personal Information
                </span>
              </Link>
            </div>

            <div className='rounded-md shadow'>
              <div className='flex flex-col md:flex-row gap-8 mb-6'>
                {/* Profile Photo Section */}
                <div className='bg-[#F2F6FF] w-full md:w-64 flex flex-col items-center p-6 rounded-2xl'>
                  <div className='w-32 h-32 rounded-full overflow-hidden relative mb-3'>
                    <Image
                      src={
                        // `${process.env.NEXT_PUBLIC_API_URL}${user?.profileImage}` ||
                        "/admin.png"
                      }
                      alt='Profile'
                      fill
                      className='object-cover'
                    />
                  </div>
                  <span className='text-base text-[#101010]'>Profile</span>
                  <span className='font-medium text-lg text-[#101010]'>
                    Admin
                  </span>
                </div>

                {/* User Information Section */}
                <div className='flex-1 space-y-4'>
                  <div className='bg-[#F2F6FF] flex gap-4 py-3 px-6 rounded-xl'>
                    <div className='text-lg font-medium text-[#101010]'>
                      Name:
                    </div>
                    <div className='text-lg  text-[#101010]'>{user?.name}</div>
                  </div>

                  <div className='bg-[#F2F6FF] flex gap-4 py-3 px-6 rounded-xl'>
                    <div className='text-lg font-medium text-[#101010]'>
                      Email:
                    </div>
                    <div className='md:col-span-2 text-lg text-[#101010]'>
                      {user?.email}
                    </div>
                  </div>

                  {/* <div className='bg-[#333333] grid grid-cols-1 md:grid-cols-3 gap-4 py-3 px-6 rounded-xl'>
                    <div className='text-lg font-medium text-[#101010]'>
                      Phone Number:
                    </div>
                    <div className='md:col-span-2 text-lg text-[#101010]'>
                      {user?.phone}
                    </div>
                  </div> */}

                  <div className='justify-self-end'>
                    <Link
                      href='/setting/personal-information/edit'
                      className='flex items-center gap-2 bg-button px-5 py-2 rounded-3xl font-medium text-secondary'
                    >
                      <span>Edit Profile</span>
                      <Edit className='h-4 w-4' />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
