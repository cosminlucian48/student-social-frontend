import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, NgForm} from "@angular/forms";
import {Post} from "../../../../model/post.model";
import {RequestService} from "../../../../services/request.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {User} from "../../../../model/user";
import {NotifierService} from "angular-notifier";
import {SubjectService} from "../../../../services/subject.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  @Input() subjectId: number = 0;
  @Output() refreshPosts: EventEmitter<any> = new EventEmitter();
  post:Post = new Post();
  fileNames:String[] = [];
  fileName = '';
  // postTitle:string = '';
  // postText:string = '';
  private notifier: NotifierService;
  fileCounter: number = 0;
  formData = new FormData();


  createPostForm = new FormGroup({
    postTitle: new FormControl(''),
    postText: new FormControl('')
  });


  constructor(public requestService: RequestService, public authenticationService: AuthenticationService, notifier: NotifierService,
              public subjectService:SubjectService) {
    this.notifier = notifier;
  }


  onFileSelected(event: any) {
    let file: File;
    for (let i = 0; i < event.target.files.length; i++) {
      file = event.target.files[i];
      this.fileNames.push(file.name);
      this.formData.append('file',file);
    }
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  ngOnInit(): void {
    this.subjectService.observeSubjectWasChanged().subscribe(() => {
      this.clearCreatePostFields();
    });

  }

  createPost() {
    this.post.text = this.createPostForm.controls.postText.value;
    this.post.title = this.createPostForm.controls.postTitle.value;
    console.log(this.post.title);
    console.log(this.post.text);
    this.post.subjectId = this.subjectId;
    this.post.email = this.authenticationService.getUserEmailFromToken();
    this.post.isSticky = false;
    this.post.postDate = new Date();
    this.createPostForm.reset();
    this.formData.append('post',JSON.stringify(this.post));
    console.log(this.formData.getAll('post'))
    console.log(this.formData.getAll('file'))
    this.requestService.postPost(this.formData).subscribe(responseData => {
        this.refreshPosts.emit();
        this.clearCreatePostFields();
        this.showNotification('success', 'Post created!');
      },
      error => {
        this.showNotification('error', 'Error.');
      })

  }

  clearCreatePostFields(){
    this.fileNames =[];
    this.fileName = '';
    // ngForm.value.postText = '';
    // ngForm.value.postTitle = '';
    // this.postText = '';
    // this.postTitle = '';
    this.post = new Post();
    this.post.title='';
    this.post.text='';
    this.formData = new FormData();
  }

}
