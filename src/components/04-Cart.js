import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'


var cartItem = (
	<div class="cartItem">
		
		<span class="productClose">&times;</span>

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

class Cart extends Component {
	state = {
		cartList: [cartItem, cartItem, cartItem, cartItem],
		x: 0
	 }

	// Product Display Carousel
	desktopCart_left  = () => {
		if (this.state.x === 0) {
			this.setState({ x: -300 * ( this.state.cartList.length - Math.floor(this.state.cartList.length * (2 / 3) + 1) ) })
		}
		else {
			this.setState({ x: this.state.x + 300 })
		} 
	}

	desktopCart_right = () => { 
		if (this.state.x === -300 * ( this.state.cartList.length - Math.floor(this.state.cartList.length * (2 / 3) + 1) )) {
			this.setState({ x: 0 })
		} 
		else {
			this.setState({ x: this.state.x - 300 }) 
		}
	}

	render() {
		return (
			<div>
				
				<section id="cart">

					<div class="cartContent">
						{ this.state.cartList.map((product) => <div class="productSection" style={{ transform: `translateX(${this.state.x}%)` }}> { product } </div> )}
					</div>

					<div>
						<button class="cartLeftArrow"  onClick={this.desktopCart_left}> &#8592;</button>
						<button class="cartRightArrow" onClick={this.desktopCart_right}>&#8594;</button>
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