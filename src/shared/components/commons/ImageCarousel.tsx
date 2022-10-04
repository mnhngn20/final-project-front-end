import { Carousel, Empty, Image } from 'antd';
import { useRef, useState } from 'react';
import { CarouselRef } from 'antd/lib/carousel';
import { EyeSVG, LeftSVG, RightSVG } from '#/assets/svgs';

interface Props {
  images: (string | undefined)[];
  height?: number | string;
  width?: number | string;
}

const ImageCarousel = ({ images, height = 400, width = '100%' }: Props) => {
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [imgVisible, setImgVisible] = useState(false);
  const carouselRef = useRef<CarouselRef | null>(null);

  const onClickNextImage = () => {
    carouselRef?.current?.next();
  };

  const onClickPrevImage = () => {
    carouselRef?.current?.prev();
  };

  return (
    <Carousel
      draggable
      afterChange={currentImage => setSelectedImage(currentImage)}
      ref={carouselRef}
    >
      {images?.[0] ? (
        images?.map((src, index) => (
          <div key={index}>
            <div className="relative" style={{ height }}>
              {index === selectedImage && (
                <div className="hidden">
                  <Image
                    height={0}
                    width={0}
                    src={src}
                    preview={{
                      visible: imgVisible && index === selectedImage,
                      onVisibleChange: value => setImgVisible(value),
                    }}
                  />
                </div>
              )}
              <div className="absolute z-40 flex  h-full w-full items-center justify-between">
                <div
                  className="ml-4 flex items-center justify-center rounded-full bg-[black] bg-opacity-50 text-[white] hover:bg-opacity-80 "
                  onClick={() => onClickPrevImage()}
                  style={{
                    width: 35,
                    height: 35,
                  }}
                >
                  <LeftSVG width={24} height={24} />
                </div>
                <div
                  className="mr-4 flex items-center justify-center rounded-full bg-[black] bg-opacity-50 text-xl text-[white] hover:bg-opacity-80"
                  onClick={() => onClickNextImage()}
                  style={{
                    width: 35,
                    height: 35,
                  }}
                >
                  <RightSVG width={24} height={24} />
                </div>
              </div>
              <p className="absolute right-0 bottom-0 z-50 mr-4 flex items-center gap-4 rounded-xl bg-[black] bg-opacity-50 px-4 py-2 text-[white] hover:bg-opacity-80">
                {`${selectedImage + 1} / ${images?.length}`}
                <EyeSVG
                  width={18}
                  height={18}
                  className="cursor-pointer"
                  onClick={() => setImgVisible(true)}
                />
              </p>
              <Image
                src={src}
                height={height}
                width={width}
                className="rounded-xl object-cover"
                preview={false}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-xl bg-[white] p-4">
          <Empty description="No image available" />
        </div>
      )}
    </Carousel>
  );
};

export default ImageCarousel;
