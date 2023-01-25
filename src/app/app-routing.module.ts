import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { AccountComponent } from './pages/account/account.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'account',
        component: AccountComponent,
      },
      {
        path: 'forbidden',
        component: UnauthorizedComponent,
      },
      {
        path: 'unauthorized',
        component: UnauthorizedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
