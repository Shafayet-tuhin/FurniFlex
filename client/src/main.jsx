import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import Router from './Router/Router';
import AuthProvider from './Context/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(

  <HelmetProvider>
    <div className='max-w-7xl mx-auto'>
      <AuthProvider>
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={Router} />
          </QueryClientProvider>
        </React.StrictMode>,
      </AuthProvider>
    </div>
  </HelmetProvider>
)
