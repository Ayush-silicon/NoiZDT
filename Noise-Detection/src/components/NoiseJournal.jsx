import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, AlertTriangle, Trash2, Pencil, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Sample journal data (would come from API/localStorage in real implementation)
const generateSampleJournalData = () => {
  const now = new Date();
  const entries = [];
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    // Skip some days for realism
    if (Math.random() > 0.7) continue;
    
    const entry = {
      id: `entry-${i}`,
      date: date.toISOString(),
      location: {
        name: ['Home', 'Work', 'Commute', 'Park', 'Café', 'Restaurant'][Math.floor(Math.random() * 6)],
        coordinates: { lat: 40.7 + Math.random() * 0.1, lng: -74 + Math.random() * 0.1 }
      },
      exposures: [
        {
          id: `exp-${i}-1`,
          time: new Date(date).setHours(9 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60)),
          duration: Math.floor(Math.random() * 120) + 30, // 30-150 mins
          level: Math.floor(Math.random() * 40) + 40, // 40-80 dB
          source: ['Traffic', 'Construction', 'People', 'Music', 'Industrial'][Math.floor(Math.random() * 5)],
          notes: ''
        }
      ],
      healthNotes: Math.random() > 0.7 ? 'Felt tired after prolonged exposure' : '',
      summary: {
        average: Math.floor(Math.random() * 20) + 50,
        max: Math.floor(Math.random() * 20) + 70,
        duration: Math.floor(Math.random() * 360) + 60
      }
    };
    
    // Add more exposures for some days
    if (Math.random() > 0.5) {
      entry.exposures.push({
        id: `exp-${i}-2`,
        time: new Date(date).setHours(14 + Math.floor(Math.random() * 6), Math.floor(Math.random() * 60)),
        duration: Math.floor(Math.random() * 90) + 15, // 15-105 mins
        level: Math.floor(Math.random() * 40) + 40, // 40-80 dB
        source: ['Traffic', 'Construction', 'People', 'Music', 'Industrial'][Math.floor(Math.random() * 5)],
        notes: ''
      });
      
      // Recalculate summary based on multiple exposures
      const levels = entry.exposures.map(exp => exp.level);
      entry.summary.average = Math.floor(levels.reduce((a, b) => a + b, 0) / levels.length);
      entry.summary.max = Math.max(...levels);
      entry.summary.duration = entry.exposures.reduce((total, exp) => total + exp.duration, 0);
    }
    
    entries.push(entry);
  }
  
  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const WeeklyChart = ({ journalData }) => {
  // Process data for the chart - last 7 days with entries
  const chartData = journalData.slice(0, 7).map(entry => {
    const date = new Date(entry.date);
    return {
      name: date.toLocaleDateString(undefined, { weekday: 'short' }),
      average: entry.summary.average,
      max: entry.summary.max,
      fullDate: date.toLocaleDateString()
    };
  }).reverse();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="font-medium">{payload[0].payload.fullDate}</p>
          <div className="mt-1">
            <p className="text-xs">
              <span className="font-medium">Average:</span> {payload[0].value} dB
            </p>
            <p className="text-xs">
              <span className="font-medium">Max:</span> {payload[1].value} dB
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
          <XAxis dataKey="name" />
          <YAxis domain={[30, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="average" name="Average (dB)" fill="#8884d8" />
          <Bar dataKey="max" name="Max (dB)" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const JournalEntry = ({ entry, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(entry.healthNotes);
  
  const handleSaveNotes = () => {
    onUpdate(entry.id, { healthNotes: editedNotes });
    setIsEditing(false);
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const getLevelClass = (level) => {
    if (level < 50) return 'bg-green-100 text-green-800';
    if (level < 65) return 'bg-yellow-100 text-yellow-800';
    if (level < 80) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };
  
  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours} hr ${mins} min` : `${hours} hr`;
  };
  
  return (
    <Card className="mb-6 overflow-hidden">
      <div className="border-b bg-gray-50 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
          <h3 className="font-medium">{formatDate(entry.date)}</h3>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={() => onDelete(entry.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Average Exposure</h4>
            <div className="flex items-baseline">
              <span className={`text-2xl font-bold ${
                entry.summary.average < 65 ? 'text-green-600' : 
                entry.summary.average < 80 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {entry.summary.average}
              </span>
              <span className="ml-1 text-gray-500">dB</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Max Level</h4>
            <div className="flex items-baseline">
              <span className={`text-2xl font-bold ${
                entry.summary.max < 65 ? 'text-green-600' : 
                entry.summary.max < 80 ? 'text-yellow-600' : 'text-red-600'
              }`}>
                {entry.summary.max}
              </span>
              <span className="ml-1 text-gray-500">dB</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-gray-500 mb-1">Total Duration</h4>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-700">
                {formatDuration(entry.summary.duration)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Location */}
        <div className="flex items-center mb-4">
          <div className="bg-noise-50 p-2 rounded-lg mr-2">
            <MapPin className="h-5 w-5 text-noise-500" />
          </div>
          <div>
            <p className="font-medium">{entry.location.name}</p>
            <p className="text-xs text-gray-500">
              {entry.location.coordinates.lat.toFixed(4)}, {entry.location.coordinates.lng.toFixed(4)}
            </p>
          </div>
        </div>
        
        {/* Exposures */}
        <h4 className="font-medium mb-2">Noise Exposures</h4>
        <div className="space-y-3 mb-4">
          {entry.exposures.map(exposure => (
            <div key={exposure.id} className="border border-gray-100 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm">{formatTime(exposure.time)}</span>
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-sm">{formatDuration(exposure.duration)}</span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelClass(exposure.level)}`}>
                  {exposure.level} dB
                </span>
              </div>
              <p className="text-sm mt-2">
                <span className="font-medium">Source:</span> {exposure.source}
              </p>
              {exposure.notes && (
                <p className="text-sm mt-1 text-gray-600">{exposure.notes}</p>
              )}
            </div>
          ))}
        </div>
        
        {/* Health Notes */}
        <div>
          <h4 className="font-medium mb-2 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-1 text-yellow-500" />
            Health Impact Notes
          </h4>
          
          {isEditing ? (
            <div>
              <textarea
                value={editedNotes}
                onChange={(e) => setEditedNotes(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg h-20 text-sm"
                placeholder="Add notes about how noise affected you today..."
              />
              <div className="flex justify-end mt-2">
                <Button 
                  size="sm" 
                  onClick={handleSaveNotes}
                  className="bg-noise-500 hover:bg-noise-600"
                >
                  <Save className="h-4 w-4 mr-1" />
                  Save Notes
                </Button>
              </div>
            </div>
          ) : entry.healthNotes ? (
            <p className="text-sm text-gray-700 p-2 bg-yellow-50 rounded-lg">
              {entry.healthNotes}
            </p>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No health impact notes for this day.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

const NoiseJournal = () => {
  const [journalEntries, setJournalEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching journal data
    setTimeout(() => {
      const data = generateSampleJournalData();
      setJournalEntries(data);
      setLoading(false);
    }, 1000);
  }, []);
  
  const handleDeleteEntry = (entryId) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      setJournalEntries(journalEntries.filter(entry => entry.id !== entryId));
    }
  };
  
  const handleUpdateEntry = (entryId, updates) => {
    setJournalEntries(journalEntries.map(entry => 
      entry.id === entryId ? { ...entry, ...updates } : entry
    ));
  };
  
  // Stats for the past month
  const calculateMonthlyStats = () => {
    if (journalEntries.length === 0) return { avg: 0, max: 0, duration: 0 };
    
    const sum = journalEntries.reduce((total, entry) => total + entry.summary.average, 0);
    const avg = Math.round(sum / journalEntries.length);
    
    const max = Math.max(...journalEntries.map(entry => entry.summary.max));
    
    const duration = journalEntries.reduce((total, entry) => total + entry.summary.duration, 0);
    
    return { avg, max, duration };
  };
  
  const monthlyStats = calculateMonthlyStats();
  
  return (
    <div className="py-6">
      <Card className="p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6">Your Noise Journal</h2>
        
        {loading ? (
          <div className="py-10 text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 w-32 bg-gray-200 rounded mb-3"></div>
              <div className="h-3 w-40 bg-gray-100 rounded"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-noise-50 border border-noise-100 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Monthly Average</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-noise-700">{monthlyStats.avg}</span>
                  <span className="ml-1 text-noise-600">dB</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Average noise exposure over the past month
                </p>
              </div>
              
              <div className="bg-noise-50 border border-noise-100 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Highest Exposure</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-red-500">{monthlyStats.max}</span>
                  <span className="ml-1 text-red-400">dB</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Maximum noise level recorded in past month
                </p>
              </div>
              
              <div className="bg-noise-50 border border-noise-100 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Exposure Time</h3>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-noise-700">
                    {Math.floor(monthlyStats.duration / 60)}
                  </span>
                  <span className="ml-1 text-noise-600">hours</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Cumulative noise exposure duration
                </p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-4">Weekly Noise Exposure</h3>
              <WeeklyChart journalData={journalEntries} />
            </div>
            
            <h3 className="text-lg font-medium mb-4">Journal Entries</h3>
            {journalEntries.length > 0 ? (
              journalEntries.map(entry => (
                <JournalEntry 
                  key={entry.id} 
                  entry={entry} 
                  onDelete={handleDeleteEntry}
                  onUpdate={handleUpdateEntry}
                />
              ))
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No journal entries yet.</p>
                <p className="text-sm text-gray-400 mt-1">
                  Start recording noise exposure to build your journal.
                </p>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

export default NoiseJournal;