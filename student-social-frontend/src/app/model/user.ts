export class User {
  id: number = 0;
  email: string;
  password: string;
  university: string;
  faculty: string;
  firstName: string;
  lastName: string;
  authorities: string;
  profileImage: string = "";
  registrationDate: Date = new Date();
  tagEmail: boolean = false;
  commentEmail: boolean = false;
  postEmail: boolean = false;



  constructor(email: string, password: string, university: string, firstName: string, lastName: string, authorities: string, faculty: string) {
    this.email = email;
    this.password = password;
    this.university = university;
    this.faculty = faculty;
    this.firstName = firstName;
    this.lastName = lastName;
    this.authorities =authorities;
  }

}
