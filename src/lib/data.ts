
export interface Template {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  useCases: string[];
  features: string[];
}

export const templates: Template[] = [
  {
    id: "project-tracker",
    title: "Project Tracker",
    description: "Streamline your project management workflow with this comprehensive tracker. Perfect for teams of all sizes.",
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1470&auto=format&fit=crop",
    category: "Project Management",
    useCases: ["Team Projects", "Personal Tasks", "Client Work"],
    features: ["Task Assignment", "Progress Tracking", "Deadline Management"]
  },
  {
    id: "content-calendar",
    title: "Content Calendar",
    description: "Plan, organize, and schedule your content with this intuitive calendar template designed for content creators.",
    image: "https://images.unsplash.com/photo-1553484771-047a44eee27b?q=80&w=1470&auto=format&fit=crop",
    category: "Marketing",
    useCases: ["Social Media", "Blog Posts", "Video Content"],
    features: ["Publishing Schedule", "Content Status", "Performance Metrics"]
  },
  {
    id: "customer-crm",
    title: "Customer CRM",
    description: "Manage customer relationships efficiently with our comprehensive CRM template for businesses of any size.",
    image: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=1469&auto=format&fit=crop",
    category: "Sales",
    useCases: ["Lead Management", "Customer Support", "Sales Tracking"],
    features: ["Contact Management", "Deal Pipeline", "Communication Logs"]
  },
  {
    id: "inventory-tracker",
    title: "Inventory Tracker",
    description: "Keep track of your inventory with real-time updates and automated alerts for restocking needs.",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1470&auto=format&fit=crop",
    category: "Operations",
    useCases: ["Retail", "Warehouse", "Small Business"],
    features: ["Stock Levels", "Reorder Alerts", "Inventory Valuation"]
  },
  {
    id: "event-planner",
    title: "Event Planner",
    description: "Plan and organize events with ease using this comprehensive event management template.",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1412&auto=format&fit=crop",
    category: "Events",
    useCases: ["Conferences", "Weddings", "Corporate Events"],
    features: ["Guest Management", "Vendor Tracking", "Timeline Planning"]
  },
  {
    id: "product-roadmap",
    title: "Product Roadmap",
    description: "Plan your product development journey with this strategic roadmap template for product teams.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1470&auto=format&fit=crop",
    category: "Product",
    useCases: ["Software Development", "Feature Planning", "Release Management"],
    features: ["Feature Prioritization", "Sprint Planning", "Release Timelines"]
  }
];

export const categories = Array.from(new Set(templates.map(t => t.category)));

export const featuredTemplates = templates.slice(0, 3);
