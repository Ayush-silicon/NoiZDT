import React, { useState } from 'react';
import { Mic, Send, X, Volume2, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const NoiseCategories = [
  { id: 'traffic', label: 'Traffic', icon: '🚗' },
  { id: 'construction', label: 'Construction', icon: '🏗️' },
  { id: 'people', label: 'People', icon: '👥' },
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'industrial', label: 'Industrial', icon: '🏭' },
  { id: 'natural', label: 'Natural', icon: '🌳' },
  { id: 'other', label: 'Other', icon: '❓' },
];

const ReportForm = ({ isOpen, onClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [noiseLevel, setNoiseLevel] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);

  // Simulate recording noise with microphone
  const toggleRecording = () => {
    if (isRecording) {
      // Simulate stopping the recording
      setIsRecording(false);
      
      // Simulate a noise level result
      const simulatedLevel = Math.floor(Math.random() * 50) + 40;
      setNoiseLevel(simulatedLevel);
    } else {
      // Simulate starting the recording
      setIsRecording(true);
      setNoiseLevel(null);
      
      // Simulate a recording process
      setTimeout(() => {
        toggleRecording();
      }, 2000);
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          toast({
            title: "Location detected",
            description: "Your current location has been added to the report.",
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location error",
            description: "Could not detect your location. Please try again.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation.",
        variant: "destructive",
      });
    }
  };

  const submitReport = () => {
    // Validate the form
    if (!noiseLevel) {
      toast({
        title: "Missing noise level",
        description: "Please record the noise level first.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedCategory) {
      toast({
        title: "Missing category",
        description: "Please select a noise category.",
        variant: "destructive",
      });
      return;
    }

    if (!location) {
      toast({
        title: "Missing location",
        description: "Please detect your location first.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would send this data to your backend
    const reportData = {
      noiseLevel,
      category: selectedCategory,
      description,
      location,
      timestamp: new Date().toISOString(),
    };

    console.log("Submitting noise report:", reportData);

    // Show success message
    toast({
      title: "Report submitted!",
      description: "Thank you for contributing to the noise map.",
    });

    // Reset form
    setNoiseLevel(null);
    setSelectedCategory(null);
    setDescription('');
    setLocation(null);
    
    // Close the form
    onClose();
  };

  // Only render if isOpen is true
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Report Noise</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          {/* Noise level recording */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Noise Level
            </label>
            <div className="flex items-center justify-center flex-col">
              <Button
                className={`rounded-full w-14 h-14 mb-2 ${isRecording ? 'bg-red-500 hover:bg-red-600 recording-pulse' : 'bg-noise-500 hover:bg-noise-600'}`}
                onClick={toggleRecording}
              >
                <Mic className="h-6 w-6" />
              </Button>
              
              {noiseLevel ? (
                <div className="text-center">
                  <p className="text-lg font-bold">{noiseLevel} dB</p>
                  <div className="mx-auto my-2 w-32">
                    <div className={`noise-level-indicator mx-auto ${
                      noiseLevel < 50 ? 'noise-level-low' : 
                      noiseLevel < 65 ? 'noise-level-medium' :
                      noiseLevel < 80 ? 'noise-level-high' :
                      'noise-level-extreme'
                    }`}></div>
                  </div>
                  <p className="text-sm text-gray-600">
                    {noiseLevel < 50 ? 'Low noise level' : 
                     noiseLevel < 65 ? 'Moderate noise level' :
                     noiseLevel < 80 ? 'High noise level' :
                     'Extreme noise level'}
                  </p>
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  {isRecording ? 'Listening...' : 'Click to measure noise level'}
                </p>
              )}
            </div>
          </div>

          {/* Noise category */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Noise Category
            </label>
            <div className="grid grid-cols-4 gap-2">
              {NoiseCategories.map(category => (
                <div
                  key={category.id}
                  className={`p-2 rounded-lg text-center cursor-pointer transition-all ${
                    selectedCategory === category.id
                      ? 'bg-noise-100 border-2 border-noise-500'
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="text-xl mb-1">{category.icon}</div>
                  <div className="text-xs">{category.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              id="description"
              className="w-full p-2 border border-gray-300 rounded h-20 resize-none"
              placeholder="Describe the noise source..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            {location ? (
              <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-noise-500 mr-1" />
                  <span className="text-sm">
                    {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                  </span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 w-full"
                  onClick={detectLocation}
                >
                  Update Location
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center" 
                onClick={detectLocation}
              >
                <MapPin className="h-4 w-4 mr-1" />
                Detect Current Location
              </Button>
            )}
          </div>

          {/* Submit button */}
          <Button 
            className="w-full bg-noise-500 hover:bg-noise-600 flex items-center justify-center"
            onClick={submitReport}
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;