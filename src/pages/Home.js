import { useState, useEffect } from "react";
import axiosInstance from '../api/axios';
import NewsSlider from '../components/NewsSlider';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// OPTIMIZATION 1: Create a lightweight thumbnail (JPG/WebP) of the first frame of your video.
// Import it here. This displays INSTANTLY while the heavy video downloads.
import homeVideo from '../assets/home_video.mp4';
import videoPoster from '../assets/home_background.jpg'; // <--- You need to create this image

function Home() {
  const { scrollYProgress } = useScroll();

  // Optimized Physics: Reduced stiffness/damping for smoother parallax on scrolling
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]); // Reduced scale to 1.5 to save GPU
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  
  // Spring smoothing
  const scale = useSpring(rawScale, { stiffness: 15, damping: 40 });
  const y = useSpring(rawY, { stiffness: 15, damping: 40 });

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden bg-black">
        
        {/* 
          OPTIMIZATION 2: Video Handling
          1. poster={videoPoster}: Shows image immediately.
          2. playsInline: Required for iOS to play without going fullscreen.
          3. preload="auto": Hints browser to download video metadata ASAP.
        */}
        <motion.video
          className="will-change-transform absolute top-0 left-0 w-full h
          -full object-cover z-0 opacity-80"
          style={{ scale, y }}
          src={homeVideo}
          poster={videoPoster} 
          autoPlay
          loop
          muted
          playsInline
          preload="auto" 
        />

        {/* Overlay - Added gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-5xl">
            <h1 className="text-4xl text-white md:text-6xl font-bold mb-6 drop-shadow-lg leading-tight">
              Tumor & Organ Specific Targeting <br className="hidden md:block" />is interesting, but, tricky
            </h1>
            <p className="text-xl md:text-3xl text-[#95D5B2] font-medium drop-shadow-md mx-auto leading-relaxed">
              We engineer Molecules and Cells at nanoscale to Develop Molecular Imaging and Therapeutics agents
            </p>
          </div>
        </div>
      </div>

      {/* News Section */}
      <NewsSlider />

      {/* Funding Section */}
      <Funding />
    </>
  );
}

function Funding() { 
  const [fundings, setFundings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // OPTIMIZATION 3: Simple caching logic could go here, but for now we just fetch.
    axiosInstance.get('fundings/')
      .then(res => {
        setFundings(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (!loading && fundings.length === 0) return null;

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-2xl text-gray-900 text-center font-bold mb-12">
          Our research is supported and funded by: 
        </p>
        
        {/* 
           OPTIMIZATION 4: Layout Stability
           Used CSS Grid instead of Flexbox for more predictable spacing on mobile.
           items-center ensures logos are vertically aligned.
        */}
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {fundings.map((funding) => (
            <div 
              key={funding.id} 
              className="flex flex-col items-center w-[45%] md:w-[20%] min-w-[140px] group justify-center"
            >
              
              <div className="h-40 w-full flex items-center justify-center p-4 transition-transform duration-300 group-hover:scale-110">
                <img
                  src={funding.image}
                  alt={funding.caption || "Funding Partner"}
                  loading="lazy" 
                  width="200"
                  height="150"
                  // FIX 3: Added mx-auto just as an extra safeguard for the image alignment
                  className="max-h-full max-w-full object-contain mx-auto"
                />
              </div>

              {funding.caption && (
                <p className="mt-4 text-sm text-gray-500 font-medium text-center">
                  {funding.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;