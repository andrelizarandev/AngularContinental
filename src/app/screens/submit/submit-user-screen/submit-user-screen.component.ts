// Modules
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Components
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Types
import { PostUserData, PostUserResponse } from '../../../api/users/users.types';

@Component({
  selector: 'app-submit-user-screen',
  standalone: true,
  imports: [
    ButtonModule, 
    InputTextModule, 
    NavigationContainerComponent, 
    ReactiveFormsModule, 
    DropdownModule,
    CardWithSkeletonComponent
  ],
  templateUrl: './submit-user-screen.component.html',
  styleUrl: './submit-user-screen.component.scss'
})

export class SubmitUserScreenComponent {

  registerUserForm: FormGroup

  constructor (
    private fb:FormBuilder, 
    private router:Router
  ) {

    this.registerUserForm = this.fb.group({
      nombres: ['Andre', Validators.required],
      apellidos: ['Lizaran', Validators.required],
      correoInst: ['andrelizaran@continental.com', Validators.required],
      correoPers: ['andrelizaran@gmail.com', Validators.required],
      contrasena: ['1234567890', Validators.required],
      rol: ['1', Validators.required],
    });

  }

  onRedirectToUsersTable () {
    this.router.navigate(['/users']);
  }

  onSubmitUser () {

    const { 
      nombres, 
      apellidos, 
      correoInst, 
      correoPers, 
      contrasena, 
      rol 
    } = this.registerUserForm.value;

    const userPayload:PostUserData = {
      apellidos,
      email:correoInst,
      email_personal:correoPers,
      nombres,
      password:contrasena,
      rol
    }

  }

  onSuccessSubmitUser (response:PostUserResponse) {
    this.onRedirectToUsersTable();
  }

  onErrorSubmit () {}

}