import {Controller, Get, Param, Query} from "@nestjs/common";
import {Photo} from "@genealogy/models";

@Controller("/photos")
export class PhotosController {

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
