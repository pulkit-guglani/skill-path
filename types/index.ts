/** API response envelope: { success, data: T } */
export interface ApiEnvelope<T> {
  success?: boolean;
  data?: T;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
