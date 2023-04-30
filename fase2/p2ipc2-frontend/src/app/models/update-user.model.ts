export interface UpdateUserModel {
  id: number;
  name: string;
  username: string;
  password: string;
  address: string;
  phone: string;
  email: string;
  cui: string;
  birthdate: Date | string;
}
