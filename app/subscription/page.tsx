// "use client";

// import { useState } from "react";
// import { Check, Fish, Crown, Plus } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import Link from "next/link";

// export default function Home() {
//   const [showDialog, setShowDialog] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
//   const [currentPlan, setCurrentPlan] = useState<string | null>(null);

//   const features = [
//     "Issues Frequent",
//     "Maintenance Newspaper",
//     "Buy Products",
//     "Problem In My Pool",
//     "Calculator Of Chemicals",
//     "Tricks And Secrets",
//   ];

//   const handleChoosePlan = (plan: string) => {
//     setSelectedPlan(plan);
//     setShowDialog(true);
//   };

//   const confirmSubscription = () => {
//     setCurrentPlan(selectedPlan);
//     setShowDialog(false);
//   };

//   return (
//     <div className='min-h-screen bg-[#E6ECF6] p-4 md:p-8 flex flex-col'>
//       <div className='w-full'>
//         <div className='flex justify-end mb-6'>
//           <Link
//             href='/subscription/add'
//             className='flex items-center gap-2 bg-button  text-white rounded-full px-4 py-2 transition-colors'
//           >
//             <Plus size={20} />
//             <span>Add New Subscription</span>
//           </Link>
//         </div>

//         <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
//           {/* Basic Plan */}
//           <div className='max-w-md bg-[#FFFFFF] rounded-lg overflow-hidden'>
//             <div className='px-6 py-8 flex flex-col items-center gap-3'>
//               <h3 className='text-[#101010] text-center text-xl font-semibold'>
//                 Basic Plan
//               </h3>
//               <p className='text-[#101010] text-5xl font-bold'>$2.00</p>
//               <p className='text-sm font-semibold text-[#262626]'>
//                 Monthly invoice uploads 100
//               </p>
//             </div>

//             <div className=''>
//               <div className='p-4'>
//                 <h4 className='text-[#262626] font-medium mb-3'>
//                   Let top creative talent come to you by posting your job
//                   listing on #1 Design Jobs Board.
//                 </h4>
//                 <ul className='space-y-5'>
//                   {features.map((feature, index) => (
//                     <li
//                       key={index}
//                       className='flex items-center gap-2 text-[#262626]'
//                     >
//                       <div className='rounded-full p-1'>
//                         <svg
//                           width='18'
//                           height='18'
//                           viewBox='0 0 18 18'
//                           fill='none'
//                           xmlns='http://www.w3.org/2000/svg'
//                         >
//                           <g clip-path='url(#clip0_160_2548)'>
//                             <path
//                               fill-rule='evenodd'
//                               clip-rule='evenodd'
//                               d='M18.0011 4.85452C18.0011 5.14486 17.885 5.4352 17.676 5.64425L7.68823 15.632C7.47918 15.841 7.18884 15.9572 6.8985 15.9572C6.60816 15.9572 6.31782 15.841 6.10877 15.632L0.325182 9.84838C0.116136 9.63934 0 9.349 0 9.05866C0 8.76832 0.116136 8.47797 0.325182 8.26893L1.90464 6.68947C2.11368 6.48043 2.40402 6.36429 2.69436 6.36429C2.9847 6.36429 3.27505 6.48043 3.48409 6.68947L6.8985 10.1155L14.517 2.48534C14.7261 2.27629 15.0164 2.16016 15.3068 2.16016C15.5971 2.16016 15.8875 2.27629 16.0965 2.48534L17.676 4.06479C17.885 4.27384 18.0011 4.56418 18.0011 4.85452Z'
//                               fill='#0249E1'
//                             />
//                           </g>
//                           <defs>
//                             <clipPath id='clip0_160_2548'>
//                               <rect width='18' height='18' fill='white' />
//                             </clipPath>
//                           </defs>
//                         </svg>
//                       </div>
//                       <span className='text-base text-[#262626]'>
//                         {feature}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             <div className='p-4 w-full'>
//               <Link
//                 href='/subscription/edit'
//                 className={`w-full block py-3 rounded-md text-center font-medium transition-colors bg-button cursor-pointer text-secondary
//                 }`}
//               >
//                 Edit Plan
//               </Link>
//             </div>
//           </div>

