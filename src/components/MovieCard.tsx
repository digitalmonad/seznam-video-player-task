export type TMovieCardProps = {
  image: string;
  title: string;
};

export const MovieCard = ({ image, title }: TMovieCardProps) => {
  return (
    <div className='card flex flex-col h-[300px] hover:-translate-y-1 transition hover:border-green-300 border border-transparent box-content cursor-pointer'>
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
