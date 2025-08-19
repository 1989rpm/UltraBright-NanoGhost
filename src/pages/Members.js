import { useState, useEffect } from 'react';
import { FaLinkedin, FaXTwitter, FaEnvelope, FaGoogleScholar } from 'react-icons/fa6';
//import { AiFillOrcid } from "react-icons/ai";
//import labHeadImage from '../assets/members/rpm.jpg';
import axiosInstance from '../api/axios';
import bgrnd from '../assets/backs.png'
import labimg from '../assets/grpimage.jpg'
import orcid from '../assets/orcid.png'

//---------------------------Dummy----Data-----Use-----when------Backend------Offline----------------------------------------------------------
// import member1 from '../assets/members/himanshu.jpg';
// import member2 from '../assets/members/rahul.jpg';
// const currentMembers = [
//   {
//     image: member1,
//     name: 'Himanshu',
//     position: 'Lab Manager (volunteer)',
//     description:
//       'I am working with Dr. Rajendra as a voluntary lab manager for handling his lab activities and maintaining lab protocols.',
//     linkedin: 'https://linkedin.com/in/aman',
//     gmail: 'mailto:aman@example.com',
//     x: 'https://x.com/aman',
//   },
//   {
//     image: member2,
//     name: 'Rahul Kumar',
//     position: 'IDD Student',
//     description:
//       `Me?, a curious mind driven by nanotheranostic research, web development, and deep questions about the universe and philosophy. 
//       I love exploring the intersection of science, tech, and existential wonder.`,
//     linkedin: 'https://linkedin.com/in/sonal',
//     gmail: 'mailto:sonal@example.com',
//     x: 'https://x.com/sonal',
//   },
// ];
//---------------------------Dummy----Data-----Use-----when------Backend------Offline----------------------------------------------------------


//-----------------------------------------------Member-Hover-Card-Animation-Function-----------------------------------------

