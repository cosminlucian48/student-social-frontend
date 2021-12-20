import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable()
export class SubjectService {

  subjectWasChanged = new Subject<string>();

  constructor() {
  }

  observeSubjectWasChanged(): Observable<string> {
    return this.subjectWasChanged.asObservable();
  }

  emitSubjectWasChanged(){
    this.subjectWasChanged.next();
  }
}
