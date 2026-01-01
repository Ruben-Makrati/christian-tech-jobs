'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { JobType, Location } from '@/types';

export default function SearchAndFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [jobType, setJobType] = useState(searchParams.get('jobType') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [techStack, setTechStack] = useState(searchParams.get('techStack') || '');
  const [status, setStatus] = useState(searchParams.get('status') || 'open');

  const handleFilterChange = () => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (jobType) params.set('jobType', jobType);
    if (location) params.set('location', location);
    if (techStack) params.set('techStack', techStack);
    if (status) params.set('status', status);
    
    router.push(`/?${params.toString()}`);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleFilterChange();
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [search, jobType, location, techStack, status]);

  const clearFilters = () => {
    setSearch('');
    setJobType('');
    setLocation('');
    setTechStack('');
    setStatus('open');
    router.push('/');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-lg font-semibold mb-4">Search & Filter Jobs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or company..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Type
          </label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="Intern">Intern</option>
            <option value="Full-time">Full-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="">All</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tech Stack
        </label>
        <input
          type="text"
          value={techStack}
          onChange={(e) => setTechStack(e.target.value)}
          placeholder="e.g., React, Node.js..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={clearFilters}
        className="mt-4 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
      >
        Clear Filters
      </button>
    </div>
  );
}

