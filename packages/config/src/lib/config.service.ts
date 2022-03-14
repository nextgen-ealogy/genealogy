import {Injectable} from "@nestjs/common";

export type KeyType = 'ENV' | 'ELASTICSEARCH';

@Injectable()
export class ConfigService {
  get(key: KeyType){
    return process.env[key];
  }
}
