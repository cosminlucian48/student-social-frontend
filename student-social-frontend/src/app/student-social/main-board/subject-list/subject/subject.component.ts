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
  localTimerSubscription: Subscription | undefined;

  constructor(public subjectService: SubjectService, public refreshService: RefreshService,
              public notifier: NotifierService, public blockRefreshService: BlockRefreshService) {
  }

  ngOnInit(): void {
  }

  onSubjectClick() {
    this.subjectService.emitSubjectWasChanged(this.subject.id);
    if (this.localTimerSubscription != undefined) {
      this.localTimerSubscription.unsubscribe();
      this.localTimerSubscription = undefined;
    }
    this.localTimerSubscription = this.refreshService.observeTimer().subscribe(response => {
        if (!this.blockRefreshService.getBlockRefresh()) {
          this.notifier.notify("success", "Refresh pe postari");
          // this.subjectService.emitSubjectWasChanged(this.subject.id);
          this.subjectService.emitRefreshSubjectObservable();
        } else {
          this.notifier.notify("error", "cant't refresh");
        }
      },
      error => {
        alert("Eroare care nu ar trebui sa apara.")
      });

  }

}
