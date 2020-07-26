import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'


// TEST
var cartItem = (
	<div class="cartItem">
		
		<span class="productClose">&times;</span>

		<div class="cartItemImage">
			<img src="https://image.uniqlo.com/UQ/ST3/us/imagesother/home/L3/200601_pc_L3_w_bestseller.jpg" width="100%;"/>
		</div>
		
		<div class="cartItemContent">
			<p>View Details</p>
			<div>
				<p>Total Price: P0.00</p>
				<p>Size: </p>
				<p>Color: </p>
			</div>
		</div>

		<div class="cartItemDetails">
			<p>Product Name</p>
			<p>x3</p>
		</div>

	</div>
)
// TEST

// Resposive Properties of the Cart Carousel
const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1220 },
		items: 3,
		slidesToSlide: 3
	},
	tablet: {
		breakpoint: { max: 1220, min: 850 },
		items: 2,
		slidesToSlide: 2
	}
}

class Cart extends Component {
	state = {
		cartList: [cartItem, cartItem, cartItem, cartItem]
	}

	render() {
		return (
			<div>
				
				<section id="cart">

					<div class="largeCartView">
						<Carousel containerClass="cartContent" responsive={responsive} infinite={true} swipeable={false} draggable={false}>
							{ this.state.cartList.map(product => product) }
						</Carousel>
					</div>

					<div class="smallCartView">
						{ this.state.cartList.map(product => product) }
					</div>

					<div class="cartOptionButtons">
						<Link to="/shop">  
							<a href="#"> <svg> <rect></rect> <rect></rect> </svg> Continue Shopping </a>
						</Link>

						<Link to="/order">  
							<a href="#"> <svg> <rect></rect> <rect></rect> </svg> Checkout </a>
						</Link>
					</div>

				</section>

				<footer>&#169; 2020 by Soren.</footer>

			</div>
		)
	}
}

export default Cart