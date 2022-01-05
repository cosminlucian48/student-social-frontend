import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";
import {Post} from "../../../../model/post.model";
import {RequestService} from "../../../../services/request.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {User} from "../../../../model/user";
import {NotifierService} from "angular-notifier";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  @Input()subjectId:number = 0;
  @Output() refreshPosts:EventEmitter<any> = new EventEmitter();

  private notifier: NotifierService;

  constructor(public requestService: RequestService, public authenticationService: AuthenticationService, notifier: NotifierService) {
    this.notifier = notifier;
  }

  public showNotification( type: string, message: string ): void {
    this.notifier.notify( type, message );
  }

  ngOnInit(): void {
  }

  createPost(ngForm: NgForm) {
    if (ngForm.invalid) {
      return;
    }
    const post = new Post();
    post.text = ngForm.value.postText;
    post.title = ngForm.value.postTitle;
    post.subjectId = this.subjectId;
    post.userId = 0;
    post.email = this.authenticationService.getUserEmailFromToken();
    post.isSticky = false;
    post.postDate = new Date();
    console.log(post)
    this.requestService.postPost(post).subscribe(responseData => {
        this.showNotification( 'success', 'Post created!' );
        this.refreshPosts.emit();
      },
      error => {
        this.showNotification( 'error', 'Error.' );
      })

  }

}
