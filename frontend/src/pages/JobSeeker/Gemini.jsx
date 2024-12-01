import React, { useState } from 'react'
import * as pdfjsLib from "pdfjs-dist";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getPrompt, getSystemPrompt } from '@/lib/prompt';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

// pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.mjs"

const Gemini = () => {
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

    let jobDescription = "TechCorp is seeking a talented and driven Software Engineer to join our dynamic team in San Francisco. As a Software Engineer, you will play a pivotal role in designing, developing, and maintaining cutting-edge software solutions. Your expertise in React, Node.js, and MongoDB will contribute to building scalable, user-friendly applications that solve real-world problems. You will collaborate with cross-functional teams, including designers, product managers, and fellow developers, to ensure high-quality software delivery. Responsibilities include writing clean, efficient code, troubleshooting and debugging issues, and implementing best practices for security and performance. At TechCorp, we value creativity, innovation, and a commitment to continuous learning. This role offers the opportunity to work on impactful projects in a fast-paced, collaborative environment. If you're passionate about technology and eager to make a difference, we encourage you to apply. Join us and be a part of shaping the future of software development."


    let final_prompt = getPrompt(jobDescription, resumeText);

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

    return extracted;
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {status && <p>{status}</p>}
      <h1 className="text-2xl font-semibold mb-4">Resume Analysis</h1>

      {/* Missing Skills */}
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Missing Details / skills from Resume</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {op && op['missing-skills'].map((skill, index) => (
            <li key={index} className="text-lg">{skill}</li>
          ))}
        </ul>
      </div>

      {/* Present Skills */}
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Details / Skills Present in the Resume</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-gray-700">
          {op && op['matched-skills'].map((skill, index) => (
            <li key={index} className="text-lg bg-gray-100 p-2 rounded-lg">{skill}</li>
          ))}
        </ul>
      </div>

      {/* Resume Analysis */}
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Resume Analysis</h2>
        <p className="text-gray-700">{op && op['resume-analysis'][0]}</p>
      </div>
    </div>
  );
}


export default Gemini
