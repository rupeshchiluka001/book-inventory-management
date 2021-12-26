import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewBookFormComponent } from './add-new-book-form/add-new-book-form.component';
import { EditBookFormComponent } from './edit-book-form/edit-book-form.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StoreHomeComponent } from './store-home/store-home.component';
import { StoreReadOnlyComponent } from './store-read-only/store-read-only.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'my-store', component: StoreHomeComponent },
  { path: 'store/:id', component: StoreReadOnlyComponent },
  { path: 'add-book', component: AddNewBookFormComponent },
  { path: 'edit-book/:id', component: EditBookFormComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
