import { Component, OnInit } from "@angular/core";
import { Observable, Subject, merge } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.less"]
})
export class AppComponent implements OnInit {
  title = "AngularHttpClientDemos";
  showPosts: boolean;
  posts$: Observable<any>;
  users$: Observable<any>;
  activeUser$: Observable<any>;
  albums$: Observable<any>;
  todos$: Observable<any>;
  selectedUser$ = new Subject<any>();

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.users$ = this.httpClient.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    this.activeUser$ = merge(
      this.selectedUser$,
      this.users$.pipe(map(x => x[0]))
    );
    this.albums$ = this.activeUser$.pipe(
      switchMap(x =>
        this.httpClient.get(
          `https://jsonplaceholder.typicode.com/albums?userId=${x.id}`
        )
      )
    );
    this.todos$ = this.activeUser$.pipe(
      switchMap(x =>
        httpClient.get(
          `https://jsonplaceholder.typicode.com/todos?userId=${x.id}`
        )
      )
    );
  }
}
