// Modules
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { injectMutation, injectQuery } from '@tanstack/angular-query-experimental';

// Actions
import { setMessageFromUiDataAction } from '../../../state/actions/ui-actions';

// Components
import { CardWithSkeletonComponent } from '../../../components/card-with-skeleton/card-with-skeleton.component';
import { NavigationContainerComponent } from '../../../components/navigation-container/navigation-container.component';

// Messages
import { postUserErrorMessage, postUserSuccessMessage } from '../../../data/data.messages';

// Services
import { UsersService } from '../../../api/users/users.service';
import { RolesService } from '../../../api/roles/roles.service';

// Types
import { PostUserData } from '../../../api/users/users.types';
import { OptionDataIdNumber } from '../submit-solicitud-diseno-screen/submit-solicitud-diseno-curso.component';

@Component({
  selector: 'app-submit-user-screen',
  standalone: true,
  imports: [
    ButtonModule, 
    InputTextModule, 
    NavigationContainerComponent, 
    ReactiveFormsModule, 
    DropdownModule,
    CardWithSkeletonComponent
  ],
  templateUrl: './submit-user-screen.component.html',
  styleUrl: './submit-user-screen.component.scss'
})

export class SubmitUserScreenComponent {

  // Inject
  rolServices = inject(RolesService);
  userServices = inject(UsersService);
  
  // Forms
  registerUserForm = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    correoInst: ['', Validators.required],
    correoPers: ['', Validators.required],
    contrasena: ['', Validators.required],
    rol: [null as OptionDataIdNumber | null, Validators.required],
  });

  constructor (
    private fb:FormBuilder, 
    private router:Router, 
    private store:Store, 
    private activatedRoute:ActivatedRoute
  ) {}

  // Queries
  getRolesQuery = injectQuery(() => ({
    queryKey:['get-roles'],
    queryFn: () => this.rolServices.getRolesApi()
  }));

  submitUserMutation = injectMutation(() => ({

    mutationFn: (data:PostUserData) => this.userServices.submitUser(data),

    onSuccess: () => {
      this.store.dispatch(setMessageFromUiDataAction({ message:postUserSuccessMessage }));
      this.registerUserForm.enable();
      this.redirectToUsersTable();
    },

    onError: () => {
      this.store.dispatch(setMessageFromUiDataAction({ message:postUserErrorMessage }));
      this.registerUserForm.enable();
    }

  }));

  // Get
  getRolesOptions () {
    const result = this.getRolesQuery.data();
    if (!result) return [];
    const options:OptionDataIdNumber[] = result.map(({ id, nombre }) => ({ label:nombre, id:Number(id) }));
    return options;
  }

  // Redirect
  redirectToUsersTable () {
    this.router.navigate(['/users']);
  }
  
  // Start
  startSubmitUser () {

    const { nombres, apellidos, correoInst, correoPers, contrasena, rol } = this.registerUserForm.value;

    const userPayload:PostUserData = {
      apellidos:apellidos!,
      email:correoInst!,
      email_personal:correoPers!,
      nombres:nombres!,
      password:contrasena!,
      rol:rol!.id
    }

    this.registerUserForm.disable();

    this.submitUserMutation.mutate(userPayload);

  }

}