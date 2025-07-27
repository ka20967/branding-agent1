import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, Target, Lightbulb, Globe, Palette } from 'lucide-react';

const PersonalBrandingAgent = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentStage, setCurrentStage] = useState('intro');
  const [userProfile, setUserProfile] = useState({
    name: '',
    industry: '',
    goals: [],
    skills: [],
    values: [],
    targetAudience: '',
    currentChallenges: [],
    preferredPlatforms: [],
    personalityTraits: [],
    uniqueValue: '',
    contentPreferences: []
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const stages = {
    intro: 'introduction',
    name: 'getting_name',
    industry: 'industry_discovery',
    goals: 'goal_setting',
    skills: 'skills_assessment',
    values: 'values_identification',
    audience: 'audience_definition',
    challenges: 'challenge_identification',
    platforms: 'platform_selection',
    personality: 'personality_assessment',
    unique_value: 'unique_value_prop',
    content: 'content_strategy',
    recommendations: 'providing_recommendations',
    website: 'website_planning',
    complete: 'consultation_complete'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      addBotMessage("👋 Hello! I'm your Personal Branding Consultant AI. I'm here to help you discover, develop, and amplify your unique personal brand. Together, we'll create a comprehensive strategy that showcases your authentic self and helps you achieve your professional goals.\n\nLet's start this exciting journey! What's your name?");
    }
  }, []);

  const addBotMessage = (text, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', content: text, timestamp: new Date() }]);
      setIsTyping(false);
    }, delay);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { type: 'user', content: text, timestamp: new Date() }]);
  };

  const processUserInput = (input) => {
    addUserMessage(input);
    
    switch (currentStage) {
      case 'intro':
        setUserProfile(prev => ({ ...prev, name: input }));
        setCurrentStage('industry');
        addBotMessage(`Nice to meet you, ${input}! 🎯 \n\nNow, let's dive into your professional world. What industry or field do you work in? (e.g., technology, healthcare, marketing, education, finance, etc.)`);
        break;

      case 'industry':
        setUserProfile(prev => ({ ...prev, industry: input }));
        setCurrentStage('goals');
        addBotMessage(`Great! Working in ${input} gives us a good foundation. 🚀\n\nWhat are your main professional goals for your personal brand? Are you looking to:\n- Advance in your current career\n- Switch industries\n- Build thought leadership\n- Attract clients/customers\n- Network with peers\n- Land speaking opportunities\n\nTell me about your specific goals!`);
        break;

      case 'goals':
        setUserProfile(prev => ({ ...prev, goals: [...prev.goals, input] }));
        setCurrentStage('skills');
        addBotMessage(`Excellent goals! 💪 Having clear objectives will guide our strategy.\n\nNow let's identify your superpowers. What are your top skills, expertise areas, or things you're genuinely great at? Think both technical skills and soft skills.\n\n(Feel free to list several - the more specific, the better!)`);
        break;

      case 'skills':
        setUserProfile(prev => ({ ...prev, skills: [...prev.skills, input] }));
        setCurrentStage('values');
        addBotMessage(`Those are impressive skills! 🌟\n\nPersonal branding isn't just about what you can do - it's about who you are. What values or principles are most important to you? What do you stand for?\n\n(Examples: innovation, authenticity, helping others, sustainability, continuous learning, etc.)`);
        break;

      case 'values':
        setUserProfile(prev => ({ ...prev, values: [...prev.values, input] }));
        setCurrentStage('audience');
        addBotMessage(`Your values really shine through! 🎯\n\nNow let's talk about your ideal audience. Who do you want to reach and connect with? Think about:\n- Job titles or roles\n- Industries\n- Company sizes\n- Career stages\n- Interests or challenges they have\n\nDescribe your target audience:`);
        break;

      case 'audience':
        setUserProfile(prev => ({ ...prev, targetAudience: input }));
        setCurrentStage('challenges');
        addBotMessage(`Perfect! Understanding your audience is crucial. 🎪\n\nNow let's be honest about obstacles. What challenges are you currently facing with your personal brand or professional visibility? \n\n(Examples: not enough visibility, unclear messaging, imposter syndrome, time constraints, don't know where to start, etc.)`);
        break;

      case 'challenges':
        setUserProfile(prev => ({ ...prev, currentChallenges: [...prev.currentChallenges, input] }));
        setCurrentStage('platforms');
        addBotMessage(`Thanks for being open about those challenges - we'll address them! 📱\n\nWhere do you want to build your presence? Which platforms appeal to you or where do you think your audience hangs out?\n\n- LinkedIn (professional networking)\n- Twitter/X (thought leadership, quick insights)\n- Instagram (visual storytelling)\n- YouTube (in-depth content)\n- Medium/Substack (long-form writing)\n- TikTok (creative, younger audience)\n- Personal website/blog\n- Industry-specific platforms\n\nWhich ones interest you most?`);
        break;

      case 'platforms':
        setUserProfile(prev => ({ ...prev, preferredPlatforms: [...prev.preferredPlatforms, input] }));
        setCurrentStage('personality');
        addBotMessage(`Great platform choices! 🎭\n\nNow let's capture your authentic voice. How would you describe your personality or communication style? Are you:\n\n- Analytical and data-driven\n- Creative and innovative\n- Warm and empathetic\n- Direct and results-focused\n- Humorous and approachable\n- Inspirational and motivating\n\nDescribe your natural communication style:`);
        break;

      case 'personality':
        setUserProfile(prev => ({ ...prev, personalityTraits: [...prev.personalityTraits, input] }));
        setCurrentStage('unique_value');
        addBotMessage(`I love your authentic style! ✨\n\nHere's a big question: What makes you uniquely YOU? What's your secret sauce - that special combination of experience, perspective, or approach that sets you apart from others in your field?\n\nThis could be your unique background, methodology, viewpoint, or way of solving problems:`);
        break;

      case 'unique_value':
        setUserProfile(prev => ({ ...prev, uniqueValue: input }));
        setCurrentStage('content');
        addBotMessage(`That's your superpower! 🚀\n\nLast question before I create your personalized recommendations: What type of content do you enjoy creating or would like to create? \n\n- Written posts/articles\n- Videos/vlogs\n- Infographics/visual content\n- Podcasts/audio\n- Case studies\n- Behind-the-scenes content\n- Educational tutorials\n- Industry insights/commentary\n\nWhat resonates with you?`);
        break;

      case 'content':
        setUserProfile(prev => ({ ...prev, contentPreferences: [...prev.contentPreferences, input] }));
        setCurrentStage('recommendations');
        generateRecommendations();
        break;

      case 'recommendations':
        if (input.toLowerCase().includes('website') || input.toLowerCase().includes('site')) {
          setCurrentStage('website');
          generateWebsiteRecommendations();
        } else if (input.toLowerCase().includes('more') || input.toLowerCase().includes('detail')) {
          addBotMessage(`I'd be happy to dive deeper! What specific area would you like to explore further?\n\n- Content strategy and calendar\n- Platform-specific tactics\n- Brand voice and messaging\n- Visual identity guidelines\n- Networking strategies\n- Website planning\n\nWhat interests you most?`);
        } else {
          addBotMessage(`Great question! Let me provide some additional insights based on your profile...\n\n${generateContextualAdvice(input)}\n\nIs there anything else you'd like to explore about your personal branding strategy?`);
        }
        break;

      case 'website':
        addBotMessage(`Excellent! Based on your profile, here are more specific website recommendations:\n\n${generateDetailedWebsiteAdvice()}\n\nWould you like me to elaborate on any of these website elements or discuss other aspects of your personal brand?`);
        break;

      default:
        addBotMessage("I'd love to help you further! Feel free to ask about any aspect of personal branding, or we can start a new consultation session.");
    }
  };

  const generateRecommendations = () => {
    const { name, industry, goals, skills, values, targetAudience, preferredPlatforms, personalityTraits, uniqueValue } = userProfile;
    
    setTimeout(() => {
      const recommendations = `🎉 Fantastic, ${name}! I've analyzed your responses and here's your personalized Personal Brand Strategy:

## 🎯 Your Brand Foundation
**Industry Focus:** ${industry}
**Unique Value Proposition:** ${uniqueValue}
**Core Values:** ${values.join(', ')}

## 🚀 Recommended Brand Positioning
Based on your ${personalityTraits.join(', ')} communication style and expertise in ${skills.join(', ')}, position yourself as "${generateBrandPositioning()}"

## 📱 Platform Strategy
${generatePlatformStrategy()}

## 📝 Content Themes (Your "Content Pillars")
1. **Expertise Showcase:** Share insights about ${skills[0] || 'your key skills'}
2. **Industry Commentary:** Thoughts on trends in ${industry}
3. **Value-Driven Content:** Content that reflects your commitment to ${values[0] || 'your values'}
4. **Personal Journey:** Behind-the-scenes of your professional growth
5. **Community Building:** Engaging with ${targetAudience}

## 🎨 Brand Voice Guidelines
- **Tone:** ${personalityTraits[0] || 'Professional yet approachable'}
- **Language:** Speak directly to ${targetAudience}
- **Frequency:** Start with 2-3 posts per week on your primary platform

## 🔥 Quick Wins (Start This Week!)
${generateQuickWins()}

## 🌐 Website Recommendation
Based on your goals and audience, you should definitely create a personal website! It will serve as your digital headquarters and help you ${goals[0] || 'achieve your professional goals'}.

Would you like me to create a detailed website strategy for you, or do you have questions about implementing any of these recommendations?`;

      setMessages(prev => [...prev, { type: 'bot', content: recommendations, timestamp: new Date() }]);
      setIsTyping(false);
    }, 2000);
    
    setIsTyping(true);
  };

  const generateBrandPositioning = () => {
    const { industry, skills, values, uniqueValue } = userProfile;
    const positions = [
      `The ${skills[0] || 'skilled'} ${industry} professional who brings ${values[0] || 'innovation'} to everything they do`,
      `A ${uniqueValue.toLowerCase().includes('unique') ? 'distinctive' : 'results-driven'} voice in ${industry}`,
      `The go-to expert for ${skills[0] || 'professional solutions'} in ${industry}`,
      `A ${values[0] || 'passionate'} ${industry} leader focused on ${skills[0] || 'excellence'}`
    ];
    return positions[Math.floor(Math.random() * positions.length)];
  };

  const generatePlatformStrategy = () => {
    const { preferredPlatforms, targetAudience, industry } = userProfile;
    const platforms = preferredPlatforms.join(', ').toLowerCase();
    
    let strategy = '';
    if (platforms.includes('linkedin')) {
      strategy += '**LinkedIn (Primary):** Share professional insights, engage with industry content, publish articles\n';
    }
    if (platforms.includes('twitter') || platforms.includes('x')) {
      strategy += '**Twitter/X:** Quick industry takes, join conversations, share curated content\n';
    }
    if (platforms.includes('instagram')) {
      strategy += '**Instagram:** Behind-the-scenes content, visual storytelling, day-in-the-life posts\n';
    }
    if (platforms.includes('website') || platforms.includes('blog')) {
      strategy += '**Personal Website:** Your digital headquarters - portfolio, blog, contact information\n';
    }
    
    return strategy || `Focus on ${preferredPlatforms[0] || 'LinkedIn'} as your primary platform to reach ${targetAudience}`;
  };

  const generateQuickWins = () => {
    const { skills, industry, values } = userProfile;
    return `1. **Optimize your LinkedIn headline** to include "${skills[0] || 'your key skill'}" and "${industry}"
2. **Write your first value-driven post** about ${values[0] || 'something you care about'}
3. **Engage authentically** with 5 posts in your industry daily
4. **Update your bio** across all platforms with consistent messaging
5. **Start planning your personal website** to establish your digital presence`;
  };

  const generateWebsiteRecommendations = () => {
    setTimeout(() => {
      const websiteStrategy = `🌐 **Your Personal Website Strategy**

Based on your profile as a ${userProfile.industry} professional focused on ${userProfile.goals[0] || 'professional growth'}, here's your website blueprint:

## 🏠 Essential Pages
1. **Home/Hero Section**
   - Clear headline: "${generateBrandPositioning()}"
   - Professional photo
   - Brief value proposition
   - Call-to-action button

2. **About Page**
   - Your story and journey
   - Values: ${userProfile.values.join(', ')}
   - What makes you unique: ${userProfile.uniqueValue}

3. **Services/Expertise**
   - Showcase: ${userProfile.skills.join(', ')}
   - Case studies or examples
   - Client testimonials

4. **Blog/Insights**
   - Regular content about ${userProfile.industry}
   - Thought leadership pieces
   - ${userProfile.contentPreferences.join(', ')} content

5. **Contact/Connect**
   - Multiple ways to reach you
   - Links to ${userProfile.preferredPlatforms.join(', ')}
   - Speaking/collaboration opportunities

## 🎨 Design Recommendations
- **Color Scheme:** Professional yet reflecting your ${userProfile.personalityTraits[0] || 'authentic'} personality
- **Layout:** Clean, easy navigation, mobile-responsive
- **Content Tone:** ${userProfile.personalityTraits.join(', ')} voice

## 🚀 Technical Features
- SEO optimized for "${userProfile.industry} ${userProfile.skills[0] || 'expert'}"
- Fast loading speed
- Contact forms
- Social media integration
- Blog/content management system

## 📈 Launch Strategy
1. Start with core pages (Home, About, Contact)
2. Add blog and start publishing weekly
3. Optimize for search engines
4. Share website launch across your ${userProfile.preferredPlatforms.join(', ')} platforms

Ready to start building? I can provide more specific guidance on any aspect of your website strategy!`;

      setMessages(prev => [...prev, { type: 'bot', content: websiteStrategy, timestamp: new Date() }]);
      setIsTyping(false);
    }, 1500);
    
    setIsTyping(true);
  };

  const generateDetailedWebsiteAdvice = () => {
    return `Here are more detailed website recommendations:

**Content Strategy:**
- Blog weekly about ${userProfile.industry} trends
- Create a resource library for ${userProfile.targetAudience}
- Include client success stories
- Add a newsletter signup

**SEO Focus:**
- Target keywords: "${userProfile.industry} ${userProfile.skills[0]}"
- Local SEO if relevant to your business
- Regular fresh content

**Conversion Elements:**
- Clear contact forms
- Social proof (testimonials, logos)
- Compelling calls-to-action
- Easy ways to connect on ${userProfile.preferredPlatforms[0]}

**Technical Considerations:**
- Mobile-first design
- Fast loading (under 3 seconds)
- SSL certificate
- Google Analytics setup

Would you like specific recommendations for website builders, content ideas, or design inspiration?`;
  };

  const generateContextualAdvice = (question) => {
    const q = question.toLowerCase();
    if (q.includes('content') || q.includes('post')) {
      return `For content creation, focus on these themes based on your profile:\n- Share insights about ${userProfile.skills[0]}\n- Comment on ${userProfile.industry} trends\n- Stories that reflect your values: ${userProfile.values[0]}\n- Help your audience: ${userProfile.targetAudience}`;
    } else if (q.includes('network') || q.includes('connect')) {
      return `Networking tips for you:\n- Engage with ${userProfile.targetAudience} on ${userProfile.preferredPlatforms[0]}\n- Share your expertise in ${userProfile.skills[0]}\n- Join ${userProfile.industry} communities\n- Offer value before asking for anything`;
    } else {
      return `Based on your goals and profile, I'd recommend focusing on consistency and authenticity. Your unique combination of ${userProfile.skills[0]} expertise and ${userProfile.values[0]} values will resonate with ${userProfile.targetAudience}.`;
    }
  };

  const handleSubmit = () => {
    if (userInput.trim()) {
      processUserInput(userInput);
      setUserInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Personal Branding Consultant AI</h1>
            <p className="text-sm text-gray-600">Your guide to building an authentic personal brand</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex max-w-xs lg:max-w-md xl:max-w-lg ${
                message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
              } items-start space-x-2`}
            >
              <div
                className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                  message.type === 'user'
                    ? 'bg-blue-500 ml-2'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 mr-2'
                }`}
              >
                {message.type === 'user' ? (
                  <User className="h-4 w-4 text-white" />
                ) : (
                  <Bot className="h-4 w-4 text-white" />
                )}
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800 shadow-sm border'
                }`}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                </div>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mr-2">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Progress Indicator */}
      <div className="px-4 py-2 bg-white border-t">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>Progress: {Object.keys(stages).indexOf(currentStage) + 1} / {Object.keys(stages).length}</span>
          <div className="flex space-x-1">
            {Object.keys(stages).map((stage, index) => (
              <div
                key={stage}
                className={`w-2 h-2 rounded-full ${
                  index <= Object.keys(stages).indexOf(currentStage)
                    ? 'bg-blue-500'
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your response..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            onClick={handleSubmit}
            disabled={isTyping || !userInput.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <PersonalBrandingAgent />
    </div>
  );
}

export default App;
