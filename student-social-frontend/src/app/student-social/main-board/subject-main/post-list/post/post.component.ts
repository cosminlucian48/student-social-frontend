import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../../../model/post.model";
import {Comment} from "../../../../../model/comment.model";
import {DatePipe} from "@angular/common";
import {RequestService} from "../../../../../services/request.service";
import {readSpanComment} from "@angular/compiler-cli/src/ngtsc/typecheck/src/comments";
import {SubjectService} from "../../../../../services/subject.service";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: Post = new Post();
  public datePost: string | null = "";
  public comments: Comment[] = [];

  constructor(public datepipe: DatePipe, public requestService: RequestService,
              public notifier: NotifierService) {
  }

  ngOnInit(): void {
    this.datePost = this.datepipe.transform(this.post.postDate, 'yyyy-MM-dd');
    this.getComments();
  }

  refreshComments() {
    this.getComments();
  }

  getComments() {
    this.requestService.getComments(this.post.id).subscribe(
      response => {
        this.comments = response;
      },
      error => {
        this.notifier.notify("error","Could not retrieve the comment list!")
      }
    );

  }

}
