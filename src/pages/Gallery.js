import React, {useEffect, useState } from "react";
import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import bgrnd from '../assets/backs.png'

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
  const [index, setIndex] = useState(-1);
  const [galleryImages, setImages] = useState([]);
  // const [labImages, setLabImages] = useState([]);

//-------------------------------------------------API Call--------------------------------------------
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/gallery/")
      .then((res) => {
        const sortedImages = res.data
          .map((img) => ({
            name: img.caption,
            src: img.image,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setImages(sortedImages);
      })
      .catch((err) => {
        console.error("Error fetching gallery:", err);
      });

    // axios
    //   .get("http://127.0.0.1:8000/api/lab-gallery/")
    //   .then((res) => {
    //     const sortedImages = res.data
    //       .map((img) => ({
    //         name: img.caption,
    //         src: img.image,
    //       }))
    //       .sort((a, b) => a.name.localeCompare(b.name));
    //     setLabImages(sortedImages);
    //   })
    //   .catch((err) => {
    //     console.error("Error fetching gallery:", err);
    //   });
  }, []);
//-------------------------------------------------API Call--------------------------------------------

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
      {/* <div className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 py-10 bg-gradient-to-b from-slate-50 via-gray-300 to-emerald-200 text-gray-900">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold mb-10 text-purple-900">
          Our Lab 👨🏻‍🔬
        </h1>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {labImages.map((item, i) => (
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
            </div>
          ))}
        </div>
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={galleryImages.map((img) => ({
            src: img.src,
            title: img.name,
          }))}
          plugins={[Captions]}
          captions={{ descriptionTextAlign: "center" }}
        />
      </div> */}

      {/*------------------------------------------ Other Images ---------------------------------------------*/}
      <div className="min-h-screen px-4 sm:px-8 md:px-16 lg:px-20 xl:px-32 py-10 bg-gradient-to-b from-slate-50 via-gray-300 to-emerald-200 text-gray-900">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold mb-10 text-purple-900">
          Our Signature Aesthetic 📸
        </h1>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((item, i) => (
            <div
              key={i}
              className="rounded overflow-hidden shadow-md hover:shadow-lg transform hover:scale-[1.03] transition duration-300 bg-white cursor-pointer"
              onClick={() => setIndex(i)}
            >
              <img
                src={item.src}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
              <div className="px-3 py-2 text-center font-medium text-gray-800 bg-gray-50">
                {item.name}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={galleryImages.map((img) => ({
            src: img.src,
            title: img.name,
          }))}
          plugins={[Captions]}
          captions={{ descriptionTextAlign: "center" }}
        />
      </div>
    </div>
  );
};

export default Gallery;
