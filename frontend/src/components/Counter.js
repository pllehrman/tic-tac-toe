import React, { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0)

    return(
        <div className= "text-center">
            <h2 className= "text-2x1 font-bold mb-4"> Counter</h2>
            <p className="text-lg mb-4">Count: {count}</p>
            <button
                className='bg-blue-500 text-white px-4 py-2 rounded mr-2'
                onClick={() => setCount(count + 1)}
            >
                Increment
            </button>
            <button 
                className="bg-red-500 text-white p-4 py-2 rounded"
                onClick={() => setCount(count - 1)}
                >
                Decrement
            </button>
        </div>
    );
};

export default Counter;


