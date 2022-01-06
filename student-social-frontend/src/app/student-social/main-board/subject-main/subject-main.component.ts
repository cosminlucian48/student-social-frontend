import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CreatePostComponent} from "./create-post/create-post.component";
import {MatDialog} from "@angular/material/dialog";
import {SubjectService} from "../../../services/subject.service";
import {RequestService} from "../../../services/request.service";
import {Post} from "../../../model/post.model";

@Component({
  selector: 'app-subject-main',
  templateUrl: './subject-main.component.html',
  styleUrls: ['./subject-main.component.scss']
})
export class SubjectMainComponent implements OnInit {

  currentSubjectId: number = 0;
  inPostSubject: boolean = false;
  postList: Post[] = [];
  subjectIdForCreatePostComponent: number = 0;

  @Output() navBarToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public subjectService: SubjectService, public requestService: RequestService) {
  }

  ngOnInit(): void {
    this.subjectService.observeSubjectWasChanged().subscribe((subjectId: number) => {
      this.currentSubjectId = subjectId;
      //apelez din request service metoda care returneaza toate post urile cu subjectId respectiv
      this.getPosts(subjectId);
    });

    this.subjectService.observeRefreshSubjectObservable().subscribe(response =>{
      this.getPosts(this.currentSubjectId);
    },
      error => {
      alert("Error")
      });
  }

  private getPosts(subjectId: number) {
    this.requestService.getPosts(subjectId).subscribe(resposeData => {
        this.subjectIdForCreatePostComponent = subjectId;
        this.inPostSubject = true;
        this.postList = resposeData;
        console.log("toate postarile", this.postList);
      },
      error => {
        alert("nu intra postarile")
      })
  }

  emitDrawerToggle() {
    this.navBarToggle.emit();
  }

  // createPost(){
  //   const dialogref = this.dialog.open(CreatePostComponent);
  // }

  refreshPosts() {
    this.requestService.getPosts(this.currentSubjectId).subscribe(responseData => {
        this.subjectIdForCreatePostComponent = this.currentSubjectId;
        // this.inPostSubject = true;
        this.postList = responseData;
      },
      error => {
        alert("N a mers refres ul dupa create post")
      })
  }


}
