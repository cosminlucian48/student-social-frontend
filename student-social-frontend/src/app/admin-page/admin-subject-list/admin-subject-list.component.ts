import {Component, OnInit} from '@angular/core';
import {RequestService} from "../../services/request.service";
import {Subject} from "../../model/subject.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {AddSubjectComponent} from "../add-subject/add-subject.component";


@Component({
  selector: 'app-admin-subject-list',
  templateUrl: './admin-subject-list.component.html',
  styleUrls: ['./admin-subject-list.component.scss']
})
export class AdminSubjectListComponent implements OnInit {

  dataSource = new MatTableDataSource<Subject>();
  displayedColumns: string[] = ['actions', 'title', 'text', 'user'];

  constructor(public requestService: RequestService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects() {
    this.requestService.getSubjects().subscribe(
      response => {
        console.log("Subjects");
        console.log(response);
        this.dataSource.data = response;
      },
      () => {
        console.log("Error when retrieving the list of subjects.");
      }
    )
  }

  addSubject() {
    const dialogRef = this.dialog.open(AddSubjectComponent);
  }


  deleteSubject(){
    // this.requestService.deleteSubject();
  }
}
