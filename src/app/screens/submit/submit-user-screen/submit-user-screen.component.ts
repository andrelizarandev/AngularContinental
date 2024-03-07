// Modules
import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
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
import { 
  formErrorMessage, 
  getUserByIdSuccessMessage, 
  postUserErrorMessage, 
  postUserSuccessMessage, 
  putUserErrorMessage, 
  putUserSuccessMessage
} from '../../../data/data.messages';

// Services
import { UsersService } from '../../../api/users/users.service';
import { RolesService } from '../../../api/roles/roles.service';

// Types
import { PostUserData, PutUserData } from '../../../api/users/users.types';
import { OptionDataIdNumber } from '../submit-solicitud-diseno-screen/submit-solicitud-diseno-curso.component';

@Component({
  selector: 'app-submit-user-screen',
  standalone: true,
  imports: [
    ButtonModule, 
    InputTextModule, 
    NavigationContainerComponent, 
    ReactiveFormsModule, 
    CheckboxModule,
    DropdownModule,
    CardWithSkeletonComponent,
  ],
  templateUrl: './submit-user-screen.component.html',
  styleUrl: './submit-user-screen.component.scss'
})

export class SubmitUserScreenComponent {

  // Inject
  rolServices = inject(RolesService);
  userServices = inject(UsersService);

  // Vars
  isPasswordVisible = true;
  currentId = this.activatedRoute.snapshot.params['id'];
  
  // Forms
  registerUserForm = this.fb.group({

    nombres: ['', Validators.required],

    apellidos: ['', Validators.required],

    correoInst: ['', [Validators.required, Validators.email]],

    correoPers: ['', [Validators.required, Validators.email]],

    documento_identidad: [''],

    contrasena: (this.currentId === '0') ? ['', Validators.required] : [null],

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

    queryFn: async () => {

      try {

        const result = await this.rolServices.getRolesApi();

        if (this.currentId !== '0') this.getUserByIdQuery.refetch();

        return result;

      } catch (err:any) {

        return null;

      }

    }

  }));

  getUserByIdQuery = injectQuery(() => ({ 

    queryKey:['get-user-by-id', this.currentId],

    queryFn: async () => {

      try {

        const result = await this.userServices.getUserByIdApi(this.activatedRoute.snapshot.params['id']);

        const { 
          apellidos, 
          email, 
          email_personal, 
          nombres, 
          rol,
          documento_identidad
        } = result.data;
      
        const currentRole = this.getRolesOptions().find(({ id }) => id === rol) || null

        this.registerUserForm.patchValue({ 
          apellidos, 
          correoInst:email, 
          correoPers:email_personal, 
          nombres,
          rol:currentRole,
          documento_identidad
        });

        this.store.dispatch(setMessageFromUiDataAction({ message:getUserByIdSuccessMessage }));


        return result;

      } catch (err:any) {

        return null;

      }

    },

    enabled:false

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

  putUserMutation = injectMutation(() => ({

    mutationFn: (data:PutUserData) => this.userServices.putUserApi(data),

    onSuccess: () => {
      this.store.dispatch(setMessageFromUiDataAction({ message:putUserSuccessMessage }));
      this.registerUserForm.enable();
      this.redirectToUsersTable();
    },

    onError: () => {
      this.store.dispatch(setMessageFromUiDataAction({ message:putUserErrorMessage }));
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

    if (this.registerUserForm.invalid)  
      return this.store.dispatch(setMessageFromUiDataAction({ message:formErrorMessage }));

    const { 
      nombres, 
      apellidos, 
      correoInst, 
      correoPers, 
      contrasena, 
      rol,
      documento_identidad
    } = this.registerUserForm.value;

    this.registerUserForm.disable();

    const userPayload:PostUserData = {
      apellidos:apellidos!,
      email:correoInst!,
      email_personal:correoPers!,
      nombres:nombres!,
      password:contrasena!,
      rol:rol!.id,
      documento_identidad:documento_identidad!
    }

    if (this.currentId === '0') {

      this.submitUserMutation.mutate(userPayload);

    } else {

      const { password, ...restUser } = userPayload

      const putPayload:PutUserData = {
        ...restUser,
        id_usuario:Number(this.currentId)
      }

      this.putUserMutation.mutate(putPayload);

    }

  }
  
  // Toggle
  togglePasswordVisibility = () => {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

}