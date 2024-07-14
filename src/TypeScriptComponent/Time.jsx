import React, { useState } from 'react';

const Time = () => {
  const [time, setTime] = useState('');
  const [hours, setHours] = useState('03');
  const [minutes, setMinutes] = useState('03');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleTimeChange = () => {
    setTime(`${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block">
      <input
        type="text"
        value={time}
        placeholder="HH:MM"
        className="w-24 text-center p-2 border border-gray-300 rounded"
        onFocus={() => setIsDropdownOpen(true)}
        readOnly
      />
      {isDropdownOpen && (
        <div className="absolute bg-white border border-gray-300 p-2 mt-1 z-10">
          <select
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="mr-2 p-1 border border-gray-300 rounded"
          >
            {Array.from({ length: 24 }, (_, i) => (
              <option key={i} value={i.toString().padStart(2, '0')}>
                {i.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
          :
          <select
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="ml-2 p-1 border border-gray-300 rounded"
          >
            {Array.from({ length: 60 }, (_, i) => (
              <option key={i} value={i.toString().padStart(2, '0')}>
                {i.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
          <button
            onClick={handleTimeChange}
            className="ml-4 p-1 bg-blue-500 text-white rounded"
          >
            Set
          </button>
        </div>
      )}
    </div>
  );
};

export default Time;
