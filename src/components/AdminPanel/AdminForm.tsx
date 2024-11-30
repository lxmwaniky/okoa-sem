import React from 'react';
import { Paper } from '../../types/paper';

interface AdminFormProps {
  formData: Omit<Paper, '_id' | '__v'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<Paper, '_id' | '__v'>>>;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isEditing: boolean;
  isLoading: boolean;
}

export const AdminForm: React.FC<AdminFormProps> = ({ 
  formData, 
  setFormData, 
  onSubmit, 
  isEditing,
  isLoading 
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Unit Code</label>
        <input
          type="text"
          value={formData.unitCode}
          onChange={(e) => setFormData({ ...formData, unitCode: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Year Taken</label>
        <input
          type="text"
          value={formData.yearTaken}
          onChange={(e) => setFormData({ ...formData, yearTaken: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Unit Title</label>
        <input
          type="text"
          value={formData.unitTitle}
          onChange={(e) => setFormData({ ...formData, unitTitle: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">File Location</label>
        <input
          type="url"
          value={formData.fileLocation}
          onChange={(e) => setFormData({ ...formData, fileLocation: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
          disabled={isLoading}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Class of Study</label>
        <input
          type="text"
          value={formData.classOfStudy}
          onChange={(e) => setFormData({ ...formData, classOfStudy: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
          disabled={isLoading}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : (isEditing ? 'Update Paper' : 'Add Paper')}
      </button>
    </form>
  );
};