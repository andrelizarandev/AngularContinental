// Modules
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Actions
import { setUserDataAction } from '../../../state/actions/login.actions';

// Services
import { LoginService } from '../../../api/login/login.service';

// Types
import { GetUser, PostLoginResponse } from '../../../api/login/login.types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule, 
    InputTextModule, 
    CardModule, 
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  loginForm: FormGroup;

  private store = inject(Store);

  constructor (
    private fb:FormBuilder,
    private loginService:LoginService,
    private router:Router
  ) {

    this.loginForm = this.fb.group({
      correo: ['demo@gmail.com', Validators.required],
      contrasena: ['Continental321', Validators.required],
    });

  }
  

  onSubmitLogin () {

    this.loginForm.disable();

    this.loginService
      .createPost(this.loginForm.value)
      .subscribe({ 
        next:(response) => this.onSuccessSubmitLogin(response),
        error:(err) => this.onErrorSubmitLogin(err)
    });

  }

  onSuccessSubmitLogin (response:PostLoginResponse) {
    this.store.dispatch(setUserDataAction({ user:demoUserData }));
    localStorage.setItem('continental-token', response.token);
    this.router.navigate(['/users']);
  }

  onErrorSubmitLogin (error:any) {
    this.loginForm.enable();
  }

}

const demoUserData:GetUser = {
  id:'1',
  nombre:'Demo',
  apellido:'Demo demo',
  correo:'demo@gmail.com',
}