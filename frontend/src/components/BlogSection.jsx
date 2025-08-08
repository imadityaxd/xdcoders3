import React, { useEffect, useState } from "react";



const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
  const query = `
  query {
    publication(host: "xdcoder.hashnode.dev") {
      posts(first: 3) {
        edges {
          node {
            title
            slug
            brief
            publishedAt
            coverImage {
              url
            }
          }
        }
      }
    }
  }
`;


    try {
      console.log("checking endpoint",import.meta.env.VITE_APP_API_URL );
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/hashnode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      });

      const json = await response.json();
      const edges = json?.data?.publication?.posts?.edges || [];
      const latestPosts = edges.map((edge) => edge.node);
      setPosts(latestPosts);
    } catch (err) {
      console.error("Error fetching blog posts:", err);
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className=" p-8 md:p-16 bg-gray-900 text-white">
      {/* <h2 className="text-3xl font-bold mb-10 text-center">📝 Latest Blogs</h2> */}
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

      {loading && (
        <p className="text-center text-gray-400">Loading posts...</p>
      )}

      {error && (
        <p className="text-center text-red-500 font-medium">{error}</p>
      )}

      {!loading && posts.length === 0 && !error && (
        <p className="text-center text-gray-400">No posts found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="bg-gray-800 text-black rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
          >
            {post.coverImage?.url && (
              <img
                src={post.coverImage.url}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl text-white font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {post.brief}
              </p>
              <a
                href={`https://xdcoder.hashnode.dev/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:text-indigo-300 font-medium"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
      {/* Explore Button */}
          <div className="text-center mt-16">
            <a
              target='_blank'
              href="https://xdcoder.hashnode.dev/" 
              className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
            >
              Explore Blogs
            </a>
          </div>
      </div>
    </section>
  );
};

export default BlogSection;