//           {/* Premium Plan */}
//           <div className='max-w-md bg-[#FFFFFF] rounded-lg overflow-hidden'>
//             <div className='px-6 py-8 flex flex-col items-center gap-3'>
//               <h3 className='text-[#101010] text-center text-xl font-semibold'>
//                 Premium Plan
//               </h3>
//               <p className='text-[#101010] text-5xl font-bold'>$8.00</p>
//               <p className='text-sm font-semibold text-[#262626]'>
//                 Monthly invoice uploads 100
//               </p>
//             </div>

//             <div className=''>
//               <div className='p-4'>
//                 <h4 className='text-[#262626] font-medium mb-3'>
//                   Let top creative talent come to you by posting your job
//                   listing on #1 Design Jobs Board.
//                 </h4>
//                 <ul className='space-y-5'>
//                   {features.map((feature, index) => (
//                     <li
//                       key={index}
//                       className='flex items-center gap-2 text-[#262626]'
//                     >
//                       <div className='rounded-full p-1'>
//                         <svg
//                           width='18'
//                           height='18'
//                           viewBox='0 0 18 18'
//                           fill='none'
//                           xmlns='http://www.w3.org/2000/svg'
//                         >
//                           <g clip-path='url(#clip0_160_2548)'>
//                             <path
//                               fill-rule='evenodd'
//                               clip-rule='evenodd'
//                               d='M18.0011 4.85452C18.0011 5.14486 17.885 5.4352 17.676 5.64425L7.68823 15.632C7.47918 15.841 7.18884 15.9572 6.8985 15.9572C6.60816 15.9572 6.31782 15.841 6.10877 15.632L0.325182 9.84838C0.116136 9.63934 0 9.349 0 9.05866C0 8.76832 0.116136 8.47797 0.325182 8.26893L1.90464 6.68947C2.11368 6.48043 2.40402 6.36429 2.69436 6.36429C2.9847 6.36429 3.27505 6.48043 3.48409 6.68947L6.8985 10.1155L14.517 2.48534C14.7261 2.27629 15.0164 2.16016 15.3068 2.16016C15.5971 2.16016 15.8875 2.27629 16.0965 2.48534L17.676 4.06479C17.885 4.27384 18.0011 4.56418 18.0011 4.85452Z'
//                               fill='#0249E1'
//                             />
//                           </g>
//                           <defs>
//                             <clipPath id='clip0_160_2548'>
//                               <rect width='18' height='18' fill='white' />
//                             </clipPath>
//                           </defs>
//                         </svg>
//                       </div>
//                       <span className='text-base text-[#262626]'>
//                         {feature}
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             <div className='p-4 w-full'>
//               <Link
//                 href='/subscription/edit'
//                 className={`w-full block py-3 rounded-md text-center font-medium transition-colors bg-button cursor-pointer text-secondary
//                 }`}
//               >
//                 Edit Plan
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Subscription Dialog */}
//       <Dialog open={showDialog} onOpenChange={setShowDialog}>
//         <DialogContent className='bg-zinc-800 text-white border-zinc-700'>
//           <DialogHeader>
//             <DialogTitle className='text-xl'>
//               Choose Subscription Plan
//             </DialogTitle>
//           </DialogHeader>

//           <div className='py-4'>
//             <RadioGroup
//               defaultValue={selectedPlan || undefined}
//               onValueChange={setSelectedPlan}
//             >
//               <div className='flex items-center space-x-2 mb-4'>
//                 <RadioGroupItem value='basic' id='basic' />
//                 <Label htmlFor='basic' className='text-white'>
//                   Basic Plan - Free
//                 </Label>
//               </div>
//               <div className='flex items-center space-x-2'>
//                 <RadioGroupItem value='premium' id='premium' />
//                 <Label htmlFor='premium' className='text-white'>
//                   Premium Plan - 4.9 /month (39€/year)
//                 </Label>
//               </div>
//             </RadioGroup>
//           </div>

