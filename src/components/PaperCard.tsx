import React from 'react';
import { Download } from 'lucide-react';
import { Paper } from '../types/paper';

interface PaperCardProps {
  paper: Paper;
}

export const PaperCard: React.FC<PaperCardProps> = ({ paper }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{paper.unitTitle}</h3>
          <p className="text-gray-600 mt-1">Unit Code: {paper.unitCode}</p>
          <p className="text-gray-600">Year: {paper.yearTaken}</p>
          <p className="text-gray-600">Class: {paper.classOfStudy}</p>
        </div>
        <a
          href={paper.fileLocation}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download className="h-4 w-4" />
          Download
        </a>
      </div>
    </div>
  );
};