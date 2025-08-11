import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import bgrnd from '../assets/backs.png'

function Position() {

  const [positions, setPositions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/positions/')
      .then((response) => {
        setPositions(response.data);
      })
      .catch((error) => {
        console.error('Error fetching positions:', error);
      });
  }, []);

  return (
    <div>
      <div className="relative h-[300px] sm:h-[300px] overflow-hidden">
        <img
            src={bgrnd}
            alt= "background"
            className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-10 bg-black bg-opacity-30 flex flex-col items-center justify-center h-full text-white px-4">
        {/* Heading */} 
        <h1 className="font-semibold text-center leading-tight text-[50px] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-[70px]">Open Positions 🔬</h1>
        </div>
      </div>
      <div className="px-6 py-12 max-w-5xl mx-auto text-gray-900">
        {/* Expandable Box */}
        <motion.div
          whileHover={{ scale: 1.2 }}
          transition={{ type: 'spring', stiffness: 150, damping: 15 }}
          className="bg-gray-100 rounded-xl shadow-md p-8 space-y-10 transition-all duration-300"
        >
          
          {positions.length === 0 ? (
            <p className="text-center text-gray-600">No open positions at the moment.</p>
          ) : (
            positions.map((pos, index) => (
              <div key={index} className="md:flex gap-8">
                <h2 className="font-semibold text-lg min-w-[180px] mb-2 md:mb-0">{pos.position}:</h2>
                <p className="text-gray-700 ml-8 text-justify">{pos.description}</p>
              </div>
            ))
          )} 
        </motion.div>
        <h3 className="text-xl text-center my-12 text-black">
          Please email your CV and Cover Letter along with your Research Interest to:
            <span className='text-purple-900'>
              <a href={`mailto:rajendra.bce@iitbhu.ac.in`}> rajendra.bce@iitbhu.ac.in</a>
            </span>
        </h3>
      </div>
    </div>
  );
}

export default Position;
