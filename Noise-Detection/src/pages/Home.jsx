import React, { useState } from 'react';
import NoiseMap from '@/components/NoiseMap';
import AlertBanner from '@/components/AlertBanner';
import ReportForm from '@/components/ReportForm';
import { Volume2, MapPin, BarChart2, BookOpen, Plus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';

const Home = () => {
  const [showAlert, setShowAlert] = useState(true);
  const [showReportForm, setShowReportForm] = useState(false);
  
  const handleDismissAlert = () => {
    setShowAlert(false);
  };
  
  const handleOpenReportForm = () => {
    setShowReportForm(true);
  };
  
  const handleCloseReportForm = () => {
    setShowReportForm(false);
  };
  
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <div className="pt-14 flex-grow h-[calc(100vh-3.5rem)]">
        {/* Map */}
        <div className="w-full h-full">
          <NoiseMap />
        </div>
      </div>
      
      {/* Floating Action Button */}
      <div className="fixed right-6 bottom-24 md:bottom-6 z-10">
        <Button 
          className="h-14 w-14 rounded-full bg-noise-500 hover:bg-noise-600 shadow-lg flex items-center justify-center"
          onClick={handleOpenReportForm}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
      
      {/* Feature callouts - only shown on home page */}
      <div className="fixed left-4 bottom-4 z-10 md:flex space-x-2 hidden">
        <Card className="bg-white/90 backdrop-blur-sm shadow-lg p-3 flex items-center space-x-2 border-noise-100">
          <div className="bg-noise-100 p-1.5 rounded-full">
            <Info className="h-4 w-4 text-noise-600" />
          </div>
          <div className="text-xs">
            <p className="font-medium">SonicSight Maps Noise Pollution</p>
            <p className="text-gray-500">Visualize, track, and find quiet spaces</p>
          </div>
        </Card>
      </div>
      
      {/* Quick actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-20">
        <div className="grid grid-cols-4 divide-x divide-gray-100">
          <button className="flex flex-col items-center py-2">
            <MapPin className="h-5 w-5 text-noise-500 mb-1" />
            <span className="text-xs">Map</span>
          </button>
          <button 
            className="flex flex-col items-center py-2"
            onClick={() => toast({
              title: "Coming soon",
              description: "The Forecast feature will be available soon."
            })}
          >
            <BarChart2 className="h-5 w-5 text-gray-400 mb-1" />
            <span className="text-xs text-gray-500">Forecast</span>
          </button>
          <button 
            className="flex flex-col items-center py-2"
            onClick={() => toast({
              title: "Coming soon",
              description: "The Journal feature will be available soon."
            })}
          >
            <BookOpen className="h-5 w-5 text-gray-400 mb-1" />
            <span className="text-xs text-gray-500">Journal</span>
          </button>
          <button 
            className="flex flex-col items-center py-2"
            onClick={handleOpenReportForm}
          >
            <Volume2 className="h-5 w-5 text-noise-500 mb-1" />
            <span className="text-xs">Report</span>
          </button>
        </div>
      </div>
      
      {/* Alert Banner */}
      {showAlert && <AlertBanner onClose={handleDismissAlert} />}
      
      {/* Report Form Modal */}
      <ReportForm isOpen={showReportForm} onClose={handleCloseReportForm} />
      <Footer />
    </div>
  );
};

export default Home;