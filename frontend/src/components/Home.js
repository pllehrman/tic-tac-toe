import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
    const [games, setGames] = useState([]);
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const fetchGames = async () => {
        if (!isActive) return; // Skip fetching if the user is inactive
        try {
            const response = await axios.get(`${apiUrl}/games`);
            setGames(response.data);
        } catch (error) {
            console.error('Error fetching games:', error);
        }
        };

        fetchGames();
        const intervalId = setInterval(fetchGames, 5000);

        // Event listener to detect user activity
        const handleUserActivity = () => setIsActive(true);
        document.addEventListener('mousemove', handleUserActivity);
        document.addEventListener('click', handleUserActivity);
        document.addEventListener('keydown', handleUserActivity);

        // Set a timer to mark the user as inactive after a period of inactivity
        const inactivityTimer = setTimeout(() => setIsActive(false), 10000); // 10 seconds of inactivity

        // Clean up
        return () => {
        clearInterval(intervalId);
        clearTimeout(inactivityTimer);
        document.removeEventListener('mousemove', handleUserActivity);
        document.removeEventListener('click', handleUserActivity);
        document.removeEventListener('keydown', handleUserActivity);
        };
    }, [isActive]);

    const startNewGame = () => {
        navigate('/tictactoe');
    };

    const viewGame = (gameId) => {
        navigate(`/tictactoe/${gameId}`);
    };

    const deleteGames = async () => {
        try {
          const response = await axios.delete(`${apiUrl}/games`);
          setGames([]);
        } catch (error){
          console.log('Error in deleting the games.', error)
        }
    };

    const signUp = async () => {
        navigate('/signup')
    }
    

    return (
        <div className="overflow-auto">
            <button
                onClick={deleteGames}
                className="absolute top-28 right-10 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Delete Game History
            </button>
            <button
                onClick={signUp}
                className="absolute top-28 left-10 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
                Sign Up
            </button>
            <div className="home flex flex-col items-center justify-center min-h-screen bg-gray-100 overflow-y-auto">
            <button
                onClick={startNewGame}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            >
                Start New Game
            </button>
            <div className="w-full max-w-md">
                <ul className="bg-white rounded-lg border border-gray-200 text-gray-900">
                {games.map((game) => (
                    <li key={game.id} className="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg">
                    Game {game.id}: {game.winner} won
                    <button
                        onClick={() => viewGame(game.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-4"
                    >
                        View
                    </button>
                    </li>
                ))}
                </ul>
            </div>
            </div>
        </div>
    );
};

export default Home;