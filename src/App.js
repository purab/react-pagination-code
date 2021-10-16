import React, {useState, useEffect} from 'react';
import './App.css';
import './pagination.css';
import ReactPaginate from "react-paginate";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [sortDir,setSortDir]= "asc";  

  const postsPerPage = 5;
  const pagesVisited = pageNumber * postsPerPage;

//This code will work with spring boot or other rest api
//total pages might need set as per your rest api
  const findAllPosts = () => {
          fetch("https://jsonplaceholder.typicode.com/posts?pageNumber="+
                pageNumber +
                "&pageSize=" +
                postsPerPage +
                "&sortBy=id&sortDir=" +
                sortDir
            )
            .then(res => res.json())
            .then(        
              (result) => {
                console.log(result);
                setIsLoaded(true);
                setPosts(result);
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                setIsLoaded(true);
                setError(error);
              }
            )
  }
  const displayPosts = posts
    .slice(pagesVisited, pagesVisited + postsPerPage)
    .map((post) => {
      return (
        <div className="post" key={post.id}>
          <p>{post.id}</p>
          <p>{post.title}</p>          
        </div>
      );
    });

  //total pages might need set as per your rest api
  const pageCount = Math.ceil(posts.length / postsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    findAllPosts();
  };

  useEffect(() => {
    findAllPosts()
  }, [])
 

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="App">
        {displayPosts}
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    ); 
  }
   
}

export default App;
