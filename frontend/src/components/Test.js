import React from 'react';

const TestComponent = () => {
  return (
    <div className="p-4 max-w-md mx-auto bg-blue-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-blue-700">Tailwind CSS Test</h1>
      <p className="mt-2 text-blue-600">
        If you can see this component styled with a blue background, rounded corners, and shadow, then Tailwind CSS is working correctly!
      </p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700">
        Click Me
      </button>
    </div>
  );
};

export default TestComponent;
