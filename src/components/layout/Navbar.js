import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Navbar = ({ location }) => {
	
	return (
		<nav className='navbar  sticky-top mb-5'>
			<Link
				to='/'
				className='navbar-brand mb-0 mx-auto poke-font'
				style={{ fontSize: '30px' }}
			>
				Pokedex
			</Link>
			<Link to="/caught"
			   className='navbar-brand mb-0 mx-auto poke-font'>Caught Pokemons
			</Link>
			{!location.pathname.startsWith('/pokemon') && (
				<form action='' className='form-inline'>
					
				</form>
			)}
		</nav>
	);
};

export default withRouter(Navbar);


