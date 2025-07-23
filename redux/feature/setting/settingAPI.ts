import baseApi from "@/redux/api/baseAPI";
import { get } from "http";

const settingAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<any, any>({
      query: () => ({
        url: "api/v1/account/update-profile/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),

    getTermsAndConditions: builder.query<any, any>({
      query: () => ({
        url: "api/v1/privacy_policy/terms-conditions/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),

    updateTermsAndConditions: builder.mutation<any, any>({
      query: (body) => ({
        url: "api/v1/privacy_policy/terms-conditions/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "PUT",
        body,
      }),
    }),

    getPrivacyPolicy: builder.query<any, any>({
      query: () => ({
        url: "api/v1/privacy_policy/privacy-policy/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),

    updatePrivacyPolicy: builder.mutation<any, any>({
      query: (body) => ({
        url: "api/v1/privacy_policy/privacy-policy/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "PUT",
        body,
      }),
    }),

    getTrustAndSafety: builder.query<any, any>({
      query: () => ({
        url: "api/v1/privacy_policy/trust-safety/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),

    updateTrustAndSafety: builder.mutation<any, any>({
      query: (body) => ({
        url: "api/v1/privacy_policy/trust-safety/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useGetTrustAndSafetyQuery,
  useUpdateTrustAndSafetyMutation,
} = settingAPI;
export default settingAPI;
