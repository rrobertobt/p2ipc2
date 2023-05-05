import {TestTypeModel} from "./test-type.model";

export class TestTypeLaboratoryModel implements TestTypeModel {
  id!: number;
  name!: string;
  description!: string;
  selected!: boolean;
  price!: number;
}
