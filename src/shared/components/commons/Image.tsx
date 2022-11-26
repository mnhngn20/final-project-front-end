import Loading from './Loading';
import { Image as AntdImage, ImageProps } from 'antd';
import ImageDefault from '#/assets/images/default.png';

interface Props {
  url: string | undefined;
  isUpload?: boolean;
}

function Image({ url, ...rest }: Props & ImageProps) {
  return (
    <AntdImage src={url ?? ImageDefault} placeholder={<Loading />} {...rest} />
  );
}

export default Image;
