export class Comment{
  public id:number = 0;
  public commentsDate:Date;
  public text:string;
  public postId: number;
  public userId: number;
  public email:string | undefined | null = "";


  constructor(commentsDate: Date, text: string, postId: number, userId: number) {
    this.commentsDate = commentsDate;
    this.text = text;
    this.postId = postId;
    this.userId = userId;
  }
}
