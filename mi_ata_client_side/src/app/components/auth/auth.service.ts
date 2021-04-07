import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppConfig } from 'src/app/provider/configuration/api';
import { User } from 'src/app/provider/models/user.model';
import { ConfigurationService } from 'src/app/provider/services/configuration.service';
import { UsersService } from 'src/app/provider/services/users.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logonUserLocalStorageName = 'mi-ata-app.logonUserDetails';
  public loggedInUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  badWords: string[] = ['חרא','מניאק','בן זונה','בנזונה','כלבה','חמור'
  ,'זבל','זונה','בת כלבה','בן כלבה','בתזונה','בת זונה','שרמוטה','בן שרמוטה','כוס','כוסעמק','זין']

  constructor(
    private http: HttpClient,
    private configService: ConfigurationService,
    private usersService: UsersService
  ) { }

  registerUser(body): Observable<any> {
    const apiAddress = this.configService.getApiEndPoint(AppConfig.api.registerNew);

    return this.http.post(apiAddress, body);
  }

  loginAsGuest(body): Observable<any> {
    const apiAddress = this.configService.getApiEndPoint(AppConfig.api.loginAsGuest);

    return this.http.post(apiAddress, body);
  }

  loginUser(body): Observable<any> {
    const apiAddress = this.configService.getApiEndPoint(AppConfig.api.login);

    return this.http.post<{ message: string, result: User }>(apiAddress, body);
  }

  setLogonUserDetails(id: string) {
    this.usersService.GetUserById(id).subscribe(user => {
      this.loggedInUserSubject.next(user.result);
      localStorage.setItem(this.logonUserLocalStorageName, JSON.stringify(user.result));
    });
  }

  setLoginAsAdmin(user: User) {
    this.loggedInUserSubject.next(user);
    localStorage.setItem(this.logonUserLocalStorageName, JSON.stringify(user));
  }

  getLogonUserDetailsSync() {
    const localStorageData = localStorage.getItem(this.logonUserLocalStorageName);
    if (localStorageData) {
      return JSON.parse(localStorageData);
    }
    return [];
  }

  getLogonUserDetails(): Observable<User> {
    this.loggedInUserSubject.next(this.getLogonUserDetailsSync());
    return this.loggedInUserSubject.asObservable();
  }

  resetLogonUserDetails() {
    localStorage.removeItem(this.logonUserLocalStorageName);
    this.loggedInUserSubject.next(null);
  }

  checkForBadWords(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean | null } => {
      return (this.badWords.includes((control.value))) ?
        {
          validateBadNameName: true
        } :
        null;
    }
  }

}
