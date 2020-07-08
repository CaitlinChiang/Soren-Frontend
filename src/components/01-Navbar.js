import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
	return (
		<header>
			
			<div class="logo"> 
				<img src="/images/Soren_Logo.png" /> 
			</div>

			<ul>
				<li> <Link to="/"><a href="#">Home</a></Link> </li>

				<li> <Link to="/"><a href="#">About</a></Link> </li>

				<li> <Link to="/shop"><a href="#">Shop</a></Link> </li>

				<li> <Link to="/contact"><a href="#">Contact Us</a></Link> </li>
			</ul>

			<div class="cart"> 
				<img src="/images/ShoppingCart.png" /> 
			</div>

		</header>
	)
}

export default Navbar