import {Controller, Get, Param, Query} from "@nestjs/common";
import {Photo} from "@genealogy/models";
import {ConfigService} from "@genealogy/config";
const { Client } = require('@elastic/elasticsearch')

@Controller("/photos")
export class PhotosController {
  private client: any;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      node: this.configService.get("ELASTICSEARCH")
    });
    this.initElasticsearchPhotoIndex();
  }

  private async initElasticsearchPhotoIndex() {
    const genealogyPhotoExist = await this.client.indices.exists({
      index: "genealogy-photo"
    });

    if(!genealogyPhotoExist.body){
      console.log("Creating the genealogy index");

      const response = await this.client.indices.create({
        "index": "genealogy-photo",
        "body": {
          "mappings": {
            "properties": {
              "title": { "type": "text" },
              "legend": { "type": "text" },
              "date": { "type": "date", "format": "yyyy-MM-dd|yyyy"},
              "url": { "index": "false", "type": "text"},
              "geoloc": { "type": "geo_point"}
            }
          }
        }
      })
      console.log(response.body)
    }
  }

  @Get("/")
  getAllPhotos(
    @Query("lat") lat: number,
    @Query("lng") lng: number,
    @Query("from") from: Date,
    @Query("to") to: Date): Promise<Photo[]> {
    return Promise.resolve([]);
  }

  @Get(":id")
  getOnePhoto(@Param("id") id: string): Promise<Photo>{
    return Promise.resolve({ } as Photo);
  }
}
