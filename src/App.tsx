import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Settings } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { SearchBar } from './components/SearchBar';
import { PaperCard } from './components/PaperCard';
import { AdminPanel } from './components/AdminPanel';
import { getPapers, searchPapers } from './services/api';
import { Paper } from './types/paper';

function App() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const data = await getPapers();
      setPapers(data);
    } catch (error) {
      console.error('Failed to fetch papers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    try {
      if (query) {
        const data = await searchPapers(query);
        setPapers(data);
      } else {
        await fetchPapers();
      }
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-800">Okoa Sem Embuni</span>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
                <Link to="/admin" className="flex items-center text-gray-600 hover:text-gray-900">
                  <Settings className="h-5 w-5 mr-1" />
                  Admin
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/admin" element={<AdminPanel />} />
          <Route
            path="/"
            element={
              <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Past Papers Repository</h1>
                  <p className="text-lg text-gray-600 mb-8">
                    Access and download past examination papers easily
                  </p>
                  <SearchBar onSearch={handleSearch} />
                </div>

                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {papers.map((paper) => (
                      <PaperCard key={paper._id} paper={paper} />
                    ))}
                  </div>
                )}
              </main>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;