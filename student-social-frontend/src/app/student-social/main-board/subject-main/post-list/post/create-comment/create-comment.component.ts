import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from "@angular/forms";

import {Comment} from "../../../../../../model/comment.model";
import {RequestService} from "../../../../../../services/request.service";
import {AuthenticationService} from "../../../../../../services/authentication.service";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  @Input() postId:number=0;
  @Output() refreshComments:EventEmitter<any> = new EventEmitter();
  constructor(public requestService: RequestService, public authenticationService: AuthenticationService,
              public notifier: NotifierService) { }

  ngOnInit(): void {
  }

  createComment(ngForm: NgForm){
    // post id
    //user id


    this.requestService.getUserByEmail(this.authenticationService.getUserEmailFromToken()).subscribe(
      response=>{
        const newComment = new Comment(new Date(),ngForm.value.commentText,this.postId,response.id);

        this.requestService.postComment(newComment).subscribe(
          response=>{
            this.refreshComments.emit();
            this.notifier.notify("succes","Comment added!");
          },
          error =>{
            this.notifier.notify("error","Error when creating comment!");
          }
        )
      },
      error => {
        this.notifier.notify("error","Error when retrieving user by email!")
      }
    )

  }

}
