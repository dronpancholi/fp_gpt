import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { pdfjs } from 'react-pdf';
import Icon from '../AppIcon';
import Button from './Button';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs?.version}/pdf.worker.min.js`;

const PDFUploader = ({ onPDFText, className = '' }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [pdfText, setPdfText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [numPages, setNumPages] = useState(null);

  const extractTextFromPDF = async (file) => {
    setIsProcessing(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData?.append('pdf', file);
      
      // For demo purposes, we'll extract basic text
      // In production, you'd want to use a proper PDF text extraction service
      const fileReader = new FileReader();
      
      fileReader.onload = async (e) => {
        try {
          const typedArray = new Uint8Array(e.target.result);
          const pdf = await pdfjs?.getDocument(typedArray)?.promise;
          
          let fullText = '';
          
          for (let i = 1; i <= pdf?.numPages; i++) {
            const page = await pdf?.getPage(i);
            const textContent = await page?.getTextContent();
            const pageText = textContent?.items?.map(item => item?.str)?.join(' ');
            fullText += pageText + '\n';
          }
          
          const cleanText = fullText?.trim();
          setPdfText(cleanText);
          onPDFText?.(cleanText);
          setNumPages(pdf?.numPages);
          
        } catch (err) {
          console.error('PDF processing error:', err);
          setError('Failed to extract text from PDF. Please try a different file.');
        } finally {
          setIsProcessing(false);
        }
      };
      
      fileReader?.readAsArrayBuffer(file);
      
    } catch (err) {
      console.error('PDF upload error:', err);
      setError('Failed to process PDF file.');
      setIsProcessing(false);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles?.[0];
    if (file && file?.type === 'application/pdf') {
      setUploadedFile(file);
      extractTextFromPDF(file);
    } else {
      setError('Please upload a valid PDF file.');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB limit
  });

  const clearPDF = () => {
    setUploadedFile(null);
    setPdfText('');
    setError('');
    setNumPages(null);
    onPDFText?.('');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      {!uploadedFile && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive && !isDragReject
              ? 'border-primary bg-primary/5'
              : isDragReject
              ? 'border-red-500 bg-red-50' :'border-muted-foreground/25 hover:border-muted-foreground/50'
          }`}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-2">
            <Icon 
              name={isDragActive ? "Upload" : "FileText"} 
              size={32} 
              className={`${
                isDragActive && !isDragReject
                  ? 'text-primary'
                  : isDragReject
                  ? 'text-red-500' :'text-muted-foreground'
              }`}
            />
            
            <div className="text-sm">
              {isDragActive ? (
                <p className="text-primary font-medium">Drop the PDF here...</p>
              ) : (
                <div>
                  <p className="font-medium text-foreground">
                    Drop a PDF file here, or click to select
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Maximum file size: 10MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="flex items-center justify-center space-x-2 p-4 bg-muted rounded-lg">
          <Icon name="Loader2" size={16} className="animate-spin text-primary" />
          <span className="text-sm text-foreground">Processing PDF...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <Icon name="AlertCircle" size={16} className="text-red-600" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Success State */}
      {uploadedFile && !isProcessing && !error && (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  {uploadedFile?.name}
                </p>
                <p className="text-xs text-green-600">
                  {numPages} page{numPages !== 1 ? 's' : ''} • {(uploadedFile?.size / 1024 / 1024)?.toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearPDF}
              iconName="X"
              iconSize={14}
              className="text-muted-foreground hover:text-foreground"
            />
          </div>

          {/* Text Preview */}
          {pdfText && (
            <div className="bg-muted rounded-lg p-3">
              <div className="text-xs text-muted-foreground mb-2">Extracted text preview:</div>
              <div className="text-sm text-foreground max-h-32 overflow-y-auto">
                {pdfText?.slice(0, 300)}
                {pdfText?.length > 300 && '...'}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PDFUploader;