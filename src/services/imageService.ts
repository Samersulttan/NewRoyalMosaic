import { compressImage } from '../utils/imageCompression';

export const processImages = async (files: File[]): Promise<File[]> => {
  try {
    const processedImages = await Promise.all(
      files.map(async (file) => {
        // Max dimensions for product images
        const MAX_WIDTH = 1920;
        const MAX_HEIGHT = 1080;
        const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

        // Only process if file is larger than max size
        if (file.size > MAX_FILE_SIZE) {
          const compressedFile = await compressImage(file, {
            maxWidth: MAX_WIDTH,
            maxHeight: MAX_HEIGHT,
            maxSizeMB: 2,
            useWebWorker: true
          });

          // Convert compressed image to File object
          return new File(
            [compressedFile], 
            file.name, 
            { type: 'image/jpeg' }
          );
        }

        return file;
      })
    );

    return processedImages;
  } catch (error) {
    console.error('Error processing images:', error);
    throw new Error('Failed to process images');
  }
};