import { Song } from "src/songs/entities/songs.entity";
import { SortStrategy } from "../interface/sort-strategy.interface";
import { SortByDate } from "./sort-by-date.strategy";
import { SortByName } from "./sort-by-name.strategy";

export class SongSorter {
    private strategy : SortStrategy

    constructor(strateryType:string){
        if(strateryType==="date"){
            this.strategy= new SortByDate();
        }
        else if (strateryType==='name'){
            this.strategy= new SortByName();
        }
        else {
            throw new Error ("unknow sort")
        }
    }
    sortSongs(songs:Song[]):Song[]
    {
        return this.strategy.sort(songs);
    }
}