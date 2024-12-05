export const emailTemplates = (args) => {
  return {
    premiumPurchase: {
      subject: "Welcome to FutureHire Premium!",
      from: "",
      to: "",
      html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to FutureHire Premium</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #4a90e2; color: white; padding: 10px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .button { display: inline-block; padding: 10px 20px; background-color: #4a90e2; color: white; text-decoration: none; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to FutureHire Premium!</h1>
              </div>
              <div class="content">
                <p>Dear ${
                  args.fullName ? "" + args.fullName : "Valued Customer"
                },</p>
                <p>Congratulations! Your purchase of FutureHire Premium was successful. You can now enjoy all the benefits of our premium features.</p>
                <p>With FutureHire Premium, you'll have access to:</p>
                <ul>
                  <li>Advanced job matching algorithms</li>
                  <li>Priority customer support</li>
                  <li>Exclusive hiring insights and reports</li>
                  <li>And much more!</li>
                </ul>
                <p>To start exploring your new premium features, click the button below:</p>
                <p>If you have any questions or need assistance, don't hesitate to contact our support team.</p>
                <p>Thank you for choosing FutureHire Premium!</p>
                <p>Best regards,<br>The FutureHire Team</p>
              </div>
            </div>
          </body>
          </html>
        `,
    },
    companyApproval: {
      subject: "Your Company Has Been Approved on FutureHire",
      from: "",
      to: "",
      html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Company Approved on FutureHire</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #4a90e2; color: white; padding: 10px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .button { display: inline-block; padding: 10px 20px; background-color: #4a90e2; color: white; text-decoration: none; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Your Company Has Been Approved!</h1>
              </div>
              <div class="content">
                <p>Dear ${
                  args.fullName ? "" + args.fullName : "Valued Customer"
                },</p>
                <p>We're excited to inform you that your company has been approved in the FutureHire system!</p>
                <p>You can now start adding jobs and connecting with top talent. Here's what you can do next:</p>
                <ul>
                  <li>Log in to your FutureHire account</li>
                  <li>Navigate to the 'Post a Job' section</li>
                  <li>Create and publish your job listings</li>
                  <li>Start reviewing applications from qualified candidates</li>
                </ul>
                <p>If you need any assistance or have questions about posting jobs, our support team is here to help.</p>
                <p>Thank you for choosing FutureHire for your recruitment needs. We look forward to helping you find your next great hire!</p>
                <p>Best regards,<br>The FutureHire Team</p>
              </div>
            </div>
          </body>
          </html>
        `,
    },
    jobApplicationConfirmation: {
      subject: "Job Application Confirmation - FutureHire",
      from: "",
      to: "",
      html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Job Application Confirmation</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #4a90e2; color: white; padding: 10px; text-align: center; }
              .content { padding: 20px; background-color: #f9f9f9; }
              .button { display: inline-block; padding: 10px 20px; background-color: #4a90e2; color: white; text-decoration: none; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Job Application Submitted!</h1>
              </div>
              <div class="content">
                <p>Dear ${args.fullName ? "" + args.fullName : "Applicant"},</p>
                <p>We're excited to confirm that your job application has been successfully submitted through FutureHire!</p>
                <p>Here are the details of your application:</p>
                <ul>
                  <li>Job Title: ${
                    args.jobTitle ? "" + args.jobTitle : "N/A"
                  }</li>
                  <li>Company: ${
                    args.companyName ? "" + args.companyName : "N/A"
                  }</li>
                </ul>
                <p>What happens next:</p>
                <ol>
                  <li>The employer will review your application.</li>
                  <li>If they're interested, they may contact you for further steps.</li>
                  <li>You can check the status of your application in your FutureHire dashboard.</li>
                </ol>
                <p>Remember to keep your profile updated and continue exploring other opportunities on FutureHire.</p>
                <p>If you have any questions about your application or need assistance, please don't hesitate to contact our support team.</p>
                <p>Best of luck with your job search!</p>
                <p>Best regards,<br>The FutureHire Team</p>
              </div>
            </div>
          </body>
          </html>
        `,
    },
  };
};
