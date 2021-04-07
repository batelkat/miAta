import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConfigurationService } from './configuration.service';
import { AppConfig } from '../configuration/api';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  surveyOpened: boolean = false;
  constructor(
    private http: HttpClient,
    private configService: ConfigurationService,
  ) { }


  GetAllUsers(): Observable<any> {
    const apiAddress = this.configService.getApiEndPoint(AppConfig.api.getUsers);

    return this.http.get(apiAddress);
  }

  GetUserById(id): Observable<any> {
    const apiAddress = this.configService.getApiEndPoint(AppConfig.api.getUserById);
    return this.http.get<{ message: string, result: User }>(apiAddress + id).pipe(
      map((response) => {
        response.result.religion = response.result.nation.religion.find(r => r._id == response.result.religion.toString())
        return response;
      })
    );
  }

  GetUserByName(username): Observable<any> {
    const apiAddress = this.configService.getApiEndPoint(AppConfig.api.getUserByName);

    return this.http.get(apiAddress + username);
  }

  MarkNotification(id, deleteValue?): Observable<any> {
    return this.http.post(`${environment.baseApi}/mark/${id}`, {
      id,
      deleteValue
    });
  }

  MarkAllAsRead(): Observable<any> {
    return this.http.post(`${environment.baseApi}/mark-all`, {
      all: true
    });
  }

  AddImage(image): Observable<any> {
    return this.http.post(`${environment.baseApi}/upload-image`, {
      image
    });
  }

  SetDefaultImage(imageId, imageVersion): Observable<any> {
    return this.http.get(`${environment.baseApi}/set-default-image/${imageId}/${imageVersion}`);
  }

  ProfileNotifications(id): Observable<any> {
    return this.http.post(`${environment.baseApi}/user/view-profile`, { id });
  }

  ChangePassword(body): Observable<any> {
    return this.http.post(`${environment.baseApi}/change-password`, body);
  }

}
