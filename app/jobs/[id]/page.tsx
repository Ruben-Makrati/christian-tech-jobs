'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Job } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import ApplicationForm from '@/components/ApplicationForm';

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.id as string;
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`);
        if (response.ok) {
          const data = await response.json();
          setJob(data);
        } else {
          console.error('Failed to fetch job');
        }
      } catch (error) {
        console.error('Error fetching job:', error);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Job not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-lg sm:text-xl text-gray-600">{job.company}</p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              job.status === 'open'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {job.status}
          </span>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
            {job.jobType}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded text-sm font-medium">
            {job.location}
          </span>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {job.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
        </div>

        {job.status === 'open' && (
          <div className="mt-8 pt-6 border-t">
            {!showApplicationForm ? (
              <button
                onClick={() => setShowApplicationForm(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
              >
                Apply for this Job
              </button>
            ) : (
              <ApplicationForm jobId={jobId} onSuccess={() => setShowApplicationForm(false)} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

