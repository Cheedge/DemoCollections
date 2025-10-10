import React, { useState } from 'react';
import { Code, Play, Boxes, Blocks, BookOpen, Home, ChevronRight, Terminal, CheckCircle, XCircle, Loader, Lock, Database, Cloud, FileSpreadsheet, Workflow, Cpu, ShieldCheck, Zap, AlertCircle, Fingerprint, BugPlay, BookmarkMinus } from 'lucide-react';

// ============ DEMO DATA ============
const demoCategories = [
  {
    id: 'architecture',
    title: 'Architecture & Design Patterns & .NET Frameworks',
    icon: Boxes,
    cases: [
      { id: 'ddd', name: 'Domain-Driven Design (DDD)', tech: ['.NET', 'EF Core'], status: 'live', hasInteractive: false },
      { id: 'solid', name: 'SOLID Principles', tech: ['C#'], status: 'live', hasInteractive: false },
      { id: 'cqrs', name: 'CQRS Pattern', tech: ['.NET', 'MediatR'], status: 'live', hasInteractive: true },
      { id: 'mvc', name: 'ASP.NET MVC', tech: ['MVC', 'Razor'], status: 'live', hasInteractive: false },
      { id: 'event-sourcing', name: 'Event Sourcing', tech: ['EventStore', 'CQRS'], status: 'live', hasInteractive: true },
      { id: 'event-driven', name: 'Event-Driven Design', tech: ['.NET', 'MediatR'], status: 'live', hasInteractive: true },
    ]
  },
  {
    id: 'auth',
    title: 'Authentication & Authorization',
    icon: Fingerprint,
    cases: [
      { id: 'jwt', name: 'JWT Authentication', tech: ['JWT', '.NET'], status: 'live', hasInteractive: true },
      { id: 'oauth', name: 'OAuth 2.0', tech: ['IdentityServer', 'OAuth'], status: 'live', hasInteractive: true },
      { id: 'sso', name: 'Single Sign-On (SSO)', tech: ['SAML', 'OAuth'], status: 'live', hasInteractive: true },
      { id: 'saml', name: 'SAML 2.0', tech: ['IdentityServer'], status: 'live', hasInteractive: false },
      { id: 'mtls', name: 'Mutual TLS (mTLS)', tech: ['X.509', 'Kestrel'], status: 'live', hasInteractive: false },
    ]
  },
  {
    id: 'security-compliance',
    title: 'Security & Compliance',
    icon: ShieldCheck,
    cases: [
      { id: 'owasp', name: 'OWASP Best Practices', tech: ['Security', '.NET'], status: 'live', hasInteractive: false },
      { id: 'spof', name: 'Single Point of Failure Prevention', tech: ['Architecture', 'Resilience'], status: 'live', hasInteractive: false },
      { id: 'hipaa', name: 'HIPAA Compliance', tech: ['Encryption', 'Auditing', 'Access Control'], status: 'live', hasInteractive: false },
      { id: 'pci-dss', name: 'PCI-DSS', tech: ['Encryption', 'Tokenization'], status: 'live', hasInteractive: false },
      { id: 'gdpr', name: 'GDPR', tech: ['Data Privacy', 'Logging'], status: 'live', hasInteractive: false },
    ]
  },
  {
    id: 'database',
    title: 'Database & EF Core & Caching',
    icon: Database,
    cases: [
      { id: 'ef-core', name: 'Entity Framework Core', tech: ['EF Core', 'LINQ'], status: 'live', hasInteractive: false },
      { id: 'sql', name: 'SQL Server / PostgreSQL', tech: ['SQL', 'T-SQL'], status: 'live', hasInteractive: false },
      { id: 'mongodb', name: 'MongoDB', tech: ['NoSQL', 'MongoDB'], status: 'live', hasInteractive: false },
      { id: 'redis', name: 'Redis Caching', tech: ['Redis', 'StackExchange.Redis'], status: 'live', hasInteractive: true },
      { id: 'pagination', name: 'Pagination Strategies', tech: ['EF Core', 'SQL'], status: 'live', hasInteractive: true },
    ]
  },
  {
    id: 'api',
    title: 'Web APIs & API Documentation & Third-Party Integration',
    icon: Code,
    cases: [
      { id: 'restful', name: 'RESTful API', tech: ['.NET', 'REST'], status: 'live', hasInteractive: true },
      { id: 'graphql', name: 'GraphQL API', tech: ['Hot Chocolate', '.NET'], status: 'live', hasInteractive: true },
      { id: 'soap', name: 'SOAP Services', tech: ['WCF', 'SOAP'], status: 'live', hasInteractive: false },
      { id: 'swagger', name: 'Swagger/OpenAPI', tech: ['Swashbuckle', 'OpenAPI'], status: 'live', hasInteractive: true },
      { id: 'postman', name: 'Postman Collections', tech: ['Postman'], status: 'live', hasInteractive: false },
      { id: 'zalando', name: 'Zalando API Integration', tech: ['REST', 'OAuth'], status: 'live', hasInteractive: false },
      { id: 'aboutyou', name: 'AboutYou API Integration', tech: ['REST', 'GraphQL'], status: 'live', hasInteractive: false },
      { id: 'ebay', name: 'eBay API Integration', tech: ['REST', 'OAuth'], status: 'live', hasInteractive: false },
    ]
  },
  {
    id: 'messaging',
    title: 'Messaging & ESB',
    icon: Zap,
    cases: [
      { id: 'kafka', name: 'Apache Kafka', tech: ['Kafka', 'Confluent'], status: 'live', hasInteractive: true },
      { id: 'rabbitmq', name: 'RabbitMQ', tech: ['RabbitMQ', 'MassTransit'], status: 'live', hasInteractive: true },
      { id: 'esb', name: 'Enterprise Service Bus', tech: ['NServiceBus'], status: 'live', hasInteractive: false },
    ]
  },
  {
    id: 'testing',
    title: 'Testing',
    icon: BugPlay,
    cases: [
      { id: 'unit-test', name: 'Unit Testing', tech: ['xUnit', 'Moq', 'FluentAssertions'], status: 'live', hasInteractive: false },
      { id: 'integration-test', name: 'Integration Testing', tech: ['xUnit', 'TestContainers'], status: 'live', hasInteractive: false },
      { id: 'e2e-test', name: 'E2E Testing', tech: ['Playwright', 'Selenium'], status: 'live', hasInteractive: false },
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced .NET Concepts',
    icon: Blocks,
    cases: [
      { id: 'expression-tree', name: 'Expression Trees', tech: ['LINQ', 'C#'], status: 'live', hasInteractive: false },
      { id: 'pubsub', name: 'Pub/Sub Pattern', tech: ['.NET', 'Events'], status: 'live', hasInteractive: true },
      { id: 'async', name: 'Async/Await', tech: ['C#', 'TPL'], status: 'live', hasInteractive: false },
      { id: 'multithreading', name: 'Multi-threading', tech: ['C#', 'Tasks', 'Parallel'], status: 'live', hasInteractive: false },
    ]
  },
  {
    id: 'cicd',
    title: 'CI/CD',
    icon: Workflow,
    cases: [
      { id: 'github-actions', name: 'GitHub Actions', tech: ['GitHub', 'CI/CD'], status: 'live', hasInteractive: true },
      { id: 'aws-pipeline', name: 'AWS CodePipeline', tech: ['AWS', 'CodeBuild', 'CodeDeploy'], status: 'live', hasInteractive: false },
    ]
  },
  {
    id: 'cloud',
    title: 'Microservices & Containers & AWS Services',
    icon: Cloud,
    cases: [
      { id: 'docker', name: 'Docker Containers', tech: ['Docker', 'Docker Compose'], status: 'live', hasInteractive: true },
      { id: 'kubernetes', name: 'Kubernetes (K8s)', tech: ['K8s', 'Helm'], status: 'live', hasInteractive: true },
      { id: 'lambda', name: 'AWS Lambda Functions', tech: ['AWS Lambda', 'Serverless'], status: 'live', hasInteractive: true },
      { id: 'eventbridge', name: 'AWS EventBridge', tech: ['AWS', 'Event-Driven'], status: 'live', hasInteractive: false },
      { id: 'ecs', name: 'AWS ECS/Fargate', tech: ['AWS', 'Containers'], status: 'live', hasInteractive: false },
      { id: 'api-gateway', name: 'AWS API Gateway', tech: ['AWS', 'REST'], status: 'live', hasInteractive: false },
      { id: 'cognito', name: 'AWS Cognito', tech: ['AWS', 'OAuth'], status: 'live', hasInteractive: false },
      { id: 'secrets-manager', name: 'AWS Secrets Manager', tech: ['AWS', 'Security'], status: 'live', hasInteractive: false },
      { id: 'smtp', name: 'SMTP Email Delivery', tech: ['MailKit', 'SMTP', 'AWS SES'], status: 'live', hasInteractive: true },
    ]
  },
  {
    id: 'file-processing',
    title: 'File Processing',
    icon: FileSpreadsheet,
    cases: [
      { id: 'xaml', name: 'XAML Processing', tech: ['WPF', '.NET'], status: 'live', hasInteractive: false },
      { id: 'epplus', name: 'EPPlus Excel Export/Import', tech: ['EPPlus', '.NET'], status: 'live', hasInteractive: true },
      { id: 'excel-processing', name: 'Excel Data Processing', tech: ['NPOI', 'ClosedXML'], status: 'live', hasInteractive: false },
    ]
  },
  {
    id: 'ai',
    title: 'AI Integration',
    icon: Cpu,
    cases: [
      { id: 'openai', name: 'OpenAI API', tech: ['OpenAI', 'GPT-4'], status: '', hasInteractive: true },
      { id: 'ml-net', name: 'ML.NET', tech: ['ML.NET', 'Machine Learning'], status: '', hasInteractive: false },
    ]
  },
];


// ============ MAIN APP COMPONENT ============
const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedDemo, setSelectedDemo] = useState(null);

  const navigateToDemo = (demo) => {
    setSelectedDemo(demo);
    setCurrentView('demo');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Navbar onNavigateHome={() => setCurrentView('home')} />
      {currentView === 'home' && <LandingPage onSelectDemo={navigateToDemo} />}
      {currentView === 'demo' && selectedDemo && <DemoDetailPage demo={selectedDemo} onBack={() => setCurrentView('home')} />}
    </div>
  );
};

