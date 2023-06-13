import { useQuery } from '@tanstack/react-query';
import { MovieList } from '../components/MovieList';
import VideoJSPlayerComponent from '../components/Player';
import React from 'react';
import { v4 as uuid } from 'uuid';
export const Root = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['videos'],
    queryFn: () =>
      fetch(import.meta.env.VITE_MOVIES_URI as string)
        .then((res) => res.json())
        .then((movies) => movies.map((movie) => ({ ...movie, id: uuid() }))),
  });

  const playerRef = React.useRef(null);

  const handleMovieSelect = (id) => {
    const player = playerRef.current;
    const video = data.filter((item) => item.id === id)?.[0];
    player.src([
      {
        src: video.manifestUri,
      },
    ]);
    player.play();
  };

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      videojs.log('player is waiting');
    });

    player.on('dispose', () => {
      videojs.log('player will dispose');
    });
  };

  return (
    <div className='h-full flex flex-col relative pt-4'>
      <div className='h-[40%]'>
        <div className='max-w-[650px] relative mx-auto'>
          <VideoJSPlayerComponent
            options={videoJsOptions}
            onReady={handlePlayerReady}
          />
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
