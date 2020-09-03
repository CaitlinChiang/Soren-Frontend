import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import '../client_css/03-Shop.css'

class Shop extends Component {
	state = {
		shirt_products: [],
		productImages: []
	}

	componentDidMount = _ => {
		this.products_fetch()
		this.productImages_fetch()
	}

	// Fetch Data
	products_fetch = _ => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].category_id === 2) {
                        this.setState({ shirt_products: this.state.shirt_products.concat(response.data[i]) })
                    }
                }
            })
	}
	
	productImages_fetch = _ => {
        fetch('http://localhost:5000/product_photos')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
					this.setState({ productImages: this.state.productImages.concat(response.data[i]) })
                }
            })
    }
	
	// Render Data
	products_render = props => {
		const image = _ => {
			return this.state.productImages.map(item => {
				if (item.product_id === props.product_id && item.url_photo === "front") {
					return <img src={item.url_link} width="100%;" />
				}
			})
		}

		const ImageRedirect = _ => {
			if (props.stock_id === 1) {
				return (
					<Link to={{ 
						pathname: `/products/${props.product_id}`,
						productID: props.product_id
					}}>
						{image()}
					</Link>
				)
			}
			else return image()
		}

		const ProductDescription = _ => {
			if (props.stock_id === 1) {
				return (
					<div>
						<h1>{props.product_name}</h1>
						<p>P{props.product_price}.00</p>
					</div>
				)
			}
			else {
				return (
					<div>
						<h1>{props.product_name}</h1>
						<p>OUT OF STOCK</p>
					</div>
				)
			}
		}
		
        return (
			<button key={props.product_id} class="shopItem">
				{ ImageRedirect() } 
				
				<div class="shopItem_description">
					{ ProductDescription() }
				</div>
			</button>
        )
    }

	render() {
		const { shirt_products } = this.state

		return (
			<div>
				<section id="shop">
					<section id="allProducts_header" class="productCategoryPage_header">
						<p>Soren Apparel</p>
					</section>

					<div class="productsDisplay">
						<div>
							{ shirt_products.map(this.products_render) }
						</div>
					</div>
				</section>

				<footer>&#169; 2020 by Soren.</footer>
			</div>
		)
	}
}

export default Shop