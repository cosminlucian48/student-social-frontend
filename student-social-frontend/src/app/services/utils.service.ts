import {Injectable} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {UserSettingsDto} from "../dto/user.settings.dto";
import {UserSettings} from "../model/user.settings";

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

  mapFromUserSettingsDtoToUserSettings(userSettingsDto: UserSettingsDto){
    const userSettings= new UserSettings();
    userSettings.user = userSettingsDto.user;
    userSettings.subjects = userSettingsDto.subjects;
    return userSettings;
  }
  mapFromUserSettingsToUserSettingsDto(userSettings: UserSettings){
    const userSettingsDto= new UserSettingsDto();
    userSettingsDto.user = userSettings.user;
    userSettingsDto.subjects = userSettings.subjects;
    return userSettingsDto;
  }
}
