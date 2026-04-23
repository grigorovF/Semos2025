import {useEffect, useState} from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {Posts} from './components/Posts';
import {Todos} from './components/Todos';
import {Comms} from './components/Comms'

export function App(){
    const [posts, setPosts] = useState([]);

    useEffect( () => {
        fetch("https://jsonplaceholder.typicode.com/posts")
        .then(res => res.json())
        .then(data => setPosts(data));
    }, []);

    
    return (
      <div className="container">
        <nav>
          <Link to="/">Posts</Link>
          <Link to="/todos">Todos</Link>
          <Link to="/posts"></Link>
        </nav>

        <Routes>
          <Route path="/" element={<Posts posts={posts} />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/posts/:id/comments" element={<Comms />} />
        </Routes>
      </div>
    );
}