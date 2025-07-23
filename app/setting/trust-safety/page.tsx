"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useGetTrustAndSafetyQuery } from "@/redux/feature/setting/settingAPI";
import DOMPurify from "dompurify";

export default function TermsConditionPage() {
  const { data, isLoading } = useGetTrustAndSafetyQuery({});

  return (
    <div className='flex min-h-screen bg-gray-50'>
      <div className='flex-1 w-full'>
        <main className='w-full p-4 md:p-6'>
          <div className='max-w-3xl mx-auto'>
            <div className='mb-6 flex items-center justify-between'>
              <Link
                href='/setting'
                className='inline-flex items-center text-[#324de7] hover:text-teal-700'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                <span className='text-xl font-semibold'>Trust and Safety</span>
              </Link>

              <Link
                href='/setting/trust-safety/edit'
                className='inline-flex items-center text-[#324de7] hover:text-teal-700 border border-[#324de7] rounded-md px-4 py-1.5'
              >
                <span className='text-xl font-semibold'>Edit</span>
              </Link>
            </div>

            <div className='prose prose-sm max-w-none'>
              {isLoading ? (
                <p className='text-base mb-4'>Loading...</p>
              ) : (
                <div
                  className='text-base mb-4 prose'
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(data?.description || ""),
                  }}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
