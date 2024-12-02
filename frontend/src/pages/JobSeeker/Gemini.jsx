import React, { useState } from 'react'
import * as pdfjsLib from "pdfjs-dist";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getPrompt, getSystemPrompt } from '@/lib/prompt';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

// pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.mjs"

const Gemini = ({ activeJob }) => {
  const [status, setStatus] = useState("");
  const [op, setOp] = useState(null)

  const extractTextFromPDF = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();
      const text = textContent.items.map((item) => item.str).join(" ");
      return text;
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      setStatus("Error extracting text from the PDF file.");
      return "";
    }
  };

  const handleFileChange = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile || uploadedFile.type !== "application/pdf") {
      setStatus("Please upload a valid PDF file.");
      return;
    }

    setStatus("Processing file...");
    const extractedText = await extractTextFromPDF(uploadedFile);

    await geminiHandler(extractedText)
  };

  const xmlReplacementPatterns = [
    /<missing-skill>(.*?)<\/missing-skill>/g,  // Match missing-skill elements
    /<matched-skill>(.*?)<\/matched-skill>/g,  // Match present-skill elements
    /<resume-analysis>([\s\S]*?)<\/resume-analysis>/g // Match resume-analysis (including newlines and spaces)
  ];

  const geminiHandler = async (resumeText) => {

    let final_prompt = getPrompt(activeJob.description, resumeText);

    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
    try {
      let generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 40,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
      }
      let system_prompt = getSystemPrompt();
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: generation_config, system_instruction: system_prompt });
      const result = await model.generateContent(final_prompt);
      const response = result.response;
      const text = response.text();
      const parsedXml = extractData(text, xmlReplacementPatterns);
      setOp(parsedXml)
    }
    catch (error) {
      console.log("Something Went Wrong", error);
    }
  }

  const extractData = (xml, patterns) => {
    const extracted = {};

    extracted['missing-skills'] = [...xml.matchAll(patterns[0])].map(match => match[1].trim());
    extracted['matched-skills'] = [...xml.matchAll(patterns[1])].map(match => match[1].trim());
    extracted['resume-analysis'] = [...xml.matchAll(patterns[2])].map(match => match[1].trim());

    setStatus("")
    return extracted;

  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">

      <h1 className="text-2xl font-semibold mb-4">Resume Analysis</h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="resume">Resume</Label>
        <Input id="resume" type="file" accept="application/pdf" onChange={handleFileChange} />
      </div>
      {status && <p>{status}</p>}
      {
        op && (<>
          <div className="my-3">
            <h2 className="font-medium">Summary</h2>
            <p className="text-gray-700">{op && op['resume-analysis'][0]}</p>
          </div>
          <div className="my-3">
            <h2 className="font-medium">Missing Details / skills from Resume</h2>
            <ul className="list-disc pl-6 text-gray-700">
              {op && op['missing-skills'].map((skill, index) => (
                <li key={index} className="text-lg">{skill}</li>
              ))}
            </ul>
          </div>
          <div className="my-3">
            <h2 className="font-medium">Details / Skills Present in the Resume</h2>
            <ul className="list-disc pl-6 text-gray-700">
              {op && op['matched-skills'].map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </>)
      }
    </div>
  );
}


export default Gemini
