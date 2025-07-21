import baseApi from "@/redux/api/baseAPI";

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
  }),
});

export const { useGetProfileQuery } = settingAPI;
export default settingAPI;
