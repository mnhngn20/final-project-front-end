import { SearchSVG } from '#/assets/svgs';

function SearchInput() {
  return (
    <div className="cursor-pointer rounded-full bg-grey-primary p-3">
      <SearchSVG width={24} height={24} />
    </div>
  );
}

export default SearchInput;
