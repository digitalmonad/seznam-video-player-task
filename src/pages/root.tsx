import { useQuery } from '@tanstack/react-query';
import TVideoJsPlayer from 'video.js/dist/types/player';
import { MovieList } from '../components/MovieList';
import { Player } from '../components/Player';
import React from 'react';
import { v4 as uuid } from 'uuid';
import { TMovie } from '../types';

const videoJsOptions = {
  autoplay: false,
  controls: true,
  responsive: true,
  fluid: true,
  width: '20px',
};

const movieFetcher = () =>
  fetch(import.meta.env.VITE_MOVIES_URI as string)
    .then((res) => res.json())
    .then((movies) =>
      // Since API does not return movies with any unique id, we have to generate one ourselves
      movies.map((movie: Omit<TMovie, 'id'>) => ({ ...movie, id: uuid() }))
    );

export const Root = () => {
  const playerRef = React.useRef<TVideoJsPlayer | null>(null);

  const { isLoading, error, data } = useQuery<TMovie[]>({
    queryKey: ['videos'],
    queryFn: movieFetcher,
  });

  const handleMovieSelect = (id: string) => {
    const player = playerRef.current;

    if (player && data) {
      const video = data.filter((movie) => movie.id === id)?.[0];

      player.pause();

      player.src({
        src: video.manifestUri,
      });
      player.play();
    }
  };

  const handlePlayerReady = (player: TVideoJsPlayer) => {
    // Sets player reference for further processing
    playerRef.current = player;
  };

  return (
    <div className='h-full flex flex-col relative pt-4'>
      <div className='h-[40%]'>
        <div className='max-w-[650px] relative mx-auto'>
          <Player options={videoJsOptions} onReady={handlePlayerReady} />
        </div>
      </div>
      <div className='h-[60%] flex'>
        <div className='flex flex-1 container mx-auto'>
          <MovieList
            movies={data}
            loading={isLoading}
            error={(error as any) && 'Something went wrong :('}
            onMovieSelect={handleMovieSelect}
          />
        </div>
      </div>
    </div>
  );
};
