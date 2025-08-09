import React from 'react';
import { motion } from 'framer-motion';

const AccuracyMeter = ({ accuracy = 0, sources = [], className = '' }) => {
  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 90) return 'bg-green-500';
    if (accuracy >= 75) return 'bg-blue-500';
    if (accuracy >= 60) return 'bg-yellow-500';
    if (accuracy >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getAccuracyLabel = (accuracy) => {
    if (accuracy >= 90) return 'Excellent';
    if (accuracy >= 75) return 'Good';
    if (accuracy >= 60) return 'Fair';
    if (accuracy >= 40) return 'Limited';
    return 'Low';
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      {/* Accuracy Bar */}
      <div className="flex items-center space-x-3">
        <span className="text-xs font-medium text-muted-foreground min-w-[60px]">
          Accuracy
        </span>
        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
          <motion.div
            className={`h-full ${getAccuracyColor(accuracy)} rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${accuracy}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <span className="text-xs font-semibold text-foreground min-w-[35px]">
          {accuracy}%
        </span>
      </div>
      {/* Accuracy Label */}
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium ${
          accuracy >= 75 ? 'text-green-600' : 
          accuracy >= 60 ? 'text-blue-600' : 
          accuracy >= 40 ? 'text-yellow-600' : 'text-red-600'
        }`}>
          {getAccuracyLabel(accuracy)}
        </span>
        <span className="text-xs text-muted-foreground">
          {sources?.length > 0 ? `${sources?.length} source${sources?.length > 1 ? 's' : ''}` : 'No sources'}
        </span>
      </div>
    </div>
  );
};

export default AccuracyMeter;