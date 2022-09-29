import { Image as AntdImage, ImageProps } from 'antd';
import Loading from './Loading';
import ImageDefault from '#/assets/images/imageDefault.png';
import ImageUpload from '#/assets/images/upload-image.png';

interface Props {
  url: string | undefined;
  isUpload?: boolean;
}

function Image({ url, isUpload = false, ...rest }: Props & ImageProps) {
  const defaultImage = isUpload ? ImageUpload : ImageDefault;

  return (
    <AntdImage src={url ?? defaultImage} placeholder={<Loading />} {...rest} />
  );
}

export default Image;
