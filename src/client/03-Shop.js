import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import Navbar   from './01-Navbar'


class Shop extends Component {
	state = {
		shopList_Masks:  [], 
		shopList_Shirts: []
	}

	componentDidMount = () => {
		this.getProducts()
	}

	getProducts = _ => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].category_id == 1) {
                        this.setState({ shopList_Masks: this.state.shopList_Masks.concat(response.data[i]) })
                    }
                    else if (response.data[i].category_id == 2) {
                        this.setState({ shopList_Shirts: this.state.shopList_Shirts.concat(response.data[i]) })
                    }
                }
            })
            .catch(error => console.log(error))
	}
	
	item = product => {
        return (
			<button key={ product.product_id } class="shopItem">

				{ product.stockStatus_id === 1 ?
					<Link to={{ 
						pathname: `/product/${ product.product_id }`,
						productID: product.product_id
					}}>
						<img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;" />
					</Link>
				: 
					<img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;" />
				}

				<div class="shopItem_description">
					{ product.stockStatus_id === 1 ?
						<div>
							<h1>{ product.product_name }</h1>
							<p>P{ product.product_price }.00</p>
						</div>
					: 
						<div>
							<h1>{ product.product_name }</h1>
							<p>OUT OF STOCK</p>
						</div>
					}
				</div>

			</button>
        )
    }

	render() {
		const { shopList_Masks, shopList_Shirts } = this.state
		return (
			<div>
				<Navbar />

				<section id="shop">

					<section id="allProducts_header" class="productCategoryPage_header">
						<p>Soren Apparel</p>
						<Link to="/masks">  <div> Masks  </div> </Link>
						<Link to="/shirts"> <div> Shirts </div> </Link>
					</section>

					<div class="productsDisplay">

						<div>
							{ shopList_Masks.map(this.item) }
						</div>

						<div>
							{ shopList_Shirts.map(this.item) }
						</div>
						
					</div>

				</section>

				<footer>&#169; 2020 by Soren.</footer>

			</div>
		)
	}
}

export default Shop