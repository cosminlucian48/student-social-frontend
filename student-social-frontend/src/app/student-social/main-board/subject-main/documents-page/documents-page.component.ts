import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {PostComponent} from "../post-list/post/post.component";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {User} from "../../../../model/user";
import {RequestService} from "../../../../services/request.service";
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-documents-page',
  templateUrl: './documents-page.component.html',
  styleUrls: ['./documents-page.component.scss']
})
export class DocumentsPageComponent implements OnInit {



  ngOnInit(): void {
  }

  constructor(private _bottomSheetRef: MatBottomSheetRef<PostComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: {fileNames:string[],subjectId:number},
              public requestService: RequestService) {}

  download(fileName:string): void {
    console.log("CEVA: ",fileName,this.data.subjectId);
    this.requestService.downloadFile(fileName,this.data.subjectId).subscribe(res=>saveAs(res,fileName));
    this._bottomSheetRef.dismiss();
    // event.preventDefault();
  }

  downloadAll(): void {
    this.data.fileNames.forEach((fileName => {
      this.requestService.downloadFile(fileName,this.data.subjectId).subscribe(res=>saveAs(res,fileName));
    }));
    this._bottomSheetRef.dismiss();
    // event.preventDefault();
  }

}
