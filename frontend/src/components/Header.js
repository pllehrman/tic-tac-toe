import React from 'react';

const Header = () => {
    return (
        <div className='sticky top-0 bg-blue-500 text-white p-4'>
            <h1 className='text-xl font-bold'>Tic Tac Toe</h1>
            <div className='profile'>
                <span className='text-sm'> By Peter Lehrman </span>
            </div>

        </div>
    );
};
export default Header;