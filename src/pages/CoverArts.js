import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import axios from "axios";
import bgrnd from '../assets/backs.png'

//----------------------Dynamically import all images from folder-------------------------------------
// function importAll(r) {
//   return r.keys().map((key) => ({
//     src: r(key),
//     name: key
//       .replace("./", "")
//       .replace(/\.(png|jpe?g|webp)$/i, "")
//       .replace(/[_-]/g, " "),
//   }));
// }

// // Get sorted image list
// const coverArtImages = importAll(
//   require.context("../assets/cover_arts", false, /\.(png|jpe?g|webp)$/)
// ).sort((a, b) => a.name.localeCompare(b.name));
//----------------------Dynamically import all images from folder-------------------------------------

// Breakpoints for masonry layout
const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 2,
};


export default function CoverArts() {
  const [coverArtImages, setCoverArtImages] = useState([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(-1);

//-------------------------------API Call----------------------------------------------
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/cover-arts/") // Update with deployed domain later
      .then((res) => {
        setCoverArtImages(
          res.data.map((item) => ({
            src: item.image,
            name: item.title,
          }))
        );
      })
      .catch((err) => console.error("Error fetching cover arts:", err));
  }, []);
//-------------------------------API Call----------------------------------------------

  return (
    <div>
      {/* ---------- Hero Section ---------- */}
      <div className="relative h-[250px] sm:h-[300px] overflow-hidden">
        <img
          src={bgrnd}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-10 bg-black bg-opacity-30 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="font-semibold text-center leading-tight text-[60px] sm:text-[60px] md:text-[60px] lg:text-[70px]">
            Cover Arts
          </h1>
        </div>
      </div>

      {/* ---------- Gallery Section ---------- */}
      <div className="px-4 sm:px-8 md:px-[60px] lg:px-[100px] xl:px-[150px] py-10 bg-gradient-to-b from-slate-50 via-gray-300 to-emerald-200">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {coverArtImages.map((img, i) => (
            <div
              key={i}
              className="mb-4 cursor-pointer"
              onClick={() => {
                setOpen(true);
                setIndex(i);
              }}
            >
              <img
                src={img.src}
                alt={img.name}
                className="w-full rounded-lg shadow-md transition-transform hover:scale-[1.02]"
                loading="lazy"
              />
              <p className="text-center mt-2 text-sm text-gray-600">
                {img.name}
              </p>
            </div>
          ))}
        </Masonry>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={coverArtImages.map((img) => ({
            src: img.src,
            description: img.name,
          }))}
          plugins={[Captions]}
        />
      </div>
    </div>
  );
}
