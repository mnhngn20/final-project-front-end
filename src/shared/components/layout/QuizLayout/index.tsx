import { Typography } from 'antd';
import Header from './Header';
import SideBar from './SideBar';
import { TranslationKeys } from '#/generated/translationKeys';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';

interface QuizLayoutProps {
  children: React.ReactNode;
  title: TranslationKeys;
  description: TranslationKeys;
}

function QuizLayout({ title, description, children }: QuizLayoutProps) {
  const { t } = useTypeSafeTranslation();

  return (
    <div className="relative mx-auto grid h-full min-h-screen w-full max-w-container grid-cols-12">
      <div className="col-span-4 flex h-full max-h-screen items-start justify-center overflow-y-auto overflow-x-hidden bg-grey-primary py-14 px-20">
        <SideBar />
      </div>
      <div className="col-span-8 flex h-full flex-col gap-5 py-11 px-20">
        <Header />
        <Typography className="font-dm-serif-display text-4xl">
          {t(title)}
        </Typography>
        <Typography className="text-base text-grey-secondary-300">
          {t(description)}
        </Typography>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default QuizLayout;
