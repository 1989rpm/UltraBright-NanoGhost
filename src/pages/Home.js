import NewsSlider from '../components/NewsSlider';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import homeBackground from '../assets/home_background.jpg';

function Home() {
  const { scrollYProgress } = useScroll();

  // Animate scale and Y position on scroll
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, 1.7]);
  const rawY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const scale = useSpring(rawScale, { stiffness: 20, damping: 80 });
  const y = useSpring(rawY, { stiffness: 20, damping: 80 });

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        {/*---------------------------------------- Zoomable Background Image-----------------------------------------*/}
        <motion.div
          className="will-change-transform absolute top-0 left-0 w-full h-full bg-center bg-cover z-0"
          style={{ scale, y, backgroundImage: `url(${homeBackground})` }}
        />

        {/*------------------------------------------ Overlay & Text ----------------------------------------------- */}
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10">
          <div className="text-center px-4">
            <h1 className="text-4xl text-white md:text-6xl font-bold mb-4">
              Theranostics Intervention is easy, but, tricky.
            </h1>
            <p className="text-3xl text-[#95D5B2] md:text-3xl max-w-3xl mx-auto">
              We engineer Molecules and Cells at nanoscale to Develop Theranostics for Early-Stage cancer Imaging and Therapeutics
            </p>
          </div>
        </div>
      </div>

      {/*------------------------------------------- News Section--------------------------------------------------- */}
      <NewsSlider />
    </>
  );
}

export default Home;
