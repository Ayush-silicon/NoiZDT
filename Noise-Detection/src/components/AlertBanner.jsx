import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Volume2, ExternalLink, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const AlertTypes = {
  WARNING: 'warning',
  INFO: 'info',
  DANGER: 'danger',
};

const AlertBanner = ({ onClose }) => {
  const [alert, setAlert] = useState(null);
  
  useEffect(() => {
    // Simulate receiving an alert
    // In a real app, this would come from an API or real-time noise detection
    const randomAlert = () => {
      const alerts = [
        {
          type: AlertTypes.WARNING,
          title: 'High Noise Area Ahead',
          message: 'Construction zone detected 0.3 miles ahead with noise levels exceeding 80dB.',
          icon: <Volume2 className="h-5 w-5" />,
          action: {
            label: 'View Quiet Routes',
            onClick: () => console.log('Finding alternative routes...')
          }
        },
        {
          type: AlertTypes.INFO,
          title: 'Potential Quiet Zone',
          message: 'A quiet park has been detected nearby with average noise levels below 45dB.',
          icon: <Info className="h-5 w-5" />,
          action: {
            label: 'View on Map',
            onClick: () => console.log('Showing quiet zone on map...')
          }
        },
        {
          type: AlertTypes.DANGER,
          title: 'Hazardous Noise Exposure',
          message: 'You have been exposed to noise levels above 85dB for over 30 minutes today.',
          icon: <AlertTriangle className="h-5 w-5" />,
          action: {
            label: 'Learn More',
            onClick: () => console.log('Showing health impact information...')
          }
        }
      ];
      
      return alerts[Math.floor(Math.random() * alerts.length)];
    };
    
    // Simulate delay in receiving alert
    const timer = setTimeout(() => {
      setAlert(randomAlert());
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // If no alert, don't render anything
  if (!alert) return null;
  
  const alertStyles = {
    [AlertTypes.WARNING]: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      icon: 'bg-yellow-100 text-yellow-600',
      title: 'text-yellow-800',
      close: 'text-yellow-500 hover:text-yellow-700',
    },
    [AlertTypes.INFO]: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      icon: 'bg-blue-100 text-blue-600',
      title: 'text-blue-800',
      close: 'text-blue-500 hover:text-blue-700',
    },
    [AlertTypes.DANGER]: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      icon: 'bg-red-100 text-red-600',
      title: 'text-red-800',
      close: 'text-red-500 hover:text-red-700',
    },
  };
  
  const styles = alertStyles[alert.type];
  
  return (
    <div className={`fixed top-24 left-1/2 transform -translate-x-1/2 max-w-sm w-full z-50 ${styles.bg} border ${styles.border} rounded-lg shadow-lg`}>
      <div className="p-4">
        <div className="flex items-start">
          <div className={`flex-shrink-0 p-1.5 rounded-full ${styles.icon}`}>
            {alert.icon}
          </div>
          <div className="ml-3 w-0 flex-1 min-w-0">
            <h3 className={`text-sm font-medium ${styles.title}`}>{alert.title}</h3>
            <div className="mt-1">
              <p className="text-sm text-gray-600 break-words">{alert.message}</p>
            </div>
            {alert.action && (
              <div className="mt-3">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="inline-flex items-center text-sm font-medium text-noise-600 hover:text-noise-800"
                  onClick={alert.action.onClick}
                >
                  {alert.action.label}
                  <ExternalLink className="ml-1 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          <div className="flex-shrink-0 flex">
            <button
              className={`inline-flex rounded-md ${styles.close} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-noise-500`}
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;