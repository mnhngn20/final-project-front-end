import { Tag } from 'antd';

interface Props {
  content?: string;
  className?: string;
  onClick?: () => void;
  icon?: JSX.Element | false;
}

function CustomTag({ icon, content, className, onClick }: Props) {
  return (
    <Tag
      className={`${className} r-40 flex w-min items-center justify-between gap-2 border-none py-1 px-3`}
      onClick={onClick}
    >
      {content}
      {icon}
    </Tag>
  );
}

export default CustomTag;
