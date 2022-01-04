import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../services/request.service";
import {Subject} from "../../model/subject.model";
import {User} from "../../model/user";
import {AuthenticationService} from "../../services/authentication.service";
import {UserSettings} from "../../model/user.settings";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-user-board',
  templateUrl: './user-board.component.html',
  styleUrls: ['./user-board.component.scss']
})
export class UserBoardComponent implements OnInit {
  subjects: Subject[] = [];
  loggedInUser: User = new User("", "", "", "", "", "", "");
  userSettings: UserSettings = new UserSettings();
  checkedSubjects: Subject[] = [];
  subjectsMap: Map<Subject, boolean> = new Map<Subject, boolean>();

  constructor(public requestService: RequestService, public authenticationService: AuthenticationService,
              public notifier: NotifierService) {

  }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects() {
    this.requestService.getUserSettingsByEmail(this.authenticationService.getUserFromToken()).subscribe(
      response=>{
        this.loggedInUser = response.user;
        this.userSettings = response;
        this.checkedSubjects = this.userSettings.subjects;

        this.requestService.getSubjects().subscribe(response => {
            this.subjects = response;
            this.subjectsMap = new Map<Subject, boolean>(
              this.subjects.map((value, index, array) => [value, this.userSettings.subjects.some(
                e => e.name === value.name)])
            );

            // console.log("map ",this.subjectsMap);
          },
          () => {
            alert("Error when retrieving subjects!")
          });
      },
      error => {
        alert("Error when retrieving user settings by email.")
      });
  }

  save() {
    console.log("map ",this.subjectsMap);

    const userSettings: UserSettings = new UserSettings();
    userSettings.user = this.userSettings.user;
    const subjectsToBeSaved:Subject[] = [];
    this.subjectsMap.forEach(((value, key) => {
      if(value){
        subjectsToBeSaved.push(key);
      }
    }))
    userSettings.subjects = subjectsToBeSaved;
    console.log(this.checkedSubjects);
    this.requestService.postUserSettings(userSettings).subscribe(() => {
        this.notifier.notify("success", "User subjects saved!")
      },
      () => {
        this.notifier.notify("error", "User subjects could not be saved!")
      });

  }

  addOrDeleteInSubjectArray(val: Subject){
    let addElement: boolean = true;
    this.checkedSubjects.forEach(((value, index) => {
      if(value.name==val.name){
        this.checkedSubjects.splice(index,1);
        addElement = false;
      }
    }));
    if(addElement){
      this.checkedSubjects.push(val);
    }
  }
}
