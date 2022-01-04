export class User {
  id: number = 0;
  email: String;
  password: String;
  university: String;
  faculty: String;
  firstName: String;
  lastName: String;
  authorities: String;



  constructor(email: String, password: String, university: String, firstName: String, lastName: String, authorities: String, faculty: String) {
    this.email = email;
    this.password = password;
    this.university = university;
    this.faculty = faculty;
    this.firstName = firstName;
    this.lastName = lastName;
    this.authorities =authorities;
  }

}
