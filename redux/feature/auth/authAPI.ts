import baseApi from "@/redux/api/baseAPI";

const authAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (body) => ({
        url: "api/v1/account/login/",
        method: "POST",
        body,
      }),
    }),

    sendOtp: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api-auth/resend_code/",
        method: "POST",
        body,
      }),
    }),

    verifyOtp: builder.mutation<any, any>({
      query: (body) => ({
        url: "/api-auth/verify_email/",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useLoginMutation, useSendOtpMutation, useVerifyOtpMutation } =
  authAPI;
