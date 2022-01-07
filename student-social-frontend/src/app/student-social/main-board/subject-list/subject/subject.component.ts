import {Component, Input, OnInit} from '@angular/core';
import {SubjectService} from "../../../../services/subject.service";
import {Post} from "../../../../model/post.model";
import {Subject} from "../../../../model/subject.model";
import {RefreshService} from "../../../../services/refresh.service";
import {NotifierService} from "angular-notifier";
import {BlockRefreshService} from "../../../../services/block.refresh.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {


  @Input() subject: Subject = new Subject();

  constructor(public subjectService: SubjectService, public refreshService: RefreshService,
              public notifier: NotifierService, public blockRefreshService: BlockRefreshService) {
  }

  ngOnInit(): void {
  }

  onSubjectClick() {
    this.subjectService.emitSubjectWasChanged(this.subject.id);
  }

}
