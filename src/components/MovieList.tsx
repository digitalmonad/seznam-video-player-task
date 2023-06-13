import { MovieCard } from '../components/MovieCard';
import loaderGif from '../assets/loader.gif';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';

export type TMovieListProps = {
  movies: { image: string; title: string }[];
  loading: boolean;
  error?: string;
  onMovieSelect: (id: string) => void;
};

export const MovieList = ({
  movies = [],
  loading,
  error,
  onMovieSelect,
}: TMovieListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  let content;

  const filteredMovies = useMemo(() => {
    if (movies) {
      return movies.filter((movie) => {
        return movie?.name
          .toLowerCase()
          .includes(searchTerm.toLocaleLowerCase());
      });
    } else {
      return [];
    }
  }, [movies, searchTerm]);

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

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
        <div className='grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4 gap-y-6 pt-4'>
          {filteredMovies.map((item, index) => (
            <MovieCard
              key={item.id}
              image={item.iconUri}
              title={item.name}
              id={item.id}
              onMovieSelect={() => onMovieSelect(item.id)}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-1'>
      <div className='pt-4 flex flex-1 flex-col'>
        <div className='flex items-center justify-between'>
          <input
            className='bg-gray-800 p-2 rounded w-[50%] my-10'
            placeholder='Search movie...'
            type='text'
            onChange={handleSearch}
          />
          <div>Movies count: {`${filteredMovies.length}`}</div>
        </div>
        {content}
      </div>
    </div>
  );
};
