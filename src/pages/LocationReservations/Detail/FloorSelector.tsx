interface FloorSelectorProps {
  numOfFloor?: number;
  value?: number;
  onChange?: (floor: number) => void;
}

export default function FloorSelector({
  numOfFloor = 1,
  value = 1,
  onChange,
}: FloorSelectorProps) {
  const renderFloor = () => {
    const floor: JSX.Element[] = [];
    for (let i = 1; i <= numOfFloor; i++) {
      floor.push(
        <div
          className={`flex h-4 w-4 cursor-pointer items-center justify-center rounded-xl border border-grey-secondary-200 p-4 transition-all hover:border-primary-color hover:bg-primary-color hover:text-[white] active:bg-opacity-90 ${
            value === i
              ? 'border-primary-color bg-primary-color text-[white]'
              : ''
          }`}
          onClick={() => onChange?.(i)}
        >
          {i}
        </div>,
      );
    }

    return floor;
  };

  return <div className="flex items-center gap-4">{renderFloor()}</div>;
}
