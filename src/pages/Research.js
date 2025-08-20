import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import { useRef,useState, useEffect } from 'react';
//import img0 from '../assets/research/img0.png';
// import img1 from '../assets/research/img1.jpg';
// import img2 from '../assets/research/img2.jpg';
// //import img3 from '../assets/research/img3.jpg';
// import img4 from '../assets/research/img4.jpg';
// //import img5 from '../assets/research/img5.jpeg';
// //import img6 from '../assets/research/img6.jpeg';
// import img7 from '../assets/research/img7.jpg';
import bgrnd from '../assets/backs.png'
import axiosInstance from '../api/axios';
import DOMPurify from 'dompurify';

//-----------------------------------------------------------Descriptions---------------------------------------------------------
// const researchData = [
//   {
//     img: img1,
//     title: 'Ultrabright nanoMedicine',
//     text: `Fluorescent bright nanoparticles are becoming popular in nano-imaging and early-stage detection of cancer. Compared to molecular
//           fluorophores, emissive nanoparticles are brighter and stable. These tiny medicines are emerging as a promising future. Their surface
//           can be functionalized with specific targeting molecule for tagging and tracing the cancer cells selectively. These particles can be
//           used to diagnose and treat diseases at the cellular level, providing more accurate and effective treatments. Unique assembly of
//           fluorescent dye within nanoparticle matrix make them bright for localized diagnostics at minimum dose.`,
//   },
//   {
//     img: img2,
//     title: 'Biomimetic NanoBiosome',
//     text: `NanoBiosomes also named as GHOSTS represent their engineering from cell membrane. These GHOST vesicles, composed of natural lipids
//            and membrane proteins biomarkers, have the capacity to encapsulate a diverse range of cargo, including both hydrophilic and hydrophobic
//            compounds. These bioinspired cell-membrane GHOSTS enhance tumor targeting by harnessing their immune escape and self-recognition 
//            abilities. By selectively targeting specific cells and tissues, NanoBiosomes hold great promise for pre-clinical/clinical studies.`,
//   },
//   // {
//   //   img: img3,
//   //   title: 'Biomimetic Liposomes',
//   //   text: `Liposomal theranostics is an innovative approach to personalized medicine that combines diagnostic and therapeutic capabilities in 
//   //         a single platform. By encapsulating both imaging agents and therapeutic drugs within a single lip, this technology enables targeted 
//   //         delivery of drugs to specific cells or tissues, while also allowing for real-time monitoring of treatment efficacy. Liposomal 
//   //         theranostics has the potential to revolutionize the way we diagnose and treat a wide range of diseases, from cancer to infectious 
//   //         diseases and beyond.`,
//   // },
//   {
//     img: img4,
//     title: 'Interventional Theranostics',
//     text: `Interventional theranostics is a rapidly evolving medical discipline that integrates diagnostic and therapeutic probes at nanoscale, 
//           but their overall theranostics performance may compromise while integrating both together. This innovative approach enables physicians 
//           to diagnose and treat various medical conditions in a minimally manner, resulting in reduced recovery times and improved patient 
//           outcomes. With continuous advancements in technology, interventional theranostics holds immense potential to transform the healthcare 
//           landscape.`,
//   },
//   // {
//   //   img: img5,
//   //   title: 'Gated Nanomachines',
//   //   text: `Gated nanomachines are tiny devices that can be programmed to perform specific tasks. In medicine, they have the potential to 
//   //         revolutionize drug delivery by targeting specific cells or tissues in the body. By using gatedomachines, doctors could deliver drugs 
//   //         more effectively and with fewer side effects. Additionally, these devices could be used to diagnose diseases at an earlier stage, 
//   //         leading to better outcomes for patients. As research in this field continues, the possibilities for gated nanomachines in medicine 
//   //         are truly exciting.`,
//   // },
//   //{
//   // img: img6,
//   // title: 'Solid Tumor Entry-Exit of NT',
//   // text: `Solid tumor entry and exit of nano theranostics is a complex topic that requires a deep understanding of the latest research and 
//   //       technology. Nano theranostics are designed to target and treat cancer cells while minimizing damage to healthy cells. By using advanced 
//   //       imaging techniques, researchers can track the movement of these nanoparticles in real-time, allowing for more precise treatment. As the 
//   //       field of nano theranostics continues to evolve, we can expect to see even more promising results in the fight against cancer.`,
//   // },
//   {
//   img: img7,
//   title: 'Molecular Imaging',
//   text: `Multimodal imaging is a highly effective approach that integrates diverse imaging technologies to offer a more comprehensive assessment 
//         of the human body. By leveraging multiple imaging modalities, medical practitioners can achieve more accurate diagnoses and treatment 
//         outcomes for a broad spectrum of medical conditions. Whether you are a healthcare or a patient, comprehending the advantages of multimodal 
//         imaging can facilitate informed decision-making regarding your health.`,
//   },
// ];

