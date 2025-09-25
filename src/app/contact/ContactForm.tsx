'use client';

import { useState, useRef, useEffect } from 'react';

// Comprehensive country code list based on ITU E.164 standard
const COUNTRY_CODES = [
  // Zone 1: North American Numbering Plan
  { code: '1', country: 'United States / Canada / Caribbean', flag: '🇺🇸' },

  // Zone 2: Mostly Africa
  { code: '20', country: 'Egypt', flag: '🇪🇬' },
  { code: '211', country: 'South Sudan', flag: '🇸🇸' },
  { code: '212', country: 'Morocco / Western Sahara', flag: '🇲🇦' },
  { code: '213', country: 'Algeria', flag: '🇩🇿' },
  { code: '216', country: 'Tunisia', flag: '🇹🇳' },
  { code: '218', country: 'Libya', flag: '🇱🇾' },
  { code: '220', country: 'Gambia', flag: '🇬🇲' },
  { code: '221', country: 'Senegal', flag: '🇸🇳' },
  { code: '222', country: 'Mauritania', flag: '🇲🇷' },
  { code: '223', country: 'Mali', flag: '🇲🇱' },
  { code: '224', country: 'Guinea', flag: '🇬🇳' },
  { code: '225', country: 'Ivory Coast', flag: '🇨🇮' },
  { code: '226', country: 'Burkina Faso', flag: '🇧🇫' },
  { code: '227', country: 'Niger', flag: '🇳🇪' },
  { code: '228', country: 'Togo', flag: '🇹🇬' },
  { code: '229', country: 'Benin', flag: '🇧🇯' },
  { code: '230', country: 'Mauritius', flag: '🇲🇺' },
  { code: '231', country: 'Liberia', flag: '🇱🇷' },
  { code: '232', country: 'Sierra Leone', flag: '🇸🇱' },
  { code: '233', country: 'Ghana', flag: '🇬🇭' },
  { code: '234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '235', country: 'Chad', flag: '🇹🇩' },
  { code: '236', country: 'Central African Republic', flag: '🇨🇫' },
  { code: '237', country: 'Cameroon', flag: '🇨🇲' },
  { code: '238', country: 'Cape Verde', flag: '🇨🇻' },
  { code: '239', country: 'São Tomé and Príncipe', flag: '🇸🇹' },
  { code: '240', country: 'Equatorial Guinea', flag: '🇬🇶' },
  { code: '241', country: 'Gabon', flag: '🇬🇦' },
  { code: '242', country: 'Republic of the Congo', flag: '🇨🇬' },
  { code: '243', country: 'Democratic Republic of the Congo', flag: '🇨🇩' },
  { code: '244', country: 'Angola', flag: '🇦🇴' },
  { code: '245', country: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: '246', country: 'British Indian Ocean Territory', flag: '🇮🇴' },
  { code: '247', country: 'Ascension Island', flag: '🇦🇨' },
  { code: '248', country: 'Seychelles', flag: '🇸🇨' },
  { code: '249', country: 'Sudan', flag: '🇸🇩' },
  { code: '250', country: 'Rwanda', flag: '🇷🇼' },
  { code: '251', country: 'Ethiopia', flag: '🇪🇹' },
  { code: '252', country: 'Somalia', flag: '🇸🇴' },
  { code: '253', country: 'Djibouti', flag: '🇩🇯' },
  { code: '254', country: 'Kenya', flag: '🇰🇪' },
  { code: '255', country: 'Tanzania', flag: '🇹🇿' },
  { code: '256', country: 'Uganda', flag: '🇺🇬' },
  { code: '257', country: 'Burundi', flag: '🇧🇮' },
  { code: '258', country: 'Mozambique', flag: '🇲🇿' },
  { code: '259', country: 'Zambia', flag: '🇿🇲' },
  { code: '260', country: 'Zambia', flag: '🇿🇲' },
  { code: '261', country: 'Madagascar', flag: '🇲🇬' },
  { code: '262', country: 'Réunion / Mayotte', flag: '🇷🇪' },
  { code: '263', country: 'Zimbabwe', flag: '🇿🇼' },
  { code: '264', country: 'Namibia', flag: '🇳🇦' },
  { code: '265', country: 'Malawi', flag: '🇲🇼' },
  { code: '266', country: 'Lesotho', flag: '🇱🇸' },
  { code: '267', country: 'Botswana', flag: '🇧🇼' },
  { code: '268', country: 'Eswatini', flag: '🇸🇿' },
  { code: '269', country: 'Comoros', flag: '🇰🇲' },
  { code: '27', country: 'South Africa', flag: '🇿🇦' },
  { code: '290', country: 'Saint Helena', flag: '🇸🇭' },
  { code: '291', country: 'Eritrea', flag: '🇪🇷' },
  { code: '297', country: 'Aruba', flag: '🇦🇼' },
  { code: '298', country: 'Faroe Islands', flag: '🇫🇴' },
  { code: '299', country: 'Greenland', flag: '🇬🇱' },

  // Zone 3 & 4: Mostly Europe
  { code: '30', country: 'Greece', flag: '🇬🇷' },
  { code: '31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '32', country: 'Belgium', flag: '🇧🇪' },
  { code: '33', country: 'France', flag: '🇫🇷' },
  { code: '34', country: 'Spain', flag: '🇪🇸' },
  { code: '350', country: 'Gibraltar', flag: '🇬🇮' },
  { code: '351', country: 'Portugal', flag: '🇵🇹' },
  { code: '352', country: 'Luxembourg', flag: '🇱🇺' },
  { code: '353', country: 'Ireland', flag: '🇮🇪' },
  { code: '354', country: 'Iceland', flag: '🇮🇸' },
  { code: '355', country: 'Albania', flag: '🇦🇱' },
  { code: '356', country: 'Malta', flag: '🇲🇹' },
  { code: '357', country: 'Cyprus', flag: '🇨🇾' },
  { code: '358', country: 'Finland / Åland Islands', flag: '🇫🇮' },
  { code: '359', country: 'Bulgaria', flag: '🇧🇬' },
  { code: '36', country: 'Hungary', flag: '🇭🇺' },
  { code: '370', country: 'Lithuania', flag: '🇱🇹' },
  { code: '371', country: 'Latvia', flag: '🇱🇻' },
  { code: '372', country: 'Estonia', flag: '🇪🇪' },
  { code: '373', country: 'Moldova', flag: '🇲🇩' },
  { code: '374', country: 'Armenia', flag: '🇦🇲' },
  { code: '375', country: 'Belarus', flag: '🇧🇾' },
  { code: '376', country: 'Andorra', flag: '🇦🇩' },
  { code: '377', country: 'Monaco', flag: '🇲🇨' },
  { code: '378', country: 'San Marino', flag: '🇸🇲' },
  { code: '379', country: 'Vatican City', flag: '🇻🇦' },
  { code: '380', country: 'Ukraine', flag: '🇺🇦' },
  { code: '381', country: 'Serbia', flag: '🇷🇸' },
  { code: '382', country: 'Montenegro', flag: '🇲🇪' },
  { code: '383', country: 'Kosovo', flag: '🇽🇰' },
  { code: '385', country: 'Croatia', flag: '🇭🇷' },
  { code: '386', country: 'Slovenia', flag: '🇸🇮' },
  { code: '387', country: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { code: '389', country: 'North Macedonia', flag: '🇲🇰' },
  { code: '39', country: 'Italy / Vatican City', flag: '🇮🇹' },
  { code: '40', country: 'Romania', flag: '🇷🇴' },
  { code: '41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '42', country: 'Czech Republic / Slovakia (historical)', flag: '🇨🇿' },
  { code: '420', country: 'Czech Republic', flag: '🇨🇿' },
  { code: '421', country: 'Slovakia', flag: '🇸🇰' },
  { code: '423', country: 'Liechtenstein', flag: '🇱🇮' },
  { code: '43', country: 'Austria', flag: '🇦🇹' },
  { code: '44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '45', country: 'Denmark', flag: '🇩🇰' },
  { code: '46', country: 'Sweden', flag: '🇸🇪' },
  { code: '47', country: 'Norway', flag: '🇳🇴' },
  { code: '48', country: 'Poland', flag: '🇵🇱' },
  { code: '49', country: 'Germany', flag: '🇩🇪' },

  // Zone 5: South and Central Americas
  { code: '500', country: 'Falkland Islands', flag: '🇫🇰' },
  { code: '501', country: 'Belize', flag: '🇧🇿' },
  { code: '502', country: 'Guatemala', flag: '🇬🇹' },
  { code: '503', country: 'El Salvador', flag: '🇸🇻' },
  { code: '504', country: 'Honduras', flag: '🇭🇳' },
  { code: '505', country: 'Nicaragua', flag: '🇳🇮' },
  { code: '506', country: 'Costa Rica', flag: '🇨🇷' },
  { code: '507', country: 'Panama', flag: '🇵🇦' },
  { code: '508', country: 'Saint Pierre and Miquelon', flag: '🇵🇲' },
  { code: '509', country: 'Haiti', flag: '🇭🇹' },
  { code: '51', country: 'Peru', flag: '🇵🇪' },
  { code: '52', country: 'Mexico', flag: '🇲🇽' },
  { code: '53', country: 'Cuba', flag: '🇨🇺' },
  { code: '54', country: 'Argentina', flag: '🇦🇷' },
  { code: '55', country: 'Brazil', flag: '🇧🇷' },
  { code: '56', country: 'Chile', flag: '🇨🇱' },
  { code: '57', country: 'Colombia', flag: '🇨🇴' },
  { code: '58', country: 'Venezuela', flag: '🇻🇪' },
  { code: '590', country: 'Guadeloupe', flag: '🇬🇵' },
  { code: '591', country: 'Bolivia', flag: '🇧🇴' },
  { code: '592', country: 'Guyana', flag: '🇬🇾' },
  { code: '593', country: 'Ecuador', flag: '🇪🇨' },
  { code: '594', country: 'French Guiana', flag: '🇬🇫' },
  { code: '595', country: 'Paraguay', flag: '🇵🇾' },
  { code: '596', country: 'Martinique', flag: '🇲🇶' },
  { code: '597', country: 'Suriname', flag: '🇸🇷' },
  { code: '598', country: 'Uruguay', flag: '🇺🇾' },
  { code: '599', country: 'Curaçao / Bonaire, Sint Eustatius and Saba', flag: '🇨🇼' },

  // Zone 6: Southeast Asia and Oceania
  { code: '60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '61', country: 'Australia / Christmas Island / Cocos Islands', flag: '🇦🇺' },
  { code: '62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '63', country: 'Philippines', flag: '🇵🇭' },
  { code: '64', country: 'New Zealand', flag: '🇳🇿' },
  { code: '65', country: 'Singapore', flag: '🇸🇬' },
  { code: '66', country: 'Thailand', flag: '🇹🇭' },
  { code: '670', country: 'East Timor', flag: '🇹🇱' },
  { code: '672', country: 'Antarctica / Australian external territories', flag: '🇦🇶' },
  { code: '673', country: 'Brunei', flag: '🇧🇳' },
  { code: '674', country: 'Nauru', flag: '🇳🇷' },
  { code: '675', country: 'Papua New Guinea', flag: '🇵🇬' },
  { code: '676', country: 'Tonga', flag: '🇹🇴' },
  { code: '677', country: 'Solomon Islands', flag: '🇸🇧' },
  { code: '678', country: 'Vanuatu', flag: '🇻🇺' },
  { code: '679', country: 'Fiji', flag: '🇫🇯' },
  { code: '680', country: 'Palau', flag: '🇵🇼' },
  { code: '681', country: 'Wallis and Futuna', flag: '🇼🇫' },
  { code: '682', country: 'Cook Islands', flag: '🇨🇰' },
  { code: '683', country: 'Niue', flag: '🇳🇺' },
  { code: '684', country: 'American Samoa', flag: '🇦🇸' },
  { code: '685', country: 'Samoa', flag: '🇼🇸' },
  { code: '686', country: 'Kiribati', flag: '🇰🇮' },
  { code: '687', country: 'New Caledonia', flag: '🇳🇨' },
  { code: '688', country: 'Tuvalu', flag: '🇹🇻' },
  { code: '689', country: 'French Polynesia', flag: '🇵🇫' },
  { code: '690', country: 'Tokelau', flag: '🇹🇰' },
  { code: '691', country: 'Micronesia', flag: '🇫🇲' },
  { code: '692', country: 'Marshall Islands', flag: '🇲🇭' },

  // Zone 7: Russia and neighboring regions
  { code: '7', country: 'Russia / Kazakhstan', flag: '🇷🇺' },
  { code: '76', country: 'Kazakhstan (alternative)', flag: '🇰🇿' },
  { code: '77', country: 'Kazakhstan (alternative)', flag: '🇰🇿' },

  // Zone 8: East Asia, Southeast Asia, and special services
  { code: '81', country: 'Japan', flag: '🇯🇵' },
  { code: '82', country: 'South Korea', flag: '🇰🇷' },
  { code: '84', country: 'Vietnam', flag: '🇻🇳' },
  { code: '850', country: 'North Korea', flag: '🇰🇵' },
  { code: '852', country: 'Hong Kong', flag: '🇭🇰' },
  { code: '853', country: 'Macau', flag: '🇲🇴' },
  { code: '855', country: 'Cambodia', flag: '🇰🇭' },
  { code: '856', country: 'Laos', flag: '🇱🇦' },
  { code: '86', country: 'China', flag: '🇨🇳' },
  { code: '880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '886', country: 'Taiwan', flag: '🇹🇼' },

  // Zone 9: West, Central, and South Asia, and part of Southern Europe
  { code: '90', country: 'Turkey', flag: '🇹🇷' },
  { code: '91', country: 'India', flag: '🇮🇳' },
  { code: '92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '93', country: 'Afghanistan', flag: '🇦🇫' },
  { code: '94', country: 'Sri Lanka', flag: '🇱🇰' },
  { code: '95', country: 'Myanmar', flag: '🇲🇲' },
  { code: '960', country: 'Maldives', flag: '🇲🇻' },
  { code: '961', country: 'Lebanon', flag: '🇱🇧' },
  { code: '962', country: 'Jordan', flag: '🇯🇴' },
  { code: '963', country: 'Syria', flag: '🇸🇾' },
  { code: '964', country: 'Iraq', flag: '🇮🇶' },
  { code: '965', country: 'Kuwait', flag: '🇰🇼' },
  { code: '966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '967', country: 'Yemen', flag: '🇾🇪' },
  { code: '968', country: 'Oman', flag: '🇴🇲' },
  { code: '970', country: 'Palestine', flag: '🇵🇸' },
  { code: '971', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: '972', country: 'Israel', flag: '🇮🇱' },
  { code: '973', country: 'Bahrain', flag: '🇧🇭' },
  { code: '974', country: 'Qatar', flag: '🇶🇦' },
  { code: '975', country: 'Bhutan', flag: '🇧🇹' },
  { code: '976', country: 'Mongolia', flag: '🇲🇳' },
  { code: '977', country: 'Nepal', flag: '🇳🇵' },
  { code: '98', country: 'Iran', flag: '🇮🇷' },
  { code: '992', country: 'Tajikistan', flag: '🇹🇯' },
  { code: '993', country: 'Turkmenistan', flag: '🇹🇲' },
  { code: '994', country: 'Azerbaijan', flag: '🇦🇿' },
  { code: '995', country: 'Georgia', flag: '🇬🇪' },
  { code: '996', country: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: '998', country: 'Uzbekistan', flag: '🇺🇿' },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '91', // Default to India (+91)
    phoneNumber: '',
    company: '',
    service: '',
    message: ''
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
      // Zone 1: North American Numbering Plan (NANP) - +1
      '1': { minDigits: 10, maxDigits: 10, country: 'United States/Canada/Caribbean' },

      // Zone 2: Mostly Africa
      '20': { minDigits: 8, maxDigits: 9, country: 'Egypt' },
      '211': { minDigits: 9, maxDigits: 9, country: 'South Sudan' },
      '212': { minDigits: 9, maxDigits: 9, country: 'Morocco/Western Sahara' },
      '213': { minDigits: 8, maxDigits: 9, country: 'Algeria' },
      '216': { minDigits: 8, maxDigits: 8, country: 'Tunisia' },
      '218': { minDigits: 9, maxDigits: 10, country: 'Libya' },
      '220': { minDigits: 7, maxDigits: 7, country: 'Gambia' },
      '221': { minDigits: 9, maxDigits: 9, country: 'Senegal' },
      '222': { minDigits: 8, maxDigits: 8, country: 'Mauritania' },
      '223': { minDigits: 8, maxDigits: 8, country: 'Mali' },
      '224': { minDigits: 8, maxDigits: 9, country: 'Guinea' },
      '225': { minDigits: 8, maxDigits: 8, country: 'Ivory Coast' },
      '226': { minDigits: 8, maxDigits: 8, country: 'Burkina Faso' },
      '227': { minDigits: 8, maxDigits: 8, country: 'Niger' },
      '228': { minDigits: 8, maxDigits: 8, country: 'Togo' },
      '229': { minDigits: 8, maxDigits: 8, country: 'Benin' },
      '230': { minDigits: 8, maxDigits: 8, country: 'Mauritius' },
      '231': { minDigits: 7, maxDigits: 9, country: 'Liberia' },
      '232': { minDigits: 8, maxDigits: 8, country: 'Sierra Leone' },
      '233': { minDigits: 8, maxDigits: 9, country: 'Ghana' },
      '234': { minDigits: 8, maxDigits: 11, country: 'Nigeria' },
      '235': { minDigits: 8, maxDigits: 8, country: 'Chad' },
      '236': { minDigits: 8, maxDigits: 8, country: 'Central African Republic' },
      '237': { minDigits: 9, maxDigits: 9, country: 'Cameroon' },
      '238': { minDigits: 7, maxDigits: 7, country: 'Cape Verde' },
      '239': { minDigits: 7, maxDigits: 7, country: 'São Tomé and Príncipe' },
      '240': { minDigits: 9, maxDigits: 9, country: 'Equatorial Guinea' },
      '241': { minDigits: 7, maxDigits: 9, country: 'Gabon' },
      '242': { minDigits: 9, maxDigits: 9, country: 'Republic of the Congo' },
      '243': { minDigits: 9, maxDigits: 9, country: 'Democratic Republic of the Congo' },
      '244': { minDigits: 9, maxDigits: 9, country: 'Angola' },
      '245': { minDigits: 7, maxDigits: 7, country: 'Guinea-Bissau' },
      '246': { minDigits: 7, maxDigits: 7, country: 'British Indian Ocean Territory' },
      '247': { minDigits: 4, maxDigits: 4, country: 'Ascension Island' },
      '248': { minDigits: 7, maxDigits: 7, country: 'Seychelles' },
      '249': { minDigits: 9, maxDigits: 9, country: 'Sudan' },
      '250': { minDigits: 9, maxDigits: 9, country: 'Rwanda' },
      '251': { minDigits: 9, maxDigits: 9, country: 'Ethiopia' },
      '252': { minDigits: 8, maxDigits: 9, country: 'Somalia' },
      '253': { minDigits: 8, maxDigits: 8, country: 'Djibouti' },
      '254': { minDigits: 9, maxDigits: 9, country: 'Kenya' },
      '255': { minDigits: 9, maxDigits: 9, country: 'Tanzania' },
      '256': { minDigits: 9, maxDigits: 9, country: 'Uganda' },
      '257': { minDigits: 8, maxDigits: 8, country: 'Burundi' },
      '258': { minDigits: 8, maxDigits: 9, country: 'Mozambique' },
      '260': { minDigits: 9, maxDigits: 9, country: 'Zambia' },
      '261': { minDigits: 9, maxDigits: 9, country: 'Madagascar' },
      '262': { minDigits: 9, maxDigits: 9, country: 'Réunion/Mayotte' },
      '263': { minDigits: 9, maxDigits: 9, country: 'Zimbabwe' },
      '264': { minDigits: 9, maxDigits: 9, country: 'Namibia' },
      '265': { minDigits: 9, maxDigits: 9, country: 'Malawi' },
      '266': { minDigits: 8, maxDigits: 8, country: 'Lesotho' },
      '267': { minDigits: 8, maxDigits: 8, country: 'Botswana' },
      '268': { minDigits: 8, maxDigits: 8, country: 'Eswatini' },
      '269': { minDigits: 7, maxDigits: 7, country: 'Comoros' },
      '27': { minDigits: 9, maxDigits: 9, country: 'South Africa' },
      '290': { minDigits: 4, maxDigits: 4, country: 'Saint Helena' },
      '291': { minDigits: 7, maxDigits: 7, country: 'Eritrea' },
      '297': { minDigits: 7, maxDigits: 7, country: 'Aruba' },
      '298': { minDigits: 6, maxDigits: 6, country: 'Faroe Islands' },
      '299': { minDigits: 6, maxDigits: 6, country: 'Greenland' },

      // Zone 3 & 4: Mostly Europe
      '30': { minDigits: 10, maxDigits: 10, country: 'Greece' },
      '31': { minDigits: 9, maxDigits: 9, country: 'Netherlands' },
      '32': { minDigits: 9, maxDigits: 9, country: 'Belgium' },
      '33': { minDigits: 9, maxDigits: 9, country: 'France' },
      '34': { minDigits: 9, maxDigits: 9, country: 'Spain' },
      '350': { minDigits: 8, maxDigits: 8, country: 'Gibraltar' },
      '351': { minDigits: 9, maxDigits: 9, country: 'Portugal' },
      '352': { minDigits: 9, maxDigits: 9, country: 'Luxembourg' },
      '353': { minDigits: 9, maxDigits: 9, country: 'Ireland' },
      '354': { minDigits: 7, maxDigits: 9, country: 'Iceland' },
      '355': { minDigits: 9, maxDigits: 9, country: 'Albania' },
      '356': { minDigits: 8, maxDigits: 8, country: 'Malta' },
      '357': { minDigits: 8, maxDigits: 8, country: 'Cyprus' },
      '358': { minDigits: 9, maxDigits: 10, country: 'Finland/Åland Islands' },
      '359': { minDigits: 9, maxDigits: 9, country: 'Bulgaria' },
      '36': { minDigits: 9, maxDigits: 9, country: 'Hungary' },
      '370': { minDigits: 8, maxDigits: 8, country: 'Lithuania' },
      '371': { minDigits: 8, maxDigits: 8, country: 'Latvia' },
      '372': { minDigits: 8, maxDigits: 8, country: 'Estonia' },
      '373': { minDigits: 8, maxDigits: 8, country: 'Moldova' },
      '374': { minDigits: 8, maxDigits: 8, country: 'Armenia' },
      '375': { minDigits: 9, maxDigits: 9, country: 'Belarus' },
      '376': { minDigits: 6, maxDigits: 6, country: 'Andorra' },
      '377': { minDigits: 8, maxDigits: 9, country: 'Monaco' },
      '378': { minDigits: 6, maxDigits: 10, country: 'San Marino' },
      '379': { minDigits: 6, maxDigits: 10, country: 'Vatican City' },
      '380': { minDigits: 9, maxDigits: 9, country: 'Ukraine' },
      '381': { minDigits: 9, maxDigits: 9, country: 'Serbia' },
      '382': { minDigits: 8, maxDigits: 9, country: 'Montenegro' },
      '383': { minDigits: 9, maxDigits: 9, country: 'Kosovo' },
      '385': { minDigits: 9, maxDigits: 9, country: 'Croatia' },
      '386': { minDigits: 8, maxDigits: 8, country: 'Slovenia' },
      '387': { minDigits: 9, maxDigits: 9, country: 'Bosnia and Herzegovina' },
      '389': { minDigits: 8, maxDigits: 8, country: 'North Macedonia' },
      '39': { minDigits: 9, maxDigits: 10, country: 'Italy/Vatican City' },
      '40': { minDigits: 10, maxDigits: 10, country: 'Romania' },
      '41': { minDigits: 9, maxDigits: 9, country: 'Switzerland' },
      '420': { minDigits: 9, maxDigits: 9, country: 'Czech Republic' },
      '421': { minDigits: 9, maxDigits: 9, country: 'Slovakia' },
      '423': { minDigits: 7, maxDigits: 9, country: 'Liechtenstein' },
      '43': { minDigits: 10, maxDigits: 13, country: 'Austria' },
      '44': { minDigits: 10, maxDigits: 10, country: 'United Kingdom' },
      '45': { minDigits: 8, maxDigits: 8, country: 'Denmark' },
      '46': { minDigits: 7, maxDigits: 9, country: 'Sweden' },
      '47': { minDigits: 8, maxDigits: 8, country: 'Norway' },
      '48': { minDigits: 9, maxDigits: 9, country: 'Poland' },
      '49': { minDigits: 10, maxDigits: 11, country: 'Germany' },

      // Zone 5: South and Central Americas
      '500': { minDigits: 5, maxDigits: 5, country: 'Falkland Islands' },
      '501': { minDigits: 7, maxDigits: 7, country: 'Belize' },
      '502': { minDigits: 8, maxDigits: 8, country: 'Guatemala' },
      '503': { minDigits: 8, maxDigits: 8, country: 'El Salvador' },
      '504': { minDigits: 8, maxDigits: 8, country: 'Honduras' },
      '505': { minDigits: 8, maxDigits: 8, country: 'Nicaragua' },
      '506': { minDigits: 8, maxDigits: 8, country: 'Costa Rica' },
      '507': { minDigits: 8, maxDigits: 8, country: 'Panama' },
      '508': { minDigits: 6, maxDigits: 6, country: 'Saint Pierre and Miquelon' },
      '509': { minDigits: 8, maxDigits: 8, country: 'Haiti' },
      '51': { minDigits: 9, maxDigits: 9, country: 'Peru' },
      '52': { minDigits: 10, maxDigits: 10, country: 'Mexico' },
      '53': { minDigits: 8, maxDigits: 8, country: 'Cuba' },
      '54': { minDigits: 10, maxDigits: 11, country: 'Argentina' },
      '55': { minDigits: 11, maxDigits: 11, country: 'Brazil' },
      '56': { minDigits: 9, maxDigits: 9, country: 'Chile' },
      '57': { minDigits: 10, maxDigits: 10, country: 'Colombia' },
      '58': { minDigits: 10, maxDigits: 11, country: 'Venezuela' },
      '590': { minDigits: 9, maxDigits: 9, country: 'Guadeloupe' },
      '591': { minDigits: 8, maxDigits: 8, country: 'Bolivia' },
      '592': { minDigits: 7, maxDigits: 7, country: 'Guyana' },
      '593': { minDigits: 9, maxDigits: 9, country: 'Ecuador' },
      '594': { minDigits: 9, maxDigits: 9, country: 'French Guiana' },
      '595': { minDigits: 9, maxDigits: 9, country: 'Paraguay' },
      '596': { minDigits: 9, maxDigits: 9, country: 'Martinique' },
      '597': { minDigits: 7, maxDigits: 7, country: 'Suriname' },
      '598': { minDigits: 8, maxDigits: 9, country: 'Uruguay' },
      '599': { minDigits: 7, maxDigits: 7, country: 'Curaçao/Bonaire, Sint Eustatius and Saba' },

      // Zone 6: Southeast Asia and Oceania
      '60': { minDigits: 9, maxDigits: 10, country: 'Malaysia' },
      '61': { minDigits: 9, maxDigits: 9, country: 'Australia/Christmas Island/Cocos Islands' },
      '62': { minDigits: 10, maxDigits: 12, country: 'Indonesia' },
      '63': { minDigits: 10, maxDigits: 10, country: 'Philippines' },
      '64': { minDigits: 8, maxDigits: 10, country: 'New Zealand' },
      '65': { minDigits: 8, maxDigits: 8, country: 'Singapore' },
      '66': { minDigits: 9, maxDigits: 9, country: 'Thailand' },
      '670': { minDigits: 8, maxDigits: 8, country: 'East Timor' },
      '672': { minDigits: 6, maxDigits: 6, country: 'Antarctica/Australian external territories' },
      '673': { minDigits: 7, maxDigits: 7, country: 'Brunei' },
      '674': { minDigits: 7, maxDigits: 7, country: 'Nauru' },
      '675': { minDigits: 8, maxDigits: 8, country: 'Papua New Guinea' },
      '676': { minDigits: 5, maxDigits: 7, country: 'Tonga' },
      '677': { minDigits: 7, maxDigits: 7, country: 'Solomon Islands' },
      '678': { minDigits: 7, maxDigits: 7, country: 'Vanuatu' },
      '679': { minDigits: 7, maxDigits: 7, country: 'Fiji' },
      '680': { minDigits: 7, maxDigits: 7, country: 'Palau' },
      '681': { minDigits: 6, maxDigits: 6, country: 'Wallis and Futuna' },
      '682': { minDigits: 5, maxDigits: 5, country: 'Cook Islands' },
      '683': { minDigits: 4, maxDigits: 4, country: 'Niue' },
      '684': { minDigits: 7, maxDigits: 7, country: 'American Samoa' },
      '685': { minDigits: 6, maxDigits: 7, country: 'Samoa' },
      '686': { minDigits: 5, maxDigits: 8, country: 'Kiribati' },
      '687': { minDigits: 6, maxDigits: 6, country: 'New Caledonia' },
      '688': { minDigits: 5, maxDigits: 5, country: 'Tuvalu' },
      '689': { minDigits: 6, maxDigits: 6, country: 'French Polynesia' },
      '690': { minDigits: 4, maxDigits: 4, country: 'Tokelau' },
      '691': { minDigits: 7, maxDigits: 7, country: 'Micronesia' },
      '692': { minDigits: 7, maxDigits: 7, country: 'Marshall Islands' },

      // Zone 7: Russia and neighboring regions
      '7': { minDigits: 10, maxDigits: 10, country: 'Russia/Kazakhstan' },
      '76': { minDigits: 10, maxDigits: 10, country: 'Kazakhstan (alternative)' },
      '77': { minDigits: 10, maxDigits: 10, country: 'Kazakhstan (alternative)' },

      // Zone 8: East Asia, Southeast Asia, and special services
      '81': { minDigits: 10, maxDigits: 10, country: 'Japan' },
      '82': { minDigits: 10, maxDigits: 10, country: 'South Korea' },
      '84': { minDigits: 9, maxDigits: 10, country: 'Vietnam' },
      '850': { minDigits: 8, maxDigits: 9, country: 'North Korea' },
      '852': { minDigits: 8, maxDigits: 8, country: 'Hong Kong' },
      '853': { minDigits: 8, maxDigits: 8, country: 'Macau' },
      '855': { minDigits: 8, maxDigits: 9, country: 'Cambodia' },
      '856': { minDigits: 8, maxDigits: 9, country: 'Laos' },
      '86': { minDigits: 11, maxDigits: 11, country: 'China' },
      '880': { minDigits: 10, maxDigits: 10, country: 'Bangladesh' },
      '886': { minDigits: 9, maxDigits: 9, country: 'Taiwan' },

      // Zone 9: West, Central, and South Asia, and part of Southern Europe
      '90': { minDigits: 10, maxDigits: 10, country: 'Turkey' },
      '91': { minDigits: 10, maxDigits: 10, country: 'India' },
      '92': { minDigits: 10, maxDigits: 10, country: 'Pakistan' },
      '93': { minDigits: 9, maxDigits: 9, country: 'Afghanistan' },
      '94': { minDigits: 9, maxDigits: 9, country: 'Sri Lanka' },
      '95': { minDigits: 8, maxDigits: 10, country: 'Myanmar' },
      '960': { minDigits: 7, maxDigits: 7, country: 'Maldives' },
      '961': { minDigits: 7, maxDigits: 8, country: 'Lebanon' },
      '962': { minDigits: 9, maxDigits: 9, country: 'Jordan' },
      '963': { minDigits: 9, maxDigits: 9, country: 'Syria' },
      '964': { minDigits: 9, maxDigits: 10, country: 'Iraq' },
      '965': { minDigits: 8, maxDigits: 8, country: 'Kuwait' },
      '966': { minDigits: 9, maxDigits: 9, country: 'Saudi Arabia' },
      '967': { minDigits: 9, maxDigits: 9, country: 'Yemen' },
      '968': { minDigits: 8, maxDigits: 8, country: 'Oman' },
      '970': { minDigits: 9, maxDigits: 9, country: 'Palestine' },
      '971': { minDigits: 9, maxDigits: 9, country: 'United Arab Emirates' },
      '972': { minDigits: 9, maxDigits: 9, country: 'Israel' },
      '973': { minDigits: 8, maxDigits: 8, country: 'Bahrain' },
      '974': { minDigits: 8, maxDigits: 8, country: 'Qatar' },
      '975': { minDigits: 8, maxDigits: 8, country: 'Bhutan' },
      '976': { minDigits: 8, maxDigits: 8, country: 'Mongolia' },
      '977': { minDigits: 10, maxDigits: 10, country: 'Nepal' },
      '98': { minDigits: 10, maxDigits: 10, country: 'Iran' },
      '992': { minDigits: 9, maxDigits: 9, country: 'Tajikistan' },
      '993': { minDigits: 8, maxDigits: 8, country: 'Turkmenistan' },
      '994': { minDigits: 9, maxDigits: 9, country: 'Azerbaijan' },
      '995': { minDigits: 9, maxDigits: 9, country: 'Georgia' },
      '996': { minDigits: 9, maxDigits: 9, country: 'Kyrgyzstan' },
      '998': { minDigits: 9, maxDigits: 9, country: 'Uzbekistan' },
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

      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.' });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          countryCode: '91', // Reset to default
          phoneNumber: '',
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
          <label id="country-code-label" className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white">
            Phone number *
          </label>
          <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Country Code Searchable Dropdown */}
            <div className="relative" ref={dropdownRef} onBlur={handleDropdownBlur}>
              <div
                className={`relative w-full cursor-pointer ${
                  errors.countryCode || errors.phoneNumber ? 'ring-red-500 focus-within:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus-within:ring-blue-600 dark:focus-within:ring-blue-500'
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
                        className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                            selectedCountryIndex === index ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                          } ${
                            formData.countryCode === country.code ? 'bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-100' : 'text-gray-900 dark:text-white'
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
                  errors.countryCode || errors.phoneNumber ? 'ring-red-500 focus:ring-red-500' : 'ring-gray-300 dark:ring-gray-600 focus:ring-blue-600 dark:focus:ring-blue-500'
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
