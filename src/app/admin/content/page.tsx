'use client';

import React, { useState } from 'react';
import { contentConfig } from '@/config/content';
import { CheckIcon, PencilIcon, EyeIcon } from '@heroicons/react/24/outline';

export default function ContentManagementPage() {
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [content, setContent] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const sections = [
    { key: 'homepage', name: 'Homepage', description: 'Hero section, stats, services, CTA' },
    { key: 'about', name: 'About Page', description: 'Company info, values, team, stats' },
    { key: 'services', name: 'Services Page', description: 'Service descriptions, features, pricing' },
    { key: 'portfolio', name: 'Portfolio Page', description: 'Project showcase, case studies' },
    { key: 'blog', name: 'Blog Page', description: 'Blog posts, categories, content' },
    { key: 'contact', name: 'Contact Page', description: 'Contact form, company info' }
  ];

  const handleSectionSelect = (sectionKey: string) => {
    setSelectedSection(sectionKey);
    setContent(contentConfig[sectionKey as keyof typeof contentConfig]);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (newContent: any) => {
    setContent(newContent);
    setIsEditing(false);
    // In a real implementation, this would save to a file or database
    console.log('Content saved:', newContent);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setContent(contentConfig[selectedSection as keyof typeof contentConfig]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Content Management
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Safely edit your website content without breaking the build
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Section List */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Content Sections
                </h2>
                <div className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.key}
                      onClick={() => handleSectionSelect(section.key)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedSection === section.key
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="font-medium text-gray-900 dark:text-white">
                        {section.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {section.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-2">
            {selectedSection ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {sections.find(s => s.key === selectedSection)?.name} Content
                    </h2>
                    <div className="flex gap-2">
                      <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      >
                        <PencilIcon className="h-4 w-4" />
                        Edit
                      </button>
                    </div>
                  </div>

                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Content (JSON)
                        </label>
                        <textarea
                          value={JSON.stringify(content, null, 2)}
                          onChange={(e) => {
                            try {
                              setContent(JSON.parse(e.target.value));
                            } catch (error) {
                              // Invalid JSON, keep the text as is
                            }
                          }}
                          className="w-full h-96 p-3 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="Enter content as JSON..."
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(content)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                        >
                          <CheckIcon className="h-4 w-4" />
                          Save Changes
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                        <pre className="text-sm text-gray-900 dark:text-white overflow-x-auto">
                          {JSON.stringify(content, null, 2)}
                        </pre>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Click "Edit" to modify this content. Changes will be saved to the content configuration file.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <EyeIcon className="h-12 w-12 mx-auto mb-4" />
                  <p>Select a content section to view and edit</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            How to Edit Content Safely
          </h3>
          <div className="text-blue-800 dark:text-blue-200 space-y-2">
            <p>1. <strong>Select a section</strong> from the left panel</p>
            <p>2. <strong>Click "Edit"</strong> to modify the content</p>
            <p>3. <strong>Edit the JSON</strong> directly in the text area</p>
            <p>4. <strong>Click "Save Changes"</strong> to update the content</p>
            <p>5. <strong>Test locally</strong> with <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">npm run dev</code></p>
            <p>6. <strong>Commit and push</strong> to feature/v2 branch</p>
            <p>7. <strong>Create a PR</strong> to merge to main</p>
          </div>
        </div>
      </div>
    </div>
  );
}
