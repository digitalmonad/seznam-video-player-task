import { MovieCard } from '../components/MovieCard';
import loaderGif from '../assets/loader.gif';

export type TMovieListProps = {
  movies: { image: string; title: string }[];
  loading: boolean;
  error?: string;
};

export const MovieList = ({ movies, loading, error }: TMovieListProps) => {
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

  if (!loading && !error) {
    content = (
      <div className='grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-5 gap-4 gap-y-6 pt-4'>
        {movies.map((item) => (
          <MovieCard image={item.iconUri} title={item.name} />
        ))}
      </div>
    );
  }

  return <div className='flex flex-1'>{content}</div>;
};
