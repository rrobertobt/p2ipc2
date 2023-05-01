import { SpecialityModel } from './speciality.model';

export class SpecialityMedicModel implements SpecialityModel {
  id!: number;
  name!: string;
  description!: string;
  selected!: boolean;
  price!: number;
}
