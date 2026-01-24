'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
            <div className="text-center p-8">
              <div className="text-6xl mb-4 text-neutral-400 dark:text-neutral-500">
                <FaceFrownIcon className="w-24 h-24 mx-auto" />
              </div>
              <h1 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-neutral-100">
                Oops! Something went wrong
              </h1>
              <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                Don&apos;t worry, it&apos;s not you - it&apos;s me. Please
                refresh the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors cursor-pointer"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
