export interface I_Response<T> {
  isOk: boolean;
  reLogin: boolean;
  data: T;
  message: string;
}
