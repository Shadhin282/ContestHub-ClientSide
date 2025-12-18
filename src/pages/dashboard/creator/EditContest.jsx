import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContestForm } from '../../../components/features/ContestForm';
import { MOCK_CONTESTS } from '../../../utils/mockData';
export function EditContest() {
  const {
    id
  } = useParams();
  const navigate = useNavigate();
  const contest = MOCK_CONTESTS.find(c => c.id === id);
  if (!contest) return <div>Contest not found</div>;
  const handleSubmit = (data) => {
    // Simulate update
    console.log('Updated:', data);
    navigate('/dashboard/creator/contests');
  };
  return <div className="max-w-4xl mx-auto">
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-white">Edit Contest</h1>
      <p className="text-slate-400">Update contest details.</p>
    </div>

    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-8">
      <ContestForm initialData={contest} onSubmit={handleSubmit} />
    </div>
  </div>;
}