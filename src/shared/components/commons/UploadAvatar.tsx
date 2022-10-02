import { AvatarProps, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import { RcFile } from 'antd/es/upload';
import Avatar from './Avatar';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import uploadCloudinary from '#/shared/utils/uploadCloudinary';
import { showError } from '#/shared/utils/notification';
import { LoadingOutlined } from '@ant-design/icons';

interface Props {
  onChange?: (url: string) => void;
  disabled?: boolean;
  isPersonAvatar?: boolean;
  src?: string | null;
  size?: string | number;
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setImageURL(src as string);
  }, [src]);

  const handleUpload = async ({
    file,
  }: {
    file: string | Blob | RcFile | File;
  }) => {
    try {
      setLoading(true);
      const res = await uploadCloudinary({
        file: file as Blob,
      });
      const url = res.data.url;
      onChange?.(url);
      setImageURL(url);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
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
        {loading ? (
          <div
            style={{
              width: size,
              height: size,
            }}
            className="flex items-center justify-center rounded-full border-[1px] border-grey-secondary-300"
          >
            <LoadingOutlined />
          </div>
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
