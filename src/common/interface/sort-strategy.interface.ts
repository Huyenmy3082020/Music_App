import { Song } from "src/songs/entities/songs.entity";

export interface SortStrategy 
{
    sort(songs:Song[] ) :Song[]
}