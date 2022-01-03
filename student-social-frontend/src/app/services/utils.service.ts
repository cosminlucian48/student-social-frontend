import {Injectable} from "@angular/core";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class UtilsService {

  constructor() {
  }

  concatFromStringToList(stringValue: string| undefined): string[] {
    if(stringValue!=undefined) {
      return stringValue.split(',');
    }
    return [];
  }
}
