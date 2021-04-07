import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectService } from 'src/app/provider/services/select.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';
import { Nation } from 'src/app/provider/models/nation.model';
import { Religion } from 'src/app/provider/models/religion.model';
import { userType } from '../models/user-type.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  selectedNation: Nation;
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
    this.selectService.getAllNation().subscribe((result: Nation[]) => {
      // debugger
      result ? result.splice(result.length-1,1) : null;
      this.nations = result;
    });
  }



  initForm() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(2), this.authService.checkForBadWords()]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      nation: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      userType: ['רשום']
    });
    this.signupForm.controls.nation.valueChanges.subscribe((value: Nation) => {
      this.selectedNation = value;
      this.religions = this.selectedNation.religion;
    });
  }

  signup() {
    this.showSpinner = true;

    const signupValue: any = {
      username: this.signupForm.controls.username.value,
      email: this.signupForm.controls.email.value,
      password: this.signupForm.controls.password.value,
      nation: this.signupForm.controls.nation.value._id,
      religion: this.signupForm.controls.religion.value,
      userType: this.signupForm.controls.userType.value
    };

    this.authService.registerUser(signupValue).subscribe(
      data => {
        this.tokenService.SetToken(data.token);
        this.authService.setLogonUserDetails(data.user._id);
        this.signupForm.reset();
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
