import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class FileValidationPip implements PipeTransform{
    transform(value: Express.Multer.File[], metadata: ArgumentMetadata) {
        if(!value || !Array.isArray(value) || value.length === 0) {
            throw new Error("No files provided or files are not in the correct format");
        }
        const alowedFilesUpload =[
            "image/jpeg",
            "image/png",
            "image/gif",
            "video/mp4",
            "video/mpeg",
            "audio/mpeg",
            "audio/wav"
        ]
        const maxfile = 5*1024*1024; // 5MB
        for (const file of value) {
            if (!alowedFilesUpload.includes(file.mimetype)) {
                throw new Error(`File type ${file.mimetype} is not allowed`);
            }
            if (file.size > maxfile) {
                throw new Error(`File size ${file.size} exceeds the maximum limit of 5MB`);
            }
        }
    }
}