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
      const response = await fetch("http://localhost:5000/api/hashnode", {
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
    <section className="py-12 px-4 md:px-10 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-10 text-center">📝 Latest Blogs</h2>

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
            className="bg-white text-black rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
          >
            {post.coverImage?.url && (
              <img
                src={post.coverImage.url}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {post.brief}
              </p>
              <a
                href={`https://xdcoder.hashnode.dev/${post.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Read More →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
