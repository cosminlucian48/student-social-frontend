import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";
import {Post} from "../../../../model/post.model";
import {RequestService} from "../../../../services/request.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
  }

  createPost(ngForm: NgForm){
    if(ngForm.invalid){
      return;
    }
    const post = new Post();
    post.text=ngForm.value.postText;
    post.title=ngForm.value.postTitle;
    post.subjectId = 102;
    post.userId = 101;
    post.isSticky = false;
    post.postDate = new Date();
    console.log(post)
    this.requestService.postPost(post).subscribe(responseData=>{
      alert("Post created!")
    },
      error => {
      alert("Not ok")
      })

  }

}
