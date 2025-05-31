
import React, { useState } from 'react';

interface DonateFoodPageProps {
  onSubmit: (data: { name: string; email: string; phone?: string; message: string; donationType: string }) => void;
}

const DonateFoodPage: React.FC<DonateFoodPageProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [donationType, setDonationType] = useState('non-perishable');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
        alert("Name, Email, and Message are required.");
        return;
    }
    onSubmit({ name, email, phone, message, donationType });
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setDonationType('non-perishable');
  };

  const inputClass = "w-full p-3 bg-white border border-lime-300 rounded-md text-green-800 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-green-700 mb-1";

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 m-2 text-green-800 border border-lime-200">
      <div className="mb-8 p-5 bg-sky-50 rounded-lg border border-sky-200">
        <h2 className="text-2xl font-bold text-sky-700 mb-3">Help Us Fight Hunger</h2>
        <p className="text-gray-700 leading-relaxed">
          Your generous food donations make a significant impact in our community. We accept non-perishable items as well as fresh produce (please coordinate for fresh items). 
          Thank you for considering a donation! Fill out the form below to get started or ask any questions.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="donate-name" className={labelClass}>Full Name</label>
          <input type="text" id="donate-name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="donate-email" className={labelClass}>Email Address</label>
          <input type="email" id="donate-email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="donate-phone" className={labelClass}>Phone Number (Optional)</label>
          <input type="tel" id="donate-phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
        </div>
        <div>
            <label htmlFor="donation-type" className={labelClass}>Type of Donation</label>
            <select id="donation-type" value={donationType} onChange={(e) => setDonationType(e.target.value)} className={inputClass}>
                <option value="non-perishable">Non-Perishable Items</option>
                <option value="fresh-produce">Fresh Produce (please coordinate)</option>
                <option value="other">Other / Questions</option>
            </select>
        </div>
        <div>
          <label htmlFor="donate-message" className={labelClass}>Message / Details of Donation</label>
          <textarea id="donate-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className={inputClass} required placeholder="Please list items you plan to donate, or any questions you have..."></textarea>
        </div>
        <div>
          <button type="submit" className="w-full py-3 px-6 bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 text-base">
            Submit Donation Inquiry
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonateFoodPage;
