import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {Post} from "../model/post.model";

@Injectable()
export class SubjectService {

  subjectWasChanged = new Subject<number>();

  constructor() {
  }

  observeSubjectWasChanged(): Observable<number> {
    return this.subjectWasChanged.asObservable();
  }


  emitSubjectWasChanged(subjectId: number){
    this.subjectWasChanged.next(subjectId);
  }


}
