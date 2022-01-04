import {User} from "../model/user";
import {Subject} from "../model/subject.model";

export class UserSettingsDto{
  user: User = new User("","","","","","","");
  subjects: Subject[] = [];
}
