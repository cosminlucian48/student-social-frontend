import {Injectable} from "@angular/core";
import {Observable,timer} from "rxjs";

@Injectable()
export class RefreshService{
  timer: Observable<number> = timer(0,3000000);

  constructor() {
  }

  observeTimer():Observable<number>{
    return this.timer;
  }

}

