export type TMovieCardProps = {
  image: string;
  title: string;
  id: string;
  onMovieSelect: () => void;
};

export const MovieCard = ({ image, title, onMovieSelect }: TMovieCardProps) => {
  return (
    <div
      onClick={() => onMovieSelect()}
      className='card flex flex-col h-[240px] hover:-translate-y-1 transition hover:border-green-300 border border-transparent box-content cursor-pointer'
    >
      <div
        style={{ backgroundImage: `url(${image})` }}
        className={`h-full bg-gray-700 w-full rounded-t-md bg-cover`}
      ></div>
      <div className='h-[50%] p-4'>
        <h3 className='truncate'>{title}</h3>
      </div>
    </div>
  );
};
