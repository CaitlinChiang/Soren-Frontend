import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'


class Navbar extends Component {
	
	// Mobile Menu Toggle
	mobileMenu_hide = () => document.getElementById('mobileMenuToggler').checked = false

	// Contact Us Toggle
	contact_visible = () => document.getElementById('contact').style.width = '370px'
	contact_hide    = () => document.getElementById('contact').style.width = '0px'

	render() {
		return (
			<header>
			
				<section class="desktopNavbar">
					
					<div class="logo"> 
						<img src="/images/logo.png" /> 
					</div>

					<ul>
						<li> <Link to="/#home">  <a href="#">Home</a>  </Link> </li>
						<li> <Link to="/#about"> <a href="#">About</a> </Link> </li>
						<li> <Link to="/shop">   <a href="#">Shop</a>  </Link> </li>
						<li> <Link> <a href="#" onClick={this.contact_visible}>Contact Us</a> </Link> </li>
					</ul>

					<div class="cart"> 
						<Link to="/cart"> <img src="/images/cart.png" /> </Link>
					</div>

				</section>

				<section class="contact" id="contact">

					<span class="contactClose" onClick={this.contact_hide}>&times;</span>

					<div>
						<h1>CONTACT US</h1>
						<p>sorenphilippines@gmail.com</p>
						<div>
							<a href="https://www.facebook.com/sorenapparel"><i class="fa fa-facebook" aria-hidden="true"></i></a>
							<a href="https://www.instagram.com/soren.ph/"><i class="fa fa-instagram" aria-hidden="true"></i></a>
						</div>
					</div>

				</section>



				<section class="mobileNavbar">

					<div class="logo"> 
						<img src="/images/logo.png" /> 
					</div>
					
					<div class="mobileMenuContainer">

						<input type="checkbox" class="mobileMenuToggler" id="mobileMenuToggler" />
						<div class="hamburger"><div></div></div>

						<div class="mobileMenu">
							<div>
								<div>

									<ul>
										<li> <Link to="/#home">  <a href="#" onClick={this.mobileMenu_hide}>Home</a>  </Link> </li>
										<li> <Link to="/#about"> <a href="#" onClick={this.mobileMenu_hide}>About</a> </Link> </li>
										<li> <Link to="/shop">   <a href="#" onClick={this.mobileMenu_hide}>Shop</a>  </Link> </li>
									</ul>

									<div>
										<p>sorenphilippines@gmail.com</p>
										<div>
											<a href="https://www.facebook.com/sorenapparel"><i class="fa fa-facebook" aria-hidden="true"></i></a>
											<a href="https://www.instagram.com/soren.ph/"><i class="fa fa-instagram" aria-hidden="true"></i></a>
										</div>
									</div>

								</div>
							</div>
						</div>

					</div>

					<div class="cart"> 
						<Link to="/cart"> <img src="/images/cart.png" /> </Link>
					</div>

				</section>

			</header>
		)
	}
}

export default Navbar