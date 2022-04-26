import React, { useState, useEffect, useRef } from 'react';
import "./Home.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import BusinessList from "../../components/BusinessList/BusinessList";

export default function Home() {
    const [businessesState, setBusinesses] = useState([]);
    // const [pressed, setPressed] = useState(false);
    const [error, setError] = useState('');
    const initialRender = useRef(true);

    const [page, setPage] = useState(0);

    const [term, setTerm] = useState('');
    const [location, setLocation] = useState('');
    const [sortBy, setSortBy] = useState('');

    const page_size = 12;
    const offset = page * page_size;

  const searchYelp = async () => {
    const url = `http://localhost:5000/searchYelp/?term=${term}&location=${location}&sortby=${sortBy}&limit=${page_size}&offset=${offset}`;

    let response = await fetch(url, { mode: "cors" });
    console.log('response', response)

    let jsonResponse = await response.json();
    console.log('response222', jsonResponse)

    if (jsonResponse.error) {
      setError(jsonResponse.error.description);
    }
    
    // записывает в массив в state, множество объектов
    if (jsonResponse.businesses) {
      if (jsonResponse.businesses.length !==0) {
        await setBusinesses(
          jsonResponse.businesses.map((business) => {
            return {
              id: business.id,
              imageSrc: business.image_url,
              name: business.name,
              address: business.location.address1,
              city: business.location.city,
              state: business.location.state,
              zipCode: business.location.zip_code,
              category: business.categories[0].title,
              rating: business.rating,
              reviewCount: business.review_count,
            };
          })
        );
      } else {
        setError('Nothing found');
      }
    } 
    console.log("businessesState", businessesState);
  };

  const handlePrevPage = () => {
    setPage(page - 1);
  }
  const handleNextPage = () => {
    console.log('handleNextPage')
    setPage(page + 1);
  }
  
  // useEffect(() => {
  //   if (initialRender.current) {
  //     initialRender.current = false;
  //   } else {
  //     setPressed(true);
  //   }
  // }, [press]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (term !== '' && location !== '') {
      searchYelp();
    } else {
      setError('Please type in search terms and try again');
    }
    
  }, [page, term, location, sortBy])


  return (
    <div className="HomePage">
        <h1>ravenous</h1>
        <SearchBar setTerm={setTerm} setLocation={setLocation} setSortBy={setSortBy} searchYelp={searchYelp} />
        <BusinessList businesses={businessesState}/>
        {businessesState.length > 0 && <div className='pagination'>
          {page > 0 && <div style={{cursor: 'pointer', marginRight: '1rem', color: 'green'}} onClick={handlePrevPage}>Prev</div>}
          <div>{`Page ${page + 1}`}</div>
          <div style={{cursor: 'pointer', marginLeft: '1rem', color: 'green'}} onClick={handleNextPage}>Next</div>
        </div>}
        {error !=='' && <div>{error}</div>}
      </div>
  )
}
