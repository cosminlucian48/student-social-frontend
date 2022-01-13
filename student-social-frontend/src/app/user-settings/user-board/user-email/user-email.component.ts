import {Component, Input, OnInit} from '@angular/core';
import {UserSettings} from "../../../model/user.settings";
import {User} from "../../../model/user";
import {RequestService} from "../../../services/request.service";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-user-email',
  templateUrl: './user-email.component.html',
  styleUrls: ['./user-email.component.scss']
})
export class UserEmailComponent implements OnInit {

  @Input() userSettings: UserSettings = new UserSettings();

  constructor(public requestService: RequestService, public notifier: NotifierService) {
  }

  ngOnInit(): void {
    console.log("test:", this.userSettings.user)
  }

  save() {
    console.log("psot", this.userSettings.user.postEmail);
    console.log("comment", this.userSettings.user.commentEmail);
    console.log("tag", this.userSettings.user.tagEmail);
    this.requestService.updateUser(this.userSettings.user).subscribe(()=>{
      this.notifier.notify("success","User email preferences saved!")
    }, error => {
      this.notifier.notify("error","Error when changin user email prefenreces!")
    })
  }

  toggle(type: string) {
    if (type === "post") {
      this.userSettings.user.postEmail = !this.userSettings.user.postEmail
    } else if (type === "comment") {
      this.userSettings.user.commentEmail = !this.userSettings.user.commentEmail
    } else if (type === "tag") {
      this.userSettings.user.tagEmail = !this.userSettings.user.tagEmail
    }
  }
}
