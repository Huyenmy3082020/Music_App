import cloudinary from 'helper/cloudinary';

function streamUpload(
  buffer: Buffer,
  folder: string,
  resourceType: 'image' | 'video',
): Promise<any> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
    stream.end(buffer);
  });
}
export default streamUpload;