function Research() {

  const [researchData, setResearch_list] = useState([]);
  useEffect(() => {
    axiosInstance.get('research-list/')
      .then(res => setResearch_list(res.data))
      .catch(err => console.error("Error fetching Research_list", err));
  }, []);

  return (
    <div>
      {/* Intro Heading */}
      <div className="relative h-[250px] sm:h-[300px] overflow-hidden">
        <img
          src={bgrnd}
          alt="background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-10 bg-black bg-opacity-30 flex flex-col items-center justify-center h-full text-white px-4">
          <h2 className="font-semibold text-center leading-tight text-[28px] sm:text-[40px] md:text-[60px] lg:text-[70px]">
            Research is fun. Do not believe?
          </h2>
          <h2 className="font-semibold text-center leading-tight text-[28px] sm:text-[40px] md:text-[60px] lg:text-[70px]">
            Come by and see it yourself.
          </h2>
        </div>
      </div>

      {/* Lab Image */}
      {/* <div className="px-4 sm:px-8 md:px-16 lg:px-24 mt-6 sm:mt-8">
        <img
          src={img0}
          alt="Research"
          className="w-full h-auto rounded-xl object-cover"
        />
      </div> */}

      {/* Research Cards */}
      <div className="px-4 sm:px-6 py-10 max-w-7xl mx-auto">
        <div className="space-y-14 sm:space-y-16">
          {researchData.map((item, idx) => (
            <ScrollZoomCard item={item} idx={idx} key={idx} />
          ))}
        </div>

        {/* Last Line */}
        <h2 className="text-center italic text-[18px] sm:text-[20px] text-gray-700 mt-8 px-4">
          Where molecules meet meaning — our research bridges nanoscale science with real-world impact.
        </h2>
      </div>
    </div>
  );
}

// Scroll Animation Function
function ScrollZoomCard({ item, idx }) {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "center 0.3"], // Works for both mobile and desktop
  });
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.94, 1.08]);
  const scale = useSpring(rawScale, { stiffness: 200, damping: 100 });

  const sanitizedDescription = DOMPurify.sanitize(item.description);

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center gap-6 sm:gap-3 ${
        idx % 2 !== 0 ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image */}
      <motion.div
        style={{ scale }}
        className="p-3 w-full md:w-[30%] w-[80%] sm:w-[60%] flex items-center justify-center overflow-hidden rounded-md"
      >
        <div className="relative w-full aspect-square overflow-hidden rounded-md min-h-[150px] sm:min-h-[100px] md:min-h-[200px]">
          <img
            src={item.image}
            alt={`research-${idx}`}
            className="absolute inset-0 w-4/5 h-4/5 object-contain mx-auto my-auto"
          />
        </div>
      </motion.div>

      {/* Text block */}
      <div className="md:w-1/2 px-2 sm:px-4 bg-gray-300 rounded-md">
        <h2 className="text-2xl sm:text-2xl md:text-2xl font-bold text-center md:text-center mt-4 md:mt-0 mb-4 sm:mb-6 text-purple-900">
          {item.name}
        </h2>
        <div className="text-justify text-gray-800 leading-relaxed text-[12px] sm:text-[13px] md:text-[14px] pb-4 whitespace-pre-line"
             dangerouslySetInnerHTML={{ __html: sanitizedDescription }} 
        />
      </div>
    </div>
  );
}

export default Research;

