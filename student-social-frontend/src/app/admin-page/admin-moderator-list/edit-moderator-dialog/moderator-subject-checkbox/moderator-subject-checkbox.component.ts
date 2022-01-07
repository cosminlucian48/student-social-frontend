import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "../../../../model/subject.model";

@Component({
  selector: 'app-moderator-subject-checkbox',
  templateUrl: './moderator-subject-checkbox.component.html',
  styleUrls: ['./moderator-subject-checkbox.component.scss']
})
export class ModeratorSubjectCheckboxComponent implements OnInit {

  // @Input() subject:Subject = new Subject();
  // @Input() checkedSubject:boolean = false;
  @Input() subjectsMap: Map<Subject,boolean> =new Map<Subject,boolean>();
  constructor() { }

  ngOnInit(): void {
    // console.log("SUBJECTU ALA SMECHER", this.subject)
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
