import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'


class Cart extends Component {
	state = { }

	// TEST
	item = () => {
		return (
			<div class="cartItem">

				<div class="cartItemImage">
					<img src="https://image.uniqlo.com/UQ/ST3/ph/imagesgoods/428148/item/phgoods_09_428148.jpg?width=1600&impolicy=quality_75" width="100%;"/>
				</div>
		
				<div class="cartItemContent">
					<h1>Product Name</h1>
					<p>(View Details)</p>
					<div>
						<p>Total Price: P0.00</p>
						<p>Quantity: </p>
						<p>Size: </p>
						<p>Color: </p>
					</div>
				</div>

			</div>
		)
	}
	// TEST

	render() {
		return (
			<div>
				
				<section id="cart">

					<div class="cartContent">
						{/* Test -> Options should be coming from database */}
						{ this.item() }
						{ this.item() }
						{ this.item() }  
						{/* Test */}
					</div>
					
					<button> <Link to="/shop">  <a href="#">Continue Shopping</a> </Link> </button>
					<button> <Link to="/order"> <a href="#">Checkout</a>          </Link> </button>
				
				</section>

				<footer>&#169; 2020 by Soren.</footer>

			</div>
		)
	}
}

export default Cart