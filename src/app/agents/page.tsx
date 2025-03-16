"use client";

import Link from 'next/link';

export default function AgentsPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Agents Page</h1>
      <iframe 
  src="https://udify.app/chatbot/NMPYsSJwIaRUBvTX" 
style={{ width: "100%", height: "100%", minHeight: "700px" }}
  frameBorder="0" 
  allow="microphone;" 
></iframe>
  <p className="text-gray-600 text-lg mb-12 text-center">
        This is where you'll manage AI agents and view their statuses.
      </p>
      <div className="flex justify-center">
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
