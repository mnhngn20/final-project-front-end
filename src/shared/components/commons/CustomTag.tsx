import { Tag } from 'antd';

interface Props {
  content?: string;
  className?: string;
}

function CustomTag({ content, className }: Props) {
  return (
    <Tag className={`r-40 border-none py-1 px-3 text-[white] ${className}`}>
      {content}
    </Tag>
  );
}

export default CustomTag;
