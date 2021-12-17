import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CreatePostComponent} from "./create-post/create-post.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-subject-main',
  templateUrl: './subject-main.component.html',
  styleUrls: ['./subject-main.component.scss']
})
export class SubjectMainComponent implements OnInit {


  @Output() navBarToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(public dialog:MatDialog) { }

  ngOnInit(): void {
  }

  emitDrawerToggle(){
    this.navBarToggle.emit();
  }

  createPost(){
    const dialogref = this.dialog.open(CreatePostComponent);
  }


}
