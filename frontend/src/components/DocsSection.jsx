// 📄 DocsSection.jsx
// PURPOSE: Fetch and display the latest PDFs from the backend using Tailwind CSS for styling.

import React, { useEffect, useState } from "react";

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
                const res = await fetch("http://localhost:5000/api/docs"); // Call backend API
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
            <h2 className="text-2xl font-bold mb-6">📄 Latest Documents</h2>

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
                            className="p-4 bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col justify-between"
                        >
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
                                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                            >
                                Download
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default DocsSection;
