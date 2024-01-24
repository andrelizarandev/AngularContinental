// Modules
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Components
import { NavigationContainerComponent } from '../../components/navigation-container/navigation-container.component';

@Component({
  selector: 'app-submit-user-screen',
  standalone: true,
  imports: [ButtonModule, InputTextModule, NavigationContainerComponent, ReactiveFormsModule],
  templateUrl: './submit-user-screen.component.html',
  styleUrl: './submit-user-screen.component.scss'
})

export class SubmitUserScreenComponent {

  registerUserForm: FormGroup;

  constructor (private fb:FormBuilder) {

    this.registerUserForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correoInst: ['', Validators.required],
      correoPers: ['', Validators.required],
      telefono: ['', Validators.required],
      rol: ['', Validators.required],
    });

  }

}
