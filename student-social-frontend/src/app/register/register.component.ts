import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {NgModel} from "@angular/forms";
import {User} from "../model/user";
import {AuthenticationService} from "../services/authentication.service";
import {RequestService} from "../services/request.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "angular-notifier";
import {RoleType} from "../enums/role.type";
import {Subscription} from "rxjs";
import {getImportSpecifier} from "@angular/core/schematics/utils/typescript/imports";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  private notifier: NotifierService;
  @Input()
  requiredFileType:string = "";
  imageBase64:string | ArrayBuffer | null = "";

  fileName = '';
  uploadProgress:null | number = 0;
  uploadSub: Subscription = new Subscription();

  constructor(public authenticationService: AuthenticationService, public requestService: RequestService,
              public router: Router, public dialogRef: MatDialogRef<RegisterComponent>, notifier: NotifierService) {

    this.notifier = notifier;
  }

  onFileSelected(event:any) {
    const file:File = event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();

      formData.append("thumbnail", file);

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageBase64 = reader.result;
        // console.log("AICI BOS",reader.result);
      };
      // const upload$ = this.http.post("/api/thumbnail-upload", formData);
      //
      // upload$.subscribe();

    }
  }



  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }


  ngOnInit(): void {
  }

  registerSubmit(ngForm: NgForm){

    if(ngForm.invalid){
      return;
    }
    const user = new User(ngForm.value.email,ngForm.value.password,ngForm.value.university, ngForm.value.firstName, ngForm.value.lastName,RoleType[RoleType.USER],ngForm.value.faculty);
    // this.authenticationService.register(user);
    user.registrationDate = new Date();
    user.tagEmail = true;
    user.commentEmail = false;
    user.postEmail = false;
    if(typeof this.imageBase64 == "string"){
      if(this.imageBase64.length >0){
        user.profileImage = this.imageBase64;
      }
    }
    console.log(user);
    this.requestService.register(user).subscribe(responseData => {
        this.showNotification( 'success', 'User registered succesfully!' );
        this.close();
      },
      error => {
        this.notifier.notify("error","Email already used!")
      }
    );

  }

  close() {
    this.dialogRef.close();
  }

}
