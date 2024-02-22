import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class CommonService {
  mp4Stream(filename: string) {
    return createReadStream(join(process.cwd(), `${process.env.MWC_FILE_PATH}/${this.getDates()}/${filename}`));
  }

  private getDates() {
    let months = '';
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    if (month < 10) {
      months = `0${month}`;
    }
    const day = date.getDate();
    return `${year}${months}${day}`;
  }
}
