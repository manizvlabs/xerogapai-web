'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeftIcon, UserIcon, BuildingOfficeIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

// Comprehensive country code list based on ITU E.164 standard
const COUNTRY_CODES = [
  // Zone 1: North American Numbering Plan
  { code: '1', country: 'United States / Canada / Caribbean', flag: '🇺🇸' },

  // Zone 2: Mostly Africa
  { code: '20', country: 'Egypt', flag: '🇪🇬' },
  { code: '212', country: 'Morocco / Western Sahara', flag: '🇲🇦' },
  { code: '213', country: 'Algeria', flag: '🇩🇿' },
  { code: '216', country: 'Tunisia', flag: '🇹🇳' },
  { code: '218', country: 'Libya', flag: '🇱🇾' },
  { code: '233', country: 'Ghana', flag: '🇬🇭' },
  { code: '234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '237', country: 'Cameroon', flag: '🇨🇲' },
  { code: '251', country: 'Ethiopia', flag: '🇪🇹' },
  { code: '254', country: 'Kenya', flag: '🇰🇪' },
  { code: '255', country: 'Tanzania', flag: '🇹🇿' },
  { code: '256', country: 'Uganda', flag: '🇺🇬' },
  { code: '27', country: 'South Africa', flag: '🇿🇦' },

  // Zone 3 & 4: Mostly Europe
  { code: '30', country: 'Greece', flag: '🇬🇷' },
  { code: '31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '32', country: 'Belgium', flag: '🇧🇪' },
  { code: '33', country: 'France', flag: '🇫🇷' },
  { code: '34', country: 'Spain', flag: '🇪🇸' },
  { code: '39', country: 'Italy / Vatican City', flag: '🇮🇹' },
  { code: '40', country: 'Romania', flag: '🇷🇴' },
  { code: '41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '420', country: 'Czech Republic', flag: '🇨🇿' },
  { code: '421', country: 'Slovakia', flag: '🇸🇰' },
  { code: '43', country: 'Austria', flag: '🇦🇹' },
  { code: '44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '45', country: 'Denmark', flag: '🇩🇰' },
  { code: '46', country: 'Sweden', flag: '🇸🇪' },
  { code: '47', country: 'Norway', flag: '🇳🇴' },
  { code: '48', country: 'Poland', flag: '🇵🇱' },
  { code: '49', country: 'Germany', flag: '🇩🇪' },

  // Zone 5: South and Central Americas
  { code: '51', country: 'Peru', flag: '🇵🇪' },
  { code: '52', country: 'Mexico', flag: '🇲🇽' },
  { code: '54', country: 'Argentina', flag: '🇦🇷' },
  { code: '55', country: 'Brazil', flag: '🇧🇷' },
  { code: '56', country: 'Chile', flag: '🇨🇱' },
  { code: '57', country: 'Colombia', flag: '🇨🇴' },
  { code: '58', country: 'Venezuela', flag: '🇻🇪' },

  // Zone 6: Southeast Asia and Oceania
  { code: '60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '61', country: 'Australia / Christmas Island / Cocos Islands', flag: '🇦🇺' },
  { code: '62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '63', country: 'Philippines', flag: '🇵🇭' },
  { code: '64', country: 'New Zealand', flag: '🇳🇿' },
  { code: '65', country: 'Singapore', flag: '🇸🇬' },
  { code: '66', country: 'Thailand', flag: '🇹🇭' },

  // Zone 7: Russia and neighboring regions
  { code: '7', country: 'Russia / Kazakhstan', flag: '🇷🇺' },

  // Zone 8: East Asia, Southeast Asia, and special services
  { code: '81', country: 'Japan', flag: '🇯🇵' },
  { code: '82', country: 'South Korea', flag: '🇰🇷' },
  { code: '84', country: 'Vietnam', flag: '🇻🇳' },
  { code: '86', country: 'China', flag: '🇨🇳' },
  { code: '880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '886', country: 'Taiwan', flag: '🇹🇼' },

  // Zone 9: West, Central, and South Asia, and part of Southern Europe
  { code: '90', country: 'Turkey', flag: '🇹🇷' },
  { code: '91', country: 'India', flag: '🇮🇳' },
  { code: '92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '94', country: 'Sri Lanka', flag: '🇱🇰' },
  { code: '95', country: 'Myanmar', flag: '🇲🇲' },
  { code: '960', country: 'Maldives', flag: '🇲🇻' },
  { code: '966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '971', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: '972', country: 'Israel', flag: '🇮🇱' },
  { code: '974', country: 'Qatar', flag: '🇶🇦' },
  { code: '98', country: 'Iran', flag: '🇮🇷' },
];

interface ConsultationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle?: string;
  companySize?: string;
  industry?: string;
  website?: string;
  preferredDate?: string;
  preferredTime?: string;
  timezone?: string;
  consultationGoals?: string;
  currentChallenges?: string;
  budget?: string;
  timeline?: string;
  additionalNotes?: string;
  consultationType?: string;
}

interface ConsultationFormProps {
  consultationType: string;
  onComplete: (data: ConsultationData) => void;
  onBack: () => void;
}

const consultationTypeLabels = {
  technical: 'Technical Consultation',
  business: 'Business Strategy Consultation',
  industry: 'Industry-Specific Consultation',
  compliance: 'Compliance & Security Consultation'
};

export default function ConsultationForm({ consultationType, onComplete, onBack }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '91', // Default to India (+91)
    phoneNumber: '',
    company: '',
    jobTitle: '',
    companySize: '',
    industry: '',
    website: '',
    preferredDate: '',
    preferredTime: '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    consultationGoals: '',
    currentChallenges: '',
    budget: '',
    timeline: '',
    additionalNotes: '',
    consultationType: consultationTypeLabels[consultationType as keyof typeof consultationTypeLabels] || 'General Consultation'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const messageRef = useRef<HTMLDivElement>(null);

  // Searchable dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(-1);
  const [filteredCountries, setFilteredCountries] = useState(COUNTRY_CODES);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to message when status changes
  useEffect(() => {
    if (submitStatus && messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [submitStatus]);

  // Filter countries based on search term
  useEffect(() => {
    const filtered = COUNTRY_CODES.filter(country =>
      country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.includes(searchTerm) ||
      `+${country.code}`.includes(searchTerm)
    );
    setFilteredCountries(filtered);
    setSelectedCountryIndex(-1); // Reset selection when search changes
  }, [searchTerm]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSearchTerm('');
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Get selected country display text
  const getSelectedCountryDisplay = () => {
    const selectedCountry = COUNTRY_CODES.find(country => country.code === formData.countryCode);
    return selectedCountry ? `${selectedCountry.flag} +${selectedCountry.code} ${selectedCountry.country}` : 'Select country';
  };

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  // Searchable dropdown handlers
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen) {
      // Focus on input when opening
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setSearchTerm('');
    }
  };

  const handleCountrySelect = (country: typeof COUNTRY_CODES[0]) => {
    setFormData(prev => ({
      ...prev,
      countryCode: country.code
    }));
    setIsDropdownOpen(false);
    setSearchTerm('');
    // Clear country code error when user selects a country
    if (errors.countryCode) {
      setErrors(prev => ({
        ...prev,
        countryCode: ''
      }));
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedCountryIndex(prev =>
        prev < filteredCountries.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedCountryIndex(prev =>
        prev > 0 ? prev - 1 : filteredCountries.length - 1
      );
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedCountryIndex >= 0 && selectedCountryIndex < filteredCountries.length) {
        handleCountrySelect(filteredCountries[selectedCountryIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setIsDropdownOpen(false);
      setSearchTerm('');
    }
  };

  const handleDropdownKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
      setSearchTerm('');
      inputRef.current?.focus();
    }
  };

  const validatePhone = (countryCode: string, phoneNumber: string): string => {
    if (!countryCode) return 'Country code is required';
    if (!phoneNumber) return 'Phone number is required';

    // Clean the phone number (remove spaces, hyphens, parentheses)
    const cleanPhoneNumber = phoneNumber.replace(/[\s\-()]+/g, '');

    // Check if phone number contains only digits
    if (!/^\d+$/.test(cleanPhoneNumber)) {
      return 'Phone number can only contain digits.';
    }

    // Validate country codes and corresponding number lengths based on ITU E.164 standard
    const validFormats: { [key: string]: { minDigits: number; maxDigits: number; country: string } } = {
      '1': { minDigits: 10, maxDigits: 10, country: 'United States/Canada/Caribbean' },
      '20': { minDigits: 8, maxDigits: 9, country: 'Egypt' },
      '27': { minDigits: 9, maxDigits: 9, country: 'South Africa' },
      '30': { minDigits: 10, maxDigits: 10, country: 'Greece' },
      '31': { minDigits: 9, maxDigits: 9, country: 'Netherlands' },
      '32': { minDigits: 9, maxDigits: 9, country: 'Belgium' },
      '33': { minDigits: 9, maxDigits: 9, country: 'France' },
      '34': { minDigits: 9, maxDigits: 9, country: 'Spain' },
      '39': { minDigits: 9, maxDigits: 10, country: 'Italy/Vatican City' },
      '40': { minDigits: 10, maxDigits: 10, country: 'Romania' },
      '41': { minDigits: 9, maxDigits: 9, country: 'Switzerland' },
      '43': { minDigits: 10, maxDigits: 13, country: 'Austria' },
      '44': { minDigits: 10, maxDigits: 10, country: 'United Kingdom' },
      '45': { minDigits: 8, maxDigits: 8, country: 'Denmark' },
      '46': { minDigits: 7, maxDigits: 9, country: 'Sweden' },
      '47': { minDigits: 8, maxDigits: 8, country: 'Norway' },
      '48': { minDigits: 9, maxDigits: 9, country: 'Poland' },
      '49': { minDigits: 10, maxDigits: 11, country: 'Germany' },
      '51': { minDigits: 9, maxDigits: 9, country: 'Peru' },
      '52': { minDigits: 10, maxDigits: 10, country: 'Mexico' },
      '54': { minDigits: 10, maxDigits: 11, country: 'Argentina' },
      '55': { minDigits: 11, maxDigits: 11, country: 'Brazil' },
      '56': { minDigits: 9, maxDigits: 9, country: 'Chile' },
      '57': { minDigits: 10, maxDigits: 10, country: 'Colombia' },
      '58': { minDigits: 10, maxDigits: 11, country: 'Venezuela' },
      '60': { minDigits: 9, maxDigits: 10, country: 'Malaysia' },
      '61': { minDigits: 9, maxDigits: 9, country: 'Australia/Christmas Island/Cocos Islands' },
      '62': { minDigits: 10, maxDigits: 12, country: 'Indonesia' },
      '63': { minDigits: 10, maxDigits: 10, country: 'Philippines' },
      '64': { minDigits: 8, maxDigits: 10, country: 'New Zealand' },
      '65': { minDigits: 8, maxDigits: 8, country: 'Singapore' },
      '66': { minDigits: 9, maxDigits: 9, country: 'Thailand' },
      '7': { minDigits: 10, maxDigits: 10, country: 'Russia/Kazakhstan' },
      '81': { minDigits: 10, maxDigits: 10, country: 'Japan' },
      '82': { minDigits: 10, maxDigits: 10, country: 'South Korea' },
      '84': { minDigits: 9, maxDigits: 10, country: 'Vietnam' },
      '86': { minDigits: 11, maxDigits: 11, country: 'China' },
      '90': { minDigits: 10, maxDigits: 10, country: 'Turkey' },
      '91': { minDigits: 10, maxDigits: 10, country: 'India' },
      '92': { minDigits: 10, maxDigits: 10, country: 'Pakistan' },
      '94': { minDigits: 9, maxDigits: 9, country: 'Sri Lanka' },
      '95': { minDigits: 8, maxDigits: 10, country: 'Myanmar' },
      '960': { minDigits: 7, maxDigits: 7, country: 'Maldives' },
      '966': { minDigits: 9, maxDigits: 9, country: 'Saudi Arabia' },
      '971': { minDigits: 9, maxDigits: 9, country: 'United Arab Emirates' },
      '972': { minDigits: 9, maxDigits: 9, country: 'Israel' },
      '974': { minDigits: 8, maxDigits: 8, country: 'Qatar' },
      '98': { minDigits: 10, maxDigits: 10, country: 'Iran' },
    };

    const format = validFormats[countryCode];

    if (!format) {
      const countryOption = COUNTRY_CODES.find(c => c.code === countryCode);
      const countryName = countryOption ? countryOption.country : `Country code +${countryCode}`;
      return `Phone number validation for ${countryName} (+${countryCode}) is not fully configured. Please ensure your phone number is valid.`;
    }

    if (cleanPhoneNumber.length < format.minDigits || cleanPhoneNumber.length > format.maxDigits) {
      const digitRange = format.minDigits === format.maxDigits
        ? format.minDigits.toString()
        : `${format.minDigits}-${format.maxDigits}`;
      return `For ${format.country} (+${countryCode}), phone number must be ${digitRange} digits.`;
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
      case 'countryCode':
        return validatePhone(value, formData.phoneNumber);
      case 'phoneNumber':
        return validatePhone(formData.countryCode, value);
      case 'company':
        return value.trim() ? '' : 'Company name is required';
      case 'preferredDate':
        return value ? '' : 'Preferred date is required';
      case 'preferredTime':
        return value ? '' : 'Preferred time is required';
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

  // Handle blur for the searchable dropdown container
  const handleDropdownBlur = () => {
    // Validate country code when dropdown loses focus
    const error = validateField('countryCode', formData.countryCode);
    if (error) {
      setErrors(prev => ({
        ...prev,
        countryCode: error
      }));
    } else {
      setErrors(prev => ({
        ...prev,
        countryCode: ''
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
      // Combine country code and phone number for API submission
      const submissionData = {
        ...formData,
        phone: `+${formData.countryCode}${formData.phoneNumber.replace(/[\s\-()]+/g, '')}`,
      };

      const response = await fetch('/api/consultation-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: submissionData.firstName,
          lastName: submissionData.lastName,
          email: submissionData.email,
          phone: submissionData.phone,
          companyName: submissionData.company,
          jobTitle: submissionData.jobTitle,
          preferredDate: submissionData.preferredDate,
          preferredTime: submissionData.preferredTime,
          timezone: submissionData.timezone,
          consultationType: submissionData.consultationType
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thank you! Your consultation has been booked successfully. You\'ll receive a confirmation email with Teams meeting details shortly.' });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          countryCode: '91', // Reset to default
          phoneNumber: '',
          company: '',
          jobTitle: '',
          companySize: '',
          industry: '',
          website: '',
          preferredDate: '',
          preferredTime: '',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          consultationGoals: '',
          currentChallenges: '',
          budget: '',
          timeline: '',
          additionalNotes: '',
          consultationType: consultationTypeLabels[consultationType as keyof typeof consultationTypeLabels] || 'General Consultation'
        });
        setErrors({});
        // Call onComplete with the submission data including calendar info
        onComplete({
          ...submissionData,
          calendarEventId: data.calendarEventId,
          joinUrl: data.joinUrl
        });
      } else {
        setSubmitStatus({ type: 'error', message: data.error || 'Failed to book consultation. Please try again.' });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get next 14 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Skip weekends (optional - you can remove this if you want weekend consultations)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })
        });
      }
    }

    return dates;
  };

  const availableDates = getAvailableDates();
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-600 px-6 py-6 text-white">
          <div className="flex items-center mb-4">
            <button
              onClick={onBack}
              className="flex items-center text-green-100 hover:text-white transition-colors mr-4"
            >
              <ChevronLeftIcon className="w-5 h-5 mr-1" />
              Back to consultation types
            </button>
            <h1 className="text-2xl font-bold">Book Your Consultation</h1>
          </div>
          <p className="text-green-100">
            {formData.consultationType}
          </p>
        </div>

        {/* Status Message */}
        {submitStatus && (
          <div
            ref={messageRef}
            className={`mx-6 mt-6 p-4 rounded-md ${submitStatus.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'}`}
          >
            {submitStatus.message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Contact Information */}
          <div>
            <div className="flex items-center mb-4">
              <UserIcon className="w-5 h-5 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Information</h2>
            </div>

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
                      errors.firstName ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-green-600 dark:focus:ring-green-500'
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
                      errors.lastName ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-green-600 dark:focus:ring-green-500'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.lastName}</p>}
                </div>
              </div>
            </div>

            <div className="mt-6">
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
                    errors.email ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-green-600 dark:focus:ring-green-500'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
              </div>
            </div>

            <div className="mt-6">
              <label id="country-code-label" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                Phone number *
              </label>
              <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Country Code Searchable Dropdown */}
                <div className="relative" ref={dropdownRef} onBlur={handleDropdownBlur}>
                  <div
                    className={`relative w-full cursor-pointer ${
                      errors.countryCode || errors.phoneNumber ? 'ring-red-500 focus-within:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus-within:ring-green-600 dark:focus-within:ring-green-500'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={handleDropdownToggle}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleDropdownToggle();
                        } else if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          setIsDropdownOpen(true);
                          setTimeout(() => inputRef.current?.focus(), 0);
                        }
                      }}
                      className={`block w-full rounded-md border-0 px-3.5 py-2 text-left text-gray-900 dark:text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 pr-10 ${
                        isDropdownOpen ? 'ring-2' : ''
                      }`}
                      aria-haspopup="listbox"
                      aria-expanded={isDropdownOpen}
                      aria-labelledby="country-code-label"
                    >
                      <span className="block truncate">
                        {getSelectedCountryDisplay()}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <svg
                          className={`h-5 w-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div
                        className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                        role="listbox"
                        aria-labelledby="country-code-label"
                        onKeyDown={handleDropdownKeyDown}
                        tabIndex={-1}
                      >
                        {/* Search Input */}
                        <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 px-2 py-1.5 border-b border-gray-200 dark:border-gray-700">
                          <input
                            ref={inputRef}
                            type="text"
                            placeholder="Search countries..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onKeyDown={handleSearchKeyDown}
                            className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            autoComplete="off"
                          />
                        </div>

                        {/* Country Options */}
                        {filteredCountries.length === 0 ? (
                          <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                            No countries found
                          </div>
                        ) : (
                          filteredCountries.map((country, index) => (
                            <div
                              key={country.code}
                              className={`cursor-pointer select-none relative py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                selectedCountryIndex === index ? 'bg-green-50 dark:bg-green-900/30' : ''
                              } ${
                                formData.countryCode === country.code ? 'bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100' : 'text-gray-900 dark:text-white'
                              }`}
                              onClick={() => handleCountrySelect(country)}
                              onMouseEnter={() => setSelectedCountryIndex(index)}
                              role="option"
                              aria-selected={formData.countryCode === country.code}
                              tabIndex={-1}
                            >
                              <div className="flex items-center">
                                <span className="mr-2 text-lg">{country.flag}</span>
                                <span className="font-medium">+{country.code}</span>
                                <span className="ml-2 truncate">{country.country}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone Number Input */}
                <div className="sm:col-span-2">
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 cursor-text ${
                      errors.countryCode || errors.phoneNumber ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-green-600 dark:focus:ring-green-500'
                    }`}
                    placeholder="123 456 7890"
                  />
                </div>
              </div>
              {(errors.countryCode || errors.phoneNumber) && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.countryCode || errors.phoneNumber}
                </p>
              )}
              {(!errors.countryCode && !errors.phoneNumber) && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Select your country and enter your phone number without the country code
                </p>
              )}
            </div>
          </div>

          {/* Company Information */}
          <div>
            <div className="flex items-center mb-4">
              <BuildingOfficeIcon className="w-5 h-5 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Company Information</h2>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Company name *
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
                      errors.company ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-green-600 dark:focus:ring-green-500'
                    }`}
                    placeholder="Your company name"
                  />
                  {errors.company && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.company}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="jobTitle" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Job title
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 cursor-text ring-gray-300 dark:ring-gray-600 focus:ring-green-600 dark:focus:ring-green-500"
                    placeholder="Your job title"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 mt-6">
              <div>
                <label htmlFor="industry" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Industry
                </label>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="industry"
                    id="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 cursor-text ring-gray-300 dark:ring-gray-600 focus:ring-green-600 dark:focus:ring-green-500"
                    placeholder="Technology, Healthcare, Finance..."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Company website
                </label>
                <div className="mt-2.5">
                  <input
                    type="url"
                    name="website"
                    id="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 cursor-text ring-gray-300 dark:ring-gray-600 focus:ring-green-600 dark:focus:ring-green-500"
                    placeholder="https://www.company.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Consultation Preferences */}
          <div>
            <div className="flex items-center mb-4">
              <CalendarDaysIcon className="w-5 h-5 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Consultation Preferences</h2>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="preferredDate" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Preferred date *
                </label>
                <div className="mt-2.5">
                  <select
                    name="preferredDate"
                    id="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    required
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 cursor-pointer ${
                      errors.preferredDate ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-green-600 dark:focus:ring-green-500'
                    }`}
                  >
                    <option value="" disabled>Select a date</option>
                    {availableDates.map(date => (
                      <option key={date.value} value={date.value}>{date.label}</option>
                    ))}
                  </select>
                  {errors.preferredDate && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.preferredDate}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="preferredTime" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Preferred time *
                </label>
                <div className="mt-2.5">
                  <select
                    name="preferredTime"
                    id="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    required
                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 cursor-pointer ${
                      errors.preferredTime ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-green-600 dark:focus:ring-green-500'
                    }`}
                  >
                    <option value="" disabled>Select a time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {errors.preferredTime && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.preferredTime}</p>}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="consultationGoals" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                What are your main goals for this consultation?
              </label>
              <div className="mt-2.5">
                <textarea
                  name="consultationGoals"
                  id="consultationGoals"
                  rows={4}
                  value={formData.consultationGoals}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 cursor-text ring-gray-300 dark:ring-gray-600 focus:ring-green-600 dark:focus:ring-green-500"
                  placeholder="e.g., Understand AI capabilities, get implementation roadmap, assess ROI potential..."
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="currentChallenges" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                What challenges are you currently facing?
              </label>
              <div className="mt-2.5">
                <textarea
                  name="currentChallenges"
                  id="currentChallenges"
                  rows={4}
                  value={formData.currentChallenges}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 cursor-text ring-gray-300 dark:ring-gray-600 focus:ring-green-600 dark:focus:ring-green-500"
                  placeholder="e.g., Manual processes, customer service bottlenecks, data management issues..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end border-t border-gray-200 dark:border-gray-700 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
            >
              {isSubmitting ? 'Booking Consultation...' : 'Book Free Consultation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
