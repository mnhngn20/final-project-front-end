import { useLocation } from 'react-router-dom';
import Header from './Header';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const BACKGROUND_DIVIDE_HREFS = [
  { height: 'h-[30%]', path: '' },
  { height: 'h-[50%]', path: 'plan-packages' },
];

function PrivateLayout({ children }: PrivateLayoutProps) {
  const { pathname } = useLocation();

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="flex w-full justify-center shadow-header">
        <Header />
      </div>
      {BACKGROUND_DIVIDE_HREFS?.map(item => item?.path).includes(
        pathname?.split('/')?.[1],
      ) && (
        <div
          className={`bg-gradient absolute z-[-1] mt-[4rem] ${
            BACKGROUND_DIVIDE_HREFS?.find(
              item => item?.path === pathname?.split('/')?.[1],
            )?.height
          } w-full`}
        />
      )}
      <div className="mx-auto mt-[4rem] h-full w-full max-w-container px-4 py-8">
        {children}
      </div>
    </div>
  );
}

export default PrivateLayout;
