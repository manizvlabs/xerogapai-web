'use client';

import { useState, useRef, useEffect } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const messageRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to message when status changes
  useEffect(() => {
    if (submitStatus && messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [submitStatus]);

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone: string): string => {
    if (!phone) return 'Phone number is required';

    // Remove all whitespace, hyphens, parentheses for validation
    const cleanPhone = phone.replace(/[\s\-()]+/g, '');

    // Check if it starts with + (required for international format)
    if (!cleanPhone.startsWith('+')) {
      return 'Phone number must include country code (e.g., +1 for US, +91 for India)';
    }

    // Validate country codes and corresponding number lengths based on ITU E.164 standard
    // Source: https://en.wikipedia.org/wiki/List_of_telephone_country_codes
    const validFormats = {
      // Zone 1: North American Numbering Plan (NANP) - +1
      '1': { minDigits: 10, maxDigits: 10, country: 'United States/Canada' },

      // Zone 9: Asia and Middle East
      // India (+91) - 10 digits after country code
      '91': { minDigits: 10, maxDigits: 10, country: 'India' },

      // Middle East - 3-digit country codes (Zone 9)
      '971': { minDigits: 9, maxDigits: 9, country: 'UAE' },           // UAE: typically 9 digits
      '968': { minDigits: 8, maxDigits: 8, country: 'Oman' },          // Oman: typically 8 digits
      '973': { minDigits: 8, maxDigits: 8, country: 'Bahrain' },       // Bahrain: typically 8 digits
      '965': { minDigits: 8, maxDigits: 8, country: 'Kuwait' },        // Kuwait: typically 8 digits
      '966': { minDigits: 9, maxDigits: 9, country: 'Saudi Arabia' },  // Saudi Arabia: typically 9 digits
      '974': { minDigits: 8, maxDigits: 8, country: 'Qatar' },         // Qatar: typically 8 digits
      '962': { minDigits: 9, maxDigits: 9, country: 'Jordan' },        // Jordan: typically 9 digits
      '961': { minDigits: 7, maxDigits: 8, country: 'Lebanon' },       // Lebanon: 7-8 digits
      '963': { minDigits: 9, maxDigits: 9, country: 'Syria' },         // Syria: typically 9 digits
      '964': { minDigits: 9, maxDigits: 10, country: 'Iraq' },         // Iraq: 9-10 digits
      '967': { minDigits: 9, maxDigits: 9, country: 'Yemen' },         // Yemen: typically 9 digits

      // Zone 3 & 4: Europe
      '44': { minDigits: 10, maxDigits: 10, country: 'United Kingdom' }, // UK: 10 digits (excluding leading 0)
      '49': { minDigits: 10, maxDigits: 11, country: 'Germany' },       // Germany: 10-11 digits
      '33': { minDigits: 9, maxDigits: 9, country: 'France' },          // France: 9 digits
      '39': { minDigits: 9, maxDigits: 10, country: 'Italy' },          // Italy: 9-10 digits
      '34': { minDigits: 9, maxDigits: 9, country: 'Spain' },           // Spain: 9 digits
      '31': { minDigits: 9, maxDigits: 9, country: 'Netherlands' },     // Netherlands: 9 digits
      '46': { minDigits: 7, maxDigits: 9, country: 'Sweden' },          // Sweden: 7-9 digits
      '47': { minDigits: 8, maxDigits: 8, country: 'Norway' },          // Norway: 8 digits
      '45': { minDigits: 8, maxDigits: 8, country: 'Denmark' },         // Denmark: 8 digits
      '358': { minDigits: 9, maxDigits: 10, country: 'Finland' },       // Finland: 9-10 digits

      // Zone 6: Southeast Asia and Oceania
      '61': { minDigits: 9, maxDigits: 9, country: 'Australia' },       // Australia: 9 digits
      '65': { minDigits: 8, maxDigits: 8, country: 'Singapore' },       // Singapore: 8 digits

      // Zone 8: East Asia
      '86': { minDigits: 11, maxDigits: 11, country: 'China' },         // China: 11 digits (mobile)
      '81': { minDigits: 10, maxDigits: 10, country: 'Japan' },         // Japan: 10 digits
      '82': { minDigits: 10, maxDigits: 10, country: 'South Korea' },   // South Korea: 10 digits

      // Other Asian countries
      '60': { minDigits: 9, maxDigits: 10, country: 'Malaysia' },       // Malaysia: 9-10 digits
      '66': { minDigits: 9, maxDigits: 9, country: 'Thailand' },        // Thailand: 9 digits
      '84': { minDigits: 9, maxDigits: 10, country: 'Vietnam' },        // Vietnam: 9-10 digits
      '62': { minDigits: 10, maxDigits: 12, country: 'Indonesia' },     // Indonesia: 10-12 digits
      '63': { minDigits: 10, maxDigits: 10, country: 'Philippines' },   // Philippines: 10 digits
    };

    // Extract country code by checking against known formats (longest first)
    let countryCode = '';
    let number = '';

    // Try country codes from longest to shortest (3-digit first, then 2-digit, then 1-digit)
    const countryCodes = Object.keys(validFormats).sort((a, b) => b.length - a.length);

    for (const code of countryCodes) {
      if (cleanPhone.startsWith(`+${code}`)) {
        countryCode = code;
        number = cleanPhone.substring(code.length + 1); // +1 for the + sign
        break;
      }
    }

    if (!countryCode || !number) {
      return 'Please enter a valid phone number with country code';
    }

    const format = validFormats[countryCode];

    if (!format) {
      return `Country code +${countryCode} is not supported. Please use a supported international code.`;
    }

    if (number.length < format.minDigits || number.length > format.maxDigits) {
      const digitRange = format.minDigits === format.maxDigits
        ? format.minDigits.toString()
        : `${format.minDigits}-${format.maxDigits}`;
      return `For ${format.country} (+${countryCode}), phone number must be ${digitRange} digits after the country code.`;
    }

    // Check if number contains only digits
    if (!/^\d+$/.test(number)) {
      return 'Phone number can only contain digits after the country code.';
    }

    return '';
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
        return value.trim() ? '' : 'First name is required';
      case 'lastName':
        return value.trim() ? '' : 'Last name is required';
      case 'email':
        return validateEmail(value);
      case 'phone':
        return validatePhone(value);
      case 'company':
        return value.trim() ? '' : 'Company name is required';
      case 'service':
        return value ? '' : 'Please select a service';
      case 'message':
        return value.trim() ? '' : 'Message is required';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: { [key: string]: string } = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);

    // If there are validation errors, don't submit
    if (Object.keys(newErrors).length > 0) {
      setSubmitStatus({ type: 'error', message: 'Please correct the errors above and try again.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.' });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        });
        setErrors({});
      } else {
        setSubmitStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Send us a message</h2>
      <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
        Fill out the form below and we&apos;ll get back to you within 24 hours.
      </p>
      {submitStatus && (
        <div
          ref={messageRef}
          className={`mt-4 p-4 rounded-md ${submitStatus.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'}`}
          data-testid={submitStatus.type === 'success' ? 'success-message' : 'error-message'}
        >
          {submitStatus.message}
        </div>
      )}

      <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              First name *
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="firstName"
                id="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 cursor-text ${
                  errors.firstName ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-blue-600 dark:focus:ring-blue-500'
                }`}
                placeholder="Enter your first name"
              />
              {errors.firstName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.firstName}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              Last name *
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="lastName"
                id="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 cursor-text ${
                  errors.lastName ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-blue-600 dark:focus:ring-blue-500'
                }`}
                placeholder="Enter your last name"
              />
              {errors.lastName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>}
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Email *
          </label>
          <div className="mt-2.5">
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 cursor-text ${
                errors.email ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-blue-600 dark:focus:ring-blue-500'
              }`}
              placeholder="your@email.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Phone number *
          </label>
          <div className="mt-2.5">
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 cursor-text ${
                errors.phone ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-blue-600 dark:focus:ring-blue-500'
              }`}
              placeholder="+1 234 567 8901 (US), +91 98765 43210 (India), +971 50 123 4567 (UAE)"
            />
            {errors.phone && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>}
            {!errors.phone && (
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Include country code: +1 (US), +91 (India), +971 (UAE), etc.
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Company *
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="company"
              id="company"
              required
              value={formData.company}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 cursor-text ${
                errors.company ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-blue-600 dark:focus:ring-blue-500'
              }`}
              placeholder="Your company name"
            />
            {errors.company && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.company}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Service interested in *
          </label>
          <div className="mt-2.5">
            <select
              name="service"
              id="service"
              value={formData.service}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              required
              className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 cursor-pointer ${
                errors.service ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-blue-600 dark:focus:ring-blue-500'
              }`}
            >
              <option value="" disabled>Select a service...</option>
              <option value="WhatsApp CX Copilot">WhatsApp CX Copilot - AI-powered customer conversations</option>
              <option value="XeroGap AI Workflow">XeroGap AI Workflow - Workspace automation</option>
              <option value="Enterprise Copilots">Enterprise Copilots - Knowledge management</option>
              <option value="Sales Automation">Sales Automation - Lead intelligence</option>
              <option value="Contact Center AI">Contact Center AI - Quality assurance</option>
              <option value="DPDP Compliance">DPDP Compliance - Data protection</option>
              <option value="Multiple Services">Multiple Services</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
            {errors.service && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.service}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Message *
          </label>
          <div className="mt-2.5">
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 cursor-text ${
                errors.message ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-blue-600 dark:focus:ring-blue-500'
              }`}
              placeholder="Tell us about your project and requirements..."
            />
            {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
          >
            {isSubmitting ? 'Sending...' : 'Send message'}
          </button>
        </div>
      </form>
    </div>
  );
}