// ============ NAVBAR COMPONENT ============
const Navbar = ({ onNavigateHome }) => (
  <nav className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50 shadow-sm">
    <div className="container mx-auto px-6 py-4">
      <div className="flex items-center gap-3 cursor-pointer" onClick={onNavigateHome}>
        <Code className="text-orange-600" size={28} />
        <span className="text-xl font-bold text-gray-800">Backend Portfolio</span>
      </div>
    </div>
  </nav>
);

// ============ LANDING PAGE ============
const LandingPage = ({ onSelectDemo }) => {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Backend Engineering <span className="text-orange-600">Showcase</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Interactive demonstrations of architecture patterns, APIs, security, messaging, cloud services by .NET/C# or Python
        </p>
      </div>

      <div className="space-y-8">
        {demoCategories.map((category) => (
          <CategorySection key={category.id} category={category} onSelectDemo={onSelectDemo} />
        ))}
      </div>
    </div>
  );
};

// ============ CATEGORY SECTION ============
const CategorySection = ({ category, onSelectDemo }) => {
  const Icon = category.icon;
  return (
    <div className="bg-white/60 backdrop-blur rounded-lg p-6 border border-orange-200 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
        <Icon className="text-orange-600" size={28} />
        {category.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.cases.map((demo) => (
          <DemoCard key={demo.id} demo={demo} onSelect={onSelectDemo} />
        ))}
      </div>
    </div>
  );
};

