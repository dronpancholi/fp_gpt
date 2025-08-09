import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const FeedbackSection = ({ settings, onUpdate }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [feedbackForm, setFeedbackForm] = useState({
    rating: 0,
    category: '',
    suggestion: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSettingChange = (key, value) => {
    const updated = { ...localSettings, [key]: value };
    setLocalSettings(updated);
    onUpdate(updated);
  };

  const handleRatingClick = (rating) => {
    setFeedbackForm(prev => ({ ...prev, rating }));
  };

  const handleSubmitFeedback = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFeedbackForm({
        rating: 0,
        category: '',
        suggestion: '',
        email: ''
      });
      
      // Reset submitted state after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  const renderStarRating = () => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingClick(star)}
            className={`p-1 transition-colors duration-200 ${
              star <= feedbackForm?.rating 
                ? 'text-warning' :'text-muted-foreground hover:text-warning'
            }`}
          >
            <Icon 
              name={star <= feedbackForm?.rating ? 'Star' : 'Star'} 
              size={20}
              className={star <= feedbackForm?.rating ? 'fill-current' : ''}
            />
          </button>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          {feedbackForm?.rating > 0 && `${feedbackForm?.rating}/5`}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="MessageCircle" size={20} className="text-accent" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Feedback & Quality</h3>
          <p className="text-sm text-muted-foreground">Help us improve your AI assistant experience</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Feedback Preferences */}
        <div>
          <h4 className="text-base font-medium text-card-foreground mb-4">Feedback Preferences</h4>
          <div className="space-y-4">
            <div>
              <Checkbox
                label="Enable Response Rating"
                description="Show thumbs up/down buttons after each AI response"
                checked={localSettings?.enableRating}
                onChange={(e) => handleSettingChange('enableRating', e?.target?.checked)}
              />
            </div>
            
            <div>
              <Checkbox
                label="Collect Usage Analytics"
                description="Help improve the service by sharing anonymous usage data"
                checked={localSettings?.collectAnalytics}
                onChange={(e) => handleSettingChange('collectAnalytics', e?.target?.checked)}
              />
            </div>

            <div>
              <Checkbox
                label="Quality Improvement Notifications"
                description="Receive updates about improvements based on your feedback"
                checked={localSettings?.qualityNotifications}
                onChange={(e) => handleSettingChange('qualityNotifications', e?.target?.checked)}
              />
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div>
          <h4 className="text-base font-medium text-card-foreground mb-4">Submit Feedback</h4>
          
          {submitted ? (
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <p className="text-success font-medium">Thank you for your feedback!</p>
              </div>
              <p className="text-sm text-success/80 mt-1">
                We'll use your input to improve FP-GPT.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              {/* Overall Rating */}
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Overall Experience Rating
                </label>
                {renderStarRating()}
              </div>

              {/* Feedback Category */}
              <div>
                <Input
                  label="Feedback Category"
                  type="text"
                  placeholder="e.g., Response Quality, Speed, Interface"
                  value={feedbackForm?.category}
                  onChange={(e) => setFeedbackForm(prev => ({ ...prev, category: e?.target?.value }))}
                />
              </div>

              {/* Suggestion */}
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Suggestions or Comments
                </label>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 border border-border rounded-md bg-input text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
                  placeholder="Tell us how we can improve your experience..."
                  value={feedbackForm?.suggestion}
                  onChange={(e) => setFeedbackForm(prev => ({ ...prev, suggestion: e?.target?.value }))}
                />
              </div>

              {/* Email (Optional) */}
              <div>
                <Input
                  label="Email (Optional)"
                  type="email"
                  placeholder="your.email@example.com"
                  description="We'll only use this to follow up on your feedback"
                  value={feedbackForm?.email}
                  onChange={(e) => setFeedbackForm(prev => ({ ...prev, email: e?.target?.value }))}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                loading={isSubmitting}
                iconName="Send"
                iconPosition="left"
                disabled={feedbackForm?.rating === 0 || !feedbackForm?.suggestion?.trim()}
                className="w-full sm:w-auto"
              >
                Submit Feedback
              </Button>
            </form>
          )}
        </div>

        {/* Recent Feedback Summary */}
        <div className="p-4 bg-muted/30 rounded-lg">
          <h4 className="text-base font-medium text-card-foreground mb-3">Your Feedback Impact</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Feedback Submitted</p>
              <p className="font-medium text-card-foreground">3 times</p>
            </div>
            <div>
              <p className="text-muted-foreground">Average Rating Given</p>
              <p className="font-medium text-card-foreground">4.3/5</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Your feedback helps improve FP-GPT for everyone. Thank you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackSection;