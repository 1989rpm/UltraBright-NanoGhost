import { useState, useEffect } from 'react';
import axiosInstance from '../api/axios';
import bgrnd from '../assets/backs.png'
import Pagination from '../components/Pagination';

function Patents() 
{

//------------------------------SAMPLE---DATA--------------------------------------------------------------------------
    // const Patent = 
    // [ 
    //     { 
    //         id: 1, 
    //         text: '"Rajendra and inventors, Polycaprolactone based plasmonic nanoshells and method of preparation thereof (359768)' 
    //     }, 
    //     { 
    //         id: 2, 
    //         text: '"Rajendra and inventors, Gold nanobipyramids based plasmonic biosensor and a method thereof for detection of glutathione (202021033612)' 
    //     } 
    // ];
    // const Trade_Marks = 
    // [ 
    //     { 
    //         id: 1, 
    //         text: 'ORGOSPUNG® Trademark, 2110 (5767475)' 
    //     }, 
    //     { 
    //         id: 2, 
    //         text: 'NanobioXil®, Trademark,  4399683, 4399684, 4399685, 4399686 and 4399687' 
    //     } 
    // ];
//------------------------------SAMPLE---DATA--------------------------------------------------------------------------

    
    return( 
        <div>
            <div className="relative h-[300px] sm:h-[300px] overflow-hidden">
                <img
                    src={bgrnd}
                    alt= "background"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="relative z-10 bg-black bg-opacity-30 flex flex-col items-center justify-center h-full text-white px-4">
                {/* Heading */} 
                <h1 className="font-semibold text-center leading-tight text-[60px] sm:text-[60px] md:text-[70px] lg:text-[70px] xl:text-[80px]">Patents</h1>
                </div>
            </div>   
            <div className="px-6 py-16 max-w-6xl mx-auto text-gray-900">         
                {/* Patents Section */}
                    <Patent/>

                {/* Trade Marks Section */}
                    <TradeMark/>
            </div>
        </div> 
    );
}

function Patent()
{
    const [Patent, setPatent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 20; // adjust as needed

    useEffect(() => {
        axiosInstance.get(`patents/?page=${currentPage}`)
        .then(res => {
            setPatent(res.data.results || []);
            setTotalPages(Math.ceil(res.data.count / itemsPerPage));
        })
        .catch(err => console.error("Error fetching Lab Head", err));
    }, [currentPage]);

    return(
        <div className="mb-16">
            <h2 className="text-6xl font-semibold mb-8 text-left md:text-left text-purple-800">National and International Patents</h2>
            <div className="space-y-6">
            {Patent.map(Patent => (
                <div
                key={Patent.id}
                className="bg-gray-50 p-6 rounded-xl shadow-md transform transition-transform duration-1000 hover:scale-[1.05]"
                >
                <p className="text-lg text-gray-800">{Patent.description}</p>
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
    );
}

function TradeMark()
{
    const [Trade_Marks, setTrade_Marks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 20; // adjust as needed

    useEffect(() => {
        axiosInstance.get(`trade-marks/?page=${currentPage}`)
        .then(res => {
            setTrade_Marks(res.data.results || []);
            setTotalPages(Math.ceil(res.data.count / itemsPerPage));
        })
        .catch(err => console.error("Error fetching members", err));
    }, [currentPage]);
    
    return(
        <div>
            <h2 className="text-6xl font-semibold mb-8 text-left md:text-left text-purple-800">Trade Marks</h2>
            <div className="space-y-6">
                {Trade_Marks.map(Trade_Marks => (
                    <div
                    key={Trade_Marks.id}
                    className="bg-gray-50 p-6 rounded-xl shadow-md transform transitition-transform duration-1000 hover:scale-[1.05]"
                    >
                        <p className="text-lg text-gray-800">{Trade_Marks.description}</p>
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
    );
}

export default Patents;
