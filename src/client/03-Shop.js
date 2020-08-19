import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import '../client_css/03-Shop.css'
import Navbar from './01-Navbar'

class Shop extends Component {
	state = {
		mask_products:  [], 
		shirt_products: []
	}

	componentDidMount = _ => this.products_fetch()

	// Fetch Data
	products_fetch = _ => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].category_id == 1) {
                        this.setState({ mask_products: this.state.mask_products.concat(response.data[i]) })
                    }
                    else if (response.data[i].category_id == 2) {
                        this.setState({ shirt_products: this.state.shirt_products.concat(response.data[i]) })
                    }
                }
            })
    }
	
	// Render Data
	productItem_render = props => {
		const ImageRedirect = _ => {
			if (props.stockStatus_id === 1) {
				return (
					<Link to={{ 
						pathname: `/products/${props.product_id}`,
						productID: props.product_id
					}}>
						<img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;" />
					</Link>
				)
			}
			else return <img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;" />
		}

		const ItemDescription = _ => {
			if (props.stockStatus_id === 1) {
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
					{ ItemDescription() }
				</div>
			</button>
        )
    }

	render() {
		const { mask_products, shirt_products } = this.state

		return (
			<div>
				<Navbar />

				<section id="shop">
					<section id="allProducts_header" class="productCategoryPage_header">
						<p>Soren Apparel</p>
						<Link to="/products/masks"> <div>Masks</div> </Link>
						<Link to="/products/shirts"> <div>Shirts</div> </Link>
					</section>

					<div class="productsDisplay">
						<div>
							{ mask_products.map(this.productItem_render) } 
						</div>

						<div>
							{ shirt_products.map(this.productItem_render) }
						</div>
					</div>
				</section>

				<footer>&#169; 2020 by Soren.</footer>
			</div>
		)
	}
}

export default Shop