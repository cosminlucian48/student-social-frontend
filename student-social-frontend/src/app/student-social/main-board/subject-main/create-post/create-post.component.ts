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

  @Input() subjectId: number = 0;
  @Output() refreshPosts: EventEmitter<any> = new EventEmitter();
  fileNames:String[] = [];
  fileName = '';
  file: File | undefined;
  private notifier: NotifierService;

  constructor(public requestService: RequestService, public authenticationService: AuthenticationService, notifier: NotifierService) {
    this.notifier = notifier;
  }

  fileCounter: number = 0;
  formData = new FormData();
  onFileSelected(event: any) {
    let file: File;
    console.log("Test")
    for (let i = 0; i < event.target.files.length; i++) {
      if(i==0){
        this.file=event.target.files[0];
      }
      file = event.target.files[i];
      this.fileNames.push(file.name);
      this.formData.append('file',file);
      // console.log(file);
    }

    // console.log(this.formData.getAll('file'));

    // if (file) {
    //
    //   this.fileName = file.name;
    //
    //   const formData = new FormData();
    //   const EL = "file";
    //   formData.append((EL + this.fileCounter), file);
    //   // console.log(formData.getAll("thumbnail"));
    //   formData.forEach(value => {
    //     console.log(value)
    //   });

    // const upload$ = this.http.post("/api/thumbnail-upload", formData);
    //
    // upload$.subscribe();
    // }
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
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

    this.formData.append('post',JSON.stringify(post));
    console.log(this.formData.getAll('post'))
    console.log(this.formData.getAll('file'))
    this.requestService.postPost(this.formData).subscribe(responseData => {
        this.showNotification('success', 'Post created!');
        this.refreshPosts.emit();
      },
      error => {
        this.showNotification('error', 'Error.');
      })

  }

}
