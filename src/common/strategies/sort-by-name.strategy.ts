import { Song } from "src/songs/entities/songs.entity";
import { SortStrategy } from "../interface/sort-strategy.interface";

export class SortByName implements SortStrategy {
  sort(songs: Song[]): Song[] {
    return songs.sort((a: Song, b: Song) => {
      return a.title.localeCompare(b.title);
    });
  }
}
