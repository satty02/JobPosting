import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

// Specify the location of the PDF.js worker script
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ResumeViewer = ({id}) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfData, setPdfData] = useState(null);
  
    useEffect(() => {
      async function fetchPDF() {
        try {
          const response = await axios.get(`https://job-posting-eight.vercel.app/get-pdf/${id}`, {
            responseType: 'arraybuffer',
          });
  
          const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
          const pdfDataUrl = URL.createObjectURL(pdfBlob);
          setPdfData(pdfDataUrl);
        } catch (error) {
          console.error('Error fetching PDF:', error);
        }
      }
      fetchPDF();
    }, [id]);
  
    const onDocumentLoadSuccess = ({ numPages }) => {
      setNumPages(numPages);
    };
  return (
    <div>
    <Document file={pdfData} onLoadSuccess={onDocumentLoadSuccess}>
      <Page pageNumber={pageNumber} />
    </Document>
    <p>
      Page {pageNumber} of {numPages}
    </p>
  </div>
    );
};

export default ResumeViewer;
