import {Component, Input, OnInit} from '@angular/core';
import {UserSettings} from "../../../model/user.settings";
import {User} from "../../../model/user";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {


  @Input() userSettings: UserSettings = new UserSettings();
  constructor() { }

  ngOnInit(): void {
  }

}
