export interface Reviewer {
    expertId: number;
    name: string;
    specialization: string;
}
export interface BookMeetingRequest {
    name: string;
    expertId: number;
    userId: number;
    description: string;
    startTime: string;
    endTime: string;
}

export interface BookMeetingResponse {
    success: boolean;
    message: string;
}

export interface DeleteMeetingRequest {
    meetingId: number;
}

export interface DeleteMeetingResponse {
    success: boolean;
    message: string;
}

export interface Meeting {
    meetingId: number;
    name: string;
    expertName: string;
    userName: string;
    comment: string | null;
    description: string;
    startTime: string;
    endTime: string;
}

export interface CreateSlotRequest {
    name: string;
    expertId: number;
    description: string;
    startTime: string;
    endTime: string;
}

export interface CreateSlotResponse {
    success: boolean;
    message: string;
}

export interface Slot {
    id: number;
    startTime: string;
    endTime: string;
    name: string;
    description: string;
    expertId: number;
}
