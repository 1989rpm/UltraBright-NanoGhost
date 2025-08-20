import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt } from 'react-icons/fa';
import axiosInstance from '../api/axios';
import DOMPurify from 'dompurify';

function NewsSlider() {
  return (
    <section className="bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <NewsTicker/>

        {/* ========== SOCIAL MEDIA FEEDS (Responsive Columns) ========== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <TwitterHandles/>
          <LinkedinHandles/>
        </div>

      </div>
    </section>
  );
}

function NewsTicker()
{
  const [news, setNews] = useState([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    axiosInstance.get('news/')
      .then(res => setNews(res.data))
      .catch(err => {
        console.error('Failed to fetch news:', err);
        // fallback to dummy data if needed
        setNews([
          { date: '2025-07-01', description: 'Published a paper in Nature Nanotechnology.' },
          { date: '2025-06-01', description: 'MINT Lab attended the Global Cancer Imaging Conference in Japan.' },
          { date: '2025-05-01', description: 'Patent filed for a new targeted nano-carrier platform.' },
          { date: '2025-04-01', description: 'PhD student awarded Best Poster at Theranostics Symposium.' },
        ]);
      })
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % news.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + news.length) % news.length);
  };

  const variants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 50 : -50,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -50 : 50,
      transition: { duration: 0.4 },
    }),
  };

  if (news.length === 0) {
    return (
      <section className="py-8 bg-white">
        <div className="text-center text-gray-600 text-xl">Loading news...</div>
      </section>
    );
  }

  const currentNews = news[current];
  const sanitizedDescription = DOMPurify.sanitize(currentNews.description);
  
  return (
    // ========== NEWS BOX (Single Column) ==========
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Latest News</h2>
      <div className="bg-gray-100 p-6 rounded-md relative overflow-hidden transition-all">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative px-7 py-4 "
          >
            <p className="text-purple-900 text-[20px] font-semibold mb-4">{currentNews.date}</p>

            {currentNews.image && (
              <div className='w-full flex justify-center mb-4'>
                <div className=" max-w-[400px] lg:h-[220px] md:h-[220px] sm:h-[150px]">
                  <img
                    src={currentNews.image}
                    alt="News"
                    className="w-full h-full object-cover rounded-md shadow"
                  />
                  </div>
              </div>
            )}


            <div
              className="text-gray-800 text-[15px]"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />

            {currentNews.hyperlink && (
              <a
                href={currentNews.hyperlink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 text-purple-700 hover:text-purple-900"
              >
                <FaExternalLinkAlt size={18} />
              </a>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black z-20"
        >
          <FaChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black z-20"
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

function TwitterHandles()
{
  const [Twitterembeds, setTwitterEmbeds] = useState([]);

  useEffect(() => {
    axiosInstance.get('twitter-embeds/')
      .then(res => setTwitterEmbeds(res.data))
      .catch(err => console.error(err));
  }, []);

  return(
    // Twitter Feed 
    <div>
      {Twitterembeds.map((item, index) => {
        const sanitizedxembed = DOMPurify.sanitize(item.embed_code);
        return(
          <div key={index} className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{item.name}</h2>
            <div className="rounded-md">
              <div dangerouslySetInnerHTML={{ __html: sanitizedxembed }} />
              <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
            </div>
          </div>
      )})}
    </div>
  );
}

function LinkedinHandles()
{
  const [Linkedinembeds, setLinkedinEmbeds] = useState([]);

  useEffect(() => {
    axiosInstance.get('linkedin-embeds/')
      .then(res => setLinkedinEmbeds(res.data))
      .catch(err => console.error(err));
  }, []);

  return(
    //LinkedIn Feed 
    <div>
      {Linkedinembeds.map((item, index) => {
        return(
          <div key={index} className="mb-8 overflow-x-auto w-full max-w-full">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{item.name}</h2>
            <div className="rounded-md">
              <div dangerouslySetInnerHTML={{ __html: item.embed_code }} />
            </div>
          </div>
      )})}
    </div>
  );
}

export default NewsSlider;
