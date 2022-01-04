import {User} from "./user";
import {Subject} from "./subject.model";

export class UserSettings {
  user: User = new User("","","","","","","");
  subjects: Subject[] = [];
}
