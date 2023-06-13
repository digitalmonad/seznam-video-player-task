import { useQuery } from '@tanstack/react-query';
import { MovieList } from '../components/MovieList';

export const Root = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['videos'],
    queryFn: () =>
      fetch(import.meta.env.VITE_MOVIES_URsI as string).then((res) =>
        res.json()
      ),
  });

  console.log(error);

  return (
    <div className='h-full flex flex-col'>
      <div className='h-full '></div>
      <div className='h-full overflow-scroll flex'>
        <div className='flex flex-1 container mx-auto'>
          <MovieList
            movies={data}
            loading={isLoading}
            error={(error as any) && 'Something went wrong :('}
          />
        </div>
      </div>
    </div>
  );
};
