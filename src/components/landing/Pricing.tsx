import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { CheckCircle2, Star, Zap, Headphones, UserCog } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "100",
    coins: "100 Coins",
    description: "Perfect for casual listeners",
    features: [
      "10 Podcast Summaries",
      "Key Questions Highlight",
      "AI-Powered Insights",
      "Basic Email Support",
      "7-day History"
    ],
    cta: "Get Started",
    icon: <Headphones className="w-6 h-6 text-purple-500" />
  },
  {
    name: "Professional",
    price: "500",
    coins: "500 Coins",
    description: "Best for professionals",
    features: [
      "50 Podcast Summaries",
      "Key Questions + Timestamps",
      "Advanced AI Insights",
      "Priority Email Support",
      "30-day History",
      "1 Free Summary Monthly",
      "Basic Analytics"
    ],
    popular: true,
    cta: "Most Popular",
    icon: <Zap className="w-6 h-6 text-purple-500" />
  },
  {
    name: "Enterprise",
    price: "1000",
    coins: "1000 Coins",
    description: "Ideal for power users",
    features: [
      "Unlimited Summaries",
      "Full Transcript + Highlights",
      "Premium AI Insights",
      "24/7 Priority Support",
      "90-day History",
      "2 Free Summaries Monthly",
      "Advanced Analytics",
      "Team Management"
    ],
    cta: "Contact Sales",
    icon: <UserCog className="w-6 h-6 text-purple-500" />
  }
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-white text-xs font-medium text-purple-600 shadow-sm mb-4">
            FLEXIBLE PLANS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Straightforward <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Pricing</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pay as you go with prepaid credits. No subscriptions, cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative h-full ${plan.popular ? "md:-mt-2" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-lg z-10">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  MOST POPULAR
                </div>
              )}
              
              <Card className={`h-full flex flex-col transition-all duration-300 hover:shadow-lg ${
                plan.popular 
                  ? "border-2 border-purple-500 shadow-md" 
                  : "border border-gray-200"
              }`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {plan.name}
                    </CardTitle>
                    <div className="p-2 rounded-lg bg-purple-50">
                      {plan.icon}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="flex-grow flex flex-col">
                  <div className="mb-6">
                    <p className="text-3xl font-bold text-gray-900">{plan.coins}</p>
                    <p className="text-sm text-gray-500">≈ {plan.price} ₹</p>
                  </div>
                  
                  <ul className="space-y-3 mb-6 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    size="lg"
                    className={`w-full mt-auto ${
                      plan.popular
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                        : "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-200">
            <span className="text-sm text-gray-700 mb-2 sm:mb-0 sm:mr-3">
              1 Coin = 1 ₹ • No hidden fees
            </span>
            <Button variant="link" className="text-purple-600 text-sm">
              Need a custom plan? Contact us →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}