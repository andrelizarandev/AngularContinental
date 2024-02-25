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
import { postPeriodoSuccessMessage, putPeriodoSuccessMessage } from '../../../data/data.messages';

// Services
import { PeriodoService } from '../../../api/periodo/periodo.service';

// Types
import { PostPeriodoData, PutPeriodoData } from '../../../api/periodo/periodo.types';

@Component({
  selector: 'app-register-periodo-dialog',
  standalone: true,
  imports: [
    DialogModule, 
    ButtonModule, 
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-periodo-dialog.component.html',
  styleUrl: './register-periodo-dialog.component.scss'
})

export class RegisterPeriodoDialogComponent {

  // Params
  @Input() isPostRequest = true;
  @Input() isRegisterOpen = false;
  @Input() id:string | null = null;
  @Output() toggleOpenRegister = new EventEmitter();

  // Services
  periodosService = inject(PeriodoService);

  submitPeriodoForm:FormGroup;

  constructor(private fb:FormBuilder, private store:Store) {

    this.submitPeriodoForm = this.fb.group({
      nombre: ['', Validators.required],
    });

  }
  submitPostMutation = injectMutation((client) => ({

    mutationFn: (data:PostPeriodoData | PutPeriodoData) => {
      return (this.isPostRequest) 
        ? this.periodosService.postPeriodoApi(data as PostPeriodoData) 
        : this.periodosService.putPeriodoApi(data as PutPeriodoData);
    },

    onSuccess: () =>  {
      
      this.submitPeriodoForm.reset();

      this.closeRegister();

      client.invalidateQueries({ queryKey:['get-periodos'] });

      (this.isPostRequest) 
        ? this.store.dispatch(setMessageFromUiDataAction({ message:postPeriodoSuccessMessage }))
        : this.store.dispatch(setMessageFromUiDataAction({ message:putPeriodoSuccessMessage }));

    }

  }));
  
  closeRegister () {
    this.toggleOpenRegister.emit();
  }

  startSubmitPeriodo () {

    const { nombre  } = this.submitPeriodoForm.value;

    const payload:PostPeriodoData | PutPeriodoData = (this.isPostRequest) 
      ? { nombre } as PostPeriodoData
      : { id: this.id, nombre: nombre } as PutPeriodoData;

    this.submitPostMutation.mutate(payload);

  }

}
