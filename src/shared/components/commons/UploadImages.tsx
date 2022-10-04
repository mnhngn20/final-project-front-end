import { Upload, UploadProps, Spin, Image } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { useEffect, useState } from 'react';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { IMAGE_TYPES } from '#/shared/utils/constant';
import { showError } from '#/shared/utils/notification';
import uploadCloudinary from '#/shared/utils/uploadCloudinary';
import { AddSVG } from '#/assets/svgs';

interface Props {
  srcList?: string | null;
  onChange?: (url: string) => void;
}

function UploadImages({
  srcList = '',
  onChange,
  ...restProps
}: Props & UploadProps) {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<string[]>([]);

  useEffect(() => {
    if (srcList) {
      setFileList(srcList?.split(','));
    }
  }, [srcList]);

  const handleUpload = async ({
    file,
    onSuccess,
  }: {
    file: string | Blob | RcFile | File;
    onSuccess?: (body: string, xhr: XMLHttpRequest) => void;
  }) => {
    try {
      setLoading(true);
      if (!IMAGE_TYPES.split(',').includes((file as File).type)) {
        throw new Error('File type not allowed');
      }
      const response = await uploadCloudinary({
        file: file as Blob,
      });
      const url = response.data.url;
      onSuccess?.(response.statusText, file as unknown as XMLHttpRequest);
      onChange?.([...fileList, url].join(','));

      setFileList([...fileList, url]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showError(error);
    }
  };

  const onRemove = ({ name }: { name?: string }) => {
    const newFileList = fileList?.filter(item => item !== name);
    onChange?.(newFileList?.join(','));
    setFileList(newFileList || []);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {fileList?.map((item, index) => (
        <div
          key={String(index)}
          className="relative flex h-28 w-28 items-center justify-center rounded-lg border-2 border-[#b1b7cc] p-2 hover:border-primary-color"
        >
          <Image
            width="100%"
            height="100%"
            src={item}
            className="rounded-lg object-cover"
            alt="file"
            preview={{
              mask: (
                <div className="flex w-full items-center justify-evenly text-lg">
                  <EyeOutlined className="hover:text-primary-color" />
                  <div>
                    <DeleteOutlined
                      className="z-[100] hover:text-primary-color"
                      onClick={() => onRemove({ name: item })}
                    />
                  </div>
                </div>
              ),
            }}
          />
        </div>
      ))}
      <Upload
        customRequest={handleUpload}
        onRemove={onRemove}
        maxCount={20}
        accept={IMAGE_TYPES}
        showUploadList={false}
        className="flex items-center"
        {...restProps}
      >
        <div className="text-color-gray flex h-28 w-28 items-center justify-center rounded-lg border-2 border-dashed border-[#b1b7cc] text-[#b1b7cc] hover:border-primary-color hover:text-primary-color">
          {loading ? (
            <Spin />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <AddSVG width={24} height={24} />
              <span>Upload</span>
            </div>
          )}
        </div>
      </Upload>
    </div>
  );
}

export default UploadImages;
