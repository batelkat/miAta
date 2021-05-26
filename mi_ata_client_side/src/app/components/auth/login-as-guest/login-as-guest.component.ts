import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';
import { AuthService } from '../auth.service';
import { Nation } from '../../../provider/models/nation.model';
import { Religion } from '../../../provider/models/religion.model';
import { userType } from '../models/user-type.model';
import { SelectService } from 'src/app/provider/services/select.service';

@Component({
  selector: 'app-login-as-guest',
  templateUrl: './login-as-guest.component.html',
  styleUrls: ['./login-as-guest.component.scss']
})
export class LoginAsGuestComponent implements OnInit {

  guestLoginForm: FormGroup;
  selectedNation: Nation = null;
  nations: Nation[];
  religions: Religion[];
  userType: userType[];

  showSpinner = false;
  errorMessage: string;


  constructor(
    private fb: FormBuilder,
    private selectService: SelectService,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.initData();
    this.initForm();

  }

  initData() {
    this.selectService.getAllNation().subscribe((result) => {
      this.nations = result ? result.nations.splice(0,2) : [];
    });
  }

  initForm() {
    this.guestLoginForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2), this.authService.checkForBadWords()]],
      nation: [null, [Validators.required]],
      religion: ['', [Validators.required]],
      userType: ['אורח']
    });

    this.guestLoginForm.controls.nation.valueChanges.subscribe((value: Nation) => {
      this.selectedNation = value;
      this.religions = this.selectedNation.religion;
    });
  }


  guestLogin() {
    this.showSpinner = true;
    // this.guestLoginForm.controls.nation.setValue(this.guestLoginForm.controls.nation.value._id);

    const loginAsGuest: any = {
      username: this.guestLoginForm.controls.username.value,
      nation: this.guestLoginForm.controls.nation.value._id,
      religion: this.guestLoginForm.controls.religion.value,
      userType: this.guestLoginForm.controls.userType.value
    };

    this.authService.loginAsGuest(loginAsGuest).subscribe(
      data => {
        this.tokenService.SetToken(data.token);
        this.authService.setLogonUserDetails(data.user._id);
        this.guestLoginForm.reset();
        setTimeout(() => {
          this.router.navigate(['people']);
        }, 3000);
      },
      err => {
        this.showSpinner = false;

        if (err.error.message) {
          this.errorMessage = err.error.message;
        }
      }
    );
    this.showSpinner = false;

  }
}
