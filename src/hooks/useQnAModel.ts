'use client';

import { useState, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
// Import backends to ensure they're available
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';
import * as qna from '@tensorflow-models/qna';

interface QnAAnswer {
  text: string;
  score: number;
  startIndex: number;
  endIndex: number;
}

interface UseQnAModelReturn {
  model: qna.QuestionAndAnswer | null;
  isLoading: boolean;
  error: Error | null;
  findAnswer: (
    question: string,
    passage: string
  ) => Promise<QnAAnswer | null>;
}

/**
 * Hook to load and use TensorFlow.js QnA model
 * Loads the model once and caches it for the session
 */
export function useQnAModel(): UseQnAModelReturn {
  const [model, setModel] = useState<qna.QuestionAndAnswer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      return;
    }

    let isMounted = true;
    // Save original fetch to restore later
    const originalFetch = window.fetch.bind(window);

    const loadModel = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Intercept fetch to proxy TensorFlow Hub/Kaggle requests through our API
        const proxyFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
          const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
          
          // Proxy requests to TensorFlow Hub or Kaggle
          if (url.includes('tfhub.dev') || url.includes('kaggle.com')) {
            let proxyPath = url;
            
            // Convert tfhub.dev URLs to our proxy
            if (url.includes('tfhub.dev')) {
              const match = url.match(/https?:\/\/tfhub\.dev\/(.+)/);
              if (match) {
                proxyPath = `/api/tfjs-proxy/tfhub.dev/${match[1]}`;
              }
            } 
            // Convert kaggle.com URLs to our proxy
            else if (url.includes('kaggle.com')) {
              const match = url.match(/https?:\/\/www\.kaggle\.com\/(.+)/);
              if (match) {
                proxyPath = `/api/tfjs-proxy/www.kaggle.com/${match[1]}`;
              }
            }
            
            return originalFetch(proxyPath, init);
          }
          
          // Use original fetch for other requests
          return originalFetch(input, init);
        };
        
        // Replace fetch temporarily
        window.fetch = proxyFetch as typeof fetch;

        // Ensure TensorFlow.js is ready
        await tf.ready();
        
        // Load the QnA model (now requests will go through our proxy)
        const loadedModel = await qna.load();

        // Restore original fetch after model loads
        window.fetch = originalFetch;

        if (isMounted) {
          setModel(loadedModel);
          setIsLoading(false);
        }
      } catch (err) {
        // Restore original fetch on error
        window.fetch = originalFetch;
        
        if (isMounted) {
          console.error('Error loading QnA model:', err);
          const error =
            err instanceof Error
              ? err
              : new Error(`Failed to load QnA model: ${err instanceof Error ? err.message : 'Unknown error'}`);
          setError(error);
          setIsLoading(false);
        }
      }
    };

    loadModel();

    return () => {
      isMounted = false;
    };
  }, []);

  const findAnswer = useCallback(
    async (
      question: string,
      passage: string
    ): Promise<QnAAnswer | null> => {
      if (!model) {
        throw new Error('QnA model is not loaded yet');
      }

      if (!question.trim() || !passage.trim()) {
        return null;
      }

      try {
        const answers = await model.findAnswers(question, passage);

        if (!answers || answers.length === 0) {
          return null;
        }

        // Accept the top answer if it exists and has content
        // Lower threshold - accept any reasonable answer
        const topAnswer = answers[0];
        
        if (topAnswer && topAnswer.text && topAnswer.text.trim().length > 0) {
          // If score is very low (< 0.01), still return it but we'll handle it in the UI
          return topAnswer;
        }

        return null;
      } catch (err) {
        throw new Error(
          `Failed to find answer: ${err instanceof Error ? err.message : 'Unknown error'}`
        );
      }
    },
    [model]
  );

  return {
    model,
    isLoading,
    error,
    findAnswer,
  };
}

