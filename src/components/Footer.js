import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; 

function Footer() {
  return (
    <footer className="bg-black text-white px-8 py-6 border-t border-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-[50px] md:flex-row justify-between">

        {/* -----------------------------------------LEFT SECTION----------------------------------------- */}
        <div className="md:w-1/2 w-full md:mb-0">
          {/* Lab Name */}
          <Link to="/" className="text-[40px] leading-tight mb-[10px] font-bold hover:text-gray-300 transition block">
            Bright-NanoGhost Group
          </Link>
          <p className="text-[20px] leading-tight pb-[10px] text-gray-300">
            Interventional Theranostics & Molecular Imaging Research
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4 mb-6">
            <a href="https://www.linkedin.com/in/rajendraprasad89/" target="_blank" rel="noreferrer" className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition">
              <FaLinkedin size={20} />
            </a>
            <a href="https://x.com/1989rpm?lang=en" target="_blank" rel="noreferrer" className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition">
              <FaXTwitter size={20} />
            </a>
          </div>
        </div>

        {/* -----------------------------------------RIGHT SECTION----------------------------------------- */}
        <div className="md:w-1/2 w-full md:ml-[100px] lg:pl-[100px]">
          {/* Address */}
          <h2 className="text-[30px] font-semibold">Address:</h2>
          <p className="text-[15px] leading-6 text-gray-300">
            Room No. S-01, Second Floor, School of Biochemical Engineering,<br />
            Indian Institute of Technology (BHU), Varanasi, U.P., India - 221005
          </p>

          {/* External Links */}
          {/* <div className="mt-12 text-[15px] space-y-1 text-gray-400">
            <p>
              Associate Editor:{' '}
              <a
                href="https://www.ntno.org/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-white transition"
              >
                Nanotheranostics
              </a>
            </p>
            <p>
              Editorial Board:{' '}
              <a
                href="https://www.nature.com/npjimaging/"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-white transition"
              >
                npj Imaging
              </a>
            </p>
            <p>
              Editorial Board:{' '}
              <a
                href="https://pubs.acs.org/journal/cbihbp"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-white transition"
              >
                CBMI (ACS)
              </a>
            </p>
          </div> */}
        </div>
      </div>

      {/* -----------------------------------------CREDIT SECTION (ALWAYS LAST)----------------------------------------- */}
      <div className="mt-4 text-[15px] lg:px-20 text-white">
        Website developed by{' '}
        <a
          href="https://github.com/Rk1312"
          target="_blank"
          rel="noreferrer"
          className="hover:text-gray-400 transition"
        >
          Rahul
        </a>
      </div>
    </footer>
  );
}

export default Footer;
