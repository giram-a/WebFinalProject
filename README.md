**Future Hire Job Portal**:

---

# Future Hire Job Portal

## Contributors:

- **Amey Satwe (002244396)**
- **Aniket Giram (002808219)**
- **Yashraj Kadam (002853503)**
- **Shreya Thakur (002818444)**

---

## **Detailed Project Overview**

Future Hire Job Board is an innovative platform that leverages AI technology to enhance the job search and recruitment experience.

Key features of Future Hire include:

- **AI-Powered Resume Keyword Suggestions**: Cutting-edge AI algorithms analyze resumes and suggest relevant keywords to improve visibility and job postings.
- An innovative AI-powered platform designed to enhance the job search and recruitment process. It features AI-driven resume optimization and streamlined hiring solutions, benefiting both candidates and employers.

---

## **Purpose**

The purpose of the Future Hire Job Board is to optimize the job search and recruitment process by using AI to:

- Suggest improvements for resumes.
- Streamline communication between candidates and employers through intelligent matching.

---

## **Components Overview**

### **LandingPage Component**

The `LandingPage` is the main entry point for FutureHire users, showcasing the platform’s features and encouraging user sign-ups.

- ### Key Features:

       - Navigation Bar: Fixed, scrollable with links to various sections.
       - Hero Section: Includes a call-to-action button to try the platform for free.
       - Features & Testimonials: Highlights platform features and user testimonials.
       - FAQ Section: Collapsible questions and answers for user guidance.

- ### Technologies Used:
       - React: For building a dynamic, responsive user interface.
       - Clerk: For handling user authentication (login/signup).
       - React Router: For smooth navigation between sections.
       - Tailwind CSS: For responsive, modern styling.

### **Login Component**

- Provides a secure and user-friendly interface for authentication.
- Supports multiple login methods, including:
  - **Email and Password authentication**.
  - **Google OAuth-based login**.
- Includes role-based redirection to streamline navigation for different user roles (e.g., Admin, Employer, Job Seeker).

### **Signup Component**

- Interactive and flexible interface for user registration.
- Supports:
  - **Email-based signup** with OTP verification.
  - **Google OAuth-based signup**.
- Collects user information like name, date of birth, and gender to provide a personalized experience.

### **Kanban Board**

- Displays job listings and descriptions.
- Allows users to:
  - View job details.
  - Apply for jobs and receive an **application confirmation email**.
- Includes four categories to track application progress:
  - **Applied Jobs**
  - **Interview**
  - **Rejection**
  - **Offer**

### **Resume Portal**

- Allows users to upload and save resumes.
- Integrated with **Gemini AI** for resume analysis.

### **Gemini AI Component**

- **Gemini AI (Generative AI - Gemini-1.5)** enhances the recruitment process by providing tailored feedback on resumes.
- Features:
  - Upload PDF resumes for analysis.
  - Compare resumes against job descriptions.
  - Identify **missing skills** and **matched skills**.
  - Provide concise **resume improvement suggestions**.

### **Premium Component**

- Presents users with two subscription tiers:
  - **Free Tier**: Basic features.
  - **Premium Tier**: Advanced features with additional benefits.
- Guides users to either return to the home page or proceed to a checkout page.

### **Sidebar Component**

- Combines a navigational sidebar with a header for user account controls.
- Uses `SidebarProvider` for managing the sidebar state.
- Seamlessly integrates with `react-router-dom` for dynamic content rendering via `Outlet`.

  ***

FutureHire Job Board is an all-in-one platform that streamlines the job search for candidates and helps recruiters efficiently find top talent. It combines AI-driven features with user-friendly design to enhance the hiring process.
