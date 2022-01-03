import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from "../../../model/subject.model";
import {MatDialog} from "@angular/material/dialog";
import {AddSubjectComponent} from "../../add-subject/add-subject.component";
import {RequestService} from "../../../services/request.service";

@Component({
  selector: 'app-admin-subject',
  templateUrl: './admin-subject.component.html',
  styleUrls: ['./admin-subject.component.scss']
})
export class AdminSubjectComponent implements OnInit {

  @Input() subject:Subject = new Subject();
  @Output() subjectListChanged = new EventEmitter();

  constructor(public requestService: RequestService) { }

  ngOnInit(): void {
  }

  deleteSubject(){
    this.requestService.deleteSubject(this.subject).subscribe(response =>{
      alert("Subiect sters!");
      this.subjectListChanged.next();
    },
      error => {
      alert("Nu s a sters subiectul!")
      })
  }



}
