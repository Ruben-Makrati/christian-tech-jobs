import { NextRequest, NextResponse } from 'next/server';

// Dynamic import to avoid issues with firebase-admin in client-side code
const getAdminAuth = async () => {
  try {
    const { getAuth } = await import('firebase-admin/auth');
    const adminApp = (await import('./firebase-admin')).default;
    return getAuth(adminApp);
  } catch (error) {
    console.error('Error initializing admin auth:', error);
    return null;
  }
};

export const requireAuth = async (request: NextRequest): Promise<NextResponse | null> => {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Unauthorized - Missing or invalid authorization header' },
      { status: 401 }
    );
  }

  const token = authHeader.split('Bearer ')[1];
  const adminAuth = await getAdminAuth();
  
  if (!adminAuth) {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    // Store user info in request for later use if needed
    (request as any).user = decodedToken;
    return null;
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized - Invalid token' },
      { status: 401 }
    );
  }
};

export const requireAdmin = async (request: NextRequest): Promise<NextResponse | null> => {
  const authError = await requireAuth(request);
  if (authError) return authError;

  const user = (request as any).user;
  if (!user || !user.email) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Check if user email is in admin list
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',').map(e => e.trim()) || [];
  if (!adminEmails.includes(user.email)) {
    return NextResponse.json(
      { error: 'Forbidden - Admin access required' },
      { status: 403 }
    );
  }

  return null;
};

