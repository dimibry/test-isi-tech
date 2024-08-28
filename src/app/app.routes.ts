import { Routes } from '@angular/router';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { NotAuthorizedComponent } from './erros/not-authorized/not-authorized.component';
import { NotFoundComponent } from './erros/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: UserListComponent
      },
      {
        path: '403',
        component: NotAuthorizedComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
];
