import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../token.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-auth-tabs',
  templateUrl: './auth-tabs.component.html',
  styleUrls: ['./auth-tabs.component.scss']
})
export class AuthTabsComponent implements OnInit {

  constructor(private router: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    const token = this.tokenService.GetToken();
    if (token) {
      this.router.navigate(['people']);
    } else {
      this.router.navigate(['auth']);
    }
  }

}
