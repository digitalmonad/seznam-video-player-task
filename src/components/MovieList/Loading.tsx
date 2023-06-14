import loaderGif from '../../assets/loader.gif';

export const Loading = () => (
  <div className='flex-1 flex flex-col justify-center items-center'>
    <img className='w-10 h-10 mb-4' src={loaderGif} />
    Loading movies...
  </div>
);
