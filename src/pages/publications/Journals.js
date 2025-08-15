import { useState, useEffect } from 'react';
import { FaLink } from 'react-icons/fa';
//import sampleimage from '../../assets/journals/sample.jpg'
import bgrnd from '../../assets/backs.png'
import axiosInstance from '../../api/axios';
import Pagination from '../../components/Pagination';

function Journals() 
{ 
//-------------------Sample backend-like data----------------------------------------- 
  // const [searchTerm, setSearchTerm] = useState(''); 
  // const journalEntries = 
  // [ 
  //   { 
  //     id: 1, image: sampleimage, 
  //     text: 'Rajendra Prasad*, What’s Theranostics Intervention in Lipid Nanoparticles for Solid Tumor Imaging and Therapeutics, Bioconjugate Chem., XX, 2024',
  //     caption: "Citations in 86",
  //     link: 'https://example.com/paper1' 
  //   }, 
  //   { 
  //     id: 2, image: sampleimage, 
  //     text: 'Rajendra Prasad*, R. Chaudhari, R. Kumari, Rahul, M. Gorain, P. Chandra*, Emissive lipid nanoparticles as biophotonic contrast agents for site-selective tumor imaging and metastasis monitoring, ACS AMI, XX, 2024', 
  //     caption: "Citations in 86",
  //     link: 'https://example.com/paper2' 
  //   }, 
  //   { 
  //     id: 3, image: sampleimage, 
  //     text: 'Rajendra Prasad*, V.G.S.S. Jyothi, N. Kommineni, R.T Bulusu, João Conde, Bárbara Mendes, Biomimetic ghost nanomedicine-based optotheranostics for cancer, Nano Letters, XX, 2024', 
  //     caption: "Citations in 86",
  //     link: 'https://example.com/paper3' 
  //   } 
  // ];
//-------------------Sample backend-like data----------------------------------------- 

  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20; // adjust as needed

  useEffect(() => {
    axiosInstance.get(`journals/entries/?page=${currentPage}&search=${encodeURIComponent(searchTerm)}`)
      .then(res => {
        setEntries(res.data.results || []);
        setTotalPages(Math.ceil(res.data.count / itemsPerPage));
      })
      .catch(err => console.error('Error fetching entries:', err));
  }, [currentPage, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // reset page when search changes
  };

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
          <h1 className="font-semibold text-center leading-tight text-[60px] sm:text-[60px] md:text-[60px] lg:text-[70px] xl:text-[70px]">Journals</h1>
        </div>
      </div>

      <div className="px-6 py-8 max-w-7xl mx-auto text-center text-gray-900"> 
        {/* Metrics Block */}
        <Metrics/>

        {/* Search Filter */}
        <div className="mb-12">
          <input
            type="text"
            placeholder="Search journal topics..."
            className="px-4 py-2 w-full md:w-1/2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Journal Entries */}
        <div className="space-y-12">
          {entries.map(entry => (
            <div
              key={entry.id}
              className="bg-gray-50 shadow-md rounded-2xl overflow-hidden flex flex-col md:flex-row items-center md:items-start p-6 transform transition-transform duration-1000 hover:scale-[1.05] hover:shadow-xl"
            >
              <img
                src={entry.image}
                alt="journal visual"
                className="w-full md:w-[150px] h-auto object-cover rounded-xl"
              />
              <div className="md:ml-10 mt-6 md:mt-0 mr-4 md:mr-4 text-left text-gray-800 w-full">
                <p className='text-[20px]'>{entry.text}</p>
                <a
                  href={entry.link}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-4 right-4 text-blue-700 hover:text-purple-900"
                  title="View Journal"
                >
                  <FaLink size={30} />
                </a>
                <p className='mt-8 text-[15px]'>{entry.caption}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />

      </div>
    </div> 
  ); 
}

function Metrics()
{
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    axiosInstance.get('journals/metrics/')
    .then(res => setMetrics(res.data))
    .catch(err => console.error('Error fetching metrics:', err));
  }, []);

  return(

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 place-items-center mb-16">
      {metrics.map((metric) => (
        <div key={metric.id}>
          <h2 className="text-4xl font-semibold mb-3 capitalize">{metric.name}</h2>
          <p className="text-[60px] font-bold bg-gradient-to-r from-purple-400 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Journals;

