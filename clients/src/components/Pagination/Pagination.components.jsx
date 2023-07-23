import React,{useState,useEffect} from 'react'
import Cards from '../Cards/Cards.component';
import Navbar from '../Navbar/Navbar.component';
import { getRecipes } from '../../redux/actions/actions';
import { useDispatch} from 'react-redux';
import style from './Pagination.module.css'

export default function Pagination({allRecipes}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [paginatedRecipes, setPaginatedRecipes] = useState([]);
    const [search, setSearch] = useState("");
    
    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        setCurrentPage(1)
        dispatch(getRecipes(search))
    };

    const paginateRecipes = (recipes, pageNumber, pageSize) => {
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return recipes.slice(startIndex, endIndex);
      };

    useEffect(() => {
        if (allRecipes.length >= 0) {
          const paginated = paginateRecipes(allRecipes, currentPage, 9);
          setPaginatedRecipes(paginated);
        }
      }, [allRecipes, currentPage]);
    
      const goToPreviousPage = () => {
        setCurrentPage(currentPage - 1);
      };
    
      const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
      };
      const rest = (e)=>{
        const {value} = e.target;
        setCurrentPage(Number(value))
      }
      const totalPages = Math.ceil(allRecipes.length /9);
      const p = [];

      for (let i = 0; i < totalPages; i++) {
        p.push(i+1)
      }
  return (
    <div>
        <Navbar handleChange={handleChange} handleSubmit={handleSubmit} setCurrentPage={setCurrentPage}/>
        <br />
        <div className={style.container}>
          <button disabled={currentPage===1} onClick={goToPreviousPage}>{'<'}</button>
          <div className={style.containerPags}>
            {p && p.map((pag)=>{
            return<button  key={pag} value={pag} onClick={rest} className={pag===currentPage?style.actualPage:style.page}> {pag} 
            </button>
          })}
          </div>
          

          <button disabled={currentPage===totalPages || allRecipes.length==0} onClick={goToNextPage}>{'>'}</button>
        </div>
        <br />
        {allRecipes.length ? <Cards allRecipes={paginatedRecipes}/>:<h1>No hay reccetas con la descripcion hecha</h1>}
        
    </div>
  )
}
