import ChatRoom from '../components/ChatRoom';
import TaskBoard from '../components/TaskBoard';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      {user ? (
        <>
          <ChatRoom />
          <TaskBoard />
        </>
      ) : (
        <p className="text-center text-gray-600">Please log in to access the chat and task board.</p>
      )}
    </div>
  );
};

export default Home;
