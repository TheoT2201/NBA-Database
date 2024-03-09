import { Link } from 'react-router-dom';
import logo from './nba.svg';

const Navbar = () => {
    return ( 
        <nav className="navbar">
            <img src={logo} alt="" style={{
                height: '70px'
            }} />
            <div className="links">
                <Link to="/">Teams</Link>
                <Link to="/jucatori">Players</Link>
                <Link to="/antrenori">Coaches</Link>
                <Link to="/meciuri">Games</Link>
                <Link to="/arene">Arenas</Link>
                <Link to="/simple">Simple Queries</Link>
                <Link to="/complexe">Complex Queries</Link>
            </div>
        </nav>
    );
}

export default Navbar;