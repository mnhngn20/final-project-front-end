import { AvatarProps, Slider, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import { RcFile } from 'antd/es/upload';
import Avatar from './Avatar';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import uploadCloudinary from '#/shared/utils/uploadCloudinary';
import { showError } from '#/shared/utils/notification';

interface Props {
  onChange?: (url: string) => void;
  disabled?: boolean;
  isPersonAvatar?: boolean;
  src?: string | null;
}

function UploadAvatar({
  onChange,
  disabled,
  isPersonAvatar,
  src,
  size = 100,
  ...rest
}: Props & AvatarProps) {
  const [imageURL, setImageURL] = useState(src);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setImageURL(src as string);
  }, [src]);

  const handleUpload = async ({
    file,
  }: {
    file: string | Blob | RcFile | File;
  }) => {
    try {
      setProgress(0);
      const res = await uploadCloudinary({
        file: file as Blob,
        onUploadProgress: (percent: number) => setProgress(percent),
      });
      const url = res.data.url;
      onChange?.(url);
      setImageURL(url);
      setProgress(100);
    } catch (error) {
      showError(error);
    }
  };

  return (
    <ImgCrop grid shape="round">
      <Upload
        accept="image/*"
        customRequest={handleUpload}
        showUploadList={false}
        disabled={disabled}
        maxCount={1}
        progress={{
          strokeWidth: 4,
          showInfo: false,
        }}
      >
        {progress !== 0 && progress !== 100 ? (
          <>
            <Avatar size={size} className="flex items-center justify-center">
              <Slider value={progress} className="w-20" />
            </Avatar>
          </>
        ) : (
          <Avatar
            isPersonAvatar={isPersonAvatar}
            src={imageURL}
            size={size}
            alt="image"
            {...rest}
          />
        )}
      </Upload>
    </ImgCrop>
  );
}

export default UploadAvatar;
