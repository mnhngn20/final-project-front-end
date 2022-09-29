import { Spin } from 'antd';

function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spin />
    </div>
  );
}

export default Loading;
