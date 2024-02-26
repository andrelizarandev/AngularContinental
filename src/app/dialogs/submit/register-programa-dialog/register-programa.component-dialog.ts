// Modules
import { Store } from '@ngrx/store';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { AfterViewInit, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Actions
import { setMessageFromUiDataAction } from '../../../state/actions/ui-actions';

// Messages
import { 
  postProgramaErrorMessage, 
  postProgramaSuccessMessage, 
  putProgramaErrorMessage, 
  putProgramaSuccessMessage
} from '../../../data/data.messages';

// Services
import { ProgramasService } from '../../../api/programas/programas.service';

// Types
import { GetProgramaData, PostProgramaData, PutProgramaData } from '../../../api/programas/programas.types';

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
  @Input() isPostRequest = true;
  @Input() isRegisterOpen = true;
  @Input() selectedPrograma:GetProgramaData | null = null;
  @Output() toggleOpenRegister = new EventEmitter();

  // Forms
  submitProgramaForm:FormGroup;

  // Services
  programasService = inject(ProgramasService);

  constructor (private store:Store, private fb:FormBuilder) {
    this.submitProgramaForm = this.fb.group({
      nombre: ['', Validators.required],
      codigo: ['', Validators.required],
    });
  }

  onShow () {
    if (this.isPostRequest) return;
    const { nombre, codigo } = this.selectedPrograma!
    this.submitProgramaForm.patchValue({ nombre, codigo });
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

    const { nombre, codigo } = this.submitProgramaForm.value;
    
    const payload:PostProgramaData | PutProgramaData = (this.isPostRequest)
      ? { nombre, codigo } as PostProgramaData
      : { nombre, id:Number(this.selectedPrograma!.id), codigo } as PutProgramaData;

    this.submitProgramaMutation.mutate(payload);

  }

  closeRegisterDialog () {
    this.submitProgramaForm.reset();
    this.toggleOpenRegister.emit();
  }

}
