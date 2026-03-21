'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  fallbackPortfolioContent,
  type PortfolioCMSData,
} from '@/lib/portfolio-content-shared';

type PortfolioDataContextValue = {
  data: PortfolioCMSData;
  isLoading: boolean;
};

const PortfolioDataContext = createContext<PortfolioDataContextValue>({
  data: fallbackPortfolioContent,
  isLoading: true,
});

export const PortfolioDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<PortfolioCMSData>(fallbackPortfolioContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) return;
        const json = (await response.json()) as PortfolioCMSData;
        if (mounted) {
          setData(json);
        }
      } catch {
        // Keep fallback state.
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo(() => ({ data, isLoading }), [data, isLoading]);
  return (
    <PortfolioDataContext.Provider value={value}>
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => useContext(PortfolioDataContext);
