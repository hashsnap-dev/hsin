import { Injectable } from '@nestjs/common';

@Injectable()
export class EscapeService {
  escape(str) {
    return String(str).replace(/([.*+#&?=^!:${}()|[\]\/\\])/g, '\\$1');
  }
}
