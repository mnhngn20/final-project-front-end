import { Col, Row } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import Pagination from '../styled/Pagination';
import { scrollToTop } from '#/shared/utils/tool';

interface Props {
  current: number;
  pageSize: number;
  total: number;
  showQuickJumper?: boolean;
  className?: string;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  isScrollable?: boolean;
}

function PaginationPanel({
  current,
  pageSize,
  total,
  showQuickJumper = false,
  setCurrentPage,
  className,
  isScrollable = true,
}: Props) {
  const handlePageChanging = (page: number, isScrollable: boolean) => {
    setCurrentPage(page);
    if (isScrollable) {
      scrollToTop();
    }
  };

  return (
    <Row className="w-full">
      <Col xs={24} className={className}>
        <Pagination
          total={total}
          current={current}
          showTotal={(total: number) => (
            <div className="font-medium">{`${total} items`}</div>
          )}
          pageSize={pageSize}
          showSizeChanger={false}
          showQuickJumper={showQuickJumper}
          onChange={page => handlePageChanging(page, isScrollable)}
        />
      </Col>
    </Row>
  );
}

export default PaginationPanel;
