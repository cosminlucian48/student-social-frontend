import {Component, Input, OnInit} from '@angular/core';
import {SubjectService} from "../../../../services/subject.service";
import {Post} from "../../../../model/post.model";
import {RequestService} from "../../../../services/request.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  currentSubjectId: number = 0;
  postList: Post[] = [];
  inPostSubject: boolean = false;
  subjectIdForCreatePostComponent: number = 0;

  constructor(public subjectService: SubjectService, public requestService: RequestService) {
  }

  ngOnInit(): void {
    this.subjectService.observeSubjectWasChanged().subscribe((subjectId: number) => {
      this.currentSubjectId = subjectId;
      //apelez din request service metoda care returneaza toate post urile cu subjectId respectiv
      this.requestService.getPosts(subjectId).subscribe(resposeData => {
          this.subjectIdForCreatePostComponent = subjectId;
          this.inPostSubject = true;
          this.postList = resposeData;
        },
        error => {
          alert("nu intra postarile")
        })
    });
  }

  refreshPosts() {
    this.requestService.getPosts(this.currentSubjectId).subscribe(responseData => {
        this.subjectIdForCreatePostComponent = this.currentSubjectId;
        this.inPostSubject = true;
        this.postList = responseData;
      },
      error => {
        alert("N a mers refres ul dupa create post")
      })
  }


}
