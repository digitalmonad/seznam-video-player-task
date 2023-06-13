import { useQuery } from '@tanstack/react-query';
import { MovieList } from '../components/MovieList';
import VideoJSPlayerComponent from '../components/Player';
import React from 'react';
import { v4 as uuid } from 'uuid';
export const Root = () => {
  const [currentVideo, setCurrentVideo] = React.useState();

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
    sources: [
      {
        src: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths/dash.mpd',
        // type: 'video/mp4',
      },
    ],
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
    <div className='h-full flex flex-col relative'>
      <div className='h-full'>
        <div className='max-w-[940px] relative mx-auto p-4'>
          <VideoJSPlayerComponent
            options={videoJsOptions}
            onReady={handlePlayerReady}
          />
        </div>
      </div>
      <div className='h-full overflow-scroll flex'>
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
