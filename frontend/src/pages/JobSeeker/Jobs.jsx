import React, { useState, useCallback, useEffect, useRef } from 'react'
import JobListingTile from './JobListingTile';
import JobDescriptionTile from './JobDescriptionTile';
import { useAuth } from '@clerk/clerk-react';
import { getAllJobs } from '@/api/jobsApi';
import { CircleArrowUp } from 'lucide-react';
import Gemini from './Gemini';
import { GoogleGenerativeAI } from "@google/generative-ai";

const JobsListing = () => {
  const { getToken } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [activeJob, setActiveJob] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  let resume = `
a@northeastern.edu EDUCATION
Northeastern University
Masters of Science in Computer Information Systems
 https://linkedin.com/in/aniket-giram
 https://github.com/Aniketgiram
Sep 2023 - May 2025
Aniket Sanjay Giram Boston, MA, USA
    Related Courses: Web Design & User Experience, Application Engineering & Development, Network Structures & Cloud Computing
Savitribai Phule Pune University Jun 2015 - Mar 2020
Bachelor of Engineering in Computer Science
Related Courses: Object-Oriented Programming, Data Structures, Analysis of Algorithms, Machine Learning, Cloud Computing
TECHNICAL SKILLS
• Programming Languages: Java, JavaScript, TypeScript, Python, SQL, C++
• Web Technologies: Spring Boot, React.js, Next.js, Express.js, REST APIs, Node.js, Redux, HTML5, CSS, jQuery
• Databases: MySQL, PostgreSQL, MongoDB
• Cloud Technologies & Frameworks: Packer, Terraform, AWS, Cloud Computing, CI/CD, Docker, Kubernetes, RabbitMQ
• Version Control: Git, GitHub, BitBucket
• Financial Services Knowledge: Financial services knowledge
PROFESSIONAL EXPERIENCE
India
Boston, MA
  Digital Nirvana, Inc Jun 2022 - Jul 2023
Software Engineer II Pune, India
• Achieved a 50% decrease in deployment time by designing and implementing a scalable serverless backend with AWS SAM, utilizing Java for Lambda functions.
• Accomplished a 70% reduction in manual efforts and a 30% increase in accuracy by automating video-to-text conversion using a microservices-based system.
• Reduced storage costs by 25% and increased data retrieval speed by implementing S3 Bucket Lifecycle policies, enhancing data management efficiency.
• Strengthened security and user experience by developing secure OAuth 2.0 authentication flows with Spring Security and AWS Cognito.
• Implemented a secure, scalable payment processing system using Spring Boot, increasing transaction volume capacity by 40% while
maintaining system performance.
Helix Stack Technologies LLP Jul 2020 - May 2022
Software Engineer Pune, India
• Improved data transfer efficiency by implementing optimized Java serialization techniques, resulting in smaller data payloads and more efficient data processing.
• Developed high-performance REST APIs with Spring Boot, optimizing response times to achieve quick response measures.
• Enhanced user interaction by designing dynamic dashboards with reusable components in ReactJS and Redux, improving usability and
adherence to the container-presentational UI design pattern.
• Optimized PostgreSQL queries to elevate application performance and accelerate page load speeds.
• Upgraded system efficiency and reduced response times to market changes through the development of a microservices-based trading
platform, showcasing an understanding of financial services requirements.
PROJECTS
Secure Cloud (https://github.com/AniketGiram-CSYE6225/tf-gcp-infra) Jan 2024 - Mar 2024
• Automated infrastructure using Packer and Terraform, decreasing deployment time by 30% and boosting system reliability
• Configured secure networking with private VPN, subnets, and a load balancer, resulting in improved security and a 25% reduction
indowntime
• Designed and implemented custom GitHub Actions for CI/CD pipelines to streamline API delivery, utilized Jest for unit testing,
andmonitored application logs with Amazon CloudWatch, setting automated alerts based on specific application metrics
JobFit (https://github.com/BigDataIA-Spring2024-Sec2-Team1/JobFitAI) Feb 2024 - Mar 2024
• Designed and implemented the JobFit application with Python, Streamlit, and FastAPI, integrating ChatGPT API and a custom BERT model to help users assess their suitability for job descriptions.
Meal Share (https://github.com/giram-a/AED/tree/main/MealShare) Nov 2023 - Dec 2023
• Designed and built a meal distribution platform with Java, MySQL, and Google Maps API to assist in providing meals to those in need
• Utilized object-oriented principles and efficient sorting algorithms to optimize location sorting, enhancing the accuracy and speed of meal
 distribution
  `

  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chat, setChat] = useState(null);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  useEffect(() => {
    if (activeJob) {
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
    }
  }, [activeJob]);


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

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-[25%] p-4 border m-4 rounded-md md:fixed h-[90%] md:h-[89%] xs:h-56 overflow-x-auto md:overflow-auto flex md:flex-col space-x-4 md:space-x-0 md:space-y-4 scrollbar-hidden">
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
    </div>
  );
}

export default JobsListing
