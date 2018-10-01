import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';
import {UpdateProductComponent} from './update-product/update-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },
  { path: 'product-list', component: ProductListComponent },
  { path: 'update-product', component: UpdateProductComponent },
];

@NgModule({
  exports: [ RouterModule ],
  declarations: [],
  imports: [ RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
