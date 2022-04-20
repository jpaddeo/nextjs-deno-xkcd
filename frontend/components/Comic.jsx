import Image from 'next/image';

const Comic = ({
  id,
  title,
  alt,
  img,
  width,
  height,
  hover = true,
  showLinks = true,
}) => {
  return (
    <div
      className={`card w-auto h-full bg-base-100 shadow-xl ${
        hover ? 'hover:bg-base-300' : ''
      }`}
    >
      <div className='card-body items-center'>
        <h2 className='card-title'>{title}</h2>
        <figure className='p-2'>
          <Image
            layout='intrinsic'
            objectFit='contain'
            width={width}
            height={height}
            src={img}
            alt={alt}
          />
        </figure>
        {/* <p>{alt}</p> */}
      </div>

      {showLinks && (
        <span className='flex flex-row items-center justify-center space-x-1'>
          <h2 className='font-bold uppercase'>Image URL:</h2>
          <a href={img} alt={alt} target='_blank' rel="nofollow noopener noreferrer">
            {img}
          </a>
        </span>
      )}
      {showLinks && (
        <span className='flex flex-row items-center justify-center space-x-1'>
          <h2 className='font-bold uppercase'>Permanent Link:</h2>
          <a href={`/comic/${id}`} alt={alt} target='_blank' rel="nofollow noopener noreferrer">
            {`${process.env.NEXT_PUBLIC_URL}/comic/${id}`}
          </a>
        </span>
      )}
    </div>
  );
};

export default Comic;
