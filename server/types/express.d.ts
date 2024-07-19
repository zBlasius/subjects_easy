import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      headers: {
        authorization?: string; 
        [key: string]: string | undefined;
      };
    }
  }
}
