import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthTokens, getTokens } from "@app/utils/auth-token-utils";
import {
  Reviewer,
  BookMeetingRequest,
  BookMeetingResponse,
  DeleteMeetingRequest,
  DeleteMeetingResponse,
  Meeting,
  CreateSlotRequest,
  CreateSlotResponse,
  Slot,
} from "@app/interfaces/api.types";

export const UserApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api",
    prepareHeaders: (headers) => {
      const tokens: AuthTokens | null = getTokens();
      if (tokens && tokens.access_token) {
        headers.set("Authorization", `Bearer ${tokens.access_token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Meeting", "Slot"],
  endpoints: (builder) => ({
    getReviewers: builder.query<Reviewer[], void>({
      query: () => ({
        url: "get-reviewers",
        method: "POST",
        body: { specialization: null },
      }),
    }),
    bookMeeting: builder.mutation<BookMeetingResponse, BookMeetingRequest>({
      query: (body) => ({
        url: "book-meeting",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Meeting"],
    }),
    deleteMeeting: builder.mutation<DeleteMeetingResponse, DeleteMeetingRequest>({
      query: (body) => ({
        url: "delete-meeting",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Meeting"],
    }),
    getMeetings: builder.query<Meeting[], void>({
      query: () => ({
        url: "get-meeting",
        method: "GET",
      }),
      providesTags: ["Meeting"],
    }),
    updateMeetingComment: builder.mutation<Meeting, { meetingId: number; comment: string }>({
      query: ({ meetingId, comment }) => ({
        url: "get-meeting",
        method: "PATCH",
        body: { meetingId, comment },
      }),
    }),
    createSlot: builder.mutation<CreateSlotResponse, CreateSlotRequest>({
      query: (body) => ({
        url: "slots/create-slot",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Slot"],
    }),
    getExpertSlots: builder.query<Slot[], number>({
      query: (expertId) => ({
        url: `slots/get-expert-slots?expertId=${expertId}`,
        method: "GET",
      }),
      providesTags: (result, error, expertId) => [{ type: "Slot", id: expertId }],
    }),
  }),
});

export const {
  useGetReviewersQuery,
  useBookMeetingMutation,
  useDeleteMeetingMutation,
  useGetMeetingsQuery,
  useCreateSlotMutation,
  useGetExpertSlotsQuery,
  useUpdateMeetingCommentMutation,
} = UserApi;





