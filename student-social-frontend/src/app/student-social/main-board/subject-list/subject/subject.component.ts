import { Component, OnInit } from '@angular/core';
import {SubjectService} from "../../../../services/subject.service";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {


  constructor(public subjectService: SubjectService) { }

  ngOnInit(): void {
  }

  onSubjectClick(){
    this.subjectService.emitSubjectWasChanged();
  }

}
