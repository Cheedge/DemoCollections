import { Blocks, Boxes, BugPlay, Cloud, Code, Cpu, Database, FileSpreadsheet, Fingerprint, ShieldCheck, Workflow, Zap } from 'lucide-react';


const demoCategories = [
  {
    id: 'architecture',
    title: 'Architecture & Design Patterns & .NET Frameworks',
    icon: Boxes,
    cases: [
      { id: 'ddd', name: 'Domain-Driven Design (DDD)', tech: ['.NET', 'EF Core'], status: 'live' },
      { id: 'solid', name: 'SOLID Principles', tech: ['C#'], status: 'live' },
      { id: 'cqrs', name: 'CQRS Pattern', tech: ['.NET', 'MediatR'], status: 'live' },
      { id: 'mvc', name: 'ASP.NET MVC', tech: ['MVC', 'Razor'], status: 'live' },
      { id: 'event-sourcing', name: 'Event Sourcing', tech: ['EventStore', 'CQRS'], status: 'live' },
      { id: 'event-driven', name: 'Event-Driven Design', tech: ['.NET', 'MediatR'], status: 'live' },
    ]
  },
  {
    id: 'auth',
    title: 'Authentication & Authorization',
    icon: Fingerprint,
    cases: [
      { id: 'jwt', name: 'JWT Authentication', tech: ['JWT', '.NET'], status: 'live', path: '/api/Auth/login' },
      { id: 'oauth', name: 'OAuth 2.0', tech: ['IdentityServer', 'OAuth'], status: 'live' },
      { id: 'sso', name: 'Single Sign-On (SSO)', tech: ['SAML2.0', 'OAuth'], status: '' },
      // { id: 'saml', name: 'SAML 2.0', tech: ['IdentityServer'], status: 'live' },
      { id: 'mtls', name: 'Mutual TLS (mTLS)', tech: ['X.509', 'Kestrel'], status: '' },
    ]
  },
  {
    id: 'security-compliance',
    title: 'Security & Compliance',
    icon: ShieldCheck,
    cases: [
      { id: 'owasp', name: 'OWASP Best Practices', tech: ['Security', '.NET'], status: 'live' },
      { id: 'spof', name: 'Single Point of Failure Prevention', tech: ['Architecture', 'Resilience'], status: '' },
      // { id: 'hipaa', name: 'HIPAA Compliance', tech: ['Encryption', 'Auditing'], status: 'live' },
      // { id: 'pci-dss', name: 'PCI-DSS', tech: ['Encryption', 'Tokenization'], status: 'live' },
      // { id: 'gdpr', name: 'GDPR', tech: ['Data Privacy', 'Logging'], status: 'live' },
      { id: 'compliance', name: 'Compliance', tech: ['HIPAA', 'PCI-DSS', 'GDPR'], status: 'live' },
    ]
  },
  {
    id: 'database',
    title: 'Database & EF Core & Caching',
    icon: Database,
    cases: [
      { id: 'ef-core', name: 'Entity Framework Core', tech: ['EF Core', 'LINQ'], status: 'live' },
      { id: 'sql', name: 'SQL Server / PostgreSQL', tech: ['SQL', 'T-SQL'], status: 'live' },
      { id: 'mongodb', name: 'MongoDB', tech: ['NoSQL', 'MongoDB'], status: '' },
      { id: 'redis', name: 'Redis Caching', tech: ['Redis', 'StackExchange.Redis'], status: 'live' },
      { id: 'pagination', name: 'Pagination Strategies', tech: ['EF Core', 'SQL'], status: '' },
    ]
  },
  {
    id: 'api',
    title: 'Web APIs & Documentation',
    icon: Code,
    cases: [
      { id: 'restful', name: 'RESTful API', tech: ['.NET', 'REST'], status: 'live', path: '/api/Products' },
      { id: 'graphql', name: 'GraphQL API', tech: ['Hot Chocolate', '.NET'], status: '' },
      { id: 'swagger', name: 'Swagger/OpenAPI', tech: ['Swashbuckle', 'OpenAPI'], status: 'live' },
      { id: 'high-traffic', name: 'High Traffic Handling', tech: ['Load Balancing', 'Caching'], status: 'live' },
      { id: 'integral', name: 'API integration', tech: ['API integral', 'eBay'], status: 'live' },
    ]
  },
  {
    id: 'messaging',
    title: 'Messaging & ESB',
    icon: Zap,
    cases: [
      { id: 'kafka', name: 'Apache Kafka', tech: ['Kafka', 'Confluent'], status: 'live' },
      { id: 'rabbitmq', name: 'RabbitMQ', tech: ['RabbitMQ', 'MassTransit'], status: 'live' },
      { id: 'esb', name: 'Enterprise Service Bus', tech: ['NServiceBus'], status: '' },
    ]
  },
    {
      id: 'testing',
      title: 'Testing',
      icon: BugPlay,
      cases: [
        { id: 'unit-test', name: 'Unit Testing', tech: ['xUnit', 'Moq', 'FluentAssertions'], status: 'live', hasInteractive: false },
        { id: 'integration-test', name: 'Integration Testing', tech: ['xUnit', 'TestContainers'], status: '', hasInteractive: false },
        { id: 'e2e-test', name: 'E2E Testing', tech: ['Playwright', 'Selenium'], status: '', hasInteractive: false },
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
        { id: 'gc', name: 'Garbage Collection', tech: ['GC', 'Disposal'], status: 'live', hasInteractive: false },
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
        { id: 'docker', name: 'Docker Containers', tech: ['Docker', 'Docker Compose'], status: '', hasInteractive: true },
        { id: 'kubernetes', name: 'Kubernetes (K8s)', tech: ['K8s', 'Helm'], status: '', hasInteractive: true },
        { id: 'lambda', name: 'AWS Lambda Functions', tech: ['AWS Lambda', 'Serverless'], status: '', hasInteractive: true },
        { id: 'eventbridge', name: 'AWS EventBridge', tech: ['AWS', 'Event-Driven'], status: '', hasInteractive: false },
        { id: 'ecs', name: 'AWS ECS/Fargate', tech: ['AWS', 'Containers'], status: '', hasInteractive: false },
        { id: 'api-gateway', name: 'AWS API Gateway', tech: ['AWS', 'REST'], status: '', hasInteractive: false },
        { id: 'cognito', name: 'AWS Cognito', tech: ['AWS', 'OAuth'], status: '', hasInteractive: false },
        { id: 'secrets-manager', name: 'AWS Secrets Manager', tech: ['AWS', 'Security'], status: '', hasInteractive: false },
        { id: 'smtp', name: 'SMTP Email Delivery', tech: ['MailKit', 'SMTP', 'AWS SES'], status: '', hasInteractive: true },
      ]
    },
    {
      id: 'file-processing',
      title: 'File Processing',
      icon: FileSpreadsheet,
      cases: [
        { id: 'xaml', name: 'XAML Processing', tech: ['WPF', '.NET'], status: '', hasInteractive: false },
        { id: 'epplus', name: 'EPPlus Excel Export/Import', tech: ['EPPlus', '.NET'], status: '', hasInteractive: true },
        { id: 'excel-processing', name: 'Excel Data Processing', tech: ['NPOI', 'ClosedXML'], status: '', hasInteractive: false },
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

export default demoCategories;