import { Typography } from 'antd';

interface PageLayoutProps {
  children?: React.ReactNode;
  title?: string;
}

function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <div className="flex flex-col gap-2">
      {title && (
        <Typography className="mb-4 text-2xl font-semibold">{title}</Typography>
      )}
      {children}
    </div>
  );
}

export default PageLayout;
