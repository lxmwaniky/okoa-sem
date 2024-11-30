import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Paper } from '../../types/paper';

interface PaperListProps {
  papers: Paper[];
  onEdit: (paper: Paper) => void;
  onDelete: (unitCode: string, yearTaken: string) => void;
  isLoading: boolean;
}

export const PaperList: React.FC<PaperListProps> = ({ papers, onEdit, onDelete, isLoading }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Existing Papers</h3>
      <div className="grid gap-4">
        {papers.map((paper) => (
          <div
            key={paper._id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center"
          >
            <div>
              <h4 className="font-medium">{paper.unitTitle}</h4>
              <p className="text-sm text-gray-600">
                {paper.unitCode} - {paper.yearTaken} - {paper.classOfStudy}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(paper)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                title="Edit paper"
                disabled={isLoading}
              >
                <Pencil className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(paper.unitCode, paper.yearTaken)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                title="Delete paper"
                disabled={isLoading}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};