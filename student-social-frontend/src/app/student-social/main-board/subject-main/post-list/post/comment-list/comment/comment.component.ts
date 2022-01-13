import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Comment} from "../../../../../../../model/comment.model";
import {Post} from "../../../../../../../model/post.model";
import {DatePipe} from "@angular/common";
import {RequestService} from "../../../../../../../services/request.service";
import {RoleType} from "../../../../../../../enums/role.type";
import {NotifierService} from "angular-notifier";
import {AuthenticationService} from "../../../../../../../services/authentication.service";
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment:Comment = new Comment(new Date,"",0,0);
  @Output() refreshComments:EventEmitter<any> = new EventEmitter();
  public dateComment: string | null  = "";
  public userType: string = RoleType[RoleType.USER];
  public moderatorType: string = RoleType[RoleType.MODERATOR];
  public adminType: string = RoleType[RoleType.ADMIN];
  constructor(public datepipe: DatePipe, public requestService: RequestService,
              public notifier:NotifierService, public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.dateComment = this.datepipe.transform(this.comment.commentsDate, 'yyyy-MM-dd');
    // console.log("comment: ",this.comment);
  }

  deleteComment(){
    this.requestService.deleteComment(this.comment.id).subscribe(()=>{
      this.notifier.notify("success","Comment deleted!");
      this.refreshComments.emit();
    },
    error =>{
      this.notifier.notify("error","Error when trying to delete comment!");

      })
  }
  loggedInUserHasAuthority(){
    return (!this.authenticationService.userHasAuthority(this.userType) || (this.comment.email==this.authenticationService.getUserEmailFromToken()));

  }
}

// @Input()post:Post = new Post();
// public datePost: string | null  = "";
//
// constructor(public datepipe: DatePipe, public requestService: RequestService) { }
//
// ngOnInit(): void {
//   this.datePost = this.datepipe.transform(this.post.postDate, 'yyyy-MM-dd');
// }

