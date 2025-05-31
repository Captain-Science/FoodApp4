import React from 'react';
import { DiscussionTopic } from '../types';

interface DiscussionTopicCardProps {
  topic: DiscussionTopic;
  onSelectTopic: (topicId: string) => void;
}

const DiscussionTopicCard: React.FC<DiscussionTopicCardProps> = ({ topic, onSelectTopic }) => {
  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-md hover:shadow-indigo-300/50 transition-shadow cursor-pointer border border-lime-200"
      onClick={() => onSelectTopic(topic.id)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === 'Enter' && onSelectTopic(topic.id)}
      aria-label={`View topic: ${topic.title}`}
    >
      <h3 className="text-lg font-semibold text-indigo-700 mb-1">{topic.title}</h3>
      <p className="text-xs text-gray-500 mb-2">
        Started by {topic.createdByUserName} on {new Date(topic.createdAt).toLocaleDateString()}
      </p>
      <div className="flex justify-between text-xs text-gray-600">
        <span>Replies: {topic.replyCount}</span>
        <span>Views: {topic.viewCount}</span>
        {topic.lastReplyAt && (
          <span>Last reply: {new Date(topic.lastReplyAt).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
};

export default DiscussionTopicCard;
