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
          className="will-change-transform absolute top-0 left-0 w-full h-full object-cover z-0 opacity-80"
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/45 to-black/80 z-10">
          <div className="flex flex-col justify-center items-center h-full px-6 text-center">

            {/* Main Heading */}
            <h1 className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              font-bold
              text-white
              leading-tight
              tracking-tight
              drop-shadow-2xl
              max-w-6xl
            ">
              Tumor & Organ Specific Targeting
              <br className="hidden md:block" />
              is interesting, but, tricky
            </h1>

            {/* Subtitle */}
            <p className="
              mt-8
              max-w-5xl
              text-lg
              sm:text-xl
              md:text-3xl
              font-medium
              text-emerald-300
              leading-relaxed
              drop-shadow-lg
            ">
              We engineer Molecules and Cells at nanoscale to develop
              Molecular Imaging and Therapeutics agents
            </p>

            {/* Quote */}
            <div className="mt-20 max-w-4xl">
              <p className="
                text-base
                sm:text-lg
                md:text-2xl
                italic
                font-semibold
                text-white/95
                leading-relaxed
                drop-shadow-lg
              ">
                Our philosophy- “We are not a team because we work together.
                We are a team because we trust, respect, and care for each other.”
              </p>
            </div>

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

  const [video, setVideo] = useState(null);

  useEffect(() => {
    Promise.all([
      axiosInstance.get("fundings/"),
      axiosInstance.get("home-video/")
    ])
      .then(([fundingRes, videoRes]) => {
        setFundings(fundingRes.data);

        if (videoRes.data.length > 0) {
          setVideo(videoRes.data[0]);
        }

        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-12 bg-white text-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex flex-col md:flex-row gap-10">

          {/* Video (left on desktop, below on mobile) */}
          <div className="order-2 md:order-1 w-full md:w-1/2">
            {video && (
              <video
                className="w-full rounded-xl shadow-lg"
                controls
                autoPlay
                muted
                playsInline
                preload="metadata"
                poster={video.poster}
              >
                <source src={video.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          {/* Funding Logos */}
          <div className="order-1 md:order-2 w-full md:w-1/2">

            <p className="text-2xl text-gray-900 text-center font-bold mb-12">
            Our research is supported and funded by:
            </p>
            
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
      </div>
    </div>
  );
}

export default Home;