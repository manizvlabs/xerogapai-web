'use client';

import { GlobeIcon, ChatBubbleLeftRightIcon, LanguageIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function EnterpriseLanguages() {
  const languages = [
    { name: 'English', native: 'English', code: 'EN', speakers: '1.5B+' },
    { name: 'Spanish', native: 'Español', code: 'ES', speakers: '500M+' },
    { name: 'French', native: 'Français', code: 'FR', speakers: '280M+' },
    { name: 'German', native: 'Deutsch', code: 'DE', speakers: '100M+' },
    { name: 'Italian', native: 'Italiano', code: 'IT', speakers: '85M+' },
    { name: 'Portuguese', native: 'Português', code: 'PT', speakers: '260M+' },
    { name: 'Dutch', native: 'Nederlands', code: 'NL', speakers: '25M+' },
    { name: 'Swedish', native: 'Svenska', code: 'SV', speakers: '10M+' },
    { name: 'Danish', native: 'Dansk', code: 'DA', speakers: '6M+' },
    { name: 'Norwegian', native: 'Norsk', code: 'NO', speakers: '5M+' },
    { name: 'Finnish', native: 'Suomi', code: 'FI', speakers: '5M+' },
    { name: 'Arabic', native: 'العربية', code: 'AR', speakers: '420M+', rtl: true },
    { name: 'Hindi', native: 'हिन्दी', code: 'HI', speakers: '600M+' },
    { name: 'Bengali', native: 'বাংলা', code: 'BN', speakers: '230M+' },
    { name: 'Japanese', native: '日本語', code: 'JA', speakers: '125M+' },
    { name: 'Korean', native: '한국어', code: 'KO', speakers: '80M+' },
    { name: 'Chinese', native: '中文', code: 'ZH', speakers: '1.4B+' },
    { name: 'Thai', native: 'ไทย', code: 'TH', speakers: '60M+' },
    { name: 'Vietnamese', native: 'Tiếng Việt', code: 'VI', speakers: '85M+' },
    { name: 'Indonesian', native: 'Bahasa Indonesia', code: 'ID', speakers: '200M+' }
  ];

  const capabilities = [
    {
      icon: LanguageIcon,
      title: 'Automatic Translation',
      description: 'Real-time translation of queries and responses with context preservation.',
      features: [
        'Context-aware translation',
        'Industry-specific terminology',
        'Cultural adaptation',
        'Real-time processing'
      ]
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'Natural Language Processing',
      description: 'Advanced NLP that understands intent and context in multiple languages.',
      features: [
        'Intent recognition',
        'Entity extraction',
        'Sentiment analysis',
        'Context understanding'
      ]
    },
    {
      icon: UserGroupIcon,
      title: 'Cultural Adaptation',
      description: 'Responses adapted to cultural norms and business practices in each region.',
      features: [
        'Regional business practices',
        'Cultural sensitivity',
        'Local compliance',
        'Regional preferences'
      ]
    },
    {
      icon: GlobeIcon,
      title: 'Global Knowledge Access',
      description: 'Unified knowledge base accessible in any supported language worldwide.',
      features: [
        '24/7 global access',
        'Consistent answers',
        'Multi-region support',
        'Localized responses'
      ]
    }
  ];

  const useCases = [
    {
      company: 'Global Tech Corp',
      challenge: 'Supporting 15,000 employees across 50 countries',
      solution: 'Multi-language knowledge base with 12 languages',
      result: '85% reduction in support tickets, 95% employee satisfaction'
    },
    {
      company: 'International Bank',
      challenge: 'Regulatory compliance queries in multiple languages',
      solution: 'GDPR and DPDP compliant multi-language Q&A system',
      result: '60% faster compliance responses, zero language barriers'
    },
    {
      company: 'Manufacturing Giant',
      challenge: 'Technical documentation for global operations',
      solution: 'Automated translation of technical manuals and procedures',
      result: '50% improvement in operational efficiency worldwide'
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            20+ Languages, One Knowledge Base
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Break down language barriers with automatic translation and culturally-aware responses.
            Your global workforce gets instant answers in their preferred language.
          </p>
        </div>

        {/* Language Grid */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 mb-16 border border-gray-200 dark:border-gray-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Supported Languages
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Comprehensive language support for global enterprises
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {languages.map((language, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border text-center ${
                  language.rtl
                    ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
                }`}
              >
                <div className={`text-lg font-semibold mb-1 ${
                  language.rtl ? 'text-blue-800 dark:text-blue-300' : 'text-gray-900 dark:text-white'
                }`}>
                  {language.native}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {language.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-500">
                  {language.speakers} speakers
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {capabilities.map((capability, index) => {
            const IconComponent = capability.icon;
            return (
              <div key={index} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mr-4">
                    <IconComponent className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {capability.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {capability.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                    Key Features:
                  </h4>
                  {capability.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Global Use Cases */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-white mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Global Enterprise Success Stories
            </h3>
            <p className="text-cyan-100 max-w-2xl mx-auto">
              See how multinational companies are using multi-language AI to support their global workforce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h4 className="font-semibold text-white mb-3">
                  {useCase.company}
                </h4>

                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-cyan-200 font-medium mb-1">Challenge:</div>
                    <div className="text-cyan-100">{useCase.challenge}</div>
                  </div>

                  <div>
                    <div className="text-cyan-200 font-medium mb-1">Solution:</div>
                    <div className="text-cyan-100">{useCase.solution}</div>
                  </div>

                  <div className="bg-green-500/20 rounded-lg p-3 mt-4">
                    <div className="text-green-300 font-medium mb-1">Result:</div>
                    <div className="text-green-200">{useCase.result}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Language Quality */}
        <div className="text-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <GlobeIcon className="w-12 h-12 text-cyan-600 mr-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Language Quality Assurance
              </h3>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Our AI models are trained on billions of multilingual examples to ensure accurate,
              contextually appropriate responses in every supported language.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">95%</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Translation Accuracy</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Industry leading</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">20+</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Languages</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Full support</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">< 2s</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Response Time</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Real-time translation</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">100%</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Context Preservation</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Meaning maintained</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
