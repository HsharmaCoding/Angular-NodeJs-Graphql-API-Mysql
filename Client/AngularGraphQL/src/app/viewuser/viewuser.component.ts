import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormArray } from '@angular/forms';
import {FormBuilder,Validators,AbstractControlOptions } from '@angular/forms';
import {User} from '../model/user'
import { AbstractControl, Validator, ValidatorFn,AsyncValidatorFn } from "@angular/forms";
import {UserService}from '../shared/user.service'



@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent {
  constructor(private fb:FormBuilder, private router: Router, private activatesRoute: ActivatedRoute, private _userService : UserService){
  }
  userId:number=0;
  user:User={
    id:0,
    firstName:'',
    lastName:'',
    email:'',
    username:'',
    password:'',
    mobile:'',
    state:'',
    city:'',
  };

  ngOnInit(): void {
    this.activatesRoute.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
    });

    if(this.userId!=null && this.userId!=undefined && this.userId!=0){
      this.user.id=this.userId
      this._userService.getUserById(String(this.user.id)).subscribe({     
        next:(data)=>{
          if(data!=null){
            this.user=data;
          }
          else{
            alert(data);
          }
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }
  }

  redirectToUserListPage() {
    this.router.navigate(['/userlist']);
  }

}
