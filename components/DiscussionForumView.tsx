import React from 'react';
import { DiscussionTopic } from '../types';
import DiscussionTopicCard from './DiscussionTopicCard';

interface DiscussionForumViewProps {
  topics: DiscussionTopic[];
  onSelectTopic: (topicId: string) => void;
  onStartNewTopic: () => void; 
}

const DiscussionForumView: React.FC<DiscussionForumViewProps> = ({ topics, onSelectTopic, onStartNewTopic }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-indigo-600">Forum Topics</h2>
        <button
          onClick={onStartNewTopic}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
        >
          Start New Topic
        </button>
      </div>
      {topics.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No discussion topics yet. Be the first to start one!</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {topics.map(topic => (
            <DiscussionTopicCard key={topic.id} topic={topic} onSelectTopic={onSelectTopic} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DiscussionForumView;