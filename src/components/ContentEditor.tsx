'use client';

import React, { useState } from 'react';
import { contentConfig } from '@/config/content';

interface ContentEditorProps {
  section: string;
  onSave?: (content: Record<string, unknown>) => void;
  onCancel?: () => void;
}

export default function ContentEditor({ section, onSave, onCancel }: ContentEditorProps) {
  const [content, setContent] = useState(contentConfig[section as keyof typeof contentConfig] || {});
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (onSave) {
      onSave(content);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-700 transition-colors"
        >
          Edit Content
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Edit {section} Content
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
                Content (JSON)
              </label>
              <textarea
                value={JSON.stringify(content, null, 2)}
                onChange={(e) => {
                  try {
                    setContent(JSON.parse(e.target.value));
                  } catch {
                    // Invalid JSON, keep the text as is
                  }
                }}
                className="w-full h-96 p-3 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="Enter content as JSON..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
