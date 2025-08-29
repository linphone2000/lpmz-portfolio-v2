import React, { Suspense, lazy } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface DynamicImportProps {
  component: React.ComponentType<Record<string, unknown>>;
  fallback?: React.ReactNode;
  props?: Record<string, unknown>;
}

// Dynamic import wrapper with error boundary
export const DynamicImport: React.FC<DynamicImportProps> = ({ 
  component: Component, 
  fallback = <LoadingSpinner />,
  props = {}
}) => {
  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

// Pre-configured dynamic imports for common components
export const DynamicProjectModal = lazy(() => 
  import('./ProjectModal').then(module => ({ 
    default: module.ProjectModal 
  }))
);

export const DynamicTabContent = lazy(() => 
  import('./TabContent').then(module => ({ 
    default: module.TabContent 
  }))
);

export const DynamicContact = lazy(() => 
  import('./contact').then(module => ({ 
    default: module.Contact 
  }))
);
