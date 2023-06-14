import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { Loading } from './Loading';
import { ErrorMessage } from './ErrorMessage';
import { Card } from './Card';
import { SearchNoMatch } from './SearchNoMatch';

import { TMovie } from '../../types';
import { Header, TSortOptions } from './Header';

const sortOptions: TSortOptions[] = ['asc', 'desc'];

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
      return movie?.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [movies, searchTerm]);

  const sortedMovies = useMemo(
    () =>
      [...filteredMovies].sort((a, b) =>
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
    content = <Loading />;
  }

  if (error) {
    content = <ErrorMessage message={error} />;
  }

  if (filteredMovies.length < 1) {
    content = <SearchNoMatch />;
  }

  if (!loading && !error && filteredMovies.length > 0) {
    content = (
      <div className='overflow-scroll flex mb-4'>
        <div className='grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4 gap-y-16 pt-4'>
          {sortedMovies.map((movie) => (
            <Card
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
        <Header
          filteredMoviesLength={filteredMovies.length}
          moviesLength={movies.length}
          onSearch={handleSearch}
          onSort={handleSort}
          {...{ sortOptions }}
        />
        {content}
      </div>
    </div>
  );
};
