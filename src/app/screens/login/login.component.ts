// Modules
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { LoginService } from '../../api/login/login.service';

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

  constructor (
    private fb:FormBuilder,
    private loginService:LoginService
  ) {

    this.loginForm = this.fb.group({
      correo: ['demo@gmail.com', Validators.required],
      contrasena: ['Continental321', Validators.required],
    });

  }

  onSubmitLogin () {

    this.loginForm.disable();

    this.loginService.createPost(this.loginForm.value).subscribe((result) => {})

    this.loginForm.enable();

  }

}
