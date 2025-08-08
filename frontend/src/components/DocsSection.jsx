// 📄 DocsSection.jsx
// PURPOSE: Fetch and display the latest PDFs from the backend using Tailwind CSS for styling.

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * DocsSection Component
 * - Fetches documents from `/api/docs`
 * - Displays them in a styled card layout
 * - Allows users to download PDFs
 */
const DocsSection = () => {
    // ----------------------------
    // 1️⃣ State Management
    // ----------------------------
    const [docs, setDocs] = useState([]); // Holds fetched document data
    const [loading, setLoading] = useState(true); // Loading state

    // ----------------------------
    // 2️⃣ Fetch Data on Mount
    // ----------------------------
    useEffect(() => {
        const fetchDocs = async () => {
            try {
                console.log("checking endpoint",import.meta.env.VITE_APP_API_URL );
                const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/docs`); // Call backend API
                const data = await res.json(); // Parse JSON response
                setDocs(data); // Save docs to state
            } catch (err) {
                console.error("❌ Error fetching documents:", err);
            } finally {
                setLoading(false); // Hide loading state
            }
        };

        fetchDocs();
    }, []); // [] ensures it runs only once

    // ----------------------------
    // 3️⃣ Render UI
    // ----------------------------
    return (
        <section className="text-center p-10 bg-gray-900">
            {/* Title */}
            <div className="max-w-7xl mb-12 ">
                <h2 className="text-4xl md:text-5xl font-bold">
                    Fresh <span className="text-indigo-500">docs & resources</span> just for you.
                </h2>
                <p className="mt-4 text-gray-400">
                    All the latest docs, guides, and references curated by XDCoders—no filler, just practical stuff you can actually use. Dive in and power up your projects.
                </p>
            </div>


            {/* Loading State */}
            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : docs.length === 0 ? (
                <p className="text-gray-500">No documents found.</p>
            ) : (
                // Document Grid
                <div className="grid gap-6 p-8 max-w-7xl mx-auto sm:grid-cols-2 md:grid-cols-4">
                    {docs.map((doc, index) => (
                        <div
                            key={index}
                            className=" bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col justify-between"
                        >
                            {/*PDF Thumbnail image */}
                            <img src="./notes.jpg" className="h-48 w-full object-cover" alt="notes" />
                            <div className="p-4">
                                {/* Document Title */}
                                <h4 className="text-lg  font-semibold mb-2 truncate">
                                    {doc.public_id?.split("/").pop() || "Untitled PDF"}
                                </h4>

                                {/* File Info */}
                                <p className="text-sm text-gray-500 mb-4">
                                    Uploaded:{" "}
                                    {doc.created_at
                                        ? new Date(doc.created_at).toLocaleDateString()
                                        : "Unknown date"}
                                </p>

                                {/* Download Button */}
                                <a
                                    href={`${doc.secure_url}?fl_attachment=${doc.public_id?.split("/").pop()}.pdf`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
                                >
                                    Download
                                </a>
                            </div>
                        </div>

                    ))}
                    
                </div>
            )}
            {/* Explore Button */}
                    <div className="text-center mt-8">
                        <Link to="/docs"
                        
                            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                        >
                            Explore Documents
                        </Link>
                    </div>
        </section>
    );
};

export default DocsSection;
