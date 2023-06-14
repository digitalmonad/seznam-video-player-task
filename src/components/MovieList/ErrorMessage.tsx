export type TErrorMessageProps = {
  message: string;
};
export const ErrorMessage = ({ message }: TErrorMessageProps) => (
  <div className='flex-1 flex flex-col justify-center items-center'>
    <div className='text-4xl'>!</div>
    {message}
  </div>
);
