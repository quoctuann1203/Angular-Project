import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ContainerComponent } from './container/container.component';
import { HomeComponent } from './home/home.component';
import { InsertNodeComponent } from './insert-node/insert-node.component';
import { InsertUserComponent } from './insert-user/insert-user.component';
import { LoginComponent } from './login/login.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ProductNodeComponent } from './product-node/product-node.component';
import { RegisterComponent } from './register/register.component';
import { TableUserComponent } from './table-user/table-user.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  // {
  //   path:"login",
  //   component: LoginComponent
  // },
  // {
  //   path:"products",
  //   component: TableComponent
  // },
  // {
  //   path:"login",
  //   component: LoginComponent
  // },
  // {
  //   path:"register",
  //   component: RegisterComponent
  // },
  // {
  //   path:"table-user",
  //   component: TableUserComponent
  // },
  // {
  //   path:"products-node",
  //   component: ProductNodeComponent,
  //   pathMatch: 'full'
  // },
  // {
  //   path:"products/product-insert",
  //   component: InsertNodeComponent,
  //   pathMatch: 'full'
  // },
  // {
  //   path:"products/product-insert/:id",
  //   component: InsertNodeComponent,
  //   pathMatch: 'full'
  // },
  // {
  //   path:"table-user/user-insert",
  //   component: InsertUserComponent,
  //   pathMatch: 'full'
  // },
  // {
  //   path:"table-user/user-insert/:id",
  //   component: InsertUserComponent,
  //   pathMatch: 'full'
  // },

  // {
  //   path:"",
  //   component: MainContentComponent
  // }
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'admin',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MainContentComponent,
      },
      { path: 'products', component: TableComponent },
      {
        path: 'table-user',
        component: TableUserComponent,
      },
      {
        path: 'products-node',
        component: ProductNodeComponent,
        pathMatch: 'full',
      },
      {
        path: 'products/product-insert',
        component: InsertNodeComponent,
        pathMatch: 'full',
      },
      {
        path: 'products/product-insert/:id',
        component: InsertNodeComponent,
        pathMatch: 'full',
      },
      {
        path: 'table-user/user-insert',
        component: InsertUserComponent,
        pathMatch: 'full',
      },
      {
        path: 'table-user/user-insert/:id',
        component: InsertUserComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
