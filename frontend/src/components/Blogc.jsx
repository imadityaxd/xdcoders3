import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

// A reusable component for the blog post cards.
// It takes imageUrl, title, date, and a slug for the link.
const BlogCard = ({ imageUrl, title, date, slug }) => {
  return (
    <Link to={`/blog/${slug}`} className="block group">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg group-hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
        <img 
          className="w-full h-48 object-cover" 
          src={imageUrl} 
          alt={title} 
          onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/2D3039/FFFFFF?text=Image+Not+Found'; }}
        />
        <div className="p-6 flex flex-col flex-grow">
          <p className="text-xs text-gray-400 mb-2">Blog Post</p>
          <h3 className="text-lg font-bold text-white mb-4 flex-grow">{title}</h3>
          <p className="text-xs text-gray-500 mt-auto">{date}</p>
        </div>
      </div>
    </Link>
  );
};


// The main component for the "From our blog" section.
const Blogc = () => {
  // Sample data for the blog posts
  const blogPosts = [
    {
      slug: 'amazon-buy-box-loss',
      imageUrl: '/coding-bg.jpg',
      title: 'Amazon Buy Box Loss',
      date: 'October 1, 2020',
    },
    {
      slug: 'map-pricing-software',
      imageUrl: '/coding-bg.jpg',
      title: 'MapAuthority, The Best MAP Pricing Software That Will Actually Enforce Your MAP Policy',
      date: 'September 30, 2020',
    },
    {
      slug: 'what-is-map-pricing',
      imageUrl: '/coding-bg.jpg',
      title: 'What is MAP Pricing? The Ultimate MAP Pricing Guide',
      date: 'July 23, 2020',
    },
  ];

  return (
      <div className="bg-gray-900 font-sans text-white p-8 md:p-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="max-w-2xl mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
              Some <span className="text-indigo-500">hot drops</span> from the dev world.
            </h2>
            <p className="mt-4 text-gray-400">
              Hot drops straight from the XDCoders kitchen—think dev tips, project ideas, and tools we actually use. No fluff, just the good stuff. Stay tuned and keep leveling up your code game.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogCard 
                key={post.slug}
                slug={post.slug}
                imageUrl={post.imageUrl}
                title={post.title}
                date={post.date}
              />
            ))}
          </div>

          {/* Explore Button */}
          <div className="text-center mt-16">
            <Link 
              to="/blog" 
              className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
            >
              Explore Blogs
            </Link>
          </div>

        </div>
      </div>
  );
};

export default Blogc;
