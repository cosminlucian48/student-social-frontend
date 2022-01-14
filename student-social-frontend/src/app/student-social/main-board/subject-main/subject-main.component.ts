import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CreatePostComponent} from "./create-post/create-post.component";
import {MatDialog} from "@angular/material/dialog";
import {SubjectService} from "../../../services/subject.service";
import {RequestService} from "../../../services/request.service";
import {Post} from "../../../model/post.model";
import {Subscription} from "rxjs";
import {RefreshService} from "../../../services/refresh.service";
import {NotifierService} from "angular-notifier";
import {BlockRefreshService} from "../../../services/block.refresh.service";
import {EditUserInfoComponent} from "../../../user-settings/user-board/user-info/edit-user-info/edit-user-info.component";
import {UserListComponent} from "./user-list/user-list.component";
import {Subject} from "../../../model/subject.model";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-subject-main',
  templateUrl: './subject-main.component.html',
  styleUrls: ['./subject-main.component.scss']
})
export class SubjectMainComponent implements OnInit {

  currentSubjectId: number = 0;
  inPostSubject: boolean = false;
  postList: Post[] = [];
  subject:Subject = new Subject();
  localTimerSubscription: Subscription | undefined;

  @Output() navBarToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public subjectService: SubjectService, public requestService: RequestService, public refreshService: RefreshService,
              public notifier: NotifierService, public blockRefreshService: BlockRefreshService,
              public dialog:MatDialog, public authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.subjectService.observeSubjectWasChanged().subscribe((subjectId: number) => {

      this.currentSubjectId = subjectId;
      this.blockRefreshService.setBlockRefresh(false);
      this.requestService.getSubjectById(subjectId).subscribe(resposeData => {
        this.subject = resposeData;
      },error=>{
        this.notifier.notify("error","Error when retrieving subject!");
      });
      this.localTimerSubscriptionStart();

    });

  }

  localTimerSubscriptionStart() {

    if (this.localTimerSubscription != undefined) {
      this.localTimerSubscription.unsubscribe();
      this.localTimerSubscription = undefined;
    }
    this.localTimerSubscription = this.refreshService.observeTimer().subscribe(response => {
        if (!this.blockRefreshService.getBlockRefresh()) {

          this.notifier.notify("success", "Refresh pe postari");
          // this.subjectService.emitSubjectWasChanged(this.subject.id);
          this.getPosts(this.currentSubjectId);
        } else {
          this.notifier.notify("error", "cant't refresh");
        }
      },
      error => {
        alert("Eroare care nu ar trebui sa apara.")
      });

  }

  private getPosts(subjectId: number) {
    this.requestService.getPosts(subjectId).subscribe(resposeData => {

        this.inPostSubject = true;
        this.postList = resposeData;

        // console.log("toate postarile", this.postList);
      },
      error => {
        this.notifier.notify("error","Nu au intrat postarile!")
      })
  }

  emitDrawerToggle() {
    this.navBarToggle.emit();
  }
  usersList(){
    const dialogRef = this.dialog.open(UserListComponent, {data: {subjectId: this.currentSubjectId}});
  }

  refreshPosts() {
    this.requestService.getPosts(this.currentSubjectId).subscribe(responseData => {
        // this.inPostSubject = true;
        this.postList = responseData;
      },
      error => {
        alert("N a mers refres ul dupa create post")
      })
  }


}
