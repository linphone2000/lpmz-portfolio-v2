'use client';

import React, { createContext, useContext, useMemo } from 'react';

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
  const value = useMemo(
    () => ({ data: fallbackPortfolioContent, isLoading: false }),
    []
  );
  return (
    <PortfolioDataContext.Provider value={value}>
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => useContext(PortfolioDataContext);
