import { TagProps, Tag } from 'antd';

interface CustomTagProps {
  content?: string;
  icon?: JSX.Element;
}

function CustomTag({
  content,
  icon,
  className,
  ...rest
}: TagProps & CustomTagProps) {
  return (
    <Tag
      className={`${className} max-w-fit m-0 flex items-center gap-2 rounded-md py-2 px-3`}
      {...rest}
    >
      {icon}
      {content}
    </Tag>
  );
}

export default CustomTag;
