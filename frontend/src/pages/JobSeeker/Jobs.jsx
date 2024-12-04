import React, { useState, useCallback, useEffect, useRef } from 'react'
import JobListingTile from './JobListingTile';
import JobDescriptionTile from './JobDescriptionTile';
import { useAuth, useUser } from '@clerk/clerk-react';
import { getAllJobs } from '@/api/jobsApi';
import { CircleArrowUp } from 'lucide-react';
import Gemini from './Gemini';
import { GoogleGenerativeAI } from "@google/generative-ai";
import useUserStore from '@/features/user/userStore';
import * as pdfjsLib from "pdfjs-dist";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const JobsListing = () => {
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const [jobs, setJobs] = useState([]);
  const [activeJob, setActiveJob] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState(null);
  const { user: UserData, fetchUser } = useUserStore();
  const navigate = useNavigate();

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  useEffect(() => {
    if (!UserData || Object.keys(UserData).length === 0) {
      (async () => {
        const token = await getToken();
        fetchUser({ id: user.id, token })
      })()
    }
  }, [UserData, fetchUser, isLoaded]);

  useEffect(() => {
    if (activeJob) {
      (async () => {
        let resume = UserData && UserData?.resumeLink ? UserData?.resumeLink : "";
        resume = await extractPdfContent(resume);
        const initialMessages = [
          {
            role: 'user',
            text: `You are an AI assistant specializing in resume and job description analysis. Here is the context: Resume: ${resume} Job Description: ${activeJob.description} Please answer only questions related to this context. Format your responses in plain text without bold characters, bullet points, or other special formatting. Do not respond to unrelated queries such as storytelling, personal advice, or unrelated topics.`,
          },
          {
            role: 'model',
            text: 'How can I assist you with your resume or job description?',
          },
        ];

        setMessages(initialMessages);

        const newChat = model.startChat({
          history: initialMessages.map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.text }],
          })),
        });
        setChat(newChat);
      })()
    }
  }, [activeJob]);


  const extractPdfContent = async (url) => {
    try {
      const pdf = await pdfjsLib.getDocument(url).promise;

      let textContent = "";

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const text = await page.getTextContent();
        const pageText = text.items.map(item => item.str).join(" ");
        textContent += pageText + "\n";
      }

      return textContent;
    } catch (error) {
      console.error("Error extracting PDF content:", error);
      throw error;
    }
  }

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    setMessages((prevMessages) => [...prevMessages, { role: "user", text: userInput }]);
    setIsLoading(true);

    const unrelatedKeywords = ["story", "joke", "movie", "personal", "weather"];
    const isUnrelated = unrelatedKeywords.some((keyword) =>
      userInput.toLowerCase().includes(keyword)
    );

    if (isUnrelated) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: "model",
          text: "I can only assist with queries related to the provided resume and job description. Please ask relevant questions.",
        },
      ]);
      setUserInput("");
      setIsLoading(false);
      return;
    }

    try {
      const result = await chat.sendMessageStream(userInput);
      let responseText = "";

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "model", text: "..." },
      ]);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        responseText += chunkText;
        setMessages((prevMessages) => [
          ...prevMessages.slice(0, -1),
          { role: "model", text: responseText },
        ]);
      }

      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        { role: "model", text: responseText },
      ]);

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "model", text: "Something went wrong. Please try again." },
      ]);
    }

    setIsLoading(false);
    setUserInput("");
  };

  useEffect(() => {
    (async () => {
      let token = await getToken();
      const res = await getAllJobs(token);
      if (res.status) {
        setJobs(res.data.data);
      } else {
        console.log("Something went wrong");
      }
    })();
  }, []);

  useEffect(() => {
    if (jobs.length > 0) {
      setActiveJob(jobs[0]);
    }
  }, [jobs]);

  const handleSetActiveJob = useCallback((job) => {
    setActiveJob(job);
  }, [activeJob]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const navigateToPremium = () => {
    navigate('/jobseeker/premium', { replace: true })
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-[25%] p-4 border m-4 rounded-md md:fixed h-[90%] md:h-[89%] xs:h-fit overflow-x-auto md:overflow-auto flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 scrollbar-hidden">
        <div className="flex flex-nowrap md:flex-col space-x-4 md:space-x-0 md:space-y-4">
          {
            jobs.length > 0 ?
              jobs.map((job) => (
                <JobListingTile key={job._id} job={job} setActiveJob={handleSetActiveJob} activeJob={activeJob} />
              )) :
              <p>
                No Jobs Available
              </p>
          }
        </div>
      </div>
      <div className="md:w-[44%] w-full md:ml-[27%] bg-white p-6 overflow-y-auto">
        {
          activeJob ?
            <JobDescriptionTile activeJob={activeJob} />
            : <p className='flex h-full justify-center items-center'>No Jobs Available</p>
        }
      </div>

      {UserData && UserData?.isPremiumUser == false ? (
        <div className='md:w-[27%] border rounded-md right-0 mt-4 fixed md:block xs:hidden flex flex-col h-full mr-4'>

          <div className="flex-1 overflow-y-auto mb-4 h-[83%] scrollbar-hidden p-4">

            <div className='mb-4'>
              {activeJob ? <Gemini activeJob={activeJob} /> : <p className='flex h-full justify-center items-center'>No Jobs Available</p>}
            </div>


            {messages.slice(1).map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg ${message.role === "user"
                  ? "bg-blue-100 text-blue-900 self-end ml-auto w-fit rounded-tl-none"
                  : "bg-gray-100 text-gray-900 self-start mr-auto w-fit rounded-tr-none"
                  }`}
              >
                {message.text}
              </div>
            ))}
            {isLoading && <div className="italic text-gray-500">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="bottom-0 fixed m-4 w-full">
            <div className="flex items-center gap-2 w-[22%]">
              <input
                type="text"
                className="p-2 border rounded-md w-full"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading}
                className="w-auto">
                <CircleArrowUp />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='md:w-[27%] border mt-4 rounded-md inset-0'>
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-lg font-semibold">Subscribe to Premium</p>
              <p className="text-sm text-gray-600">Unlock this feature by subscribing to premium.</p>
              <Button variant="outline" onClick={navigateToPremium} className="mt-3">Subscribe</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobsListing
