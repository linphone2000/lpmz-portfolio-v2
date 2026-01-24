'use client';

import { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  projectType: 'web' | 'mobile' | 'both';
  budgetRange?: string;
  timeline?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    projectType: 'web',
    budgetRange: '',
    timeline: '',
    message: '',
  });

  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message?: string;
  }>({ type: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading' });

    const subject = `Project inquiry – ${formData.projectType}`;
    const bodyLines = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Project Type: ${formData.projectType}`,
      formData.budgetRange ? `Budget: ${formData.budgetRange}` : null,
      formData.timeline ? `Timeline: ${formData.timeline}` : null,
      formData.message ? `Details: ${formData.message}` : null,
    ].filter(Boolean);

    const mailtoUrl = `mailto:linphonem@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

    window.location.href = mailtoUrl;

    setStatus({
      type: 'success',
      message:
        "Opening your email client. If it doesn't open, please email linphonem@gmail.com with these details.",
    });
    setFormData({
      name: '',
      email: '',
      projectType: 'web',
      budgetRange: '',
      timeline: '',
      message: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Your name"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="your@email.com"
        />
      </div>

      {/* Project Type */}
      <div>
        <label
          htmlFor="projectType"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Project Type <span className="text-red-500">*</span>
        </label>
        <select
          id="projectType"
          name="projectType"
          required
          value={formData.projectType}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="web">Web Development</option>
          <option value="mobile">Mobile App Development</option>
          <option value="both">Both Web & Mobile</option>
        </select>
      </div>

      {/* Budget Range */}
      <div>
        <label
          htmlFor="budgetRange"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Budget Range (MMK)
        </label>
        <select
          id="budgetRange"
          name="budgetRange"
          value={formData.budgetRange}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">Select budget range</option>
          <option value="under-1m">Under 1M</option>
          <option value="1m-3m">1M - 3M</option>
          <option value="3m-5m">3M - 5M</option>
          <option value="5m-10m">5M - 10M</option>
          <option value="10m-plus">10M+</option>
        </select>
      </div>

      {/* Timeline */}
      <div>
        <label
          htmlFor="timeline"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Timeline
        </label>
        <select
          id="timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          <option value="">Select timeline</option>
          <option value="asap">ASAP</option>
          <option value="1-2-weeks">1-2 weeks</option>
          <option value="1-month">1 month</option>
          <option value="2-3-months">2-3 months</option>
          <option value="flexible">Flexible</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Project Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
          placeholder="Tell me about your project requirements..."
        />
      </div>

      {/* Status Messages */}
      {status.type === 'success' && (
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-800 dark:text-green-200">{status.message}</p>
        </div>
      )}

      {status.type === 'error' && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200">{status.message}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status.type === 'loading'}
        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {status.type === 'loading' ? 'Sending...' : 'Get a quote'}
      </button>

      <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
        I&apos;ll review your request and get back to you within 24 hours.
      </p>
    </form>
  );
}
