'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, isAdmin } from '@/lib/auth';
import { Job } from '@/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push('/admin/login');
        return;
      }
      const admin = await isAdmin();
      if (!admin) {
        router.push('/admin/login');
        return;
      }
      setAuthenticated(true);
      setLoading(false);
      fetchJobs();
    };
    checkAuth();
  }, [router]);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs?limit=100');
      const data = await response.json();
      setJobs(data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const { authenticatedFetch } = await import('@/lib/api');
      const response = await authenticatedFetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setJobs(jobs.filter((job) => job.id !== id));
      } else {
        alert('Failed to delete job');
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete job');
    }
  };

  const handleToggleStatus = async (job: Job) => {
    const newStatus = job.status === 'open' ? 'closed' : 'open';
    try {
      const { authenticatedFetch } = await import('@/lib/api');
      const response = await authenticatedFetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setJobs(
          jobs.map((j) => (j.id === job.id ? { ...j, status: newStatus } : j))
        );
      } else {
        alert('Failed to update job status');
      }
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update job status');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner />
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage job postings</p>
        </div>
        <Link
          href="/admin/jobs/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
        >
          Create New Job
        </Link>
      </div>

      {loadingJobs ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {job.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{job.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{job.jobType}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        job.status === 'open'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Link
                      href={`/admin/jobs/${job.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleToggleStatus(job)}
                      className="text-yellow-600 hover:text-yellow-900"
                    >
                      {job.status === 'open' ? 'Close' : 'Open'}
                    </button>
                    <button
                      onClick={() => handleDelete(job.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                    <Link
                      href={`/admin/jobs/${job.id}/applications`}
                      className="text-purple-600 hover:text-purple-900"
                    >
                      Applications
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {jobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No jobs found. Create your first job posting!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

