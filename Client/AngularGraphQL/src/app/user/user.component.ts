import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormArray } from '@angular/forms';
import {FormBuilder,Validators,AbstractControlOptions } from '@angular/forms';
import {User} from '../model/user'
import { AbstractControl, Validator, ValidatorFn,AsyncValidatorFn } from "@angular/forms";
import {UserService}from '../shared/user.service'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{

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

  userForm!:FormGroup;

  ngOnInit(): void {
    this.activatesRoute.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
    });

    if(this.userId!=null && this.userId!=undefined && this.userId!=0){
      this.user.id=this.userId
      this._userService.getUserById(String(this.user.id)).subscribe({     
        next:(data)=>{
          if(data!=null){
            this.userForm.patchValue({
              id:data?.id,
              firstName : data?.firstName,
              lastName : data?.lastName,
              email:data?.email,
              username : data?.username,
              password : data?.password,
              mobile : data?.mobile,
              state:data?.state,
              city:data?.city,
            })

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

    this.userForm = this.fb.group({
      firstName : ['',[Validators.required]],
      lastName : ['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      username:['',[Validators.required]],
      password:['',[Validators.required]],
      mobile:['',[Validators.required,this.mobileNumberValidator]],
      state:['',[Validators.required]],
      city:['',[Validators.required]],
    });

  }

  onSubmit(){
    this.user.firstName=this.userForm.value?.firstName;
    this.user.lastName=this.userForm.value?.lastName;
    this.user.email=this.userForm.value?.email;
    this.user.username=this.userForm.value?.username;
    this.user.password=this.userForm.value?.password;
    this.user.mobile=this.userForm.value?.mobile;
    this.user.state=this.userForm.value?.state;
    this.user.city=this.userForm.value?.city;

    
    if(this.userId!=null && this.userId!=undefined && this.userId!=0){
      this.user.id=this.userId
      this._userService.updateUser(this.user).subscribe({     
        next:(data)=>{
          if(data!=null){
            if(data?.data?.updateUser?.successful){
              this.redirectToUserListPage()
            }
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
    else{
      this._userService.createUser(this.user).subscribe({     
        next:(data)=>{
          if(data!=null){
            if(data?.data?.createUser?.successful){
              this.redirectToUserListPage()
            }
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

  mobileNumberValidator(control:AbstractControl) {
    // You can customize this validator based on your requirements.
    const mobileNumber = control.value;
    const mobilePattern = /^\d{10}$/; // Adjust the regex pattern as needed.

    if (mobilePattern.test(mobileNumber)) {
      return null; // Validation passed.
    } else {
      return { invalidMobileNumber: true }; // Validation failed.
    }
  }

  redirectToUserListPage() {
    this.router.navigate(['/userlist']);
  }
}
