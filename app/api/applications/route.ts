import { NextRequest, NextResponse } from 'next/server';
import { createApplication, getApplicationsByJobId } from '@/lib/db';
import { requireAdmin } from '@/lib/middleware';
import { ApplicationFormData } from '@/types';

// POST /api/applications - Create a new application
export async function POST(request: NextRequest) {
  try {
    const body: ApplicationFormData & { jobId: string } = await request.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.resumeLink || !body.jobId) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, resumeLink, jobId' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(body.resumeLink);
    } catch {
      return NextResponse.json(
        { error: 'Invalid resume link URL' },
        { status: 400 }
      );
    }

    const applicationId = await createApplication({
      jobId: body.jobId,
      name: body.name,
      email: body.email,
      resumeLink: body.resumeLink,
    });

    return NextResponse.json(
      { id: applicationId, message: 'Application submitted successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Failed to submit application', message: error.message },
      { status: 500 }
    );
  }
}

// GET /api/applications?jobId=xxx - Get applications for a job (admin only)
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const authError = await requireAdmin(request);
    if (authError) return authError;

    const searchParams = request.nextUrl.searchParams;
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json(
        { error: 'jobId query parameter is required' },
        { status: 400 }
      );
    }

    const applications = await getApplicationsByJobId(jobId);

    return NextResponse.json({ applications });
  } catch (error: any) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications', message: error.message },
      { status: 500 }
    );
  }
}

