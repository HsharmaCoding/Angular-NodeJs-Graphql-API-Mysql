import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { UserComponent } from './user/user.component';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { ViewuserComponent } from './viewuser/viewuser.component';

const routes: Routes = [
  {path:'',redirectTo:'userlist', pathMatch:'full'},
  {path:'userlist',component:UserlistComponent},
  {path:'create',component:UserComponent},
  {path:'update/:id',component:UserComponent}, 
  {path:'view/:id',component:ViewuserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
