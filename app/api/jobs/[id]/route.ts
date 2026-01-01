import { NextRequest, NextResponse } from 'next/server';
import { getJobById, updateJob, deleteJob } from '@/lib/db';
import { requireAdmin } from '@/lib/middleware';
import { JobFormData } from '@/types';

// GET /api/jobs/[id] - Get a single job
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const job = await getJobById(params.id);
    
    if (!job) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(job);
  } catch (error: any) {
    console.error('Error fetching job:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job', message: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/jobs/[id] - Update a job (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authentication
    const authError = await requireAdmin(request);
    if (authError) return authError;

    const body: Partial<JobFormData> = await request.json();
    
    // Check if job exists
    const existingJob = await getJobById(params.id);
    if (!existingJob) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    // Validate jobType if provided
    if (body.jobType) {
      const validJobTypes = ['Intern', 'Full-time', 'Contract'];
      if (!validJobTypes.includes(body.jobType)) {
        return NextResponse.json(
          { error: 'Invalid jobType' },
          { status: 400 }
        );
      }
    }

    // Validate location if provided
    if (body.location) {
      const validLocations = ['Remote', 'On-site', 'Hybrid'];
      if (!validLocations.includes(body.location)) {
        return NextResponse.json(
          { error: 'Invalid location' },
          { status: 400 }
        );
      }
    }

    // Validate status if provided
    if (body.status) {
      const validStatuses = ['open', 'closed'];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { error: 'Invalid status' },
          { status: 400 }
        );
      }
    }

    await updateJob(params.id, body);

    return NextResponse.json(
      { message: 'Job updated successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating job:', error);
    return NextResponse.json(
      { error: 'Failed to update job', message: error.message },
      { status: 500 }
    );
  }
}

// DELETE /api/jobs/[id] - Delete a job (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check admin authentication
    const authError = await requireAdmin(request);
    if (authError) return authError;

    // Check if job exists
    const existingJob = await getJobById(params.id);
    if (!existingJob) {
      return NextResponse.json(
        { error: 'Job not found' },
        { status: 404 }
      );
    }

    await deleteJob(params.id);

    return NextResponse.json(
      { message: 'Job deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting job:', error);
    return NextResponse.json(
      { error: 'Failed to delete job', message: error.message },
      { status: 500 }
    );
  }
}

