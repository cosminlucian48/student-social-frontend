export class Post {
  id: number = 0;
  userId: number = 0;
  subjectId: number = 0;
  email:string | undefined | null = "";
  postDate: Date = new Date();
  title: string = "";
  text: string = "";
  isSticky: boolean = false;
  postType: string = "";
  profileImage: string = "";

  constructor() {
  }
// {
//   "id": 101,
//   "userDetailsId": 101,
//   "subjectId": 101,
//   "postDate": "2021-08-25T18:25:43.511+00:00",
//   "title": "Calculus 1 - Introduction",
//   "text": "Importance of functions on the real line, overview - reviewing a mapping of a set f from X to Y",
//   "isSticky": true
// },
}
