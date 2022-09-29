import axios from 'axios';

export interface UploadCloudinary {
  file: Blob;
  onUploadProgress?: (percent: number) => void;
}

export const uploadCloudinary = async ({
  file,
  onUploadProgress,
}: UploadCloudinary) => {
  const data = new FormData();
  data.append('file', file);
  data.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  return axios({
    method: 'POST',
    url: import.meta.env.VITE_CLOUDINARY_UPLOAD_URL,
    data,
    headers: {
      'Content-Type': file.type,
    },
    onUploadProgress: progressEvent => {
      onUploadProgress?.(
        Math.round((progressEvent.loaded * 100) / progressEvent.total),
      );
    },
  });
};

export default uploadCloudinary;
