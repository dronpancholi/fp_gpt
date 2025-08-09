import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

const FloatingActionButton = ({ onClearConversation, messageCount = 0 }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClearClick = () => {
    if (messageCount === 0) return;
    setShowConfirm(true);
  };

  const handleConfirmClear = () => {
    onClearConversation();
    setShowConfirm(false);
  };

  const handleCancelClear = () => {
    setShowConfirm(false);
  };

  if (messageCount === 0) return null;

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-4 z-40">
        <Button
          variant="secondary"
          size="icon"
          onClick={handleClearClick}
          className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          iconName="Trash2"
          iconSize={20}
        />
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={handleCancelClear}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-popover border border-border rounded-lg shadow-xl max-w-sm w-full p-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-destructive"
                  >
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                  </svg>
                </div>
                
                <h3 className="text-lg font-semibold text-popover-foreground mb-2">
                  Clear Conversation
                </h3>
                
                <p className="text-sm text-muted-foreground mb-6">
                  Are you sure you want to clear this conversation? This action cannot be undone.
                </p>
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancelClear}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleConfirmClear}
                    className="flex-1"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FloatingActionButton;