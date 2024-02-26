// Modules
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RolesService } from '../../../api/roles/roles.service';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { GetRoleData, PostRoleData, PutRoleData } from '../../../api/roles/roles.types';

@Component({
  selector: 'app-register-rol-dialog',
  standalone: true,
  imports: [
    DialogModule, 
    ButtonModule, 
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-rol-dialog.component.html',
  styleUrl: './register-rol-dialog.component.scss'
})

export class RegisterRolDialogComponent {

  @Input() isPostRequest = true;
  @Input() isRegisterOpen = false;
  @Input() selectedRol:GetRoleData | null = null;
  @Output() toggleOpenRegister = new EventEmitter();

  // Inject
  rolesServices = inject(RolesService);

  submitRolMutation = injectMutation(() => ({
    mutationFn: (data:PostRoleData | PutRoleData) => (this.isPostRequest) 
      ? this.rolesServices.postRol(data as PostRoleData) 
      : this.rolesServices.putRolApi(data as PutRoleData),
  }))

  submitRolForm:FormGroup;

  closeRegisterDialog () {
    this.toggleOpenRegister.emit();
  }

  constructor (private fb:FormBuilder) {
    this.submitRolForm = this.fb.group({
      nombre:['', Validators.required]
    });
  }

  startSubmitRol () {

    const { nombre } = this.submitRolForm.value;

    const payload: PostRoleData | PutRoleData = (this.isPostRequest) 

      ? { nombre } 

      : { id: this.selectedRol?.id , nombre };

    this.submitRolMutation.mutate(payload);

  }

}
