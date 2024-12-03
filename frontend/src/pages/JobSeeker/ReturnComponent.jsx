import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useAuth, useUser } from "@clerk/clerk-react";
import { updateUser } from "@/api/userApi";
import useUserStore from "@/features/user/userStore";

const ReturnComponent = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { updateUserPremiumStatus } = useUserStore();

  const checkPaymentStatus = async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    fetch(`http://localhost:8080/payment/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then(async (data) => {
        let response = await updateUser({ id: user.id, isPremiumUser: data.status === "complete" }, await getToken());
        console.log(response);
        updateUserPremiumStatus(true)
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching session status:", error);
        setStatus('error');
        setIsLoading(false);
      });

  }
  useEffect(() => {
    checkPaymentStatus();
  }, []);


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Processing Payment</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </CardContent>
          <CardDescription className="text-center pb-4">
            Please wait while we confirm your payment...
          </CardDescription>
        </Card>
      </div>
    );
  }

  if (status === 'open') {
    return <Navigate to="/checkout" />;
  }

  if (status === 'complete') {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center text-green-600">Payment Successful</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <p className="text-center mb-4">
              We appreciate your business! A confirmation email will be sent to {customerEmail}.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline">
              <a href="mailto:orders@example.com">Contact Support</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Error or unknown status
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-red-600">Payment Error</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
          <p className="text-center mb-4">
            {"We're sorry, but there was an error processing your payment. Please try again or contact support."}
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Button variant="outline">
            <a href="/checkout">Try Again</a>
          </Button>
          <Button>
            <a href="mailto:orders@example.com">Contact Support</a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ReturnComponent;
