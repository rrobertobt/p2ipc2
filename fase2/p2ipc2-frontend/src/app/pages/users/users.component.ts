import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../../models/user.model";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  constructor(private http: HttpClient) {}

  users: UserModel[] = [];
  ngOnInit(): void {
    this.http.get<UserModel[]>('http://localhost:8080/p2ipc2_backend_war_exploded/users')
      .subscribe((data) => {
        this.users = data;
    });
  }
}
