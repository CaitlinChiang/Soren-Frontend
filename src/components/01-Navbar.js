import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'


class Navbar extends Component {
	state = {
		contact_visibility: true
	}

	showContactUs = () => { this.setState({ contact_visibility: true }) }

	render() {
		return (
			<header>
			
				<section class="desktopNavbar">
					<div class="logo"> <img src="/images/Soren_Logo.png" /> </div>
					<ul>
						<li> <Link to="/#home">   <a href="#">Home</a>       </Link> </li>
						<li> <Link to="/#about">  <a href="#">About</a>      </Link> </li>
						<li> <Link to="/shop">    <a href="#">Shop</a>       </Link> </li>
						<li> <Link>               <a href="#">Contact Us</a> </Link> </li>
					</ul>
					<div class="cart"> 
						<Link to="/cart"> <img src="/images/ShoppingCart.png" /> </Link>
					</div>
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
										<li> <Link>               <a href="#">Contact Us</a> </Link> </li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="cart"> 
						<Link to="/cart"> <img src="/images/ShoppingCart.png" /> </Link>
					</div>
				</section>



				{this.state.contact_visibility === true ?
					<section class="contactSidebar">
						<div>
							<h1>CONTACT US</h1>
							<p>sorenphilippines@gmail.com</p>
							{ /*
								Add Social Media Icons
								Close Button Animation
							*/ }
						</div>
					</section>
				: null}

			</header>
		)
	}
}

export default Navbar