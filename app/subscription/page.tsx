"use client";

import { useState } from "react";
import { Check, Fish, Crown, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);

  const features = [
    "Issues Frequent",
    "Maintenance Newspaper",
    "Buy Products",
    "Problem In My Pool",
    "Calculator Of Chemicals",
    "Tricks And Secrets",
  ];

  const handleChoosePlan = (plan: string) => {
    setSelectedPlan(plan);
    setShowDialog(true);
  };

  const confirmSubscription = () => {
    setCurrentPlan(selectedPlan);
    setShowDialog(false);
  };

  return (
    <div className='min-h-screen bg-background2 p-4 md:p-8 flex flex-col'>
      <div className='w-full'>
        <div className='flex justify-end mb-6'>
          <Link
            href='/subscription/add'
            className='flex items-center gap-2 bg-primary hover:bg-zinc-700 text-white rounded-full px-4 py-2 transition-colors'
          >
            <Plus size={20} />
            <span>Add New Subscription</span>
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {/* Basic Plan */}
          <div className='max-w-[330px] bg-[#E8D9AD] rounded-lg overflow-hidden'>
            <div className='px-6 py-8 flex items-start gap-3'>
              <div className=''>
                <svg
                  width='50'
                  height='50'
                  viewBox='0 0 50 50'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect width='50' height='50' rx='12' fill='#4F3E19' />
                  <path
                    d='M31.47 29.83L31.86 32.99C31.96 33.82 31.07 34.4 30.36 33.97L26.9 31.91C26.66 31.77 26.6 31.47 26.73 31.23C27.23 30.31 27.5 29.27 27.5 28.23C27.5 24.57 24.36 21.59 20.5 21.59C19.71 21.59 18.94 21.71 18.22 21.95C17.85 22.07 17.49 21.73 17.58 21.35C18.49 17.71 21.99 15 26.17 15C31.05 15 35 18.69 35 23.24C35 25.94 33.61 28.33 31.47 29.83Z'
                    fill='#FDFBF7'
                  />
                  <path
                    d='M26 28.2298C26 29.4198 25.56 30.5198 24.82 31.3898C23.83 32.5898 22.26 33.3598 20.5 33.3598L17.89 34.9098C17.45 35.1798 16.89 34.8098 16.95 34.2998L17.2 32.3298C15.86 31.3998 15 29.9098 15 28.2298C15 26.4698 15.94 24.9198 17.38 23.9998C18.27 23.4198 19.34 23.0898 20.5 23.0898C23.54 23.0898 26 25.3898 26 28.2298Z'
                    fill='#FDFBF7'
                  />
                </svg>
              </div>
              <div>
                <h3 className='text-primary font-medium'>Basic Plan</h3>
                <p className='text-primary text-lg font-bold'>Free</p>
              </div>
            </div>

            <div className='border-t border-[#5CE1E6]'>
              <div className='p-4'>
                <h4 className='text-primary font-medium mb-3'>Features</h4>
                <ul className='space-y-5'>
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className='flex items-center gap-2 text-gray-300'
                    >
                      <div className='bg-primary rounded-full p-1'>
                        <Check className='h-4 w-4 text-white' />
                      </div>
                      <span className='text-base text-primary'>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='p-4 w-full'>
              <Link
                href='/subscription/edit'
                className={`w-full block py-3 rounded-md text-center font-medium transition-colors bg-button cursor-pointer text-secondary
                }`}
              >
                Edit Plan
              </Link>
            </div>
          </div>

          {/* Premium Plan */}
          <div className='max-w-[330px] bg-[#E8D9AD] rounded-lg overflow-hidden'>
            <div className='px-6 py-8 flex items-start gap-3'>
              <div className=''>
                <svg
                  width='50'
                  height='50'
                  viewBox='0 0 50 50'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect width='50' height='50' rx='12' fill='#4F3E19' />
                  <path
                    d='M31.47 29.83L31.86 32.99C31.96 33.82 31.07 34.4 30.36 33.97L26.9 31.91C26.66 31.77 26.6 31.47 26.73 31.23C27.23 30.31 27.5 29.27 27.5 28.23C27.5 24.57 24.36 21.59 20.5 21.59C19.71 21.59 18.94 21.71 18.22 21.95C17.85 22.07 17.49 21.73 17.58 21.35C18.49 17.71 21.99 15 26.17 15C31.05 15 35 18.69 35 23.24C35 25.94 33.61 28.33 31.47 29.83Z'
                    fill='#FDFBF7'
                  />
                  <path
                    d='M26 28.2298C26 29.4198 25.56 30.5198 24.82 31.3898C23.83 32.5898 22.26 33.3598 20.5 33.3598L17.89 34.9098C17.45 35.1798 16.89 34.8098 16.95 34.2998L17.2 32.3298C15.86 31.3998 15 29.9098 15 28.2298C15 26.4698 15.94 24.9198 17.38 23.9998C18.27 23.4198 19.34 23.0898 20.5 23.0898C23.54 23.0898 26 25.3898 26 28.2298Z'
                    fill='#FDFBF7'
                  />
                </svg>
              </div>
              <div>
                <h3 className='text-primary font-medium'>Premium Plan</h3>
                <p className='text-primary text-lg font-bold'>
                  4.9 /month (39€/year)
                </p>
              </div>
            </div>

            <div className='border-t border-[#5CE1E6]'>
              <div className='p-4'>
                <h4 className='text-primary font-medium mb-3'>Features</h4>
                <ul className='space-y-5'>
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className='flex items-center gap-2 text-gray-300'
                    >
                      <div className='bg-primary rounded-full p-1'>
                        <Check className='h-4 w-4 text-white' />
                      </div>
                      <span className='text-base text-primary'>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='p-4 w-full'>
              <Link
                href='/subscription/edit'
                className={`w-full block py-3 rounded-md text-center font-medium transition-colors bg-button cursor-pointer text-secondary
                }`}
              >
                Edit Plan
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className='bg-zinc-800 text-white border-zinc-700'>
          <DialogHeader>
            <DialogTitle className='text-xl'>
              Choose Subscription Plan
            </DialogTitle>
          </DialogHeader>

          <div className='py-4'>
            <RadioGroup
              defaultValue={selectedPlan || undefined}
              onValueChange={setSelectedPlan}
            >
              <div className='flex items-center space-x-2 mb-4'>
                <RadioGroupItem value='basic' id='basic' />
                <Label htmlFor='basic' className='text-white'>
                  Basic Plan - Free
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='premium' id='premium' />
                <Label htmlFor='premium' className='text-white'>
                  Premium Plan - 4.9 /month (39€/year)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter className='flex gap-2 sm:justify-end'>
            <Button
              variant='outline'
              onClick={() => setShowDialog(false)}
              className='bg-transparent border-zinc-600 text-white hover:bg-zinc-700 hover:text-white'
            >
              Cancel
            </Button>
            <Button
              onClick={confirmSubscription}
              className='bg-cyan-400 hover:bg-cyan-500 text-zinc-800'
              disabled={!selectedPlan}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
