import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

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
