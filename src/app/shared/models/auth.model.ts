export class Auth {
    hash: string | null;
    userId: number | null;
    userName: string | null;
    userEmail: string | null;
    companyId: number | null;
    companyName: string | null;
    token: string | null;
    expiration: Date | null;
    profile: string | null;
    language: string | null;
    imageURL: string | null;
    isGroup: boolean | null;
    constructor() {
      this.hash = null;
      this.userId = null;
      this.userName = null;
      this.userEmail = null;
      this.companyId = null;
      this.companyName = null;
      this.token = null;
      this.expiration = new Date;
      this.profile = null;
      this.language = null;
      this.imageURL = null;
      this.isGroup = null;
    }
  }
  