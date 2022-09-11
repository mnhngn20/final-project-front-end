import { MenuProps, Image } from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuizMenu from '#/shared/components/styled/QuizMenu';
import { QUIZ_SIDE_BAR_SECTIONS, Section } from '#/shared/utils/constant';
import useTypeSafeTranslation from '#/shared/hooks/useTypeSafeTranslation';
import { getDefaultActiveKey, zeroPad } from '#/shared/utils/tool';

type MenuItem = Required<MenuProps>['items'][number];
enum MenuSectionLevel {
  Main,
  Sub,
}

function SideBar() {
  const { sectionIds } = useParams();
  const navigate = useNavigate();
  const { t } = useTypeSafeTranslation();
  const [activeKey, setActiveKey] = useState<string[]>(
    getDefaultActiveKey(sectionIds)?.returnFoundKey,
  );

  const renderMenuSection = (
    section: Section,
    sectionLevel: MenuSectionLevel,
    index: number,
  ) => {
    switch (sectionLevel) {
      case MenuSectionLevel.Main:
        return (
          <div className="font-semibold uppercase">{t(section?.title)}</div>
        );
      case MenuSectionLevel.Sub:
        return (
          <div className="ant-menu-sub-section py-2">
            <div className="flex items-center gap-3 text-base">
              <span className="ant-menu-sub-section-title">
                {zeroPad(index + 1)}
              </span>
              <span>{t(section?.title)}</span>
            </div>
            <div className="ant-menu-sub-section-extra-content">
              {section?.images?.[0] && (
                <div className="mt-4 flex flex-wrap gap-1">
                  {section?.images?.map((image, index) => (
                    <Image
                      src={image}
                      key={String(index)}
                      width={100}
                      height={74}
                      preview={false}
                      className="rounded"
                    />
                  ))}
                </div>
              )}
              {section?.sectionDescription && (
                <div className="ant-menu-sub-section-extra-content-description mt-2 overflow-hidden break-words font-normal text-grey-secondary-300">
                  {section?.sectionDescription}
                </div>
              )}
            </div>
          </div>
        );
      default:
        return <div>{t(section?.title)}</div>;
    }
  };

  const formatMenuItem = (
    sections: Section[],
    sectionLevel: number,
  ): MenuItem[] =>
    sections?.map((section, index) => ({
      key: section?.id,
      label: renderMenuSection(section, sectionLevel, index),
      ...(section?.children && {
        children: formatMenuItem(section?.children, sectionLevel + 1),
      }),
    }));

  const onChange = (keyPath: string[]) => {
    setActiveKey(keyPath);
    navigate(`/funeral-plan/${[...keyPath]?.reverse()?.join('&')}`);
  };

  return (
    <div className="flex w-80 items-center justify-center">
      <QuizMenu
        items={formatMenuItem(QUIZ_SIDE_BAR_SECTIONS, MenuSectionLevel.Main)}
        mode="inline"
        defaultOpenKeys={activeKey}
        defaultSelectedKeys={activeKey}
        selectedKeys={activeKey}
        onSelect={({ keyPath }) => onChange(keyPath)}
      />
    </div>
  );
}

export default SideBar;
