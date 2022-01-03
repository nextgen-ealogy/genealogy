import {Injectable} from "@nestjs/common";

export type KeyType = 'ENV';

@Injectable()
export class ConfigService {
  get(key: KeyType){
    return process.env[key];
  }
}
