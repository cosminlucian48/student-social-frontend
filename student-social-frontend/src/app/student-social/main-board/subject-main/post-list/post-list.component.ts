import { Component, OnInit } from '@angular/core';
import {SubjectService} from "../../../../services/subject.service";
import {Post} from "../../../../model/post.model";
import {RequestService} from "../../../../services/request.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postList: Post[] = [];

  constructor(public subjectService: SubjectService,public requestService: RequestService ) { }

  ngOnInit(): void {
    this.subjectService.observeSubjectWasChanged().
    subscribe((subjectId: number )=> {
      // alert("id este "+ subjectId)
      //apelez din request service metoda care returneaza toate post urile cu subjectId respectiv
      this.requestService.getPosts(subjectId).subscribe(resposeData =>{
        this.postList = resposeData;
      },
        error => {
        alert("error nasol")
        })
    });
  }



}
