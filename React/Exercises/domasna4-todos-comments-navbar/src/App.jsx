import {Navbar} from './components/Navbar'
import {Outlet} from 'react-router-dom'
export function App(){
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}