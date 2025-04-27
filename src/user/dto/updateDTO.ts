export class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    image?: string;
    created_at?: Date;
    updated_at?: Date;
    playlists?: any[];
    histories?: any[];
    likes?: any[];
    role?: string; 
}