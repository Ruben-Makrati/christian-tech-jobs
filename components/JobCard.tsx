import Link from 'next/link';
import { Job } from '@/types';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {job.title}
            </h3>
            <p className="text-lg text-gray-600">{job.company}</p>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              job.status === 'open'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {job.status}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
            {job.jobType}
          </span>
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
            {job.location}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {job.techStack.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
            >
              {tech}
            </span>
          ))}
          {job.techStack.length > 4 && (
            <span className="px-2 py-1 text-gray-500 text-xs">
              +{job.techStack.length - 4} more
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mt-4 line-clamp-2">
          {job.description}
        </p>
      </div>
    </Link>
  );
}

