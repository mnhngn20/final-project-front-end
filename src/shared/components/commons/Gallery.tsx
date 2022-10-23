import { Row, Col, Typography, Space, Empty, Button, Image } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

interface Props {
  gallery?: string[] | null;
  title?: string;
  className?: string;
  emptyRender?: () => JSX.Element;
}

const LIMIT_GALLERY = 10;

function Gallery({ gallery, title, className, emptyRender }: Props) {
  const [showMore, setShowMore] = useState(
    (gallery?.length ?? 0) > LIMIT_GALLERY,
  );
  const [list, setList] = useState<string[]>([]);
  const [index, setIndex] = useState(LIMIT_GALLERY);

  useEffect(() => {
    setList(gallery?.slice(0, LIMIT_GALLERY) ?? []);
  }, [gallery]);

  const loadMore = () => {
    if (gallery) {
      const newIndex = index + LIMIT_GALLERY;
      const newShowMore = newIndex <= gallery?.length - 1;
      const newList = list?.concat(gallery?.slice(index, newIndex));
      setIndex(newIndex);
      setList(newList);
      setShowMore(newShowMore);
    }
  };

  return (
    <Row className="w-full">
      <Col span={24}>
        <Typography.Text className={className}>{title}</Typography.Text>
      </Col>
      <Row gutter={16} className="mt-4 w-full">
        {list?.length ? (
          list?.map((item, index) => (
            <Col key={index} className="mb-2">
              <Space direction="vertical">
                <Image
                  src={item}
                  alt="gallery"
                  className="rounded-xl border-2 border-solid border-[#e2e8f0] border-opacity-75 object-cover"
                  width={220}
                  height={156}
                  preview
                />
              </Space>
            </Col>
          ))
        ) : emptyRender ? (
          emptyRender()
        ) : (
          <Empty className="w-full py-4" />
        )}
        {showMore && (
          <Col span={24}>
            <Button onClick={loadMore} className="mt-5 border-none px-0">
              Load More
              <CaretDownOutlined className="ml-2" />
            </Button>
          </Col>
        )}
      </Row>
    </Row>
  );
}

export default Gallery;
