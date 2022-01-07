import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotifierService} from "angular-notifier";
import {User} from "../../../model/user";
import {RequestService} from "../../../services/request.service";
import {Subject} from "../../../model/subject.model";
import {UserSettings} from "../../../model/user.settings";

@Component({
  selector: 'app-edit-moderator-dialog',
  templateUrl: './edit-moderator-dialog.component.html',
  styleUrls: ['./edit-moderator-dialog.component.scss']
})
export class EditModeratorDialogComponent implements OnInit {

  constructor(public requestService:RequestService,public dialogRef: MatDialogRef<EditModeratorDialogComponent>, public notifier: NotifierService,
              @Inject(MAT_DIALOG_DATA) public data: {user: User}) { }
  public subjects:Subject[] = [];
  public subjectsMap: Map<Subject,boolean> =new Map<Subject,boolean>();

  ngOnInit(): void {
    this.requestService.getUserSettings(this.data.user.id).subscribe(
      responseSubjects =>{
        this.requestService.getSubjects().subscribe(response => {
            this.subjects = response;
            this.subjectsMap = new Map<Subject, boolean>(
              this.subjects.map((value, index, array) => [value, responseSubjects.subjects.some(
                e => e.name === value.name)])
            );

            // console.log("map ",this.subjectsMap);
          },
          () => {
            alert("Error when retrieving subjects!")
          });
      }
    )
  }

  saveSubjects(){
    // console.log("map", this.subjectsMap);
    const userSettings: UserSettings = new UserSettings();
    userSettings.user = this.data.user;
    const subjectsToBeSaved:Subject[] = [] ;
    this.subjectsMap.forEach(((value, key) => {
      if(value){
        subjectsToBeSaved.push(key);
      }
    }));
    userSettings.subjects = subjectsToBeSaved;
    // console.log(userSettings);
    this.requestService.postUserSettings(userSettings).subscribe(()=>{
      this.notifier.notify("success","Moderator Subjects saved!");
    },
      error => {
      this.notifier.notify("error","Moderator subjects could not be saved!")
      });
    this.dialogRef.close();
  }


  close(){
    this.dialogRef.close();
  }
}
