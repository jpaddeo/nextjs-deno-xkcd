import Image from 'next/image';

const Comic = ({ title, alt, img, width, height, hover = true }) => {
  return (
    <div
      className={`card w-auto h-full bg-base-100 shadow-xl ${
        hover ? 'hover:bg-base-300 hover:scale-95' : ''
      }`}
    >
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p>{alt}</p>
      </div>
      <figure className='p-2'>
        <Image
          width='300'
          height='300'
          layout='intrinsic'
          objectFit='contain'
          src={img}
          alt={alt}
        />
      </figure>
      <span className='text-center'>{img}</span>
    </div>
  );
};

export default Comic;
