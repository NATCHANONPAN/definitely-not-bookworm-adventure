import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='background'>
      <div className='text-9xl'>Definitely Not Bookworm Adventure</div>
      <button className=''>
        <Link to='/game'>Start</Link>
      </button>
    </div>
  );
}
