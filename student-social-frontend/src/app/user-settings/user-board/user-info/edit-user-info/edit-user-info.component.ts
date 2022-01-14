import {Component, Inject, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../services/authentication.service";
import {RequestService} from "../../../../services/request.service";
import {Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "angular-notifier";
import {NgForm} from "@angular/forms";
import {User} from "../../../../model/user";

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.scss']
})
export class EditUserInfoComponent implements OnInit {
  @Input() user:User = new User("","","","","","","");
  constructor(public authenticationService: AuthenticationService, public requestService: RequestService,
              public router: Router, public dialogRef: MatDialogRef<EditUserInfoComponent>, public notifier: NotifierService,
              @Inject(MAT_DIALOG_DATA) public data: {user: User}) { }

  ngOnInit(): void {
    const userClone:User = new User("","",this.data.user.university,this.data.user.firstName,this.data.user.lastName,"",this.data.user.faculty);
    this.user = userClone;
  }

  editUserInfoSubmit(ngForm: NgForm){
    if(ngForm.invalid){
      return;
    }

    const user = new User(this.data.user.email,this.data.user.password,ngForm.value.university, ngForm.value.firstName, ngForm.value.lastName,this.data.user.authorities,ngForm.value.faculty);
    user.id = this.data.user.id;
    user.profileImage = this.data.user.profileImage;
    this.requestService.updateUser(user).subscribe(response =>{
      this.notifier.notify("success","User updated!");
      this.close();
      },
    error => {
      this.notifier.notify("error","Error when updating the user!");
    })
    console.log("final user ",user);

  }

  close() {
    this.dialogRef.close();
  }

}