// ============ DEMO CARD ============
const DemoCard = ({ demo, onSelect }) => (
  <div
    onClick={() => demo.status === 'live' && onSelect(demo)}
    className={`bg-white rounded-lg p-4 border border-orange-200 transition shadow-sm ${
      demo.status === 'live' ? 'hover:border-orange-400 cursor-pointer hover:shadow-md' : 'opacity-60'
    }`}
  >
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-gray-800 font-semibold">{demo.name}</h3>
      {demo.status === 'live' ? (
        <span className="flex items-center gap-1 text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
          <CheckCircle size={12} /> Live
        </span>
      ) : (
        <span className="flex items-center gap-1 text-xs text-gray-700 bg-gray-200 px-2 py-1 rounded">
          <BookmarkMinus size={12} />
          Soon
        </span>
      )}
    </div>
    <div className="flex flex-wrap gap-2 mb-3">
      {demo.tech.map((t, i) => (
        <span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
          {t}
        </span>
      ))}
    </div>
    {demo.status === 'live' && (
      <div className="flex items-center text-orange-600 text-sm font-medium">
        View Demo <ChevronRight size={16} />
      </div>
    )}
  </div>
);

// ============ DEMO DETAIL PAGE ============
const DemoDetailPage = ({ demo, onBack }) => {
  const [activeTab, setActiveTab] = useState('playground');

  const tabs = [
    { id: 'playground', label: 'API Playground', icon: Play },
    { id: 'architecture', label: 'Architecture', icon: BookOpen },
    { id: 'code', label: 'Code', icon: Terminal }
  ];

  if (demo.hasInteractive) {
    tabs.push({ id: 'interactive', label: 'Interactive Demo', icon: Zap });
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition">
        <Home size={18} /> Back to Home
      </button>

      <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{demo.name}</h1>
        <p className="text-gray-600 text-lg mb-4">
          {getDemoDescription(demo.id)}
        </p>
        <div className="flex flex-wrap gap-2">
          {demo.tech.map((t, i) => (
            <span key={i} className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-4 border-b border-orange-200 overflow-x-auto bg-white/40 rounded-t-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'playground' && <ApiPlaygroundTab demoId={demo.id} />}
      {activeTab === 'architecture' && <ArchitectureTab demoId={demo.id} />}
      {activeTab === 'code' && <CodeTab demoId={demo.id} />}
      {activeTab === 'interactive' && demo.hasInteractive && <InteractiveTab demoId={demo.id} />}
    </div>
  );
};

// ============ API PLAYGROUND TAB WITH REAL AWS CALL ============
const ApiPlaygroundTab = ({ demoId }) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiUrl, setApiUrl] = useState('https://your-api-id.execute-api.us-east-1.amazonaws.com/prod/products');

  const callRealApi = async () => {
    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add JWT token if needed:
          // 'Authorization': 'Bearer your-jwt-token'
        }
      });

      const data = await res.json();
      
      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: Object.fromEntries(res.headers.entries()),
        data: data
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateMockApi = async () => {
    setIsLoading(true);
    setError(null);
    await new Promise(r => setTimeout(r, 800));
    setResponse({
      status: 200,
      statusText: 'OK',
      data: {
        products: [
          { id: 1, name: 'Laptop', price: 999.99 },
          { id: 2, name: 'Mouse', price: 29.99 }
        ],
        pagination: { page: 1, pageSize: 10, totalCount: 2 }
      }
    });
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <div className="bg-amber-50 border border-amber-300 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
          <AlertCircle size={16} />
          AWS Backend Configuration
        </h4>
        <p className="text-sm text-amber-700 mb-3">
          Update the API URL to point to your AWS Lambda + API Gateway endpoint
        </p>
        <input
          type="text"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          className="w-full bg-white border border-amber-300 rounded px-3 py-2 text-sm text-gray-700 mb-2"
          placeholder="https://your-api-id.execute-api.region.amazonaws.com/stage/endpoint"
        />
        <p className="text-xs text-amber-600">
          Example: https://abc123.execute-api.us-east-1.amazonaws.com/prod/products
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Endpoints Panel */}
        <div className="bg-white/60 backdrop-blur rounded-lg p-6 border border-orange-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Test Endpoints</h3>
          
          <div className="space-y-4">
            <EndpointCard
              method="GET"
              path="/api/products"
              description="Get products with pagination (AWS Lambda + DynamoDB)"
              onTest={callRealApi}
              isLoading={isLoading}
              label="Call Real AWS API"
            />
            
            <EndpointCard
              method="GET"
              path="/api/products (Mock)"
              description="Test with simulated response"
              onTest={simulateMockApi}
              isLoading={isLoading}
              label="Test with Mock Data"
            />
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">How to connect your AWS backend:</h4>
            <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
              <li>Deploy .NET API to AWS Lambda</li>
              <li>Configure API Gateway</li>
              <li>Enable CORS for your Vercel domain</li>
              <li>Update the API URL above</li>
            </ol>
          </div>
        </div>

        {/* Response Panel */}
        <div className="bg-white/60 backdrop-blur rounded-lg p-6 border border-orange-200 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Response</h3>
          
          {!response && !error && (
            <div className="text-gray-500 text-center py-12">
              <Terminal size={48} className="mx-auto mb-4 opacity-50" />
              <p>Execute an API call to see the response</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="text-red-600" size={20} />
                <span className="text-red-800 font-medium">Error</span>
              </div>
              <p className="text-sm text-red-700">{error}</p>
              <p className="text-xs text-red-600 mt-2">
                Make sure your AWS API is deployed and CORS is enabled
              </p>
            </div>
          )}

          {response && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                {response.status === 200 ? (
                  <>
                    <CheckCircle className="text-green-600" size={20} />
                    <span className="text-green-700 font-medium">{response.status} {response.statusText}</span>
                  </>
                ) : (
                  <>
                    <XCircle className="text-red-600" size={20} />
                    <span className="text-red-700 font-medium">{response.status} {response.statusText}</span>
                  </>
                )}
              </div>

              <div className="bg-gray-900 rounded-lg p-4 overflow-auto max-h-96">
                <pre className="text-sm text-green-400">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EndpointCard = ({ method, path, description, onTest, isLoading, label }) => (
  <div className="bg-orange-50 rounded-lg p-4 border border-orange-300">
    <div className="flex items-center gap-3 mb-2">
      <span className={`text-xs font-bold px-2 py-1 rounded ${
        method === 'GET' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
      }`}>
        {method}
      </span>
      <code className="text-gray-700 text-sm">{path}</code>
    </div>
    <p className="text-gray-600 text-sm mb-3">{description}</p>
    <button
      onClick={onTest}
      disabled={isLoading}
      className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition flex items-center justify-center gap-2 disabled:opacity-50"
    >
      {isLoading ? <Loader className="animate-spin" size={16} /> : <Play size={16} />}
      {label || 'Try It'}
    </button>
  </div>
);

// ============ ARCHITECTURE TAB ============
const ArchitectureTab = ({ demoId }) => (
  <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Architecture Overview</h3>
    <div className="prose prose-lg max-w-none">
      <p className="text-gray-600 mb-6">
        This implementation uses AWS serverless architecture for scalability and cost-efficiency.
      </p>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-4">Recommended AWS Architecture</h4>
        <div className="space-y-3 text-sm text-blue-900">
          <div className="flex items-start gap-3">
            <span className="font-bold">Frontend:</span>
            <span>React app deployed on Vercel/Netlify</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold">API:</span>
            <span>AWS Lambda + API Gateway (.NET 8 minimal API)</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold">Database:</span>
            <span>DynamoDB (25GB free) or MongoDB Atlas (512MB free)</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold">Auth:</span>
            <span>AWS Cognito (50,000 MAUs free)</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-6">
        <pre className="text-xs text-gray-700 overflow-x-auto">
{`┌─────────────┐
│   Vercel    │ Frontend (React)
│   Netlify   │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────┐
│ API Gateway │ AWS (us-east-1)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Lambda    │ .NET 8 Function
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  DynamoDB   │ NoSQL Database (Free Tier)
└─────────────┘`}
        </pre>
      </div>
    </div>
  </div>
);

// ============ CODE TAB ============
const CodeTab = ({ demoId }) => (
  <div className="space-y-6">
    <div className="bg-white/60 backdrop-blur rounded-lg p-6 border border-orange-200 shadow-sm">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">.NET Lambda Function Example</h4>
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm text-gray-300">
{`public class Function
{
    private readonly IProductRepository _repository;

    public Function()
    {
        _repository = new DynamoDBProductRepository();
    }

    public async Task<APIGatewayProxyResponse> FunctionHandler(
        APIGatewayProxyRequest request, 
        ILambdaContext context)
    {
        try
        {
            var products = await _repository.GetProductsAsync();
            
            return new APIGatewayProxyResponse
            {
                StatusCode = 200,
                Headers = new Dictionary<string, string>
                {
                    { "Content-Type", "application/json" },
                    { "Access-Control-Allow-Origin", "*" }
                },
                Body = JsonSerializer.Serialize(products)
            };
        }
        catch (Exception ex)
        {
            context.Logger.LogError($"Error: {ex.Message}");
            return new APIGatewayProxyResponse
            {
                StatusCode = 500,
                Body = JsonSerializer.Serialize(new { error = ex.Message })
            };
        }
    }
}`}
        </pre>
      </div>
    </div>

    <div className="bg-amber-50 border border-amber-300 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-amber-800 mb-4">Database Options Comparison</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-amber-100">
            <tr>
              <th className="text-left p-2 text-amber-900">Option</th>
              <th className="text-left p-2 text-amber-900">Free Tier</th>
              <th className="text-left p-2 text-amber-900">Best For</th>
            </tr>
          </thead>
          <tbody className="text-amber-900">
            <tr className="border-t border-amber-200">
              <td className="p-2 font-medium">DynamoDB</td>
              <td className="p-2">25GB, 25 RCU/WCU</td>
              <td className="p-2">NoSQL, serverless ⭐ Recommended</td>
            </tr>
            <tr className="border-t border-amber-200">
              <td className="p-2 font-medium">MongoDB Atlas</td>
              <td className="p-2">512MB forever free</td>
              <td className="p-2">Document DB, easy setup</td>
            </tr>
            <tr className="border-t border-amber-200">
              <td className="p-2 font-medium">SQLite on Lambda</td>
              <td className="p-2">Free (in /tmp)</td>
              <td className="p-2">Simple demos only</td>
            </tr>
            <tr className="border-t border-amber-200">
              <td className="p-2 font-medium">Supabase</td>
              <td className="p-2">500MB PostgreSQL</td>
              <td className="p-2">Relational + realtime</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h4 className="text-lg font-semibold text-blue-800 mb-3">View Full Source Code</h4>
      <p className="text-blue-700 mb-4">
        Complete implementation with deployment scripts available on GitHub
      </p>
      <a
        href="#"
        className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition"
      >
        <Code size={18} />
        View on GitHub
      </a>
    </div>
  </div>
);

// ============ INTERACTIVE TAB (for OAuth, JWT, etc.) ============
const InteractiveTab = ({ demoId }) => {
  if (demoId === 'oauth' || demoId === 'jwt' || demoId === 'sso') {
    return <LoginInteractiveDemo demoId={demoId} />;
  }
  if (demoId === 'event-sourcing') {
    return <EventSourcingDemo />;
  }
  if (demoId === 'kafka' || demoId === 'rabbitmq') {
    return <MessageQueueDemo type={demoId} />;
  }
  return <GenericInteractiveDemo />;
};

const LoginInteractiveDemo = ({ demoId }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
          <Lock className="text-orange-600" />
          {demoId === 'oauth' ? 'OAuth 2.0' : demoId === 'jwt' ? 'JWT' : 'SSO'} Authentication Flow
        </h3>
        
        {!token ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="demo@example.com"
                className="w-full bg-white border border-orange-300 rounded px-4 py-2 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-orange-300 rounded px-4 py-2 text-gray-800"
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? <Loader className="animate-spin" size={18} /> : <Lock size={18} />}
              Sign In
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-300 rounded-lg p-6">
              <p className="text-green-700 font-medium mb-2 flex items-center gap-2">
                <CheckCircle size={20} />
                Authentication Successful
              </p>
              <p className="text-gray-700 text-sm mb-4">JWT token generated and stored</p>
              <div className="bg-gray-900 rounded p-3 overflow-auto">
                <code className="text-xs text-green-400 break-all">{token}</code>
              </div>
            </div>
            <button
              onClick={() => setToken('')}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
            >
              Reset Demo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const EventSourcingDemo = () => {
  const [events, setEvents] = useState([
    { id: 1, type: 'OrderCreated', data: { orderId: 'ORD-001', total: 99.99 } },
    { id: 2, type: 'PaymentReceived', data: { orderId: 'ORD-001', amount: 99.99 } },
  ]);

  return (
    <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Event Stream Visualization</h3>
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="bg-orange-50 rounded-lg p-4 border border-orange-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-orange-700 font-medium">{event.type}</span>
              <span className="text-gray-500 text-sm">Event #{event.id}</span>
            </div>
            <pre className="text-xs text-gray-700">{JSON.stringify(event.data, null, 2)}</pre>
          </div>
        ))}
      </div>
    </div>
  );
};

