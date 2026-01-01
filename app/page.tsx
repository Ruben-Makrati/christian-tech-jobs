'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import JobCard from '@/components/JobCard';
import SearchAndFilters from '@/components/SearchAndFilters';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Job } from '@/types';

export default function Home() {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      const status = searchParams.get('status') || 'open';
      const jobType = searchParams.get('jobType') || '';
      const location = searchParams.get('location') || '';
      const techStack = searchParams.get('techStack') || '';
      const search = searchParams.get('search') || '';

      if (status) params.set('status', status);
      if (jobType) params.set('jobType', jobType);
      if (location) params.set('location', location);
      if (techStack) params.set('techStack', techStack);
      params.set('limit', '12');

      const response = await fetch(`/api/jobs?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.status}`);
      }

      const data = await response.json();

      // Ensure jobs is an array
      const jobsArray = Array.isArray(data.jobs) ? data.jobs : [];

      // Client-side search filtering
      let filteredJobs = jobsArray;
      if (search && jobsArray.length > 0) {
        const searchLower = search.toLowerCase();
        filteredJobs = jobsArray.filter(
          (job: Job) =>
            job.title?.toLowerCase().includes(searchLower) ||
            job.company?.toLowerCase().includes(searchLower)
        );
      }

      setJobs(filteredJobs || []);
      setHasMore(data.hasMore || false);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]); // Set to empty array on error
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchAndFilters />
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Find Your Next Tech Job
        </h1>
        <p className="text-gray-600">
          Discover opportunities at Christian tech companies
        </p>
      </div>
      <SearchAndFilters />
      {!jobs || jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No jobs found. Try adjusting your filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

