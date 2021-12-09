import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-subject-main',
  templateUrl: './subject-main.component.html',
  styleUrls: ['./subject-main.component.scss']
})
export class SubjectMainComponent implements OnInit {


  @Output() navBarToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  emitDrawerToggle(){
    this.navBarToggle.emit();
  }


}
