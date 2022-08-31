import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/guard/auth.guard';
import { LoginResolverService } from '../services/login-resolver.service';
import { UserResolverResolver } from '../services/user-resolver.resolver';
import { ViewProjectResolver } from '../services/view-project.resolver';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'Home',
        children: [{
          path: '',
          loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
        }
        ]
      },
      {
        path: 'mydashboard',
        children:[{
          path:'',
          loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
        },
        {
          path: 'view-project/:id',
          loadChildren: () => import('../view-project/view-project.module').then(m => m.ViewProjectPageModule),
          resolve:{project:ViewProjectResolver,user:UserResolverResolver}
        }
      ]
       
      },
      {
        path: 'Account',
        children: [
          {
            path: '',
            loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          },
          {
            path: 'add-user',
            loadChildren: () => import('../add-user/add-user.module').then(m => m.AddUserPageModule)
          },
          {
            path: 'assign-tasks',
            loadChildren: () => import('../assign-tasks/assign-tasks.module').then(m => m.AssignTasksPageModule)
          }
        ],

        resolve: { login: LoginResolverService }
      },
      {
        path: 'signup',
        loadChildren: () => import('../signup/signup.module').then(m => m.SignupPageModule)
      },
      {
        path: 'signin',
        loadChildren: () => import('../signin/signin.module').then(m => m.SigninPageModule),
      },

      {
        path: 'add-project',
        loadChildren: () => import('../add-project/add-project.module').then(m => m.AddProjectPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/Home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/Home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
