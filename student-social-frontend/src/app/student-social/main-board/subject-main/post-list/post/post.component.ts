import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../../../model/post.model";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input()post:Post = new Post();
  public datePost: string | null  = "";

  constructor(public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.datePost = this.datepipe.transform(this.post.postDate, 'yyyy-MM-dd');

  }

}
