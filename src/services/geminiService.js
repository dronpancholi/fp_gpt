import genAI from './geminiClient';
import weatherService from './weatherService';

        /**
         * Gemini AI Service for handling text generation and chat interactions
         */
        class GeminiService {
          constructor() {
            this.model = genAI?.getGenerativeModel({ model: 'gemini-1.5-pro-latest' });
            this.chatSessions = new Map();
          }

          /**
           * Generates a text response based on user input.
           * @param {string} prompt - The user's input prompt.
           * @returns {Promise<object>} The generated response with metadata.
           */
          async generateText(prompt) {
            try {
              const result = await this.model?.generateContent(prompt);
              const response = await result?.response;
              const text = response?.text();

              // Calculate mock accuracy and confidence based on response length and complexity
              const accuracy = Math.min(95, 85 + Math.floor(text?.length / 100));
              const confidence = Math.min(93, 80 + Math.floor(text?.split('\n')?.length * 2));

              return {
                content: text,
                sources: ['Gemini AI', 'Google Knowledge'],
                accuracy,
                confidence,
                primarySource: 'Gemini AI',
                timestamp: new Date()
              };
            } catch (error) {
              console.error('Error in Gemini text generation:', error);
              throw new Error(`Gemini API Error: ${error.message}`);
            }
          }

          /**
           * Streams a text response chunk by chunk.
           * @param {string} prompt - The user's input prompt.
           * @param {Function} onChunk - Callback to handle each streamed chunk.
           * @returns {Promise<object>} The complete response metadata.
           */
          async streamText(prompt, onChunk) {
            try {
              const result = await this.model?.generateContentStream(prompt);
              let fullText = '';

              for await (const chunk of result?.stream) {
                const text = chunk?.text();
                if (text) {
                  fullText += text;
                  onChunk(text);
                }
              }

              // Calculate metrics for the complete response
              const accuracy = Math.min(95, 85 + Math.floor(fullText?.length / 100));
              const confidence = Math.min(93, 80 + Math.floor(fullText?.split('\n')?.length * 2));

              return {
                content: fullText,
                sources: ['Gemini AI', 'Google Knowledge'],
                accuracy,
                confidence,
                primarySource: 'Gemini AI',
                timestamp: new Date()
              };
            } catch (error) {
              console.error('Error in Gemini streaming:', error);
              throw new Error(`Gemini Streaming Error: ${error.message}`);
            }
          }

          /**
           * Manages a chat session with history.
           * @param {string} sessionId - Unique identifier for the chat session.
           * @param {string} prompt - The user's input prompt.
           * @returns {Promise<object>} The response and session information.
           */
          async chatWithHistory(sessionId, prompt) {
            try {
              // Check for weather-related queries
              if (this.isWeatherQuery(prompt)) {
                const city = this.extractCity(prompt);
                if (city) {
                  return await weatherService.getWeather(city);
                }
              }

              let chat;
              
              if (this.chatSessions?.has(sessionId)) {
                chat = this.chatSessions?.get(sessionId);
              } else {
                chat = this.model?.startChat({
                  history: [],
                  generationConfig: {
                    maxOutputTokens: 2048,
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 10
                  }
                });
                this.chatSessions?.set(sessionId, chat);
              }

              const result = await chat?.sendMessage(prompt);
              const response = await result?.response;
              const text = response?.text();

              // Calculate metrics
              const accuracy = Math.min(95, 85 + Math.floor(text?.length / 100));
              const confidence = Math.min(93, 80 + Math.floor(text?.split('\n')?.length * 2));

              return {
                content: text,
                sources: ['Gemini AI', 'Google Knowledge'],
                accuracy,
                confidence,
                primarySource: 'Gemini AI',
                timestamp: new Date(),
                sessionId
              };
            } catch (error) {
              console.error('Error in Gemini chat session:', error);
              throw new Error(`Gemini Chat Error: ${error.message}`);
            }
          }

          /**
           * Generates text from text and image input.
           * @param {string} prompt - The text prompt.
           * @param {File} imageFile - The image file.
           * @returns {Promise<object>} The generated response.
           */
          async generateTextFromImage(prompt, imageFile) {
            try {
              const model = genAI?.getGenerativeModel({ model: 'gemini-1.5-pro' });

              // Convert image file to base64
              const toBase64 = (file) =>
                new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => resolve(reader.result.split(',')[1]);
                  reader.onerror = (error) => reject(error);
                });

              const imageBase64 = await toBase64(imageFile);
              const imagePart = {
                inlineData: {
                  data: imageBase64,
                  mimeType: imageFile?.type,
                },
              };

              const result = await model.generateContent([prompt, imagePart]);
              const response = await result?.response;
              const text = response?.text();

              return {
                content: text,
                sources: ['Gemini AI', 'Image Analysis'],
                accuracy: 90,
                confidence: 87,
                primarySource: 'Gemini AI',
                timestamp: new Date()
              };
            } catch (error) {
              console.error('Error in multimodal generation:', error);
              throw new Error(`Gemini Multimodal Error: ${error.message}`);
            }
          }

          /**
           * Clears a chat session.
           * @param {string} sessionId - The session ID to clear.
           */
          clearChatSession(sessionId) {
            this.chatSessions?.delete(sessionId);
          }

          /**
           * Gets all active chat sessions.
           * @returns {Array} List of active session IDs.
           */
          getActiveSessions() {
            return Array.from(this.chatSessions?.keys());
          }

          /**
           * Checks if a prompt is a weather-related query.
           * @param {string} prompt - The user's input prompt.
           * @returns {boolean} True if the prompt is a weather query.
           */
          isWeatherQuery(prompt) {
            const weatherKeywords = ['weather', 'temperature', 'forecast', 'wind'];
            const lowerCasePrompt = prompt.toLowerCase();
            return weatherKeywords.some(keyword => lowerCasePrompt.includes(keyword));
          }

          /**
           * Extracts the city name from a weather-related query.
           * @param {string} prompt - The user's input prompt.
           * @returns {string|null} The extracted city name or null.
           */
          extractCity(prompt) {
            const match = prompt.match(/in\s+([A-Z][a-z]+(?: [A-Z][a-z]+)*)/);
            return match ? match[1] : null;
          }
        }

        // Export singleton instance
        export default new GeminiService();