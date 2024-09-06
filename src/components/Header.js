import './style.css'
import { Link } from 'react-router-dom';


function Header() {
    return (
        <div className="header">
            <div className='imgtitle'>

                <h4>Employee Management System</h4>
            </div>
            <div className='links'>
                <Link
                    to="/home"
                    className='link'
                >
                    Home
                </Link>
                <Link
                    to="/create"
                    className='link'
                >
                    Create Employee
                </Link>

                <Link
                    to="/show"
                    className='link'

                >
                    Show Employee
                </Link>
            </div>

        </div>
    );
}

export default Header;
