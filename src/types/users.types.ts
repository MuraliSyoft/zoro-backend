export interface User {
    password: any;
    email: string;
    passwordHash: string;
  }
  
  export interface LoginData {
    [x: string]: any;
    email: string;
    passwordHash: string;
  }
  