import { Song } from "src/songs/entities/songs.entity";
import { SortStrategy } from "../interface/sort-strategy.interface";

export class SortByDate implements SortStrategy {
  sort(songs: Song[]): Song[] {
    return songs.sort((a: Song, b: Song) => {
    return a.createAt.getTime() -b.createAt.getTime()
    });
  }
}
