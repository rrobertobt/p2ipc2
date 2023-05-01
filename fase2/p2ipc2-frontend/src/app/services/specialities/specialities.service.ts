import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {SpecialityMedicModel} from "../../models/speciality-medic.model";
import {SpecialityModel} from "../../models/speciality.model";

@Injectable({
  providedIn: 'root'
})
export class SpecialitiesService {
  apiUrl = 'http://localhost:8080/p2ipc2_backend_war_exploded';
  constructor(private http: HttpClient) { }

  getSpecialities(): Observable<SpecialityMedicModel[]> {
    return this.http.get<SpecialityModel[]>(`${this.apiUrl}/specialities`).pipe(
      map(specialities => specialities.map(speciality => {
        const specialityWithPriceAndSelected = new SpecialityMedicModel();
        specialityWithPriceAndSelected.id = speciality.id;
        specialityWithPriceAndSelected.name = speciality.name;
        specialityWithPriceAndSelected.description = speciality.description;
        specialityWithPriceAndSelected.selected = false;
        specialityWithPriceAndSelected.price = 0;
        return specialityWithPriceAndSelected;
      }))
    );
  }
}
