import React from "react";
import { Zap, BookOpen, ClipboardList, Search, BarChart2, CheckCircle2, Play } from "lucide-react";
import { Button } from "../ui/button";

const features = [
  {
    title: "Instant Summaries",
    description: "Get AI-generated summaries in seconds, saving you hours of listening time.",
    icon: <Zap className="w-5 h-5 text-purple-500" />,
    stats: "90% time saved",
    videoDemo: "#"
  },
  {
    title: "Deep Analysis",
    description: "Go beyond surface-level with contextual understanding and key insights.",
    icon: <BookOpen className="w-5 h-5 text-purple-500" />,
    stats: "3x more insights",
    videoDemo: "#"
  },
  {
    title: "Structured Outputs",
    description: "Organized summaries with timestamps, key points, and action items.",
    icon: <ClipboardList className="w-5 h-5 text-purple-500" />,
    stats: "100% organized",
    videoDemo: "#"
  },
  {
    title: "Smart Search",
    description: "Semantic search across all your summarized content with natural language.",
    icon: <Search className="w-5 h-5 text-purple-500" />,
    stats: "Find in seconds",
    videoDemo: "#"
  },
  {
    title: "Trend Tracking",
    description: "Identify patterns across episodes and track topic evolution over time.",
    icon: <BarChart2 className="w-5 h-5 text-purple-500" />,
    stats: "Data-driven",
    videoDemo: "#"
  },
  {
    title: "High Accuracy",
    description: "Our specialized AI maintains 98% accuracy for podcast content.",
    icon: <CheckCircle2 className="w-5 h-5 text-purple-500" />,
    stats: "98% accurate",
    videoDemo: "#"
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-white text-xs font-medium text-purple-600 shadow-sm mb-4">
            CORE FEATURES
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Transform Your <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Listening Experience</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful tools designed to maximize the value you get from every podcast
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-purple-50 mr-4">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                    <span className="inline-block mt-1 px-2 py-1 rounded-full bg-gray-100 text-xs font-medium text-gray-700">
                      {feature.stats}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-5 flex-grow">{feature.description}</p>
                
                <div className="mt-auto">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-purple-600 hover:text-purple-700 px-0"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    See how it works
                  </Button>
                </div>
              </div>
              
              {/* Hover effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
        
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-200">
            <span className="text-sm text-gray-700 mb-2 sm:mb-0 sm:mr-4">
              Ready to experience the difference?
            </span>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              Get Started Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}