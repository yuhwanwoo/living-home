import React from 'react';

interface JournalProps {
  onClose: () => void;
}

const Journal: React.FC<JournalProps> = ({ onClose }) => {
  console.log('Journal component rendered!');
  return (
    <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-8 z-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">기록장</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          X
        </button>
      </div>
      <textarea
        className="w-full h-5/6 p-4 border rounded-lg"
        placeholder="여기에 기록을 남겨보세요..."
      ></textarea>
    </div>
  );
};

export default Journal;
