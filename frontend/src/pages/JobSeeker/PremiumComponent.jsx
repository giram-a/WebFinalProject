import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react';

// Initialize Stripe


const PremiumComponent = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const handleClick = ()=>{
    navigate("/jobseeker/checkout");
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Tier Card */}
        <Card>
          <CardHeader>
            <CardTitle>Free Tier</CardTitle>
            <CardDescription>Basic features for individual use</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold mb-4">$0/mo</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Limited job postings</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Basic search functionality</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-green-500" />
                <span>Standard support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGoBack} variant="outline" className="w-full">
              Go Back to Home
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Tier Card */}
        <Card className="border-2 border-yellow-400">
          <CardHeader>
            <CardTitle className="text-yellow-600">Premium Tier</CardTitle>
            <CardDescription>Advanced features for power users</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold mb-4 text-yellow-600">$10/mo</p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-yellow-500" />
                <span>Unlimited job postings</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-yellow-500" />
                <span>Advanced search and filters</span>
              </li>
              <li className="flex items-center">
                <Check className="mr-2 h-4 w-4 text-yellow-500" />
                <span>Priority support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={handleClick} type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
              Buy Premium
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};


export default PremiumComponent;

