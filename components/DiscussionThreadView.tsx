
import React, { useState } from 'react';
import { DiscussionTopic, DiscussionPost, User } from '../types';

interface DiscussionThreadViewProps {
  topic: DiscussionTopic | null;
  posts: DiscussionPost[];
  currentUser: User | null;
  onAddPost: (topicId: string, content: string) => void;
  onBackToForum: () => void;
  isAdmin: boolean; // Added
  onDeletePost: (topicId: string, postId: string) => void; // Added
}

const DiscussionThreadView: React.FC<DiscussionThreadViewProps> = ({ topic, posts, currentUser, onAddPost, onBackToForum, isAdmin, onDeletePost }) => {
  const [newPostContent, setNewPostContent] = useState('');

  if (!topic) {
    return <p className="text-gray-400 text-center py-8">Topic not found.</p>;
  }

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() || !currentUser) return;
    onAddPost(topic.id, newPostContent);
    setNewPostContent('');
  };

  const handleDeleteClick = (postId: string) => {
    onDeletePost(topic.id, postId);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-xl text-gray-800">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700">{topic.title}</h2>
        <button
          onClick={onBackToForum}
          className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-1.5 px-3 rounded-lg transition-colors"
        >
          &larr; Back to Forum Topics
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-6">
        Started by {topic.createdByUserName} on {new Date(topic.createdAt).toLocaleDateString()}
      </p>

      <div className="space-y-4 mb-8">
        {posts.map(post => (
          <div key={post.id} className="bg-lime-50 p-4 rounded-md shadow-sm border border-lime-200">
            <div className="flex justify-between items-start mb-1">
                <div className="flex-grow">
                    <p className="font-semibold text-emerald-700">{post.userName}</p>
                    <p className="text-xs text-gray-500">{new Date(post.date).toLocaleString()}</p>
                </div>
                {isAdmin && (
                  <button 
                    onClick={() => handleDeleteClick(post.id)}
                    className="text-xs text-red-500 hover:text-red-400 ml-2 p-1 rounded hover:bg-red-100"
                    title="Delete this post"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                )}
            </div>
            <p className="text-green-800 whitespace-pre-wrap">{post.content}</p>
          </div>
        ))}
        {posts.length === 0 && (
            <p className="text-gray-500">No replies yet. Be the first to reply!</p>
        )}
      </div>

      {currentUser && (
        <form onSubmit={handlePostSubmit} className="mt-6 border-t border-lime-200 pt-6">
          <h3 className="text-xl font-semibold text-indigo-600 mb-3">Add Your Reply</h3>
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            rows={4}
            className="w-full p-2.5 bg-white border border-lime-300 rounded-md text-green-800 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm placeholder-gray-400"
            placeholder="Write your reply here..."
            required
          ></textarea>
          <button 
            type="submit"
            className="mt-3 py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-md transition-colors shadow-sm"
          >
            Submit Reply
          </button>
        </form>
      )}
    </div>
  );
};

export default DiscussionThreadView;
