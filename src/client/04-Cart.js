import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import '../client_css/04-Cart.css'
import Navbar from './01-Navbar'

class Cart extends Component {
	state = {
		cart: this.props.cart
	}

	// Render Data
	cart_render = props => {
		return (
			<div key={props.timestamp} class="cartItem">
				<span class="cartItemClose" onClick={() => this.props.updateCart_delete(props.timestamp)}>&times;</span>

				<div class="cartItemImage">
					<img src="https://image.uniqlo.com/UQ/ST3/us/imagesother/home/L3/200601_pc_L3_w_bestseller.jpg" width="100%;"/>
				</div>
				
				<div class="cartItemContent">
					<p>View Details</p>
					<div>
						<p>Total Price: P{props.price}.00</p>
						<p>Size: {props.size}</p>
						<p>Color: {props.color}</p>
					</div>
				</div>

				<div class="cartItemDetails">
					<p>{props.name}</p>
					<p>x{props.quantity}</p>
				</div>
			</div>
		)	
	}

	render() {
		const { cart } = this.state

		const responsive = {
			desktop: {
				breakpoint: { max: 3000, min: 1220 },
				items: 3,
				slidesToSlide: 3
			}
		}

		return (
			<div>
				<Navbar />

				<section id="cart">
					<div class="desktopCartView">
						<Carousel containerClass="cartContent" responsive={responsive} infinite={false} swipeable={false} draggable={false}>
							{ cart.map(this.cart_render) }
						</Carousel>
					</div>

					<div class="mobileCartView">
						{ cart.map(this.cart_render) }
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