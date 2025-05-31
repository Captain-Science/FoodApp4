
import React, { useState } from 'react';

interface GetFoodPageProps {
  onSubmit: (data: { name: string; email: string; phone?: string; householdSize?: string; message: string; assistanceType: string }) => void;
}

const GetFoodPage: React.FC<GetFoodPageProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [householdSize, setHouseholdSize] = useState('');
  const [message, setMessage] = useState('');
  const [assistanceType, setAssistanceType] = useState('general-groceries');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
     if (!name.trim() || !email.trim() || !message.trim()) {
        alert("Name, Email, and Message are required.");
        return;
    }
    onSubmit({ name, email, phone, householdSize, message, assistanceType });
    setName('');
    setEmail('');
    setPhone('');
    setHouseholdSize('');
    setMessage('');
    setAssistanceType('general-groceries');
  };

  const inputClass = "w-full p-3 bg-white border border-lime-300 rounded-md text-green-800 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-green-700 mb-1";

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8 m-2 text-green-800 border border-lime-200">
      <div className="mb-8 p-5 bg-orange-50 rounded-lg border border-orange-200">
        <h2 className="text-2xl font-bold text-orange-700 mb-3">Request Food Assistance</h2>
        <p className="text-gray-700 leading-relaxed">
          If you or your family are in need of food assistance, please fill out the form below. 
          We are here to help and will do our best to connect you with available resources. 
          All information is kept confidential.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="getfood-name" className={labelClass}>Full Name</label>
          <input type="text" id="getfood-name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="getfood-email" className={labelClass}>Email Address</label>
          <input type="email" id="getfood-email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} required />
        </div>
        <div>
          <label htmlFor="getfood-phone" className={labelClass}>Phone Number (Optional)</label>
          <input type="tel" id="getfood-phone" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
        </div>
         <div>
          <label htmlFor="getfood-household" className={labelClass}>Number in Household (Optional)</label>
          <input type="number" id="getfood-household" value={householdSize} onChange={(e) => setHouseholdSize(e.target.value)} className={inputClass} min="1" />
        </div>
         <div>
            <label htmlFor="assistance-type" className={labelClass}>Type of Assistance Needed</label>
            <select id="assistance-type" value={assistanceType} onChange={(e) => setAssistanceType(e.target.value)} className={inputClass}>
                <option value="general-groceries">General Groceries</option>
                <option value="fresh-produce">Fresh Produce</option>
                <option value="baby-formula-diapers">Baby Formula/Diapers</option>
                <option value="special-dietary-needs">Special Dietary Needs</option>
            </select>
        </div>
        <div>
          <label htmlFor="getfood-message" className={labelClass}>Briefly describe your situation or needs</label>
          <textarea id="getfood-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className={inputClass} required placeholder="Any specific needs or details you'd like to share..."></textarea>
        </div>
        <div>
          <button type="submit" className="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-150 text-base">
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetFoodPage;
