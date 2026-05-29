export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  meta?: {
    count?: number;
  };
};

export type ApiErrorResponse = {
  success: false;
  message: string;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
