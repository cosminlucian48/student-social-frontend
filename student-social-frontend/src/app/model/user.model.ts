export class UserModel {
  email: String;
  password: String;
  university: String;
  firstName: String;
  lastName: String;


  constructor(email: String, password: String, university: String, firstName: String, lastName: String) {
    this.email = email;
    this.password = password;
    this.university = university;
    this.firstName = firstName;
    this.lastName = lastName;
  }

}
