import React from 'react';
import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { getServerUser } from '@/lib/auth-server';

interface ServerProtectedAdminLayoutProps {
  children: React.ReactNode;
  request: NextRequest;
}

export default function ServerProtectedAdminLayout({ 
  children, 
  request 
}: ServerProtectedAdminLayoutProps) {
  const user = getServerUser(request);
  
  if (!user || user.role !== 'admin') {
    redirect('/admin/login');
  }

  return <>{children}</>;
}
