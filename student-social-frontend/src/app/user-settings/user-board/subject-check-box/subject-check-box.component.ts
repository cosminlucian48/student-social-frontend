import {Component, EventEmitter, Input, KeyValueDiffers, OnInit, Output, Pipe} from '@angular/core';
import {Subject} from "../../../model/subject.model";
import {AuthenticationService} from "../../../services/authentication.service";
import {User} from "../../../model/user";
import {UserSettings} from "../../../model/user.settings";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {KeyValue, KeyValuePipe} from "@angular/common";

@Component({
  selector: 'app-subject-check-box',
  templateUrl: './subject-check-box.component.html',
  styleUrls: ['./subject-check-box.component.scss']
})

export class SubjectCheckBoxComponent implements OnInit {

  @Input() subjectsMap: Map<Subject,boolean> =new Map<Subject,boolean>();

  isUserEnrolled: boolean = false;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {

    // console.log(this.subjectsMap);
    // console.log("obiect ",this.subject);

    // this.userSubjects.forEach(((value, index) => {
    //   if(value.name == this.subject[1,]){
    //     this.isUserEnrolled = true;
    //   }
    // }))
    //
    console.log(this.isUserEnrolled)
  }

  toggle(subject:Subject){
    this.subjectsMap.forEach(((value, key) => {
      if(key.name===subject.name){
        // this.subjectsMap.get(key)=!value;
        this.subjectsMap.set(key,!value);
      }
    }))
  }

}
