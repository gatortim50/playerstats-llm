import { useNavigate, useParams } from 'react-router-dom';
import { PlayerCard } from '../components/PlayerCard';
import { usePlayer } from '../hooks/usePlayer';
import StreamedData from '@/components/LLMStreamShower';

const Details: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data } = usePlayer(id || '');

  return (
    <div className="max-w-[1440px] mx-auto px-4 h-screen flex flex-col">
      <div className="bg-[#f0f0f0] text-black font-bold py-4 mt-4 cursor-pointer" onClick={() => navigate("/") }>
        <h1 className="text-center text-2xl font-bold">Player Stats</h1>
      </div>
      
      <main className="mt-6 flex-grow flex flex-col items-center mb-4 gap-4 overflow-hidden">
        <PlayerCard player={data}/>
        <StreamedData id={id || ''}/>
      </main>
    </div>
  );
};

export default Details;
