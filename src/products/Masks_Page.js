import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'


// PLACEHOLDER
var shopItem = (
	<button class="shopItem">

		<img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;"/>
		
		<div class="shopItem_description">
			<h1>Product Name</h1>
			<p>P0.00 (Price)</p>
		</div>

	</button>
)
// PLACEHOLDER

// ShopItem const that accepts props from database for rendering


class Mask_Products extends Component {
    state = {
        shopList_Masks: [shopItem, shopItem, shopItem, shopItem] // PLACEHOLDER
    }

    // Function that maps through the shopList_Masks array & returns the ShopItem const with its props + key

    render() {
        return (
            <div>
                
                <section id="shop">

                    <section id="maskProducts_header" class="productCategoryPage_header">
                        <p>Mask Collection</p>
                        <Link to="/shop">   <div> All Products </div> </Link>
                        <Link to="/shirts"> <div> Shirts       </div> </Link>
                    </section>

                    <div class="productsDisplay">

                        {/* PLACEHOLDER */}
                        <div>
                            { this.state.shopList_Masks.map(item => item) }
                        </div>
                        {/* PLACEHOLDER */}

                    </div>

                </section>

                <footer>&#169; 2020 by Soren.</footer>

            </div>
        )
    }
}

export default Mask_Products