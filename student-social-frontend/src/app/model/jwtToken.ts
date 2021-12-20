export class JwtToken {
  aud: string | undefined;
  iss: string | undefined;
  autorities: string[] = [];
  sub: string | undefined;
  exp: number | undefined;
  iat: number | undefined;

  constructor() {
  }


}
