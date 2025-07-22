"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Save, Eye } from "lucide-react";
import { useCreateSubscriptionPlanMutation } from "@/redux/feature/subscription/subscriptionAPI";

interface NewSubscriptionPlan {
  name: string;
  monthly_price: string;
  yearly_price: number;
  invoice_limit: number;
  bulk_upload_limit: number;
  ai_level: string;
  can_download_report: boolean;
  description: string;
  features: string[];
}

const aiLevels = ["Basic", "Intermediate", "Advanced", "Expert"];

export default function CreateSubscriptionPlanForm() {
  const [plan, setPlan] = useState<NewSubscriptionPlan>({
    name: "",
    monthly_price: "",
    yearly_price: 0,
    invoice_limit: 100,
    bulk_upload_limit: 5,
    ai_level: "Basic",
    can_download_report: false,
    description: "",
    features: [""],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof NewSubscriptionPlan, string>>
  >({});
  const [createSubscriptionPlan] = useCreateSubscriptionPlanMutation();

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewSubscriptionPlan, string>> = {};

    if (!plan.name.trim()) {
      newErrors.name = "Plan name is required";
    }

    if (!plan.monthly_price || Number.parseFloat(plan.monthly_price) <= 0) {
      newErrors.monthly_price = "Valid monthly price is required";
    }

    if (plan.yearly_price <= 0) {
      newErrors.yearly_price = "Valid yearly price is required";
    }

    if (plan.invoice_limit <= 0) {
      newErrors.invoice_limit = "Invoice limit must be greater than 0";
    }

    if (plan.bulk_upload_limit <= 0) {
      newErrors.bulk_upload_limit = "Bulk upload limit must be greater than 0";
    }

    const validFeatures = plan.features.filter(
      (feature) => feature.trim() !== ""
    );
    if (validFeatures.length === 0) {
      newErrors.features = "At least one feature is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Filter out empty features
    const cleanedPlan = {
      ...plan,
      features: plan.features.filter((feature) => feature.trim() !== ""),
      description: plan.description.trim() || null,
    };

    try {
      // Simulate API call
      const res = await createSubscriptionPlan(cleanedPlan).unwrap();

      console.log(res);

      // Reset form
      setPlan({
        name: "",
        monthly_price: "",
        yearly_price: 0,
        invoice_limit: 100,
        bulk_upload_limit: 5,
        ai_level: "Basic",
        can_download_report: false,
        description: "",
        features: [""],
      });
    } catch (error) {
      alert("Error creating subscription plan. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFeature = () => {
    setPlan((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index: number) => {
    setPlan((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setPlan((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? value : feature
      ),
    }));
  };

  const calculateYearlyFromMonthly = () => {
    const monthlyPrice = Number.parseFloat(plan.monthly_price);
    if (monthlyPrice > 0) {
      // Apply 30% discount for yearly
      const yearlyPrice = monthlyPrice * 12 * 0.7;
      setPlan((prev) => ({
        ...prev,
        yearly_price: Number.parseFloat(yearlyPrice.toFixed(2)),
      }));
    }
  };

  return (
    <div className='min-h-screen bg-background2 py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>
            Create New Subscription Plan
          </h1>
          <p className='text-gray-600'>
            Add a new subscription plan to your pricing options
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Form Section */}
          <div className='lg:col-span-2'>
            <Card>
              <CardHeader>
                <CardTitle>Plan Details</CardTitle>
                <CardDescription>
                  Configure your new subscription plan settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className='space-y-6'>
                  {/* Basic Information */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='name'>Plan Name *</Label>
                      <Input
                        id='name'
                        value={plan.name}
                        onChange={(e) =>
                          setPlan((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder='e.g., Basic, Pro, Enterprise'
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className='text-sm text-red-500'>{errors.name}</p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='ai_level'>AI Level</Label>
                      <Select
                        value={plan.ai_level}
                        onValueChange={(value) =>
                          setPlan((prev) => ({ ...prev, ai_level: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {aiLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='monthly_price'>Monthly Price ($) *</Label>
                      <div className='flex gap-2'>
                        <Input
                          id='monthly_price'
                          type='number'
                          step='0.01'
                          value={plan.monthly_price}
                          onChange={(e) =>
                            setPlan((prev) => ({
                              ...prev,
                              monthly_price: e.target.value,
                            }))
                          }
                          placeholder='8.00'
                          className={
                            errors.monthly_price ? "border-red-500" : ""
                          }
                        />
                        <Button
                          type='button'
                          variant='outline'
                          size='sm'
                          onClick={calculateYearlyFromMonthly}
                        >
                          Auto Yearly
                        </Button>
                      </div>
                      {errors.monthly_price && (
                        <p className='text-sm text-red-500'>
                          {errors.monthly_price}
                        </p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='yearly_price'>Yearly Price ($) *</Label>
                      <Input
                        id='yearly_price'
                        type='number'
                        step='0.01'
                        value={plan.yearly_price}
                        onChange={(e) =>
                          setPlan((prev) => ({
                            ...prev,
                            yearly_price:
                              Number.parseFloat(e.target.value) || 0,
                          }))
                        }
                        placeholder='67.20'
                        className={errors.yearly_price ? "border-red-500" : ""}
                      />
                      {errors.yearly_price && (
                        <p className='text-sm text-red-500'>
                          {errors.yearly_price}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Limits */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label htmlFor='invoice_limit'>Invoice Limit *</Label>
                      <Input
                        id='invoice_limit'
                        type='number'
                        value={plan.invoice_limit}
                        onChange={(e) =>
                          setPlan((prev) => ({
                            ...prev,
                            invoice_limit: Number.parseInt(e.target.value) || 0,
                          }))
                        }
                        placeholder='500'
                        className={errors.invoice_limit ? "border-red-500" : ""}
                      />
                      {errors.invoice_limit && (
                        <p className='text-sm text-red-500'>
                          {errors.invoice_limit}
                        </p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label htmlFor='bulk_upload_limit'>
                        Bulk Upload Limit *
                      </Label>
                      <Input
                        id='bulk_upload_limit'
                        type='number'
                        value={plan.bulk_upload_limit}
                        onChange={(e) =>
                          setPlan((prev) => ({
                            ...prev,
                            bulk_upload_limit:
                              Number.parseInt(e.target.value) || 0,
                          }))
                        }
                        placeholder='10'
                        className={
                          errors.bulk_upload_limit ? "border-red-500" : ""
                        }
                      />
                      {errors.bulk_upload_limit && (
                        <p className='text-sm text-red-500'>
                          {errors.bulk_upload_limit}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <div className='space-y-2'>
                    <Label htmlFor='description'>Description (Optional)</Label>
                    <Textarea
                      id='description'
                      value={plan.description}
                      onChange={(e) =>
                        setPlan((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder='Brief description of the plan...'
                      rows={3}
                    />
                  </div>

                  {/* Features */}
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <Label>Features *</Label>
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={addFeature}
                      >
                        <Plus className='w-4 h-4 mr-1' />
                        Add Feature
                      </Button>
                    </div>
                    <div className='space-y-2'>
                      {plan.features.map((feature, index) => (
                        <div key={index} className='flex gap-2'>
                          <Input
                            value={feature}
                            onChange={(e) =>
                              updateFeature(index, e.target.value)
                            }
                            placeholder='Enter feature description...'
                          />
                          {plan.features.length > 1 && (
                            <Button
                              type='button'
                              variant='outline'
                              size='sm'
                              onClick={() => removeFeature(index)}
                            >
                              <X className='w-4 h-4' />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    {errors.features && (
                      <p className='text-sm text-red-500'>{errors.features}</p>
                    )}
                  </div>

                  {/* Download Reports Toggle */}
                  {/* <div className='flex items-center space-x-2'>
                    <Switch
                      id='can_download_report'
                      checked={plan.can_download_report}
                      onCheckedChange={(checked) =>
                        setPlan((prev) => ({
                          ...prev,
                          can_download_report: checked,
                        }))
                      }
                    />
                    <Label htmlFor='can_download_report'>
                      Allow PDF report downloads
                    </Label>
                  </div> */}

                  {/* Submit Buttons */}
                  <div className='flex gap-4 pt-6'>
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='flex-1 bg-blue-500 hover:bg-blue-600 text-zinc-100 font-medium rounded-full px-12 py-3 transition-colors'
                    >
                      <Save className='w-4 h-4 mr-2' />
                      {isSubmitting ? "Creating..." : "Create Plan"}
                    </Button>
                    <Button
                      type='button'
                      variant='outline'
                      onClick={() => setShowPreview(!showPreview)}
                    >
                      <Eye className='w-4 h-4 mr-2' />
                      {showPreview ? "Hide" : "Preview"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className='lg:col-span-1'>
            {showPreview && (
              <Card className='sticky top-8'>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>
                    How your plan will appear to customers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='text-center'>
                      <h3 className='text-xl font-bold capitalize'>
                        {plan.name || "Plan Name"}
                      </h3>
                      {plan.description && (
                        <p className='text-sm text-gray-600 mt-1'>
                          {plan.description}
                        </p>
                      )}
                    </div>

                    <div className='text-center'>
                      <div className='text-3xl font-bold'>
                        ${plan.monthly_price || "0.00"}
                      </div>
                      <div className='text-sm text-gray-500'>per month</div>
                      {plan.yearly_price > 0 && (
                        <div className='text-sm text-green-600 mt-1'>
                          ${(plan.yearly_price / 12).toFixed(2)}/month when
                          billed yearly
                        </div>
                      )}
                    </div>

                    <div className='space-y-2'>
                      {plan.features
                        .filter((feature) => feature.trim() !== "")
                        .map((feature, index) => (
                          <div key={index} className='flex items-start text-sm'>
                            <div className='w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0' />
                            {feature}
                          </div>
                        ))}
                    </div>

                    <div className='pt-4 border-t space-y-2 text-sm'>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>Invoice Limit:</span>
                        <span className='font-medium'>
                          {plan.invoice_limit.toLocaleString()}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>AI Level:</span>
                        <span className='font-medium'>{plan.ai_level}</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-gray-600'>PDF Reports:</span>
                        <Badge
                          variant={
                            plan.can_download_report ? "default" : "secondary"
                          }
                        >
                          {plan.can_download_report
                            ? "Included"
                            : "Not included"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import type React from "react";

// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { ArrowLeft, Upload, X } from "lucide-react";
// import Image from "next/image";

// export default function AddSubscription() {
//   const router = useRouter();
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [image, setImage] = useState<string | null>(null);
//   const [packageName, setPackageName] = useState("");
//   const [packageAmount, setPackageAmount] = useState("");
//   const [packageDuration, setPackageDuration] = useState("");
//   const [features, setFeatures] = useState<string[]>([]);
//   const [newFeature, setNewFeature] = useState("");
//   const [showFeaturesInput, setShowFeaturesInput] = useState(false);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImage(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleAddFeature = () => {
//     if (newFeature.trim()) {
//       setFeatures([...features, newFeature.trim()]);
//       setNewFeature("");
//     }
//   };

//   const handleRemoveFeature = (index: number) => {
//     setFeatures(features.filter((_, i) => i !== index));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Validate form
//     if (!packageName || !packageAmount || !packageDuration) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     // Navigate back to the subscriptions page
//     router.push("/");
//   };

//   return (
//     <div className='min-h-screen bg-[#E6ECF6] p-4'>
//       <div className='max-w-5xl mx-auto'>
//         <div className='bg-[#E6ECF6] rounded-lg overflow-hidden'>
//           <div className='p-4 flex items-center'>
//             <button
//               onClick={() => router.back()}
//               className='text-[#101010] hover:text-gray-300 mr-3'
//             >
//               <ArrowLeft size={20} />
//             </button>
//             <h1 className='text-[#101010] text-xl'>Add Subscription</h1>
//           </div>

//           <form onSubmit={handleSubmit} className='p-4 space-y-4'>
//             <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//               <div
//                 className='bg-input rounded-md p-3 flex items-center justify-between cursor-pointer'
//                 onClick={() => fileInputRef.current?.click()}
//               >
//                 <span className='text-gray-600'>Upload Image</span>
//                 <Upload size={20} className='text-gray-300' />
//                 <input
//                   ref={fileInputRef}
//                   type='file'
//                   accept='image/*'
//                   className='hidden'
//                   onChange={handleImageUpload}
//                 />
//               </div>

//               <input
//                 type='text'
//                 placeholder='Package Name'
//                 value={packageName}
//                 onChange={(e) => setPackageName(e.target.value)}
//                 className='bg-input rounded-md p-3 text-white placeholder-gray-600 outline-none'
//               />
//             </div>

//             <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
//               <input
//                 type='text'
//                 placeholder='Package Amount'
//                 value={packageAmount}
//                 onChange={(e) => setPackageAmount(e.target.value)}
//                 className='bg-input rounded-md p-3 text-white placeholder-gray-600 outline-none'
//               />

//               <input
//                 type='text'
//                 placeholder='Package Duration'
//                 value={packageDuration}
//                 onChange={(e) => setPackageDuration(e.target.value)}
//                 className='bg-input rounded-md p-3 text-white placeholder-gray-600 outline-none'
//               />
//             </div>

//             {/* Image Preview */}
//             {image && (
//               <div className='relative w-24 h-24 mx-auto'>
//                 <Image
//                   src={image || "/placeholder.svg"}
//                   alt='Package'
//                   fill
//                   className='object-cover rounded-md'
//                 />
//                 <button
//                   type='button'
//                   onClick={() => setImage(null)}
//                   className='absolute -top-2 -right-2 bg-red-500 rounded-full p-1'
//                 >
//                   <X size={14} className='text-white' />
//                 </button>
//               </div>
//             )}

//             {/* Features Section */}
//             {showFeaturesInput ? (
//               <div className='space-y-2'>
//                 <div className='flex gap-2'>
//                   <input
//                     type='text'
//                     placeholder='Enter feature'
//                     value={newFeature}
//                     onChange={(e) => setNewFeature(e.target.value)}
//                     className='bg-input rounded-md p-3 text-white placeholder-gray-600 outline-none flex-1'
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") {
//                         e.preventDefault();
//                         handleAddFeature();
//                       }
//                     }}
//                   />
//                   <button
//                     type='button'
//                     onClick={handleAddFeature}
//                     className='bg-button text-zinc-100 rounded-md px-4'
//                   >
//                     Add
//                   </button>
//                 </div>

//                 {features.length > 0 && (
//                   <div className='bg-input rounded-md p-3'>
//                     <h3 className='text-white mb-2'>Features:</h3>
//                     <ul className='space-y-2'>
//                       {features.map((feature, index) => (
//                         <li
//                           key={index}
//                           className='flex justify-between items-center text-white'
//                         >
//                           <span>• {feature}</span>
//                           <button
//                             type='button'
//                             onClick={() => handleRemoveFeature(index)}
//                             className='text-red-400 hover:text-red-300'
//                           >
//                             <X size={16} />
//                           </button>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <button
//                 type='button'
//                 onClick={() => setShowFeaturesInput(true)}
//                 className='bg-zinc-700 rounded-md p-3 text-gray-300 w-full text-left flex items-center'
//               >
//                 <span>Add Features</span>
//               </button>
//             )}

//             <div className='flex justify-center pt-4'>
//               <button
//                 type='submit'
//                 className='bg-button text-zinc-100 font-medium rounded-full px-12 py-3 transition-colors'
//               >
//                 Create
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
