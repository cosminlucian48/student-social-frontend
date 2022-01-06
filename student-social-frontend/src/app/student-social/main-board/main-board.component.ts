import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDrawer} from "@angular/material/sidenav";
import {RefreshService} from "../../services/refresh.service";

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.scss']
})
export class MainBoardComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  onNavBarToggle(){

  }


}
