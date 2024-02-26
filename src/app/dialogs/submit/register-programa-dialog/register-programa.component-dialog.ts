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
import { postProgramaErrorMessage, postProgramaSuccessMessage, putProgramaErrorMessage, putProgramaSuccessMessage } from '../../../data/data.messages';

// Services
import { ProgramasService } from '../../../api/programas/programas.service';

// Types
import { PostProgramaData, PutProgramaData } from '../../../api/programas/programas.types';

@Component({
  selector: 'app-register-programa-dialog',
  standalone: true,
  imports: [
    DialogModule, 
    InputTextModule, 
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-programa.component-dialog.html',
  styleUrl: './register-programa.component-dialog.scss'
})

export class RegisterProgramaComponentDialog {

  // Params
  @Input() id:string | null = null;
  @Input() isPostRequest = true;
  @Input() isRegisterOpen = true;
  @Output() toggleOpenRegister = new EventEmitter();

  submitProgramaForm:FormGroup;

  // Services
  programasService = inject(ProgramasService);

  constructor (private store:Store, private fb:FormBuilder) {
    this.submitProgramaForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  submitProgramaMutation = injectMutation((client) => ({

    mutationFn:(data:PostProgramaData | PutProgramaData) => {
      return (this.isPostRequest) 
        ? this.programasService.postProgramaApi(data as PostProgramaData) 
        : this.programasService.putProgramaApi(data as PutProgramaData);
    },

    onSuccess:() => {

      this.submitProgramaForm.reset();

      this.closeRegisterDialog();

      client.invalidateQueries({ queryKey:['get-programas'] });

      (this.isPostRequest)
        ? this.store.dispatch(setMessageFromUiDataAction({ message:postProgramaSuccessMessage }))
        : this.store.dispatch(setMessageFromUiDataAction({ message:putProgramaSuccessMessage }));

    },

    onError:() => {

      (this.isPostRequest)
        ? this.store.dispatch(setMessageFromUiDataAction({ message:postProgramaErrorMessage }))
        : this.store.dispatch(setMessageFromUiDataAction({ message:putProgramaErrorMessage }));

    }

  }));

  startSubmitPrograma () {

    const { nombre } = this.submitProgramaForm.value;
    
    const payload:PostProgramaData | PutProgramaData = (this.isPostRequest)
      ? { nombre } as PostProgramaData
      : { nombre, id:Number(this.id) } as PutProgramaData;

    this.submitProgramaMutation.mutate(payload);

  }

  closeRegisterDialog () {
    this.toggleOpenRegister.emit();
  }

}
