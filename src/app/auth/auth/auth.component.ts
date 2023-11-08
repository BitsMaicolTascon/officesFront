import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  private ipAddress: string = '';
  public form!: FormGroup;
  public errorAlert: boolean = false;
  public userInactive: boolean = false;
  public userIncorrect: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false, []]
    });

  }

  ngOnInit(): void {}

  public login(): void {
    this.authService.login(this.form.value.email, this.form.value.password).subscribe({
      next: (resp: any) => {
        if(!resp.success) {
          this.userIncorrect = true
          setTimeout(() => {
            this.userIncorrect = false;
          }, 4000);
        }
        this.setTokenInStorage(resp.token);
        this.router.navigate(['/home']);
      },
      error: (err: any) => {
        this.errorAlert = true;
        setTimeout(() => {
          this.errorAlert = false;
        }, 4000);
      }
    });
  }


  private setTokenInStorage(token: string): void {
    this.authService.setTokenAuth(token);
  }

}
