import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import Navbar from '../client/01-Navbar'

class Shirt_Products extends Component {
    state = {
        shirt_products: []
    }

    componentDidMount = _ => this.products_fetch()

    // Fetch Data
	products_fetch = _ => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].category_id == 2) {
                        this.setState({ shirt_products: this.state.shirt_products.concat(response.data[i]) })
                    }
                }
            })
	}
    
    // Render Data
	products_render = props => {
        return (
			<button key={props.product_id} class="shopItem">
				<Link to={{ 
                    pathname: `/products/${props.product_id}`,
                    productID: props.product_id
                }}>
                    <img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;" />
                </Link>

				<div class="shopItem_description">
					<h1>{props.product_name}</h1>
					<p>P{props.product_price}.00</p>
				</div>
			</button>
        )
    }

    render() {
        const { shirt_products } = this.state
        
        return (
            <div>
                <Navbar />

                <section id="shop">
                    <section id="shirtProducts_header" class="productCategoryPage_header">
                        <p>Shirt Collection</p>
                        <Link to="/products"> <div>All Products</div> </Link>
                        <Link to="/products/masks"> <div>Masks</div> </Link>
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

export default Shirt_Products