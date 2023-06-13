import { MovieCard } from '../components/MovieCard';
import loaderGif from '../assets/loader.gif';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { TMovie } from '../types';
import debounce from 'lodash.debounce';

const sortOptions: TSortOptions[] = ['asc', 'desc'];

type TSortOptions = 'asc' | 'desc';

export type TMovieListProps = {
  movies: TMovie[] | undefined;
  loading: boolean;
  error?: string;
  onMovieSelect: (id: string) => void;
  sort?: TSortOptions;
};

export const MovieList = ({
  movies = [],
  sort: defaultSort = 'asc',
  loading,
  error,
  onMovieSelect,
}: TMovieListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState<TSortOptions>(defaultSort);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      return movie?.name.toLowerCase().includes(searchTerm.toLocaleLowerCase());
    });
  }, [movies, searchTerm]);

  const sortedMovies = useMemo(
    () =>
      filteredMovies.sort((a, b) =>
        sort === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      ),
    [filteredMovies, sort]
  );

  const handleSearch = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    }, 300),
    []
  );

  const handleSort = useCallback(() => {
    setSort((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  }, []);

  let content;

  if (loading) {
    content = (
      <div className='flex-1 flex flex-col justify-center items-center'>
        <img className='w-10 h-10 mb-4' src={loaderGif} />
        Loading movies...
      </div>
    );
  }

  if (error) {
    content = (
      <div className='flex-1 flex flex-col justify-center items-center'>
        <div className='text-4xl'>!</div>
        {error}
      </div>
    );
  }

  if (filteredMovies.length < 1) {
    content = (
      <div className='flex flex-1 justify-center items-center'>
        Mo movies matching the search criteria
      </div>
    );
  }

  if (!loading && !error && filteredMovies.length > 0) {
    content = (
      <div className='overflow-scroll flex mb-4'>
        <div className='grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4 gap-y-16 pt-4'>
          {sortedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              image={movie.iconUri}
              title={movie.name}
              id={movie.id}
              onMovieSelect={() => onMovieSelect(movie.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-1'>
      <div className='flex flex-1 flex-col'>
        <div className='flex items-center justify-between p-4'>
          <div className='w-[25%]'>
            {`Showing ${filteredMovies.length} of ${movies.length} movies`}
          </div>
          <input
            className='bg-gray-800 p-2 rounded w-[50%] my-10'
            placeholder='Search movie...'
            type='text'
            onChange={handleSearch}
          />
          <div className='flex items-center w-[25%] justify-end'>
            Sort:
            <select
              className='bg-gray-800 p-2 rounded ml-2'
              onChange={handleSort}
            >
              {sortOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        {content}
      </div>
    </div>
  );
};
