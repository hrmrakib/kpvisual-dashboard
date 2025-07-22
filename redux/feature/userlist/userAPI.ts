import baseApi from "@/redux/api/baseAPI";

const userAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserList: builder.query<any, any>({ 
      query: () => ({
        url: "api/v1/account/dashboard/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),

    getAllSubscriberedUsers: builder.query<any, any>({
      query: () => ({
        url: "api/v1/subscription/users/subscribed/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserListQuery, useGetAllSubscriberedUsersQuery } = userAPI;
export default userAPI;
