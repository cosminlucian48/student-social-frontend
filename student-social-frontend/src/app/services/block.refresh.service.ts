import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable()
export class BlockRefreshService{
  blockRefresh: boolean = false;
  // blockRefreshObservable: Subject<boolean> = new Subject<boolean>();
  //
  // observeBlockRefresh():Observable<boolean>{
  //   return this.blockRefreshObservable.asObservable();
  // }

  getBlockRefresh(){
    return this.blockRefresh;
  }
  setBlockRefresh(blockRefresh:boolean){
    this.blockRefresh = blockRefresh;
  }
}
