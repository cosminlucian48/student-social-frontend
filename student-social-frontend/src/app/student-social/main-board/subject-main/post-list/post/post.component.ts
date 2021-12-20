import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../../../../../model/post.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input()post:Post = new Post();

  constructor() { }

  ngOnInit(): void {
  }

}
