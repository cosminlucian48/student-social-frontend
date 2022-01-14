import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
  @Input()subjectId:number=0 ;
  @Output() refreshComments2:EventEmitter<any> = new EventEmitter();
  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
    console.log(this.commentsTest)
  }

  refreshComments(){
    this.refreshComments2.emit();
  }

}
