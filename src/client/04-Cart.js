import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import '../client_css/04-Cart.css'

class Cart extends Component {
	state = {
		cart: this.props.cart,

		// Data
		productImages: [],
		sizes: [],
		colors: []
	}

	componentDidMount = _ => {
		this.productImages_fetch()
		this.sizes_fetch()
		this.colors_fetch()
	}

	// Fetch Data
	productImages_fetch = _ => {
        fetch('http://localhost:5000/product_photos')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
					this.setState({ productImages: this.state.productImages.concat(response.data[i]) })
                }
            })
    }

	sizes_fetch = _ => {
        fetch('http://localhost:5000/product_sizes')
            .then(response => response.json())
            .then(response => this.setState({ sizes: response.data }))
    }

    colors_fetch = _ => {
        fetch('http://localhost:5000/product_colors')
            .then(response => response.json())
            .then(response => this.setState({ colors: response.data }))
    }

	// Render Data
	cart_render = props => {
		const { sizes, colors } = this.state

		const image = _ => {
			return this.state.productImages.map(item => {
				if (item.product_id === props.id && item.url_photo === "front") {
					return <img src={item.url_link} width="100%;" />
				}
			})
		}

		const display_size = _ => {
            for (let i = 0; i < sizes.length; i++) {
                if (sizes[i].size_id === props.size) {
                    return sizes[i].size_name
                }
            }
		}
		
		const display_color = _ => {
            for (let i = 0; i < colors.length; i++) {
                if (colors[i].color_id === props.color) {
                    return colors[i].color_name
                }
            }
        }

		return (
			<div key={props.timestamp} class="cartItem">
				<span class="cartItemClose" onClick={() => this.props.updateCart_delete(props.timestamp)}>&times;</span>

				<div class="cartItemImage">
					{image()}
				</div>
				
				<div class="cartItemContent">
					<p>View Details</p>
					<div>
						<p>Total Price: P{props.price}.00</p>
						<p>Size: {display_size()}</p>
						<p>Color: {display_color()}</p>
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
				<section id="cart">
					<div class="desktopCartView"> 
						<Carousel containerClass="cartContent" responsive={responsive} infinite={false} swipeable={false} draggable={false}>
							{ cart == null ? '' : cart.map(this.cart_render) }
						</Carousel>
					</div>
				
					<div class="mobileCartView">
						{ cart == null ? <p>Cart is empty.</p> : cart.map(this.cart_render) }
					</div>

					<div class="cartOptionButtons">
						<Link to="/products">  
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