//           <DialogFooter className='flex gap-2 sm:justify-end'>
//             <Button
//               variant='outline'
//               onClick={() => setShowDialog(false)}
//               className='bg-transparent border-zinc-600 text-white hover:bg-zinc-700 hover:text-white'
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={confirmSubscription}
//               className='bg-cyan-400 hover:bg-cyan-500 text-zinc-800'
//               disabled={!selectedPlan}
//             >
//               Confirm
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { useGetSubscriptionPlanQuery } from "@/redux/feature/subscription/subscriptionAPI";

interface PricingPlan {
  id: number;
  name: string;
  monthly_price: string | number;
  yearly_price: number;
  invoice_limit: number;
  bulk_upload_limit: number;
  ai_level: string;
  can_download_report: boolean;
  info: string;
  description: string;
  features: string[];
  is_popular: boolean;
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true);

  const { data: plans } = useGetSubscriptionPlanQuery({});

  console.log(plans);

  return (
    <div className='min-h-screen bg-background2 py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Back button */}
        <div className='mb-8 flex items-center justify-between'>
          <Link
            href='/'
            className='inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors'
          >
            <ArrowLeft className='w-5 h-5 mr-2' />
            <span className='text-sm md:text-base'>Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div className='text-center mb-12'>
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8'>
            Your Current Plan
          </h1>

          {/* Billing Toggle */}
          {/* <div className='flex items-center justify-center space-x-4 mb-4'>
            <span
              className={`text-lg font-medium ${
                !isYearly ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Monthly
            </span>

            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isYearly ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>

            <span
              className={`text-lg font-medium ${
                isYearly ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Yearly
            </span>
          </div> */}

          {/* Save Badge */}
          {/* <div className='relative inline-block'>
            <span className='text-blue-600 font-medium'>Save Up To 30%</span>
            <svg
              className='absolute -top-2 -right-8 w-6 h-6 text-blue-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M7 11l5-5m0 0l5 5m-5-5v12'
              />
            </svg>
          </div> */}
        </div>

        {/* Pricing Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
          {plans?.map((plan: PricingPlan, index: number) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg p-6 md:p-8 ${
                plan?.is_popular ? "ring-2 ring-blue-600 scale-105" : ""
              } transition-transform hover:scale-105`}
            >
              {/* Popular Badge */}
              {plan?.is_popular && (
                <div className='absolute -top-4 left-1/2 transform -translate-x-1/2'>
                  <span className='bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium'>
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className='text-center mb-6'>
                <h3 className='text-xl capitalize md:text-2xl font-bold text-gray-900 mb-4'>
                  {plan.name}
                </h3>

                <div className='mb-2'>
                  <span className='text-4xl md:text-5xl font-bold text-gray-900'>
                    ${isYearly ? plan?.yearly_price : plan?.monthly_price}
                  </span>
                </div>

                <p className='text-gray-600 font-medium mb-6'>{plan?.info}</p>

                {/* CTA Button */}
                <Link
                  href={`/subscription/${plan?.id}`}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 cursor-pointer 
               border-2 border-blue-600 text-blue-600 hover:bg-blue-50`}
                >
                  Edit Plan
                </Link>
              </div>

              {/* Description */}
              <p className='text-gray-600 text-sm md:text-base mb-6 leading-relaxed'>
                {plan?.description}
              </p>

              {/* Features */}
              <div className='space-y-3'>
                {plan?.features?.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className='flex items-start space-x-3'
                  >
                    <div className='flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5'>
                      <Check className='w-3 h-3 text-green-600' />
                    </div>
                    <span className='text-gray-700 text-sm md:text-base'>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
