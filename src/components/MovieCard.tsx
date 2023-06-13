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
      className='card flex flex-col h-[300px] hover:-translate-y-1 transition hover:border-green-300 border border-transparent box-content cursor-pointer'
    >
      <div
        style={{ backgroundImage: `url(${image})` }}
        className={`h-full w-full rounded-t-md bg-cover`}
      />
      <div className='h-full p-4'>
        <h3>{title}</h3>
      </div>
    </div>
  );
};
