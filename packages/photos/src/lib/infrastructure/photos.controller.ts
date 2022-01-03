import {Controller, Get, Param, Query} from "@nestjs/common";
import {Photo} from "@genealogy/models";
import {ConfigService} from "@genealogy/config";

@Controller("/photos")
export class PhotosController {

  constructor(private readonly configService: ConfigService) {
    console.log(this.configService.get("ENV"))
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
