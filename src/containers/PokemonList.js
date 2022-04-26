import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { GetPokemonList } from '../actions/PokemonActions';
import { Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';



const PokemonList=(props)=>{
 const [search, setSearch] = useState("");
 const navi = useNavigate();
 const dispatch=useDispatch();
 const PokemonList=useSelector((state)=>state.PokemonList);
 React.useEffect(()=>{
   FetchData(1);
  },[]);
 const FetchData=(page=1)=>{
   dispatch(GetPokemonList(page))
  }
  const ShowData=()=>{
   if (!_.isEmpty(PokemonList.data)){
     return (
       <div className={'list-wrapper'}>
         {PokemonList.data.map((el)=>{
           return(
            <div className={'pokemon-item'}>
             <p>{el.name}</p>
             <Link to={`/pokemon/${el.name}`}>View</Link>
            </div>
            )
         })}
         </div>
     )
   }    
   if (PokemonList.loading){
     return <p>Loading...</p>
   }
   if (PokemonList.errorMsg!==''){
     return <p>{PokemonList.errorMsg}</p>
   }
   return <p>Unable to get data</p>

 }
 return (
   <div>
      <div className="search-wrapper">
        <p>Search: </p>
        <input type="text" onChange={(e) => setSearch(e.target.value)} />
        <button onClick={() => navi(`/pokemon/${search}`)}>
          Search
        </button>
      </div>
      {ShowData()}
      {!_.isEmpty(PokemonList.data) && (
        <ReactPaginate
          pageCount={Math.ceil(PokemonList.count / 15)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={(data) => FetchData(data.selected + 1)}
          containerClassName="pagination"
        />
      )}
    </div>
  );
};

export default PokemonList;
