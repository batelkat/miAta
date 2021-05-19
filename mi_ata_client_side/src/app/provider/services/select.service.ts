

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Nation } from 'src/app/provider/models/nation.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class SelectService {

  nationList$ = new BehaviorSubject<Nation[]>(null);
  nationListStored: Nation[] = [];
  constructor(private http: HttpClient) { }

  getAllNation(): Observable<any> {
    // this.http.get<{ message: string, nations: Nation[] }>(`${environment.baseApi}/GetNations`).subscribe((response) => {
    //   this.nationListStored = response.nations;
    //   this.nationList$.next(this.nationListStored);
    // });
    return this.http.get<{ message: string, nations: Nation[] }>(`${environment.baseApi}/GetNations`);

    // return this.nationList$.asObservable();
  }

}