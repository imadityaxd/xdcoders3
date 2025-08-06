import React, { useRef } from 'react';

// --- DATA ---
// In a real app, you might fetch this data from an API.
// IMPORTANT: Replace '#' with your actual Google Drive share links.
const documents = [
    { id: 1, title: 'Annual Report 2023', description: 'An overview of our company performance.', thumbnailUrl: 'https://placehold.co/400x560/e2e8f0/4a5568?text=Report', driveLink: '#' },
    { id: 2, title: 'Marketing Brochure', description: 'Our new range of products and services.', thumbnailUrl: 'https://placehold.co/400x560/dbeafe/1e40af?text=Brochure', driveLink: '#' },
    { id: 3, title: 'Q3 Financials', description: 'A detailed look at our Q3 results.', thumbnailUrl: 'https://placehold.co/400x560/d1fae5/065f46?text=Financials', driveLink: '#' },
    { id: 4, title: 'Product Catalog 2024', description: 'The complete 2024 product line.', thumbnailUrl: 'https://placehold.co/400x560/fee2e2/991b1b?text=Catalog', driveLink: '#' },
    { id: 5, title: 'Onboarding Manual', description: 'A getting started guide for new hires.', thumbnailUrl: 'https://placehold.co/400x560/e0e7ff/312e81?text=Manual', driveLink: '#' },
    { id: 6, title: 'Brand Guidelines', description: 'Official guide to using our brand assets.', thumbnailUrl: 'https://placehold.co/400x560/fefce8/854d0e?text=Brand+Guide', driveLink: '#' },
    { id: 7, title: 'Whitepaper on AI', description: 'In-depth industry analysis on AI.', thumbnailUrl: 'https://placehold.co/400x560/f3e8ff/581c87?text=AI+Paper', driveLink: '#' },
    { id: 8, title: 'UX Research Study', description: 'Findings from our latest user research.', thumbnailUrl: 'https://placehold.co/400x560/ecfdf5/047857?text=UX+Study', driveLink: '#' },
];

// --- STYLES ---
// We can define reusable style objects or just use strings in className.
// For this self-contained component, we'll add a style tag in the main App component for scrollbar hiding.
const styles = {
    documentCard: 'block bg-gray-800 rounded-lg shadow-md overflow-hidden text-white no-underline transition-transform duration-300 ease-in-out w-72 flex-shrink-0 group hover:-translate-y-1.5 hover:shadow-xl',
    viewButton: 'mt-2 py-2 px-4 bg-indigo-800 text-white font-semibold rounded-lg text-center transition-colors duration-200 group-hover:bg-indigo-700',
    navButton: 'absolute top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition z-10'
};

/**
 * A single card component for a document.
 * @param {{doc: {driveLink: string, thumbnailUrl: string, title: string, description: string}}} props
 */
const DocumentCard = ({ doc }) => {
    return (
        <a 
            href={doc.driveLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${styles.documentCard} snap-start`}
        >
            <div className="h-48 bg-gray-900 flex items-center justify-center overflow-hidden">
                <img src={doc.thumbnailUrl} alt={`Cover for ${doc.title}`} className="w-full h-full object-cover" />
            </div>
            <div className="p-5 flex flex-col justify-between h-[120px]">
                <div>
                    <h3 className="text-lg font-semibold text-gray-200 truncate group-hover:text-indigo-600">{doc.title}</h3>
                    {/* <p className="text-gray-400 text-sm mt-1 h-10">{doc.description}</p> */}
                </div>
                <div className={styles.viewButton}>
                    View Document
                </div>
            </div>
        </a>
    );
};

/**
 * The main App component containing the carousel.
 */
const Pdfc = () => {
    const carouselTrackRef = useRef(null);

    // Function to handle scrolling the carousel
    const handleScroll = (direction) => {
        const scrollAmount = 320; // Width of a card (288) + gap (32)
        if (carouselTrackRef.current) {
            const currentScroll = carouselTrackRef.current.scrollLeft;
            const newScroll = direction === 'left' 
                ? currentScroll - scrollAmount 
                : currentScroll + scrollAmount;
            
            carouselTrackRef.current.scrollTo({
                left: newScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <>
            {/* Injecting global styles for scrollbar hiding */}
            <style>{`
                body { font-family: 'Inter', sans-serif; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            <div className="bg-gray-900 flex items-center justify-center min-h-screen">
                <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 w-full">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-50 mb-2">Document Library</h2>
                        <p className="text-gray-400 mb-10">Explore our collection of resources. Click any document to open it.</p>
                    </div>
                    
                    <div className="relative">
                        {/* Carousel Track */}
                        <div 
                            ref={carouselTrackRef} 
                            className="no-scrollbar flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth py-4"
                        >
                            {documents.map(doc => (
                                <DocumentCard key={doc.id} doc={doc} />
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <button onClick={() => handleScroll('left')} className={`${styles.navButton} left-0 -translate-x-4`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button onClick={() => handleScroll('right')} className={`${styles.navButton} right-0 translate-x-4`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-12">
                        <a 
                            href="#" 
                            className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
                        >
                           Explore Docs
                        </a>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Pdfc;
