export class CreatePlaylistDto {
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    songs: any[]; 
  }