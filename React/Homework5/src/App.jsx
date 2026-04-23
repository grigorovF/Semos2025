import {useEffect, useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {Posts} from './components/Posts';
import {Todos} from './components/Todos';

export function App(){
    const [posts, setPosts] = useState([]);

    useEffect( () => {
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => setPosts(data));
    }, []);

    
    return (
      <div className='container'>
  
        <nav>
          <Link to="/">Posts</Link>
          <Link to="/todos">Todos</Link>
        </nav>
  
        <Routes>
          <Route path="/" element={<Posts posts={posts} />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
  
      </div>
    );
}