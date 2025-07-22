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
  useCreateSubscriptionPlanMutation,
} = subscriptionAPI;
export default subscriptionAPI;
