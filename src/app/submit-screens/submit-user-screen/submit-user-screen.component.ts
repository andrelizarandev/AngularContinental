// Modules
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Components
import { NavigationContainerComponent } from '../../components/navigation-container/navigation-container.component';

// Services
import { UsersService } from '../../api/users/users.service';

// Types
import { PostUserResponse } from '../../api/users/users.types';

@Component({
  selector: 'app-submit-user-screen',
  standalone: true,
  imports: [
    ButtonModule, 
    InputTextModule, 
    NavigationContainerComponent, 
    ReactiveFormsModule, 
    DropdownModule
  ],
  templateUrl: './submit-user-screen.component.html',
  styleUrl: './submit-user-screen.component.scss'
})

export class SubmitUserScreenComponent {

  registerUserForm: FormGroup;

  rolOptions = []

  constructor (
    private fb:FormBuilder,
    private userService:UsersService
  ) {

    this.registerUserForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correoInst: ['', Validators.required],
      correoPers: ['', Validators.required],
      telefono: ['', Validators.required],
      rol: ['', Validators.required],
    });

  }

  onSubmitUser () {
    this.userService.createUser(this.registerUserForm.value).subscribe({
      next:(response) => this.onSuccessSubmitUser(response),
      error:() => this.onErrorSubmit()
    });
  }

  onSuccessSubmitUser (response:PostUserResponse) {}

  onErrorSubmit () {}

}
