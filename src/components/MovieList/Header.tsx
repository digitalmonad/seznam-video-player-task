import { ChangeEvent } from 'react';

export type TSortOptions = 'asc' | 'desc';

export type THeaderProps = {
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onSort: () => void;
  filteredMoviesLength: number;
  moviesLength: number;
  sortOptions: TSortOptions[];
};

export const Header = ({
  onSearch,
  onSort,
  sortOptions,
  filteredMoviesLength,
  moviesLength,
}: THeaderProps) => (
  <div className='flex items-center justify-between p-4'>
    <div className='w-[25%]'>
      {`Showing ${
        filteredMoviesLength === moviesLength ? 'all' : filteredMoviesLength
      } of ${moviesLength} movies`}
    </div>
    <input
      className='bg-gray-800 p-2 rounded w-[50%] my-10'
      placeholder='Search movie...'
      type='text'
      onChange={onSearch}
    />
    <div className='flex items-center w-[25%] justify-end'>
      Sort:
      <select className='bg-gray-800 p-2 rounded ml-2' onChange={onSort}>
        {sortOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  </div>
);
