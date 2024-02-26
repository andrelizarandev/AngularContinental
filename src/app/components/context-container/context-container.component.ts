// Modules
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Component, inject } from '@angular/core';
import { injectMutation } from '@tanstack/angular-query-experimental';

// Actions
import { setUserDataAction } from '../../state/actions/login.actions';

// Components
import { ConfirmDialogComponent } from '../../dialogs/shared/confirm-dialog/confirm-dialog.component';

// Selectors
import { messageSelector } from '../../state/selectors/ui.selector';
import { loginSelectorUser } from '../../state/selectors/login.selector';

// Services
import { LoginService } from '../../api/login/login.service';

// Texts
import { continentalToken } from '../../data/data.texts';

@Component({
  selector: 'app-context-container',
  standalone: true,
  imports: [
    ToastModule,
    ConfirmDialogComponent
  ],
  providers: [MessageService],
  templateUrl: './context-container.component.html',
  styleUrl: './context-container.component.scss'
})
export class ContextContainerComponent {

  // Injects
  store = inject(Store);
  loginService = inject(LoginService);

  validateTokenMutation = injectMutation(() => ({

    mutationFn: () => this.loginService.validateTokenApi(),

    onSuccess: (data) =>  {
      this.store.dispatch(setUserDataAction({ user:data.user }));
      localStorage.setItem(continentalToken, data.accessToken);
    },

    onError: () => {
      this.router.navigate(['/login']);
    }

  }));

  constructor (private messageService: MessageService, private router:Router) {

    this.store.pipe(select(messageSelector)).subscribe((message) => {
      if (message) this.messageService.add({ 
        severity:message.type,
        summary:message.message,
        detail:message.body
      });
    });

    this.store.pipe(select(loginSelectorUser)).subscribe((user) => {

      // if (!user) this.validateTokenMutation.mutate();
      
    });

  }



}
