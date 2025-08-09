import React, { useState, useEffect } from 'react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import Icon from '../AppIcon';
import Button from './Button';

const VoiceInput = ({ onTranscript, disabled = false, className = '' }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const { speak } = useSpeechSynthesis();
  
  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult: (result) => {
      setTranscript(result);
      onTranscript?.(result);
    },
    onEnd: () => {
      setIsListening(false);
    }
  });

  useEffect(() => {
    setIsListening(listening);
  }, [listening]);

  const handleVoiceToggle = () => {
    if (isListening) {
      stop();
      setIsListening(false);
    } else {
      setTranscript('');
      listen({ continuous: true, interimResults: true });
      setIsListening(true);
    }
  };

  const handleReadAloud = (text) => {
    if (text?.trim()) {
      speak({ text, rate: 0.8, pitch: 1, volume: 0.8 });
    }
  };

  if (!supported) {
    return (
      <div className={`flex items-center space-x-2 text-muted-foreground ${className}`}>
        <Icon name="MicOff" size={16} />
        <span className="text-xs">Voice not supported</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Voice Input Button */}
      <Button
        type="button"
        variant={isListening ? "default" : "ghost"}
        size="icon"
        onClick={handleVoiceToggle}
        disabled={disabled}
        className={`relative ${isListening ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' : ''}`}
      >
        <Icon 
          name={isListening ? "MicOff" : "Mic"} 
          size={16} 
        />
        {isListening && (
          <div className="absolute -inset-1 bg-red-500 rounded-full animate-ping opacity-75"></div>
        )}
      </Button>

      {/* Transcript Display */}
      {transcript && (
        <div className="flex-1 bg-muted rounded-md px-2 py-1 text-xs text-foreground max-w-xs truncate">
          {transcript}
        </div>
      )}

      {/* Status Text */}
      {isListening && (
        <span className="text-xs text-muted-foreground animate-pulse">
          Listening...
        </span>
      )}
    </div>
  );
};

export default VoiceInput;