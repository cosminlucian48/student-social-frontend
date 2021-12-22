import {Component, Input, OnInit} from '@angular/core';
import {SubjectService} from "../../../../services/subject.service";
import {Post} from "../../../../model/post.model";
import {Subject} from "../../../../model/subject.model";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  @Input()subject:Subject = new Subject();
  constructor(public subjectService: SubjectService) { }

  ngOnInit(): void {
  }

  onSubjectClick(){
    this.subjectService.emitSubjectWasChanged(this.subject.id);
  }

}
