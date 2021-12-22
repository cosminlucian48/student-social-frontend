import { Component, OnInit } from '@angular/core';
import {Post} from "../../../model/post.model";
import {Subject} from "../../../model/subject.model";
import {RequestService} from "../../../services/request.service";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {

  subjectList: Subject[] = [];
  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
    this.requestService.getSubjects().subscribe(responseData =>{
      this.subjectList =responseData;
    },
      error => {
      //de facut ceva
        alert("eroare")
      });

  }


}
