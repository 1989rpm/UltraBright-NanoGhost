import React, {useEffect, useState } from "react";
import axiosInstance from '../api/axios';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import bgrnd from '../assets/backs.png'
//import Pagination from '../components/Pagination';

//----------------------------------Dynamically load all images in gallery folder--------------------------------
// const importAll = (r) => {
//   return r
//     .keys()
//     .map((key) => {
//       const fileName = key.replace("./", "").split(".")[0];
//       return {
//         name: fileName
//           .replace(/_/g, " ")
//           .replace(/\b\w/g, (c) => c.toUpperCase()),
//         src: r(key),
//       };
//     })
//     .sort((a, b) => a.name.localeCompare(b.name)); // SORTING alphabetically
// };

// const galleryImages = importAll(
//   require.context("../assets/gallery", false, /\.(png|jpe?g|svg|tif)$/)
// );
//----------------------------------Dynamically load all images in gallery folder--------------------------------

const Gallery = () => {

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
          <h1 className="font-semibold text-center leading-tight text-[60px] sm:text-[60px] md:text-[60px] lg:text-[70px] xl:text-[70px]">Our Gallery!</h1>
        </div>
      </div>

      {/*------------------------------------------ Lab Images ---------------------------------------------*/}
      <SmallStart />

      {/* ------------------------------------------ Other Images --------------------------------------------- */}
      {/* <OurFun /> */}

      {/*------------------------------------------ Other Images ---------------------------------------------*/}
      {/* <TheVision /> */}

      {/*------------------------------------------ Lab Images ---------------------------------------------*/}
      {/* <LabActivities /> */}

      {/*------------------------------------------ Other Images ---------------------------------------------*/}
      {/* <OurAesthetics /> */}

      {/*------------------------------------------ Other Images ---------------------------------------------*/}
      <LabFacilities />

    </div>
  );
};

