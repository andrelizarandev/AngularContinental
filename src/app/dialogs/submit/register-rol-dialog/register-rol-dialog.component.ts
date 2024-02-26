// Modules
import { Store } from '@ngrx/store';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Actions
import { setMessageFromUiDataAction } from '../../../state/actions/ui-actions';

// Messages
import { postRolSuccessMessage } from '../../../data/data.messages';

// Services
import { RolesService } from '../../../api/roles/roles.service';

// Types
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

  // Forms
  submitRolForm:FormGroup;

  // Queries
  submitRolMutation = injectMutation((client) => ({

    mutationFn: (data:PostRoleData | PutRoleData) => (this.isPostRequest) 
      ? this.rolesServices.postRol(data as PostRoleData) 
      : this.rolesServices.putRolApi(data as PutRoleData),

    onSuccess: () => {
      this.submitRolForm.enable();
      this.closeRegisterDialog();
      client.invalidateQueries({ queryKey:['get-roles'] });
      this.store.dispatch(setMessageFromUiDataAction({ message:postRolSuccessMessage }));
    },

    onError: () => {
      this.submitRolForm.enable();
    }

  }));

  onShow () {
    if (!this.isPostRequest) {
      const { nombre } = this.selectedRol!;
      this.submitRolForm.setValue({ nombre });
    }
  }

  // Close
  closeRegisterDialog () {
    this.submitRolForm.reset();
    this.toggleOpenRegister.emit();
  }

  constructor (private fb:FormBuilder, private store:Store) {

    this.submitRolForm = this.fb.group({
      nombre:['', Validators.required]
    });

  }

  // Start
  startSubmitRol () {
    this.submitRolForm.disable();
    const { nombre } = this.submitRolForm.value;
    const payload: PostRoleData | PutRoleData = (this.isPostRequest) 
      ? { nombre } 
      : { id: this.selectedRol?.id , nombre };
    this.submitRolMutation.mutate(payload);
  }

}
