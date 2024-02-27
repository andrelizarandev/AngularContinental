// Modules
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { injectMutation } from '@tanstack/angular-query-experimental';

// Actions
import { setUserDataAction } from '../../../state/actions/login.actions';
import { setMessageFromUiDataAction } from '../../../state/actions/ui-actions';

// Components
import { ContextContainerComponent } from '../../../components/context-container/context-container.component';

// Messages
import { postLoginErrorMessage, postLoginSuccessMessage } from '../../../data/data.messages';

// Services
import { LoginService } from '../../../api/login/login.service';

// Texts
import { continentalToken } from '../../../data/data.texts';

// Types
import { PostLoginData } from '../../../api/login/login.types';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule, 
    InputTextModule, 
    CardModule, 
    ReactiveFormsModule,
    ContextContainerComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  // Forms
  loginForm:FormGroup;
  loginService = inject(LoginService);

  loginMutation = injectMutation(() => ({

    mutationFn: (data:PostLoginData) => this.loginService.loginApi(data),

    onSuccess: (response) => {
      this.loginForm.enable();
      this.store.dispatch(setUserDataAction({ user:response.user }));
      this.store.dispatch(setMessageFromUiDataAction({ message:postLoginSuccessMessage }));
      localStorage.setItem(continentalToken, response.accessToken);
      this.router.navigate(['/home']);
    },

    onError: () => {
      this.loginForm.enable();
      this.store.dispatch(setMessageFromUiDataAction({ message:postLoginErrorMessage }));
    }

  }));

  constructor (
    private fb:FormBuilder,
    private router:Router,
    private store:Store
  ) {

    this.loginForm = this.fb.group({
      email: ['alan@gmail.com', Validators.required],
      password: ['12345678', Validators.required],
    });

  }

  onSubmitLogin () {
    this.loginForm.disable();
    const formValue = this.loginForm.value;
    this.loginMutation.mutate({ email:formValue.email, password:formValue.password });
  }

}