import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {TestTypeLaboratoryModel} from "../../models/test-type-laboratory.model";
import {TestTypeModel} from "../../models/test-type.model";

@Injectable({
  providedIn: 'root'
})
export class TestTypesService {
  apiUrl = 'http://localhost:8080/p2ipc2_backend_war_exploded';
  constructor(private http: HttpClient) { }

  getTestTypes():Observable<TestTypeLaboratoryModel[]> {
    return this.http.get<TestTypeModel[]>(`${this.apiUrl}/test-types`).pipe(
      map(testTypes => testTypes.map(testType => {
        const testTypeWithPriceAndSelected = new TestTypeLaboratoryModel();
        testTypeWithPriceAndSelected.id = testType.id;
        testTypeWithPriceAndSelected.name = testType.name;
        testTypeWithPriceAndSelected.description = testType.description;
        testTypeWithPriceAndSelected.selected = false;
        testTypeWithPriceAndSelected.price = 0;
        return testTypeWithPriceAndSelected;
      }
      ))
    );
  }
}
