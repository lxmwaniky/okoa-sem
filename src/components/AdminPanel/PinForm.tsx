import React from 'react';

interface PinFormProps {
  pin: string;
  setPin: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent) => void;
}

export const PinForm: React.FC<PinFormProps> = ({ pin, setPin, onSubmit }) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
      <form onSubmit={onSubmit}>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter PIN"
          className="w-full px-4 py-2 mb-4 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Access Admin Panel
        </button>
      </form>
    </div>
  );
};