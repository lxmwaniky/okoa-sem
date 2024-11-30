import React, { useState, useEffect } from 'react';
import { getPapers, addPaper, updatePaper, deletePaper } from '../services/api';
import { Paper } from '../types/paper';
import toast from 'react-hot-toast';
import { PinForm } from './AdminPanel/PinForm';
import { AdminForm } from './AdminPanel/AdminForm';
import { PaperList } from './AdminPanel/PaperList';

const emptyFormData = {
  unitCode: '',
  yearTaken: '',
  unitTitle: '',
  fileLocation: '',
  classOfStudy: '',
};

export const AdminPanel: React.FC = () => {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [formData, setFormData] = useState(emptyFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPapers();
    }
  }, [isAuthenticated]);

  const fetchPapers = async () => {
    try {
      const data = await getPapers();
      setPapers(data);
    } catch (error) {
      console.error('Error fetching papers:', error);
      toast.error('Failed to fetch papers');
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '9999') {
      setIsAuthenticated(true);
      toast.success('Admin access granted');
    } else {
      toast.error('Invalid PIN');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEditing) {
        await updatePaper(formData.unitCode, formData.yearTaken, formData);
        toast.success('Paper updated successfully');
      } else {
        await addPaper(formData);
        toast.success('Paper added successfully');
      }
      setFormData(emptyFormData);
      setIsEditing(false);
      await fetchPapers();
    } catch (error: any) {
      console.error('Error submitting form:', error);
      toast.error(error.message || (isEditing ? 'Failed to update paper' : 'Failed to add paper'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (paper: Paper) => {
    const { _id, __v, ...editData } = paper;
    setFormData(editData);
    setIsEditing(true);
  };

  const handleDelete = async (unitCode: string, yearTaken: string) => {
    if (window.confirm('Are you sure you want to delete this paper?')) {
      setIsLoading(true);
      try {
        await deletePaper(unitCode, yearTaken);
        toast.success('Paper deleted successfully');
        await fetchPapers();
      } catch (error: any) {
        console.error('Error deleting paper:', error);
        toast.error(error.message || 'Failed to delete paper');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isAuthenticated) {
    return <PinForm pin={pin} setPin={setPin} onSubmit={handlePinSubmit} />;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <AdminForm
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isEditing={isEditing}
        isLoading={isLoading}
      />
      <PaperList
        papers={papers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
};