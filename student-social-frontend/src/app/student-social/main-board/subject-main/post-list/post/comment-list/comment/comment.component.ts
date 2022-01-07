import {Component, Input, OnInit} from '@angular/core';

import {Comment} from "../../../../../../../model/comment.model";
import {Post} from "../../../../../../../model/post.model";
import {DatePipe} from "@angular/common";
import {RequestService} from "../../../../../../../services/request.service";
import {RoleType} from "../../../../../../../enums/role.type";
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment:Comment = new Comment(new Date,"",0,0);
  public dateComment: string | null  = "";
  public userType: string = RoleType[RoleType.USER];
  public moderatorType: string = RoleType[RoleType.MODERATOR];
  public adminType: string = RoleType[RoleType.ADMIN];
  constructor(public datepipe: DatePipe, public requestService: RequestService) { }

  ngOnInit(): void {
    this.dateComment = this.datepipe.transform(this.comment.commentsDate, 'yyyy-MM-dd');
    // console.log("comment: ",this.comment);
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

