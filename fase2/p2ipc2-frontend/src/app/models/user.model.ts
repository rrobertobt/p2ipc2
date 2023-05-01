export interface UserModel {
  type: string;
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  cui: string;
  birthdate: string;
  balance: number;
  initial_setup: boolean;
  medic_id: number;
  laboratory_id: number;
  patient_id: number;
}
