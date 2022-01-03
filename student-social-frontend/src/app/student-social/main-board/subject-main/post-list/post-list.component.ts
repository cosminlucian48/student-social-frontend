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


  @Input() postList: Post[] = [];

  constructor(public subjectService: SubjectService, public requestService: RequestService) {
  }

  ngOnInit(): void {

  }


}
