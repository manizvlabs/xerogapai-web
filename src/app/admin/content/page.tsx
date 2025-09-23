'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ProtectedAdminLayout from '@/components/ProtectedAdminLayout';
import { useContent } from '@/hooks/useContent';
import { CheckIcon, PencilIcon, EyeIcon, UsersIcon, CogIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function ContentManagementPage() {
  const [selectedSection, setSelectedSection] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState<Record<string, unknown> | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [originalContent, setOriginalContent] = useState<Record<string, unknown> | null>(null);
  
  const { content, loading, error, updateContent } = useContent();

  const sections = [
    { key: 'homepage', name: 'Homepage', description: 'Hero section, stats, services, CTA' },
    { key: 'about', name: 'About Page', description: 'Company info, values, team, stats' },
    { key: 'services', name: 'Services Page', description: 'Service descriptions, features, pricing' },
    { key: 'portfolio', name: 'Portfolio Page', description: 'Project showcase, case studies' },
    { key: 'blog', name: 'Blog Page', description: 'Blog posts, categories, content' },
    { key: 'contact', name: 'Contact Page', description: 'Contact form, company info' }
  ];

  const handleSectionSelect = (sectionKey: string) => {
    // If we have unsaved changes, ask for confirmation
    if (hasUnsavedChanges && isEditing) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to switch sections? Your changes will be lost.'
      );
      if (!confirmLeave) {
        return;
      }
    }

    setSelectedSection(sectionKey);
    if (content?.[sectionKey]) {
      const sectionContent = content[sectionKey] as Record<string, unknown>;
      setEditContent(sectionContent);
      setOriginalContent(sectionContent);
    }
    setIsEditing(false);
    setSaveStatus('idle');
    setHasUnsavedChanges(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    // If we already have edit content (unsaved changes), keep it
    // Otherwise, start with the current content
    if (!editContent && content && content[selectedSection]) {
      const sectionContent = content[selectedSection] as Record<string, unknown>;
      setEditContent(sectionContent);
      setOriginalContent(sectionContent);
    }
  };

  const handleSave = async () => {
    if (!selectedSection || !editContent) return;

    setSaveStatus('saving');
    const result = await updateContent(selectedSection, editContent);

    if (result.success) {
      setSaveStatus('success');
      setIsEditing(false);
      setHasUnsavedChanges(false);
      setOriginalContent(editContent);

      // Dispatch event to notify other components that content has been updated
      window.dispatchEvent(new CustomEvent('contentUpdated', {
        detail: { section: selectedSection, content: editContent }
      }));

      // Also set localStorage to trigger storage events in other tabs/windows
      localStorage.setItem('content-updated', Date.now().toString());

      setTimeout(() => setSaveStatus('idle'), 3000);
    } else {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 5000);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    const contentToRestore = originalContent || (content && content[selectedSection] ? content[selectedSection] as Record<string, unknown> : null);
    setEditContent(contentToRestore);
    setSaveStatus('idle');
    setHasUnsavedChanges(false);
  };

  const renderContentArea = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-300">Loading content...</span>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">Error: {error}</p>
        </div>
      );
    }
    
    if (isEditing) {
      return (
        <div className="space-y-4">
          <div>
            <label htmlFor="content-json" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content (JSON)
            </label>
            <div className="relative">
              <textarea
                id="content-json"
                value={JSON.stringify(editContent, null, 2)}
                onChange={(e) => {
                  try {
                    const newContent = JSON.parse(e.target.value);
                    setEditContent(newContent);
                    setHasUnsavedChanges(true);
                  } catch (error) {
                    // Invalid JSON, keep the text as is
                    console.warn('Invalid JSON input:', error);
                    setHasUnsavedChanges(true);
                  }
                }}
                className="w-full h-80 max-h-80 p-3 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white resize-none overflow-y-auto"
                placeholder="Enter content as JSON..."
                style={{ minHeight: '320px', maxHeight: '320px' }}
              />
            </div>
          </div>
          <div className="sticky bottom-0 bg-white dark:bg-gray-800 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 items-center flex-wrap">
              <button
                onClick={handleSave}
                disabled={saveStatus === 'saving' || !hasUnsavedChanges}
                className={`flex items-center gap-2 px-4 py-2 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  hasUnsavedChanges 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }`}
              >
                <CheckIcon className="h-4 w-4" />
                {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={handleCancel}
                disabled={saveStatus === 'saving'}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              {hasUnsavedChanges && (
                <span className="text-orange-600 dark:text-orange-400 text-sm font-medium">
                  ⚠️ You have unsaved changes
                </span>
              )}
              {saveStatus === 'success' && (
                <span className="text-green-600 dark:text-green-400 text-sm">
                  ✓ Changes saved successfully!
                </span>
              )}
              {saveStatus === 'error' && (
                <span className="text-red-600 dark:text-red-400 text-sm">
                  ✗ Failed to save changes
                </span>
              )}
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="space-y-4">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg h-80 max-h-80 overflow-y-auto">
          <pre className="text-sm text-gray-900 dark:text-white whitespace-pre-wrap">
            {JSON.stringify(editContent, null, 2)}
          </pre>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Click &quot;Edit&quot; to modify this content. Changes will be saved immediately and reflected on the live site.
        </div>
      </div>
    );
  };

  return (
    <ProtectedAdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Manage your website content and settings
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/admin/users" className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                <UsersIcon className="h-5 w-5" />
                User Management
              </Link>
              <Link href="/admin/contacts" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
                Contact Management
              </Link>
              <Link href="/admin/content" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <CogIcon className="h-5 w-5" />
                Content Management
              </Link>
            </div>
          </div>
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
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {section.name}
                        </div>
                        {selectedSection === section.key && hasUnsavedChanges && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        )}
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
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        <PencilIcon className="h-4 w-4" />
                        Edit
                      </button>
                    </div>
                  </div>

                  {renderContentArea()}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <EyeIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium mb-2">Select a Content Section</h3>
                  <p>Choose a section from the left panel to view and edit its content.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
            How to Edit Content Safely
          </h3>
          <div className="space-y-2 text-green-800 dark:text-green-200">
            <p>1. <strong>Select a section</strong> from the left panel</p>
            <p>2. <strong>Click &quot;Edit&quot;</strong> to modify the content</p>
            <p>3. <strong>Edit the JSON directly</strong> in the text area</p>
            <p>4. <strong>Click &quot;Save Changes&quot;</strong> to update the content</p>
            <p>5. <strong>Test locally</strong> with <code className="bg-green-100 dark:bg-green-800 px-1 rounded">npm run dev</code></p>
            <p>6. <strong>Commit and push</strong> to feature/v2 branch</p>
            <p>7. <strong>Create a PR</strong> to merge to main</p>
          </div>
        </div>
      </div>
    </ProtectedAdminLayout>
  );
}