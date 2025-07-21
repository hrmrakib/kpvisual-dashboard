import CreateSubscriptionPlanForm from "@/app/subscription/add/page";
import baseApi from "@/redux/api/baseAPI";

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
  useCreateSubscriptionPlanMutation,
} = subscriptionAPI;
export default subscriptionAPI;
