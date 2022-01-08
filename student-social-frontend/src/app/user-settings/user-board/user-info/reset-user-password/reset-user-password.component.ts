import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../../services/authentication.service";
import {RequestService} from "../../../../services/request.service";
import {Router} from "@angular/router";
import {MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "angular-notifier";
import {NgForm} from "@angular/forms";
import {User} from "../../../../model/user";

@Component({
  selector: 'app-reset-user-password',
  templateUrl: './reset-user-password.component.html',
  styleUrls: ['./reset-user-password.component.scss']
})
export class ResetUserPasswordComponent implements OnInit {
  hide = true;
  hideNew = true;

  constructor(public authenticationService: AuthenticationService, public requestService: RequestService,
              public router: Router, public dialogRef: MatDialogRef<ResetUserPasswordComponent>, public notifier: NotifierService) {
  }

  ngOnInit(): void {
  }


  resetPasswordSubmit(ngForm: NgForm) {
    const email = this.authenticationService.getUserEmailFromToken();
    if (typeof email == 'string') {
      const user = new User(email, ngForm.value.newPassword, "", "", "", "", "")
      this.requestService.updateUserPassword(user).subscribe(
        response => {
          this.notifier.notify("success", "Password changed!")
          this.dialogRef.close()
        },
        error => {
          this.notifier.notify("error", "Error when changing password!")
        })
    } else {
      this.notifier.notify("error", "Email is not a string!")
    }
  }

  close() {
    this.dialogRef.close();
  }


}
