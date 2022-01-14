import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, NgForm} from "@angular/forms";

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

  formData = new FormData();
  fileNames:String[] = [];
  @Input() postId:number=0;
  @Output() refreshComments:EventEmitter<any> = new EventEmitter();
  constructor(public requestService: RequestService, public authenticationService: AuthenticationService,
              public notifier: NotifierService) { }
  createCommentForm = new FormGroup({
    commentText: new FormControl('')
  });

  openCreateComment:boolean = false;

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    let file: File;
    for (let i = 0; i < event.target.files.length; i++) {
      file = event.target.files[i];
      this.fileNames.push(file.name);
      this.formData.append('file',file);
    }
  }

  createComment(){
    // post id
    //user id

    this.requestService.getUserByEmail(this.authenticationService.getUserEmailFromToken()).subscribe(
      response=>{
        console.log(this.createCommentForm.controls.commentText.value);
        const newComment = new Comment(new Date(),this.createCommentForm.controls.commentText.value,this.postId,response.id);
        newComment.email = response.email;
        this.formData.append('comment',JSON.stringify(newComment));
        console.log("file,",this.formData.getAll('file'));
        console.log("comment,",this.formData.getAll('comment'));

        this.requestService.postComment(this.formData).subscribe(
          response=>{
            this.refreshComments.emit();
            this.notifier.notify("success","Comment added!");
            this.clearFormFields();
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

  clearFormFields(){
    this.createCommentForm.reset();
    this.formData = new FormData();
    this.fileNames =[];
  }

}
