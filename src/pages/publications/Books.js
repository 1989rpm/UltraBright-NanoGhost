import { useState, useEffect } from 'react';
import bgrnd from '../../assets/backs.png'
import axiosInstance from '../../api/axios';
//import Pagination from '../../components/Pagination';
import DOMPurify from 'dompurify';

function Books() 
{

//------------------------------SAMPLE---DATA--------------------------------------------------------------------------
    // const books = 
    // [ 
    //     { 
    //         id: 1, 
    //         text: '"Theranostic Applications of Nanomedicine" – Published by Elsevier, 2021' 
    //     }, 
    //     { 
    //         id: 2, 
    //         text: '"Nanomaterials for Cancer Therapy and Imaging" – Springer Nature, 2020' 
    //     } 
    // ];
    // const bookChapters = 
    // [ 
    //     { 
    //         id: 1, 
    //         text: 'Chapter: "Liposomal Formulations in Cancer Therapy" in "Advances in Drug Delivery" – Wiley, 2022' 
    //     }, 
    //     { 
    //         id: 2, 
    //         text: 'Chapter: "Nanoscale Imaging Techniques" in "Modern Biomedical Imaging" – CRC Press, 2021' 
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
                <h1 className="font-semibold text-center leading-tight text-[40px] sm:text-[40px] md:text-[60px] lg:text-[70px] xl:text-[70px]">Books & Chapters</h1>
                </div>
            </div>    
            <div className="px-6 py-16 max-w-6xl mx-auto text-gray-900"> 
                {/* Books Section */}
                    <Book/>

                {/* Book Chapters Section */}
                    <Chapters/>
            </div>
        </div>
    );
}

function Book()
{
    const [books, setBooks] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
    // const itemsPerPage = 20; // adjust as needed

    useEffect(() => {
        axiosInstance.get(`books/`)
        .then(res => {
            setBooks(res.data || []);
            // setTotalPages(Math.ceil(res.data.count / itemsPerPage));
        })
        .catch(err => console.error("Error fetching Lab Head", err));
    }, []);

    return(
        <div className="mb-16">
            <h2 className="text-6xl font-semibold mb-8 text-left md:text-left text-purple-800">Books</h2>
            <div className="space-y-6">
            {books.map(book => {
                const sanitizedbooks = DOMPurify.sanitize(book.description);
                return(
                    <div
                    key={book.id}
                    className="bg-gray-50 p-6 rounded-xl shadow-md transform transition-transform duration-1000 hover:scale-[1.05]"
                    >
                    <div className="text-lg text-gray-800" dangerouslySetInnerHTML={{ __html: sanitizedbooks}} />
                    </div>
            )})}
            </div>

            {/* Pagination */}
            {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            /> */}

        </div>
    );
}

function Chapters()
{
    const [bookChapters, setBookChapters] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(1);
    // const itemsPerPage = 20; // adjust as needed

    useEffect(() => {
        axiosInstance.get(`book-chapters/`)
        .then(res => {
            setBookChapters(res.data || []);
            // setTotalPages(Math.ceil(res.data.count / itemsPerPage));
        })
        .catch(err => console.error("Error fetching members", err));
    }, []);
    
    return(
        <div>
            <h2 className="text-6xl font-semibold mb-8 text-left md:text-left text-purple-800">Book Chapters</h2>
            <div className="space-y-6">
                {bookChapters.map(chapter => {
                    const sanitizedchapter = DOMPurify.sanitize(chapter.description);
                    return (
                        <div
                        key={chapter.id}
                        className="bg-gray-50 p-6 rounded-xl shadow-md transform transitition-transform duration-1000 hover:scale-[1.05]"
                        >
                            <div className="text-lg text-gray-800" dangerouslySetInnerHTML={{ __html: sanitizedchapter}}/>
                        </div>
                )})}
            </div>

            {/* Pagination */}
            {/* <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            /> */}
        </div>
    );
}

export default Books;
