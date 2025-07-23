import baseApi from "@/redux/api/baseAPI";

interface SubscriptionPlan {
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
  is_popular?: boolean;
}

const subscriptionAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSubscriptionList: builder.query<any, any>({
      query: () => ({
        url: "api/v1/subscription/users/subscribed/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),

    getSubscriptionPlan: builder.query({
      query: () => ({
        url: "api/v1/subscription/plans/",
        method: "GET",
      }),
    }),

    getSubscriptionPlanById: builder.query({
      query: (id) => ({
        url: `api/v1/subscription/plans/update/${id}/`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),

    updateSubscriptionPlan: builder.mutation<
      any,
      { body: SubscriptionPlan; id: string | number }
    >({
      query: ({ body, id }) => ({
        url: `api/v1/subscription/plans/update/${id}/`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "PUT",
        body,
      }),
    }),

    createSubscriptionPlan: builder.mutation<any, any>({
      query: (body) => ({
        url: "api/v1/subscription/plan/create/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetSubscriptionListQuery,
  useGetSubscriptionPlanQuery,
  useGetSubscriptionPlanByIdQuery,
  useUpdateSubscriptionPlanMutation,
  useCreateSubscriptionPlanMutation,
} = subscriptionAPI;
export default subscriptionAPI;