const MessageQueueDemo = ({ type }) => {
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    setMessages([...messages, { id: Date.now(), text: 'New message', status: 'sent' }]);
  };

  return (
    <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        {type === 'kafka' ? 'Kafka' : 'RabbitMQ'} Message Flow
      </h3>
      <button
        onClick={sendMessage}
        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded transition mb-4"
      >
        Send Message
      </button>
      <div className="space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-orange-50 rounded p-3 border border-orange-300">
            <span className="text-gray-700">{msg.text}</span>
            <span className="text-green-700 text-sm ml-4">✓ {msg.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const GenericInteractiveDemo = () => (
  <div className="bg-white/60 backdrop-blur rounded-lg p-8 border border-orange-200 shadow-sm text-center">
    <p className="text-gray-600">Interactive demo component coming soon</p>
  </div>
);

// ============ HELPER FUNCTIONS ============
const getDemoDescription = (id) => {
  const descriptions = {
    ddd: 'Domain-Driven Design implementation with bounded contexts, aggregates, and value objects.',
    jwt: 'Secure JWT-based authentication with token generation, validation, and refresh token flow.',
    oauth: 'OAuth 2.0 authorization flow with PKCE for secure third-party authentication.',
    restful: 'RESTful API following REST principles with proper HTTP methods, status codes, and HATEOAS.',
    pagination: 'Efficient pagination strategies including offset-based and cursor-based pagination.',
  };
  return descriptions[id] || 'Comprehensive demonstration of this backend concept with practical examples.';
};

export default App;