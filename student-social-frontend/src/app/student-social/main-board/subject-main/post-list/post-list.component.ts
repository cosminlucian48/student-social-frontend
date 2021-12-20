import { Component, OnInit } from '@angular/core';
import {SubjectService} from "../../../../services/subject.service";
import {Post} from "../../../../model/post.model";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  postList: Post[] = [];

  constructor(public subjectService: SubjectService, ) { }

  ngOnInit(): void {
    this.subjectService.observeSubjectWasChanged().
    subscribe((subjectId: string )=> {
      //apelez din request service metoda care returneaza toate post urile cu subjectId respectiv
    });
  }



}