function SmallStart()
{
  const [v1Images, setv1Images] = useState([]);
  const [index, setIndex] = useState(-1);

  useEffect(() => { 
    axiosInstance.get(`gallery/humble-beginning/`)
      .then(res => {
        const formatted = (res.data || []).map(item => ({
          src: item.image,        // match Lightbox src
          name: item.caption      // match Lightbox description
        }));
        setv1Images(formatted);
        // setTotalPages(Math.ceil(res.data.count / itemsPerPage));
      })
      .catch((err) => {
        console.error("Error fetching gallery:", err);
      });
  }, []);
  
  return(
    <div className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 py-10 text-gray-900">
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold mb-10 text-purple-900">
        Humble Beginnings
      </h1>

      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {v1Images.map((item, i) => (
          <div
            key={i}
            className="rounded overflow-hidden shadow-md hover:shadow-lg transform hover:scale-[1.03] transition duration-300 bg-white cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <img
              src={item.src}
              alt={item.name}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="px-3 py-2 text-center font-medium text-gray-800 bg-gray-200">
              {item.name}
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
      /> */}

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={v1Images.map((img) => ({
          src: img.src,
          title: img.name,
        }))}
        plugins={[Captions]}
        captions={{ descriptionTextAlign: "center" }}
      />
    </div>
  );
}

// function OurFun()
// {
//   const [index, setIndex] = useState(-1);
//   const [v2Images, setv2Images] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 18; // adjust as needed
  
//   useEffect(() => {
//     axiosInstance.get(`gallery/our-fun/?page=${currentPage}`)
//       .then(res => {
//         const formatted = (res.data.results || []).map(item => ({
//           src: item.image,        // match Lightbox src
//           name: item.caption      // match Lightbox description
//         }));
//         setv2Images(formatted);
//         setTotalPages(Math.ceil(res.data.count / itemsPerPage));
//       })
//       .catch((err) => {
//         console.error("Error fetching gallery:", err);
//       });
//   }, [currentPage]);
  
//   return(
//     <div className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 py-10 text-gray-900">
//       <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold mb-10 text-purple-900">
//         Our Fun
//       </h1>

//       <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         {v2Images.map((item, i) => (
//           <div
//             key={i}
//             className="rounded overflow-hidden shadow-md hover:shadow-lg transform hover:scale-[1.03] transition duration-300 bg-white cursor-pointer"
//             onClick={() => setIndex(i)}
//           >
//             <img
//               src={item.src}
//               alt={item.name}
//               className="w-full h-64 object-cover"
//             />
//             <div className="px-3 py-2 text-center font-medium text-gray-800 bg-gray-200">
//               {item.name}
//             </div>
//           </div>
//         ))}
//       </div>
        
//       {/* Pagination */}
//       <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//       />

//       {/* Lightbox */}
//       <Lightbox
//         open={index >= 0}
//         index={index}
//         close={() => setIndex(-1)}
//         slides={v2Images.map((img) => ({
//           src: img.src,
//           title: img.name,
//         }))}
//         plugins={[Captions]}
//         captions={{ descriptionTextAlign: "center" }}
//       />
//     </div>
//   );
// }

// function TheVision()
// {
//   const [index, setIndex] = useState(-1);
//   const [v3Images, setv3Images] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 18; // adjust as needed
  
//   useEffect(() => {
//     axiosInstance.get(`gallery/the-vision/?page=${currentPage}`)
//       .then(res => {
//         const formatted = (res.data.results || []).map(item => ({
//           src: item.image,        // match Lightbox src
//           name: item.caption      // match Lightbox description
//         }));
//         setv3Images(formatted);
//         setTotalPages(Math.ceil(res.data.count / itemsPerPage));
//       })
//       .catch((err) => {
//         console.error("Error fetching gallery:", err);
//       });
//   }, [currentPage]);
  
//   return(
//     <div className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 py-10 text-gray-900">
//       <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold mb-10 text-purple-900">
//         The Vision
//       </h1>

//       <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         {v3Images.map((item, i) => (
//           <div
//             key={i}
//             className="rounded overflow-hidden shadow-md hover:shadow-lg transform hover:scale-[1.03] transition duration-300 bg-white cursor-pointer"
//             onClick={() => setIndex(i)}
//           >
//             <img
//               src={item.src}
//               alt={item.name}
//               className="w-full h-64 object-cover"
//             />
//             <div className="px-3 py-2 text-center font-medium text-gray-800 bg-gray-200">
//               {item.name}
//             </div>
//           </div>
//         ))}
//       </div>
        
//       {/* Pagination */}
//       <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//       />

//       {/* Lightbox */}
//       <Lightbox
//         open={index >= 0}
//         index={index}
//         close={() => setIndex(-1)}
//         slides={v3Images.map((img) => ({
//           src: img.src,
//           title: img.name,
//         }))}
//         plugins={[Captions]}
//         captions={{ descriptionTextAlign: "center" }}
//       />
//     </div>
//   );
// }

// function LabActivities()
// {
//   const [v4Images, setv4Images] = useState([]);
//   const [index, setIndex] = useState(-1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 18; // adjust as needed

//   useEffect(() => { 
//     axiosInstance.get(`gallery/lab-activities/?page=${currentPage}`)
//       .then(res => {
//         const formatted = (res.data.results || []).map(item => ({
//           src: item.image,        // match Lightbox src
//           name: item.caption      // match Lightbox description
//         }));
//         setv4Images(formatted);
//         setTotalPages(Math.ceil(res.data.count / itemsPerPage));
//       })
//       .catch((err) => {
//         console.error("Error fetching gallery:", err);
//       });
//   }, [currentPage]);
  
//   return(
//     <div className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 py-10 text-gray-900">
//       <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold mb-10 text-purple-900">
//         Lab Activities
//       </h1>

//       <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         {v4Images.map((item, i) => (
//           <div
//             key={i}
//             className="rounded overflow-hidden shadow-md hover:shadow-lg transform hover:scale-[1.03] transition duration-300 bg-white cursor-pointer"
//             onClick={() => setIndex(i)}
//           >
//             <img
//               src={item.src}
//               alt={item.name}
//               className="w-full h-64 sm:h-80 object-cover"
//             />
//             <div className="px-3 py-2 text-center font-medium text-gray-800 bg-gray-200">
//               {item.name}
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {/* Pagination */}
//       <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//       />

//       <Lightbox
//         open={index >= 0}
//         index={index}
//         close={() => setIndex(-1)}
//         slides={v4Images.map((img) => ({
//           src: img.src,
//           title: img.name,
//         }))}
//         plugins={[Captions]}
//         captions={{ descriptionTextAlign: "center" }}
//       />
//     </div>
//   );
// }

// function OurAesthetics()
// {
//   const [v5Images, setv5Images] = useState([]);
//   const [index, setIndex] = useState(-1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 30; // adjust as needed

//   useEffect(() => { 
//     axiosInstance.get(`gallery/our-aesthetics/?page=${currentPage}`)
//       .then(res => {
//         const formatted = (res.data.results || []).map(item => ({
//           src: item.image,        // match Lightbox src
//           name: item.caption      // match Lightbox description
//         }));
//         setv5Images(formatted);
//         setTotalPages(Math.ceil(res.data.count / itemsPerPage));
//       })
//       .catch((err) => {
//         console.error("Error fetching gallery:", err);
//       });
//   }, [currentPage]);
  
//   return(
//     <div className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 py-10 text-gray-900">
//       <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold mb-10 text-purple-900">
//         Our Signature Aesthetics
//       </h1>

//       <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
//         {v5Images.map((item, i) => (
//           <div
//             key={i}
//             className="rounded overflow-hidden shadow-md hover:shadow-lg transform hover:scale-[1.03] transition duration-300 bg-white cursor-pointer"
//             onClick={() => setIndex(i)}
//           >
//             <img
//               src={item.src}
//               alt={item.name}
//               className="w-full h-64 sm:h-80 object-cover"
//             />
//             <div className="px-3 py-2 text-center font-medium text-gray-800 bg-gray-200">
//               {item.name}
//             </div>
//           </div>
//         ))}
//       </div>
      
//       {/* Pagination */}
//       <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={setCurrentPage}
//       />

//       <Lightbox
//         open={index >= 0}
//         index={index}
//         close={() => setIndex(-1)}
//         slides={v5Images.map((img) => ({
//           src: img.src,
//           title: img.name,
//         }))}
//         plugins={[Captions]}
//         captions={{ descriptionTextAlign: "center" }}
//       />
//     </div>
//   );
// }

function LabFacilities()
{
  const [v6Images, setv6Images] = useState([]);
  const [index, setIndex] = useState(-1);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const itemsPerPage = 18; // adjust as needed

  useEffect(() => { 
    axiosInstance.get(`gallery/lab-facilities/`)
      .then(res => {
        const formatted = (res.data || []).map(item => ({
          src: item.image,        // match Lightbox src
          name: item.caption      // match Lightbox description
        }));
        setv6Images(formatted);
        // setTotalPages(Math.ceil(res.data.count / itemsPerPage));
      })
      .catch((err) => {
        console.error("Error fetching gallery:", err);
      });
  }, []);
  
  return(
    <div className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 py-10 text-gray-900">
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold mb-10 text-purple-900">
        Lab Facilities
      </h1>

      <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {v6Images.map((item, i) => (
          <div
            key={i}
            className="rounded overflow-hidden shadow-md hover:shadow-lg transform hover:scale-[1.03] transition duration-300 bg-white cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <img
              src={item.src}
              alt={item.name}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="px-3 py-2 text-center font-medium text-gray-800 bg-gray-200">
              {item.name}
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination */}
      {/* <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
      /> */}

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={v6Images.map((img) => ({
          src: img.src,
          title: img.name,
        }))}
        plugins={[Captions]}
        captions={{ descriptionTextAlign: "center" }}
      />
    </div>
  );
}

export default Gallery;
