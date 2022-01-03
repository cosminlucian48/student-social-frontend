import {map} from "rxjs/internal/operators";

export class JwtToken {
  aud: string | undefined;
  iss: string | undefined;
  roles: Map<string, string>[] | undefined;
  sub: string | undefined;
  exp: number | undefined;
  iat: number | undefined;

  constructor() {
  }


}
