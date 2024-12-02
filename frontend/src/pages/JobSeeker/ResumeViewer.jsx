import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { IconLeft, IconRight } from "react-day-picker";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

function ResumeViewer({ publicUrl, maxWidth }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [loading, setLoading] = useState(true);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
        setLoading(false);
    };

    return (
        <div>
            {publicUrl ? (
                <div>
                    <Document file={publicUrl} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} width={maxWidth} />
                    </Document>
                    {loading ? (<div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
                    </div>) :
                        <>

                            <p className="flex justify-end items-center px-6">
                                Page {pageNumber} of {numPages}
                            </p>


                            {
                                numPages > 1 ?
                                    (<div className="flex justify-between px-6 mt-2">
                                        <button
                                            className="disabled:cursor-not-allowed"
                                            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                                            disabled={pageNumber === 1}
                                        >
                                            <div className="flex gap-3 items-center">
                                                <IconLeft /> Previous
                                            </div>

                                        </button>
                                        <button
                                            className="disabled:cursor-not-allowed"
                                            onClick={() =>
                                                setPageNumber((prev) => (numPages ? Math.min(prev + 1, numPages) : prev))
                                            }
                                            disabled={pageNumber === numPages}
                                        >
                                            <div className="flex gap-3 items-center">
                                                Next <IconRight />
                                            </div>
                                        </button>
                                    </div>)
                                    : <></>
                            }

                        </>
                    }
                </div>
            ) : (
                <p>No file URL provided</p>
            )}
        </div>
    );
}

export default ResumeViewer;