function HoverCard({ member }) {
  return (
    <div className="bg-gray-100 rounded-xl p-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div className="flex flex-col items-center sm:items-center">
          <div className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] rounded-full overflow-hidden flex-shrink-0">
            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex mt-4 gap-3 text-black">
            {member.linkedin && <a href={member.linkedin}><FaLinkedin size={24} /></a>}
            {member.email && <a href={`mailto:${member.email}`}><FaEnvelope size={24} /></a>}
            {member.google_scholar && <a href={member.google_scholar}><FaGoogleScholar size={24} /></a>}
            {member.twitter && <a href={member.twitter}><FaXTwitter size={24} /></a>}
            {member.orcid && <a href={member.orcid}><img src={orcid} alt="orcid icon" className='w-6 h-6'/></a>}
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-2xl sm:text-4xl font-semibold text-purple-900">{member.name}</h3>
          <p className="text-lg sm:text-xl text-gray-600">{member.position}</p>
          <p className="mt-4 text-sm sm:text-base text-justify text-gray-700 whitespace-pre-line">
            {member.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function Members() {

  const [labHead, setLabHead] = useState([]);
  const [currentMembers, setCurrentMembers] = useState([]);
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    axiosInstance.get('members/lab-head/')
      .then(res => setLabHead(res.data))
      .catch(err => console.error("Error fetching Lab Head", err));

    axiosInstance.get('members/lab-members/')
      .then(res => setCurrentMembers(res.data))
      .catch(err => console.error("Error fetching members", err));

    axiosInstance
      .get("members/alumni/")
      .then((res) => setAlumni(res.data))
      .catch((err) => console.error("Error fetching alumni", err));
  }, []);

  return (
    <div>
      {/*--------------------------------------------Intro Heading---------------------------------------------------------*/}
      <div className="relative h-[300px] sm:h-[300px] overflow-hidden">
        <img
            src={bgrnd}
            alt= "background"
            className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-10 bg-black bg-opacity-30 flex flex-col items-center justify-center h-full text-white px-4">
          <h1 className="font-semibold text-center leading-tight text-[50px] sm:text-[50px] md:text-[60px] lg:text-[70px] xl:text-[70px]">Our Group!</h1>
          <p className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[27px] text-center mt-6 px-4 sm:px-8 md:px-[60px] lg:px-[100px] ">
            Our group is about investigating the unknown! We are a group of passionate individuals, dedicated to explore new NanoMedicines and pushing 
            the boundaries of translational knowledge
          </p>
        </div>
      </div>

      {/*------------------------------------------------------Lab Image---------------------------------------------------- */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 mt-8">
        <img
          src={labimg}
          alt="Lab Group"
          className="w-full h-auto rounded-xl shadow-lg object-cover"
        />
      </div>

      {/* -----------------------------------------------Main Content----------------------------------------------- */}
      <div className="px-4 sm:px-8 md:px-16 lg:px-24 py-10 max-w-7xl mx-auto text-gray-800">
        {/* Lab Head */}
        {labHead[0] && (
          <div className="rounded-xl bg-gray-100 p-6 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="flex flex-col items-center md:items-center">
                <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
                  <img src={labHead[0].image} alt="Lab Head" className="w-full h-full object-cover" />
                </div>
                <div className="mt-10 sm:mt-10 md:mt-10 lg:mt-20 text-center md:text-center text-sm">
                  <p className='text-lg mb-4'>Editoral Board</p>
                  <p className="mt-2 text-lg font-semibold text-purple-700 hover:text-purple-900">
                    <a href="https://pubs.acs.org/journal/nalefd" target="_blank" rel="noreferrer">NanoLetters</a>
                  </p>
                  <p className="mt-2 text-lg font-semibold text-purple-700 hover:text-purple-900">
                    <a href="https://www.ntno.org/" target="_blank" rel="noreferrer">Nanotheranostics</a>
                  </p>
                  <p className="mt-2 text-lg font-semibold text-purple-700 hover:text-purple-900">
                    <a href="https://www.nature.com/npjimaging/" target="_blank" rel="noreferrer">npj Imaging</a>
                  </p>
                  <p className="mt-2 text-lg font-semibold text-purple-700 hover:text-purple-900">
                    <a href="https://pubs.acs.org/journal/cbihbp" target="_blank" rel="noreferrer">CBMI (ACS)</a>
                  </p>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-purple-900">{labHead[0].name}</h2>
                <p className="text-lg sm:text-xl mt-2 text-gray-500">{labHead[0].position}</p>
                <div className="flex mt-4 gap-4 justify-center md:justify-start text-black">
                  {labHead[0].linkedin && <a href={labHead[0].linkedin}><FaLinkedin size={24} /></a>}
                  {labHead[0].email && <a href={`mailto:${labHead[0].email}`}><FaEnvelope size={24} /></a>}
                  {labHead[0].twitter && <a href={labHead[0].twitter}><FaXTwitter size={24} /></a>}
                  {labHead[0].google_scholar && <a href={labHead[0].google_scholar}><FaGoogleScholar size={24} /></a>}
                  {labHead[0].orcid && <a href={labHead[0].orcid}><img src={orcid} alt="orcid icon" className='w-6 h-6'/></a>}
                </div>
                <p className="mt-6 text-[15px] sm:text-[15px] md:text-[15px] lg:text-[15px] text-justify text-gray-700 whitespace-pre-line">
                  {labHead[0].description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Members */}
        <div className="mt-12 grid grid-cols-1 gap-8">
          {currentMembers.map((member, idx) => (
            <HoverCard key={idx} member={member} />
          ))}
        </div>

        {/* Alumni */}
        {alumni.length > 0 && (
          <div className="text-left mt-12">
            <h1 className="text-2xl font-bold mb-4">Our Alumni</h1>
            {alumni.map((a, i) => (
              <p key={i} className="text-lg mt-2 text-gray-700">
                {a.name}
              </p>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="italic text-base sm:text-lg text-gray-700">
            Want to be a part of our team?{' '}
            <span
              onClick={() => window.location.href = '/position'}
              className="text-purple-700 font-semibold cursor-pointer hover:underline"
            >
              Join us!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Members;
