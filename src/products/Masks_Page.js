import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'


class Mask_Products extends Component {
    state = {
        shopList_Masks: []
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
                }
            })
            .catch(error => console.log(error))
	}
	
	item = product => {
        return (
			<button key={ product.product_id } class="shopItem">

				<Link to={{ 
                    pathname: `/product/${ product.product_id }`,
                    productID: product.product_id
                }}>
                    <img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;" />
                </Link>

				<div class="shopItem_description">
					<h1>{ product.product_name }</h1>
					<p>P{ product.product_price }.00</p>
				</div>

			</button>
        )
    }

    render() {
        const { shopList_Masks } = this.state
        return (
            <div>
                
                <section id="shop">

                    <section id="maskProducts_header" class="productCategoryPage_header">
                        <p>Mask Collection</p>
                        <Link to="/shop">   <div> All Products </div> </Link>
                        <Link to="/shirts"> <div> Shirts       </div> </Link>
                    </section>

                    <div class="productsDisplay">
                        <div>
                            { shopList_Masks.map(this.item) }
                        </div>
                    </div>

                </section>

                <footer>&#169; 2020 by Soren.</footer>

            </div>
        )
    }
}

export default Mask_Products