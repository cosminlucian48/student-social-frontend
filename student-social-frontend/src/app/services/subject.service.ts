import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {Post} from "../model/post.model";

@Injectable()
export class SubjectService {

  subjectWasChanged = new Subject<number>();
  refreshSubjectObservable = new Subject<void>();

  constructor() {
  }

  observeSubjectWasChanged(): Observable<number> {
    return this.subjectWasChanged.asObservable();
  }


  emitSubjectWasChanged(subjectId: number){
    this.subjectWasChanged.next(subjectId);
  }

  observeRefreshSubjectObservable(): Observable<void> {
    return this.refreshSubjectObservable.asObservable();
  }

  emitRefreshSubjectObservable(){
    this.refreshSubjectObservable.next();
  }
}
