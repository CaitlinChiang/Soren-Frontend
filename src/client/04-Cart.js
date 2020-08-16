import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import Navbar   from './01-Navbar'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'


// Resposive Properties of the Cart Carousel
const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1220 },
		items: 3,
		slidesToSlide: 3
	}
}


class Cart extends Component {
	state = {
		cartList: this.props.cart
	}

	item = (cartItem) => {
		return (
			<div key={cartItem.timestamp} class="cartItem">
		
				<span class="cartItemClose" onClick={() => this.removeItem(cartItem.timestamp)}>&times;</span>

				<div class="cartItemImage">
					<img src="https://image.uniqlo.com/UQ/ST3/us/imagesother/home/L3/200601_pc_L3_w_bestseller.jpg" width="100%;"/>
				</div>
				
				<div class="cartItemContent">
					<p>View Details</p>
					<div>
						<p>Total Price: P{cartItem.price}.00</p>
						<p>Size: {cartItem.size}</p>
						<p>Color: {cartItem.color}</p>
					</div>
				</div>

				<div class="cartItemDetails">
					<p>{cartItem.name}</p>
					<p>x{cartItem.quantity}</p>
				</div>

			</div>
		)	
	}

	removeItem = (timestamp) => {
		this.props.updateCart_delete(timestamp)

		this.renderList()
	}

	renderList = () => {
		const { cartList } = this.state

		return cartList.map(this.item)
	}

	render() {
		const { cartList } = this.state
		return (
			<div>
				<Navbar />
				<section id="cart">

					<div class="desktopCartView">
						<Carousel containerClass="cartContent" responsive={responsive} infinite={true} swipeable={false} draggable={false}>
							{ this.renderList() }
						</Carousel>
					</div>

					<div class="mobileCartView">
						{ this.renderList() }
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