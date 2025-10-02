import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  );
};

export const QuizCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="animate-pulse">
        {/* Header with difficulty and icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            {/* Title */}
            <SkeletonLoader className="h-6 w-3/4 mb-2" />
            {/* Module info */}
            <SkeletonLoader className="h-4 w-1/2 mb-2" />
            {/* Difficulty badge */}
            <SkeletonLoader className="h-5 w-20 rounded-full" />
          </div>
          {/* Icon and stats */}
          <div className="flex flex-col items-end ml-4">
            <SkeletonLoader className="h-8 w-8 mb-2" />
            <div className="text-right">
              <SkeletonLoader className="h-3 w-16 mb-1" />
              <SkeletonLoader className="h-3 w-12" />
            </div>
          </div>
        </div>

        {/* Tags and action button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <SkeletonLoader className="h-5 w-16 rounded-full" />
            <SkeletonLoader className="h-5 w-20 rounded-full" />
          </div>
          <SkeletonLoader className="h-8 w-20" />
        </div>
      </div>
    </div>
  );
};

export const ModuleCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="animate-pulse">
          {/* Header badges */}
          <div className="flex items-start justify-between mb-3">
            <SkeletonLoader className="h-5 w-24 rounded-full" />
            <SkeletonLoader className="h-5 w-16 rounded" />
          </div>

          {/* Title */}
          <SkeletonLoader className="h-6 w-full mb-2" />
          
          {/* Quarter info */}
          <SkeletonLoader className="h-4 w-2/3 mb-2" />
          
          {/* Summary */}
          <div className="mb-4">
            <SkeletonLoader className="h-4 w-full mb-1" />
            <SkeletonLoader className="h-4 w-5/6 mb-1" />
            <SkeletonLoader className="h-4 w-3/4" />
          </div>
          
          {/* Memory text box */}
          <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-4">
            <SkeletonLoader className="h-4 w-full mb-1" />
            <SkeletonLoader className="h-4 w-4/5" />
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            <SkeletonLoader className="h-5 w-12 rounded" />
            <SkeletonLoader className="h-5 w-16 rounded" />
            <SkeletonLoader className="h-5 w-14 rounded" />
          </div>
          
          {/* Author */}
          <SkeletonLoader className="h-4 w-32 mb-4" />
          
          {/* Footer */}
          <div className="flex items-center justify-between">
            <SkeletonLoader className="h-4 w-16" />
            <SkeletonLoader className="h-8 w-20 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};