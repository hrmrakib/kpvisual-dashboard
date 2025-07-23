"use client";

import type React from "react";

import { useEffect, useState } from "react";
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

import { Badge } from "@/components/ui/badge";
import { Plus, X, Save, Eye } from "lucide-react";
import {
  useGetSubscriptionPlanByIdQuery,
  useUpdateSubscriptionPlanMutation,
} from "@/redux/feature/subscription/subscriptionAPI";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface NewSubscriptionPlan {
  id: string | number;
  name: string;
  monthly_price: string;
  invoice_limit: number;
  bulk_upload_limit: number;
  ai_level: string;
  can_download_report: boolean;
  info: string;
  description: string;
  features: string[];
}

const aiLevels = ["Basic", "Pro", "Enterprise"];
const aiNames = ["basic", "pro", "enterprise"];

export default function EditSubscriptionPlanForm() {
  const params = useParams();

  const [plan, setPlan] = useState<NewSubscriptionPlan>({
    id: Array.isArray(params.slug) ? params.slug[0] ?? "" : params.slug ?? "",
    name: "",
    monthly_price: "",
    invoice_limit: 100,
    bulk_upload_limit: 5,
    ai_level: "Basic",
    can_download_report: false,
    info: "",
    description: "",
    features: [""],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof NewSubscriptionPlan, string>>
  >({});

  const { data: subscriptionPlan, refetch } = useGetSubscriptionPlanByIdQuery(
    Number(params?.slug)
  );

  const [updateSubscriptionPlan] = useUpdateSubscriptionPlanMutation();

  console.log(subscriptionPlan);

  useEffect(() => {
    if (subscriptionPlan) {
      setPlan({
        id: subscriptionPlan?.id || 0,
        name: subscriptionPlan?.name || "",
        monthly_price: subscriptionPlan?.monthly_price || "",
        invoice_limit: subscriptionPlan?.invoice_limit || 100,
        bulk_upload_limit: subscriptionPlan?.bulk_upload_limit || 5,
        ai_level: subscriptionPlan?.ai_level || "Basic",
        can_download_report: subscriptionPlan?.can_download_report || false,
        info: subscriptionPlan?.info || "",
        description: subscriptionPlan?.description || "",
        features: subscriptionPlan?.features?.length
          ? subscriptionPlan.features
          : [""],
      });
    }
  }, [subscriptionPlan]);
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NewSubscriptionPlan, string>> = {};

    if (!plan.name.trim()) {
      newErrors.name = "Plan name is required";
    }

    if (!plan.monthly_price || Number.parseFloat(plan.monthly_price) <= 0) {
      newErrors.monthly_price = "Valid monthly price is required";
    }

    // if (plan.yearly_price <= 0) {
    //   newErrors.yearly_price = "Valid yearly price is required";
    // }

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

    const cleanedPlan = {
      ...plan,
      features: plan.features.filter((feature) => feature.trim() !== ""),
      description: plan.description.trim(),
      is_popular: true,
    };

    try {
      const res = await updateSubscriptionPlan({
        id: Number(params?.slug),
        body: cleanedPlan,
      }).unwrap();

      if (res.success) {
        toast.success(res.message);
        refetch();
      }

      // Optionally reset form
      setPlan({
        id: 0,
        name: "",
        monthly_price: "",
        invoice_limit: 100,
        bulk_upload_limit: 5,
        ai_level: "Basic",
        can_download_report: false,
        info: "",
        description: "",
        features: [""],
      });
    } catch (error) {
      alert("Error updating subscription plan. Please try again.");
      console.error("Update error:", error);
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
            Update Subscription Plan
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
                <CardTitle className='capitalize'>
                  {plan.name} - Plan Details
                </CardTitle>
                <CardDescription>
                  Configure your new subscription plan settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className='space-y-6'>
                  {/* Pricing */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label
                        htmlFor='monthly_price'
                        className='text-base font-medium'
                      >
                        Monthly Price ($) *
                      </Label>
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
                          placeholder={subscriptionPlan?.monthly_price}
                          className={
                            errors.monthly_price ? "border-red-500" : ""
                          }
                        />
                        <Button
                          type='button'
                          variant='outline'
                          size='sm'
                          onClick={calculateYearlyFromMonthly}
                          className='border-2 border-[#29bd5a] text-[#29bd5a] hover:bg-[#29bd5a] hover:text-white'
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
                      <Label
                        htmlFor='yearly_price'
                        className='text-base font-medium'
                      >
                        Yearly Price ($) *{" "}
                        <span className='text-[#24b354] font-semibold'>
                          Auto Calculated
                        </span>
                      </Label>
                      <Input
                        id='yearly_price'
                        type='number'
                        step='0.01'
                        // value={plan.yearly_price}
                        onChange={(e) =>
                          setPlan((prev) => ({
                            ...prev,
                            yearly_price: Number.parseFloat(e.target.value),
                          }))
                        }
                        placeholder={`Auto Calculated from monthly price`}
                        className={`text-sm placeholder:text-sm`}
                        disabled
                      />
                    </div>
                  </div>

                  {/* Limits */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <Label
                        htmlFor='invoice_limit'
                        className='text-base font-medium'
                      >
                        Invoice Limit *
                      </Label>
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
                        placeholder={subscriptionPlan?.invoice_limit}
                        className={errors.invoice_limit ? "border-red-500" : ""}
                      />
                      {errors.invoice_limit && (
                        <p className='text-sm text-red-500'>
                          {errors.invoice_limit}
                        </p>
                      )}
                    </div>

                    <div className='space-y-2'>
                      <Label
                        htmlFor='bulk_upload_limit'
                        className='text-base font-medium'
                      >
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
                        placeholder={subscriptionPlan?.bulk_upload_limit}
                        className={
                          errors.bulk_upload_limit ? "border-red-500" : ""
                        }
                        max={50}
                      />
                      {errors.bulk_upload_limit && (
                        <p className='text-sm text-red-500'>
                          {errors.bulk_upload_limit}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className='space-y-2'>
                    <Label htmlFor='info' className='text-base font-medium'>
                      Info
                    </Label>
                    <Textarea
                      id='info'
                      value={plan.info}
                      onChange={(e) =>
                        setPlan((prev) => ({
                          ...prev,
                          info: e.target.value,
                        }))
                      }
                      placeholder={subscriptionPlan?.info}
                      rows={2}
                    />
                  </div>

                  {/* Description */}
                  <div className='space-y-2'>
                    <Label
                      htmlFor='description'
                      className='text-base font-medium'
                    >
                      Description (Optional)
                    </Label>
                    <Textarea
                      id='description'
                      value={plan.description}
                      onChange={(e) =>
                        setPlan((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder={subscriptionPlan?.description}
                      rows={3}
                    />
                  </div>

                  {/* Features */}
                  <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                      <Label className='text-base font-medium'>
                        Features *
                      </Label>
                      <Button
                        type='button'
                        variant='outline'
                        size='sm'
                        onClick={addFeature}
                        className='text-base font-medium border '
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

                  {/* Submit Buttons */}
                  <div className='flex gap-4 pt-6'>
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='flex-1 bg-blue-500 hover:bg-blue-600 text-zinc-100 font-medium rounded-full px-12 py-3 transition-colors'
                    >
                      <Save className='w-4 h-4 mr-2' />
                      {isSubmitting ? "Updating..." : "Update Plan"}
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
