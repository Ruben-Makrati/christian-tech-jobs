import { NextRequest, NextResponse } from 'next/server';
import { getJobs, createJob } from '@/lib/db';
import { requireAdmin } from '@/lib/middleware';
import { JobFormData } from '@/types';

// GET /api/jobs - Get all jobs with filters
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status') as 'open' | 'closed' | null;
    const jobType = searchParams.get('jobType') || undefined;
    const location = searchParams.get('location') || undefined;
    const techStack = searchParams.get('techStack') || undefined;
    const limitCount = searchParams.get('limit') 
      ? parseInt(searchParams.get('limit')!) 
      : undefined;

    const filters = {
      status: status || undefined,
      jobType,
      location,
      techStack,
    };

    const { jobs, lastDoc } = await getJobs(filters, { limitCount });

    return NextResponse.json({
      jobs: Array.isArray(jobs) ? jobs : [],
      hasMore: lastDoc !== null,
    });
  } catch (error: any) {
    console.error('Error fetching jobs:', error);
    // Return empty array instead of error to prevent frontend crashes
    return NextResponse.json({
      jobs: [],
      hasMore: false,
      error: error.message,
    });
  }
}

// POST /api/jobs - Create a new job (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const authError = await requireAdmin(request);
    if (authError) return authError;

    const body: JobFormData = await request.json();
    
    // Validate required fields
    if (!body.title || !body.company || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields: title, company, description' },
        { status: 400 }
      );
    }

    // Validate jobType
    const validJobTypes = ['Intern', 'Full-time', 'Contract'];
    if (!validJobTypes.includes(body.jobType)) {
      return NextResponse.json(
        { error: 'Invalid jobType' },
        { status: 400 }
      );
    }

    // Validate location
    const validLocations = ['Remote', 'On-site', 'Hybrid'];
    if (!validLocations.includes(body.location)) {
      return NextResponse.json(
        { error: 'Invalid location' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['open', 'closed'];
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const jobId = await createJob({
      title: body.title,
      company: body.company,
      description: body.description,
      techStack: body.techStack || [],
      jobType: body.jobType,
      location: body.location,
      status: body.status || 'open',
    });

    return NextResponse.json(
      { id: jobId, message: 'Job created successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating job:', error);
    return NextResponse.json(
      { error: 'Failed to create job', message: error.message },
      { status: 500 }
    );
  }
}

