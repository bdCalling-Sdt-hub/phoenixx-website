import { baseApi } from "../../../utils/apiBaseQuery";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: "/posts/create-post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["post"],
    }),

    getPost: builder.query({
      query: ({ searchTerm, limit, page, category, subCategory } = {}) => ({
        url: "/posts",
        method: "GET",
        params: {
          searchTerm,
          limit,
          page,
          category,
          subCategory
        }
      }),
      providesTags: ["post"],
    }),

    likePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/likes/${postId}`,
        method: "POST",
      }),
      invalidatesTags: ["post"],
    }),

    postDetails: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),

    myPost: builder.query({
      query: () => ({
        url: `/posts/all-posts/my-posts`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),

    deletePost: builder.mutation({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useMyPostQuery,
  useLikePostMutation,
  usePostDetailsQuery,
  useDeletePostMutation,  
} = postApi;