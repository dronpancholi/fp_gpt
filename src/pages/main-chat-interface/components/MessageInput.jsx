import React, { useState, useRef } from 'react';
import Button from '../../../components/ui/Button';
import VoiceInput from '../../../components/ui/VoiceInput';
import { useDropzone } from 'react-dropzone';

const MessageInput = ({ onSendMessage, disabled, supportImages = false }) => {
  const [message, setMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if ((message?.trim() || attachedFile) && !disabled) {
      onSendMessage(message?.trim(), attachedFile);
      setMessage('');
      setAttachedFile(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleVoiceInput = (transcript) => {
    setMessage(prev => prev + (prev ? ' ' : '') + transcript);
    // Auto-focus textarea after voice input
    setTimeout(() => {
      textareaRef?.current?.focus();
    }, 100);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: supportImages ? {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    } : {},
    maxFiles: 1,
    maxSize: 4 * 1024 * 1024, // 4MB limit for Gemini
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.length > 0) {
        setAttachedFile(acceptedFiles?.[0]);
      }
    },
    disabled: disabled || !supportImages,
    noClick: true
  });

  const removeAttachment = () => {
    setAttachedFile(null);
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="border-t border-border bg-card p-4">
      {/* File attachment preview */}
      {attachedFile && (
        <div className="mb-3 p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {attachedFile?.type?.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(attachedFile)}
                  alt="Preview"
                  className="w-12 h-12 object-cover rounded-md border border-border"
                />
              ) : (
                <div className="w-12 h-12 bg-accent/20 rounded-md flex items-center justify-center">
                  <span className="text-accent font-medium text-xs">
                    {attachedFile?.name?.split('.')?.pop()?.toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-card-foreground truncate max-w-48">
                  {attachedFile?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(attachedFile?.size / 1024 / 1024)?.toFixed(1)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeAttachment}
              iconName="X"
              iconSize={16}
              className="text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>
      )}
      {/* Main input area with drag and drop */}
      <div
        {...getRootProps()}
        className={`relative ${
          isDragActive ? 'ring-2 ring-primary ring-offset-2 ring-offset-background rounded-lg' : ''
        }`}
      >
        <input {...getInputProps()} />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e?.target?.files?.[0]) {
              setAttachedFile(e?.target?.files?.[0]);
            }
          }}
          className="hidden"
        />

        {isDragActive && supportImages && (
          <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg flex items-center justify-center z-10">
            <div className="text-center">
              <p className="text-sm font-medium text-primary">Drop image here</p>
              <p className="text-xs text-muted-foreground">For Gemini AI analysis</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          {/* Text input area */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                attachedFile 
                  ? "Ask Gemini AI about this image..." :"Ask me anything... (Powered by Gemini AI)"
              }
              className="w-full min-h-[44px] max-h-32 px-4 py-3 pr-12 bg-muted/50 border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted-foreground text-sm"
              rows={1}
              disabled={disabled}
              style={{
                height: 'auto',
                minHeight: '44px'
              }}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e?.target?.scrollHeight, 128) + 'px';
              }}
            />

            {/* Voice input button */}
            <div className="absolute right-3 bottom-2">
              <VoiceInput
                onTranscript={handleVoiceInput}
                disabled={disabled}
                className="text-muted-foreground hover:text-foreground"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            {/* Image upload button */}
            {supportImages && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={openFileDialog}
                iconName="ImagePlus"
                iconSize={18}
                disabled={disabled || !!attachedFile}
                className="text-muted-foreground hover:text-foreground"
                title="Upload image for Gemini analysis"
              />
            )}

            {/* Send button */}
            <Button
              type="submit"
              disabled={disabled || (!message?.trim() && !attachedFile)}
              iconName={disabled ? "Loader2" : "Send"}
              iconSize={18}
              className={`px-3 py-2 h-11 transition-all ${
                disabled ? "animate-spin" : ""
              } ${
                message?.trim() || attachedFile
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground"
              }`}
            />
          </div>
        </form>
      </div>
      {/* Input hints */}
      <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>Press Enter to send, Shift+Enter for new line</span>
          {supportImages && (
            <span>• Drag & drop images for AI analysis</span>
          )}
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
          <span>Gemini AI</span>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;