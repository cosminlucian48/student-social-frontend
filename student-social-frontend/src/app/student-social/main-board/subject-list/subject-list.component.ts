import {Component, OnInit} from '@angular/core';
import {Post} from "../../../model/post.model";
import {Subject} from "../../../model/subject.model";
import {RequestService} from "../../../services/request.service";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})
export class SubjectListComponent implements OnInit {

  subjectList: Subject[] = [];

  constructor(public requestService: RequestService, public authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.requestService.getUserSettingsByEmail(this.authenticationService.getUserFromToken()).subscribe(response =>{
      this.subjectList = response.subjects;
    },
      error => {
      alert("Error when retrieving user settings by email!")
      })
    // this.requestService.getUserByEmail(this.authenticationService.getUserFromToken()).subscribe(response => {
    //     this.requestService.getUserSettings(response.id).subscribe(response => {
    //       this.subjectList = response.subjects;
    //     }, error => {
    //       alert("Error when retrieving user settings!")
    //     })
    //   },
    //   error => {
    //     alert("Could not get user by email from be.")
    //   });


  }


}
