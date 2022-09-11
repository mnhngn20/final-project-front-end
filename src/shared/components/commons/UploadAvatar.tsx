import { AvatarProps, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from 'react';
import { RcFile } from 'antd/es/upload';
// import { uploadFile } from '@base-projects/web-uikit';
import 'antd/es/modal/style';
import 'antd/es/slider/style';
import Avatar from '#/shared/components/commons/Avatar';
import { S3UploadType } from '#/generated/schemas';
import useAsyncQuery from '#/shared/hooks/useAsyncQuery';

interface Props {
  onChange?: (url: string) => void;
  disabled?: boolean;
  src?: string;
}

function UploadAvatar({
  onChange,
  disabled,
  src,
  size,
  ...rest
}: Props & AvatarProps) {
  const { getPresignedUrl } = useAsyncQuery();
  const [imageURL, setImageURL] = useState<string | undefined>(src);
  useEffect(() => {
    setImageURL(src);
  }, [src]);
  const handleUpload = async ({
    file,
  }: {
    file: string | Blob | RcFile | File;
  }) => {
    const { data } = await getPresignedUrl({
      fileName: (file as File).name,
      fileType: (file as File).type,
      pathType: S3UploadType.Profile,
    });
    const uploadUrl = data?.presignedUrlS3?.uploadUrl;
    const url = `${import.meta.env.VITE_IMAGE_URL}/${
      data?.presignedUrlS3?.pathFile
    }`;
    if (uploadUrl) {
      // await uploadFile({
      //   file: file as Blob,
      //   signedRequest: uploadUrl,
      // });
      onChange?.(url);
      setImageURL(url);
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
          showInfo: false,
          strokeWidth: 4,
        }}
        className="flex justify-center"
      >
        <div className="flex rounded-full">
          {imageURL ? (
            <Avatar src={imageURL} size={size} alt="image" {...rest} />
          ) : (
            <Avatar size={size} className="center2 hover:shadow-xl flex" />
          )}
        </div>
      </Upload>
    </ImgCrop>
  );
}

export default UploadAvatar;
