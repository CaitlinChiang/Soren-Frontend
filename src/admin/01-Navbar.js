import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'


class Navbar extends Component {

	// Mobile Menu Toggle
	mobileMenu_hide = () => document.getElementById('mobileMenuToggler').checked = false

	render() {
		return (
			<header>
			
				<section class="desktopNavbar">
					
					<div class="logo"> 
						<img src="/images/logo.png" /> 
					</div>

					<ul>
						<li> <Link to="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ">         Products  </Link> </li>
						<li> <Link to="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/orders">  Orders    </Link> </li>
						<li> <Link to="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/others">  Others    </Link> </li>
					</ul>

				</section>



				<section class="mobileNavbar">

					<div class="logo"> 
						<img src="/images/logo.png" /> 
					</div>
					
					<div class="mobileMenuContainer" id="admin_mobileMenuContainer">

						<input type="checkbox" class="mobileMenuToggler" id="mobileMenuToggler" />
						<div class="hamburger"><div></div></div>

						<div class="mobileMenu">
							<div>
								<div>
                                    <ul>
                                        <li> <Link to="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ"        onClick={this.mobileMenu_hide}>  Products  </Link> </li>
                                        <li> <Link to="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/orders" onClick={this.mobileMenu_hide}>  Orders    </Link> </li>
                                        <li> <Link to="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/others" onClick={this.mobileMenu_hide}>  Others    </Link> </li>
                                    </ul>
								</div>
							</div>
						</div>

					</div>

				</section>

			</header>
		)
	}
}

export default Navbar