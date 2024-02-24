// Modules
import { Store } from '@ngrx/store';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { injectMutation } from '@tanstack/angular-query-experimental';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

// Actions
import { setMessageFromUiDataAction } from '../../../state/actions/ui-actions';

// Messages
import { postProgramaErrorMessage, postProgramaSuccessMessage } from '../../../data/data.messages';

// Services
import { ProgramasService } from '../../../api/programas/programas.service';

// Types
import { PostProgramaData } from '../../../api/programas/programas.types';

@Component({
  selector: 'app-register-programa-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule],
  templateUrl: './register-programa.component-dialog.html',
  styleUrl: './register-programa.component-dialog.scss'
})

export class RegisterProgramaComponentDialog {

  // Params
  @Input() isRegisterOpen: boolean = true;
  @Output() toggleOpenRegister = new EventEmitter();

  // Services
  programasService = inject(ProgramasService);

  constructor (private store:Store) {}

  submitProgramaMutation = injectMutation((client) => ({
    mutationFn:(data:PostProgramaData) => this.programasService.submitProgramaApi(data),
    onSuccess:() => {
      this.closeRegisterDialog();
      client.invalidateQueries({ queryKey:['get-programas'] });
      this.store.dispatch(setMessageFromUiDataAction({ message:postProgramaSuccessMessage }));
    },
    onError:() => {
      this.store.dispatch(setMessageFromUiDataAction({ message:postProgramaErrorMessage }));
    }
  }));

  closeRegisterDialog () {
    this.toggleOpenRegister.emit();
  }

}
