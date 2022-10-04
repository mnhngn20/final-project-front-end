import { EditSVG } from '#/assets/svgs';
import { LoadingOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import { ReactNode } from 'react';

interface DetailLayoutProps {
  title?: string;
  sideContent?: ReactNode;
  mainContent?: ReactNode;
  loading?: boolean;
  onEdit?: () => void;
}

function DetailLayout({
  mainContent,
  sideContent,
  title,
  loading,
  onEdit,
}: DetailLayoutProps) {
  return (
    <PageContainer title={title}>
      {loading ? (
        <div className="flex items-center justify-center text-primary-color">
          <LoadingOutlined />
        </div>
      ) : (
        <div className="grid h-full grid-cols-12 gap-4">
          <div className="relative col-span-4 rounded-xl bg-[white] p-4 xlg:col-span-5 lg:col-span-12">
            {onEdit && (
              <EditSVG
                width={24}
                height={24}
                className="absolute right-0 mr-4 cursor-pointer hover:text-primary-color"
                onClick={onEdit}
              />
            )}
            {mainContent}
          </div>
          <div className="col-span-8 xlg:col-span-7 lg:col-span-12">
            {sideContent}
          </div>
        </div>
      )}
    </PageContainer>
  );
}

export default DetailLayout;
