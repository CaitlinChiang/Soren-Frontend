import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
	return (
		<header>
		
			<section class="desktopNavbar">
				<div class="logo"> <img src="/images/Soren_Logo.png" /> </div>
				<ul>
					<li> <Link to="/">        <a href="#home">Home</a>          </Link> </li>
					<li> <Link to="/">        <a href="#about">About</a>        </Link> </li>
					<li> <Link to="/shop">    <a href="#shop">Shop</a>          </Link> </li>
					<li> <Link to="/contact"> <a href="#contact">Contact Us</a> </Link> </li>
				</ul>
				<div class="cart"> <img src="/images/ShoppingCart.png" /> </div>
			</section>

			<section class="mobileNavbar">
				<div class="logo"> <img src="/images/Soren_Logo.png" /> </div>
				<div class="menu-wrap">
					<input type="checkbox" class="toggler" />

					<div class="hamburger"><div></div></div>

					<div class="menu">
						<div>
							<div>
								<ul>
									<li> <Link to="/">        <a href="#home">Home</a>          </Link> </li>
									<li> <Link to="/">        <a href="#about">About</a>        </Link> </li>
									<li> <Link to="/shop">    <a href="#shop">Shop</a>          </Link> </li>
									<li> <Link to="/contact"> <a href="#contact">Contact Us</a> </Link> </li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="cart"> <img src="/images/ShoppingCart.png" /> </div>
			</section>

		</header>
	)
}

export default Navbar