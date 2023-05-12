import {TestTypeModel} from "./test-type.model";

export class AppointmentTestTypeModel implements TestTypeModel {
    id!: number;
    name!: string;
    description!: string;
    selected!: boolean;
}
