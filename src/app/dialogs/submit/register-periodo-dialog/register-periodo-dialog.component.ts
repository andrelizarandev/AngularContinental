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
import { GetPeriodoData, PostPeriodoData, PutPeriodoData } from '../../../api/periodo/periodo.types';

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
  @Input() selectedPeriodo:GetPeriodoData | null = null;
  @Output() toggleOpenRegister = new EventEmitter();

  onShow () {
    if (this.isPostRequest) return;
    const { nombre, codigo, id } = this.selectedPeriodo!
    this.submitPeriodoForm.patchValue({ nombre, codigo });
  }

  // Services
  periodosService = inject(PeriodoService);

  // Forms
  submitPeriodoForm:FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    codigo: ['', Validators.required],
  });

  constructor(
    private fb:FormBuilder, 
    private store:Store,
  ) {}
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

    const { nombre, codigo } = this.submitPeriodoForm.value;

    const payload:PostPeriodoData | PutPeriodoData = (this.isPostRequest) 
      ? { nombre, codigo } as PostPeriodoData
      : { id: this.selectedPeriodo!.id, nombre, codigo } as PutPeriodoData;

    this.submitPostMutation.mutate(payload);

  }

}
