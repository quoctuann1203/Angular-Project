import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsertNodeComponent } from './insert-node/insert-node.component';
import { LoginComponent } from './login/login.component';
import { MainContentComponent } from './main-content/main-content.component';
import { ProductNodeComponent } from './product-node/product-node.component';
import { RegisterComponent } from './register/register.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"products",
    component: TableComponent
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"register",
    component: RegisterComponent
  },
  {
    path:"products-node",
    component: ProductNodeComponent,
    pathMatch: 'full'
  },
  {
    path:"products/product-insert",
    component: InsertNodeComponent,
    pathMatch: 'full'
  },
  {
    path:"products/product-insert/:id",
    component: InsertNodeComponent,
    pathMatch: 'full'
  },

  {
    path:"",
    component: MainContentComponent
  }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
