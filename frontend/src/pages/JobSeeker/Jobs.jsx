import React, { useState, useCallback } from 'react'
import JobListingTile from './JobListingTile';
import JobDescriptionTile from './JobDescriptionTile';

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'NVIDIA',
    location: 'Remote',
    description: 'As a Frontend Developer at NVIDIA, you will be responsible for building and maintaining the user interfaces of cutting-edge web applications. This role requires a deep understanding of web technologies to create highly interactive, responsive, and user-friendly interfaces. You will work closely with cross-functional teams, including UX/UI designers and backend engineers, to deliver exceptional user experiences. Your primary responsibilities will include developing high-performance React components, optimizing front-end performance for speed and scalability, and ensuring compatibility across multiple browsers and platforms. You will also collaborate on code reviews and adhere to NVIDIA’s standards for code quality. Additionally, you will have the opportunity to contribute to the creative aspects of product design, proposing new ways to enhance user interactions and streamline processes.',
    companyImage: 'https://logo.clearbit.com/nvidia.com',
    applyLink: 'https://www.nvidia.com/careers/frontend-developer',
    lastUpdate: '2024-11-14',
    requiredSkills: [
      'HTML5', 'CSS3', 'JavaScript', 'React.js', 'Webpack', 'Babel', 'RESTful APIs', 'Git', 'Jest', 'Mocha'
    ],
    salary: '$120,000 - $150,000 per year'
  },
  {
    id: 2,
    title: 'Software Engineer',
    company: 'Meta',
    location: 'Menlo Park, CA',
    description: 'Meta is seeking a Software Engineer to join its team and contribute to the development of new social applications. As a Software Engineer at Meta, you will help build scalable and high-performance systems that can support millions of users. Your role will involve designing and implementing backend services using Python, Java, or C++, as well as developing secure and robust REST APIs. You will be working with distributed systems to ensure that Meta’s applications are fast, reliable, and secure. This role requires knowledge of algorithms, data structures, and large-scale software architecture. Meta fosters a collaborative and fast-paced environment where innovation and problem-solving are encouraged.',
    companyImage: 'https://logo.clearbit.com/meta.com',
    applyLink: 'https://www.meta.com/careers/software-engineer',
    lastUpdate: '2024-11-14',
    requiredSkills: [
      'Python', 'Java', 'C++', 'REST APIs', 'Distributed Systems', 'Data Structures', 'Algorithms', 'Cloud Services', 'Scalability', 'Security'
    ],
    salary: '$130,000 - $170,000 per year'
  },
  {
    id: 3,
    title: 'Data Engineer',
    company: 'Amazon',
    location: 'Seattle, WA',
    description: 'Amazon is looking for a Data Engineer to help build and optimize data pipelines for its analytics and reporting systems. As a Data Engineer at Amazon, you will work closely with teams to extract, transform, and load (ETL) data from various sources into Amazon’s data lakes and warehouses. You will design and implement scalable data pipelines that support real-time analytics and enable data-driven decision-making across the organization. This role requires expertise in tools such as AWS Redshift, Apache Spark, and SQL. You will be responsible for developing data models and ensuring that they support advanced analytical capabilities. Proficiency in Python and SQL is required, and experience with machine learning models is a plus. The ideal candidate will also be experienced with big data technologies and distributed data processing.',
    companyImage: 'https://logo.clearbit.com/amazon.com',
    applyLink: 'https://www.amazon.com/careers/data-engineer',
    lastUpdate: '2024-11-14',
    requiredSkills: [
      'AWS Redshift', 'Apache Spark', 'SQL', 'ETL Processes', 'Big Data', 'Data Warehousing', 'Python', 'Machine Learning (bonus)'
    ],
    salary: '$110,000 - $140,000 per year'
  },
  {
    id: 4,
    title: 'iOS Developer',
    company: 'Apple',
    location: 'Cupertino, CA',
    description: 'Apple is seeking an experienced iOS Developer to join its team and contribute to the development of cutting-edge mobile applications. In this role, you will leverage the latest Swift and Objective-C frameworks to create high-performance, intuitive applications for Apple’s ecosystem. You will work closely with designers and backend engineers to ensure that the applications meet Apple’s design standards and performance requirements. Responsibilities include designing and developing mobile applications that run seamlessly across different devices, ensuring the highest level of security, and optimizing apps for performance. Ideal candidates will have experience with Xcode, UIKit, CoreData, and other iOS development tools. Additionally, you should have a strong understanding of mobile application security and familiarity with continuous integration and delivery (CI/CD) pipelines.',
    companyImage: 'https://logo.clearbit.com/apple.com',
    applyLink: 'https://www.apple.com/careers/ios-developer',
    lastUpdate: '2024-11-14',
    requiredSkills: [
      'Swift', 'Objective-C', 'Xcode', 'UIKit', 'CoreData', 'iOS Development', 'Mobile App Security', 'CI/CD'
    ],
    salary: '$120,000 - $160,000 per year'
  },
  {
    id: 5,
    title: 'Backend Engineer',
    company: 'Netflix',
    location: 'Los Gatos, CA',
    description: 'Netflix is looking for a Backend Engineer to support its growing platform and streaming services. In this role, you will design and build scalable backend systems that power Netflix’s streaming platform, content recommendation system, and analytics services. You will work with technologies like Node.js, Java, and Python to implement distributed systems and RESTful APIs. You will also be responsible for maintaining NoSQL databases such as Cassandra and DynamoDB. As a Backend Engineer at Netflix, you will work closely with data scientists and other engineers to improve Netflix’s recommendation algorithms and ensure a seamless user experience. This role requires experience with microservices architecture, cloud services like AWS and GCP, and big data processing technologies such as Apache Spark and Hadoop.',
    companyImage: 'https://logo.clearbit.com/netflix.com',
    applyLink: 'https://www.netflix.com/careers/backend-engineer',
    lastUpdate: '2024-11-14',
    requiredSkills: [
      'Node.js', 'Java', 'Python', 'REST APIs', 'NoSQL Databases (Cassandra, DynamoDB)', 'Microservices Architecture', 'AWS', 'GCP', 'Big Data (Spark, Hadoop)'
    ],
    salary: '$130,000 - $170,000 per year'
  },
  {
    id: 6,
    title: 'Software Developer',
    company: 'Google',
    location: 'Mountain View, CA',
    description: 'As a Software Developer at Google, you will work on innovative systems that impact billions of users worldwide. You will design, build, and maintain scalable, high-performance systems across various Google platforms including search, cloud computing, and machine learning. You will collaborate with cross-functional teams to develop new features and improve infrastructure. This role requires strong problem-solving skills, knowledge of system design, and experience in algorithms and data structures. You will work with languages like Java, C++, and Python to implement scalable infrastructure and distributed systems. Familiarity with cloud platforms, machine learning frameworks, and large-scale applications is highly desirable.',
    companyImage: 'https://logo.clearbit.com/google.com',
    applyLink: 'https://www.google.com/careers/software-developer',
    lastUpdate: '2024-11-14',
    requiredSkills: [
      'Java', 'C++', 'Python', 'System Design', 'Algorithms', 'Cloud Computing', 'Distributed Systems', 'Machine Learning'
    ],
    salary: '$140,000 - $180,000 per year'
  },
  {
    id: 7,
    title: 'Cloud Solutions Architect',
    company: 'Microsoft',
    location: 'Redmond, WA',
    description: 'Microsoft is looking for a Cloud Solutions Architect to design and implement cutting-edge cloud-based solutions on Azure. In this role, you will engage with clients to understand their business requirements and translate those into effective cloud architectures. You will be responsible for configuring cloud resources, automating deployments, and optimizing infrastructure for cost, scalability, and performance. The role requires expertise in IaaS and PaaS models, as well as experience with Kubernetes, Docker, and CI/CD workflows. Knowledge of cloud security best practices, programming languages like Python or C#, and Azure certifications are highly preferred. You will work alongside technical and business teams to deliver comprehensive cloud solutions.',
    companyImage: 'https://logo.clearbit.com/microsoft.com',
    applyLink: 'https://www.microsoft.com/careers/cloud-solutions-architect',
    lastUpdate: '2024-11-14',
    requiredSkills: [
      'Azure', 'Cloud Architecture', 'IaaS', 'PaaS', 'Kubernetes', 'Docker', 'CI/CD', 'Python', 'C#', 'Cloud Security'
    ],
    salary: '$150,000 - $190,000 per year'
  },
  {
    id: 8,
    title: 'Data Scientist',
    company: 'IBM',
    location: 'Armonk, NY',
    description: 'IBM is hiring a Data Scientist to analyze large datasets and provide actionable insights that drive business decisions. As a Data Scientist at IBM, you will work with data from various industries and use machine learning, deep learning, and statistical analysis to develop predictive models. You will be responsible for data cleaning, feature engineering, and deploying models into production environments. This role requires expertise in Python, R, and machine learning frameworks like TensorFlow or PyTorch. You will collaborate with other data scientists, engineers, and business leaders to develop solutions that address complex problems and unlock business opportunities.',
    companyImage: 'https://logo.clearbit.com/ibm.com',
    applyLink: 'https://www.ibm.com/careers/data-scientist',
    lastUpdate: '2024-11-14',
    requiredSkills: [
      'Python', 'R', 'Machine Learning', 'TensorFlow', 'PyTorch', 'Data Cleaning', 'Feature Engineering', 'Statistical Analysis'
    ],
    salary: '$110,000 - $150,000 per year'
  },
  {
    id: 9,
    title: 'Full Stack Developer',
    company: 'LinkedIn',
    location: 'Sunnyvale, CA',
    description: 'LinkedIn is seeking a Full Stack Developer to join its team and help build the next generation of professional networking tools. In this role, you will work on both the front-end and back-end development of LinkedIn’s core platform. You will build scalable web applications using technologies like React, Node.js, and Java, and you will be responsible for optimizing user interactions, data flow, and system performance. You will also integrate third-party APIs, improve code quality through unit testing, and collaborate with product managers and designers to implement new features. The ideal candidate will have experience with both frontend and backend technologies, strong problem-solving skills, and a deep understanding of databases and web security.',
    companyImage: 'https://logo.clearbit.com/linkedin.com',
    applyLink: 'https://www.linkedin.com/careers/full-stack-developer',
    lastUpdate: '2024-11-14',
    requiredSkills: [
      'React', 'Node.js', 'Java', 'MongoDB', 'SQL', 'Web Security', 'Unit Testing', 'API Integration', 'Responsive Design'
    ],
    salary: '$120,000 - $150,000 per year'
  },
  {
    id: 10,
    title: 'Product Manager',
    company: 'Salesforce',
    location: 'San Francisco, CA',
    description: 'Salesforce is hiring a Product Manager to lead the development and launch of innovative features on its CRM platform. In this role, you will work closely with cross-functional teams including engineers, designers, and marketing to define product requirements and drive the product development lifecycle. You will gather customer feedback, analyze market trends, and collaborate with business stakeholders to deliver solutions that meet user needs. This role requires strong analytical thinking, the ability to prioritize features, and an in-depth understanding of the CRM industry. The ideal candidate will have a background in product management, with excellent communication skills and a track record of successful product launches.',
    companyImage: 'https://logo.clearbit.com/salesforce.com',
    applyLink: 'https://www.salesforce.com/careers/product-manager',
    lastUpdate: '2024-11-14',
    requiredSkills: [
      'Product Management', 'Market Analysis', 'CRM', 'Agile Methodology', 'Customer Feedback', 'Prioritization', 'Stakeholder Communication'
    ],
    salary: '$130,000 - $160,000 per year'
  }

];

const JobsListing = () => {

  const [activeJob, setActiveJob] = useState(jobs[0]);

  const handleSetActiveJob = useCallback((job) => {
    setActiveJob(job);
  }, [activeJob]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-[30%] p-4 border m-4 rounded-md md:fixed h-[90%] md:h-[89%] xs:h-56 overflow-x-auto md:overflow-auto flex md:flex-col space-x-4 md:space-x-0 md:space-y-4">
        <div className="flex flex-nowrap md:flex-col space-x-4 md:space-x-0 md:space-y-4">
          {jobs.map((job) => (
            <JobListingTile key={job.id} job={job} setActiveJob={handleSetActiveJob} activeJob={activeJob} />
          ))}
        </div>
      </div>
      <div className="md:w-[70%] w-full md:ml-[32%] bg-white p-6 overflow-y-auto flex-grow">
        <JobDescriptionTile activeJob={activeJob} />
      </div>
    </div>
  );
}

export default JobsListing
