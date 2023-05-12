export interface AppointmentModel {
  id: number;
  medic_id: number;
  patient_id: number;
  speciality_id: number;
  speciality_name: string;
  patient_name: string;
  date: string;
  schedule: string;
  status: string;
  report: string;
  price: number;
  commission: number;
  created_at: string;
}
