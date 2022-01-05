import {Component, Input, OnInit} from '@angular/core';

import {Comment} from "../../../../../../model/comment.model";
import {Post} from "../../../../../../model/post.model";
import {RequestService} from "../../../../../../services/request.service";
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  @Input()commentsTest: Comment[]=[] ;
  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
    console.log(this.commentsTest)
  }

}
