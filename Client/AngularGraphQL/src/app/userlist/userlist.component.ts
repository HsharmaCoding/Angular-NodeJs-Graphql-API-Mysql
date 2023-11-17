import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import {User} from '../model/user'


@Component({
  selector: 'app-employeelist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {

  constructor(private _userService: UserService,private router: Router) {}

  userList: User[]=[];

  ngOnInit() {
    this._userService.getUsers().subscribe({
      next:(data)=>{
        this.userList=data
      },
      error:(error)=>{
        console.log(error);
      }
    })

  }

  redirectToCreateEmployeePage() {
    this.router.navigate(['/create']);
  }

  editUserInformation(id:Number){
    this.router.navigate(['/update',id]);
  }

  deleteUserInformation(id:number){
    const confirmation = window.confirm('Do you want to delete this record?');
    if(confirmation){
      this._userService.deleteUser(String(id)).subscribe({     
        next:(data)=>{
          if(data!=null){
            if(data?.data?.deleteUser?.successful){
              this._userService.getUsers().subscribe({
                next:(data)=>{
                  this.userList=data
                },
                error:(error)=>{
                  console.log(error);
                }
              })
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

  viewUserInformation(id:number){
    this.router.navigate(['/view',id]);
  }
}
