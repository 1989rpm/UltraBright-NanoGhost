import { useState, useEffect } from 'react';
import axios from "axios";
import bgrnd from '../assets/backs.png'

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

    const [Patent, setPatent] = useState([]);
    const [Trade_Marks, setTrade_Marks] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/patents/')
        .then(res => setPatent(res.data))
        .catch(err => console.error("Error fetching Lab Head", err));

        axios.get('http://127.0.0.1:8000/api/trade-marks/')
        .then(res => setTrade_Marks(res.data))
        .catch(err => console.error("Error fetching members", err));
    }, []);
    
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
                </div>

                {/* Trade Marks Section */}
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
                </div>
            </div>
        </div> 
    );
}

export default Patents;
