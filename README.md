# FlowForge Landing Page

A modern, animated landing page for FlowForge, a growth agency that helps early-stage companies transform ideas into scalable businesses.

![FlowForge Landing Page](https://res.cloudinary.com/dvd8hlffl/video/upload/v1742659549/Screen_Recording_2025-03-22_at_17.04.01_saosqo.mov)

## Features

- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Modern UI**: Clean, professional design with gradients, animations, and interactive elements
- **Animation Effects**: Smooth scroll-triggered animations, counters, and hover states
- **Performance Optimized**: Built with Next.js and React for optimal performance
- **Component-Based Architecture**: Modular design for easy maintenance and extensibility

## Tech Stack

- **Framework**: Next.js (App Router)
- **UI**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: CSS transitions and Intersection Observer API

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/flowforge-landing.git
   cd flowforge-landing
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
flowforge-landing/
├── app/
│   ├── page.tsx        # Main landing page component
│   ├── layout.tsx      # Root layout
├── components/         # Reusable UI components
├── public/             # Static assets
│   ├── images/         # Image files
├── styles/             # Global styles
├── next.config.js      # Next.js configuration
├── tailwind.config.js  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## Key Components

### Hero Section
Introduces the brand with a catchy headline, descriptive subtitle, and animated background.

### Stats Section
Displays key metrics with animated counters:
- Generated revenue amount
- Turnaround time
- Success rate
- Number of clients

### Services Section
Showcases the main service offerings:
- Market Analysis
- Customer Acquisition
- Scaling Solutions

### Testimonials Section
Client testimonials with ratings to build trust and credibility.

### CTA Section
Prominent call-to-action to encourage visitor engagement.

## Animation Features

### Intersection Observer
The page uses the Intersection Observer API to trigger animations when elements come into view:

```typescript
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounters();
          observer.disconnect();
        }
      });
    },
    { threshold: 0.1 }
  );

  if (statsRef.current) {
    observer.observe(statsRef.current);
  }

  return () => observer.disconnect();
}, []);
```

### Animated Counters
Implements smooth counting animations for displaying statistics:

```typescript
const startCounters = () => {
  const maxRevenue = 7000000;
  const maxClients = 40;
  const duration = 2500;
  const interval = 16;
  const steps = duration / interval;

  let revenueStep = maxRevenue / steps;
  let clientStep = maxClients / steps;

  const timer = setInterval(() => {
    setRevenue((prev) => {
      const newValue = prev + revenueStep;
      return newValue >= maxRevenue ? maxRevenue : newValue;
    });

    setCounter((prev) => {
      const newValue = prev + clientStep;
      return newValue >= maxClients ? maxClients : newValue;
    });
  }, interval);

  return () => clearInterval(timer);
};
```

## Customization

### Changing Content
To modify the website content, edit the text within the JSX elements in `page.tsx`.

### Modifying Services
The services section can be customized by editing the `services` array:

```typescript
const services = [
  {
    title: "Market Analysis",
    icon: <TrendingUp className="h-6 w-6" />,
    description: "Comprehensive market research and competitor analysis to position your business effectively.",
    color: "from-blue-500 to-cyan-400"
  },
  // Add or modify services here
];
```

### Updating Stats
To change the statistics displayed, modify the stats array in the Stats Section:

```typescript
[
  { 
    icon: <BarChart className="h-5 w-5" />, 
    label: "Generated", 
    value: formatRevenue(revenue),
    delay: "200ms" 
  },
  // Update or add more stats here
]
```

### Changing Colors
To modify the color scheme, update the gradient classes in the Tailwind CSS classes:

```html
<div className="bg-gradient-to-r from-blue-500 to-indigo-600">
  <!-- Content -->
</div>
```

## Deployment

This project can be easily deployed to Vercel, Netlify, or any other platform that supports Next.js.

### Deploy to Vercel

The easiest way to deploy the app is to use the [Vercel Platform](https://vercel.com):

```bash
npm install -g vercel
vercel
```

### Build for Production

```bash
npm run build
# or
yarn build
```

This will create an optimized production build in the `.next` folder.

## Browser Support

This landing page is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Icons by [Lucide React](https://lucide.dev/)
- Animations inspired by [Framer Motion](https://www.framer.com/motion/)
- Design patterns from modern SaaS landing pages

---

Created with ❤️ by SalaTech  for FlowForge
