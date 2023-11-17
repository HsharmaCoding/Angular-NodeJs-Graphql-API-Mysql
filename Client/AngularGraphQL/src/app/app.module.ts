import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserlistComponent } from './userlist/userlist.component';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'    // <--- this
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache } from '@apollo/client/core'
import { HttpClientModule } from '@angular/common/http';
// import { UserComponent } from './user/user.component';
import {ReactiveFormsModule} from '@angular/forms';
import { UserComponent } from './user/user.component';
import { ViewuserComponent } from './viewuser/viewuser.component';

@NgModule({
  declarations: [
    AppComponent,
    UserlistComponent,
    UserComponent,
    ViewuserComponent,
    // UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApolloModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3001/graphql'
          })
        }
      },
      deps: [HttpLink]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
