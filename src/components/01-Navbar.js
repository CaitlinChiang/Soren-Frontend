import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'


class Navbar extends Component {
	state = {}

	render() {
		return (
			<header>
			
				<section class="desktopNavbar">
					<div class="logo"> <img src="/images/Soren_Logo.png" /> </div>
					<ul>
						<li> <Link to="/#home">   <a href="#">Home</a>       </Link> </li>
						<li> <Link to="/#about">  <a href="#">About</a>      </Link> </li>
						<li> <Link to="/shop">    <a href="#">Shop</a>       </Link> </li>
						<li> <Link to="/contact"> <a href="#">Contact Us</a> </Link> </li>
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
										<li> <Link to="/#home">   <a href="#">Home</a>       </Link> </li>
										<li> <Link to="/#about">  <a href="#">About</a>      </Link> </li>
										<li> <Link to="/shop">    <a href="#">Shop</a>       </Link> </li>
										<li> <Link to="/contact"> <a href="#">Contact Us</a> </Link> </li>
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
}

export default Navbar