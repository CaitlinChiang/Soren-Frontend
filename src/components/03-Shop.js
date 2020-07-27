import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'


// TEST
var shopItem = (
	<button class="shopItem">

		<img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;"/>
		
		<div class="productDescription">
			<h1>Product Name</h1>
			<p>P0.00 (Price)</p>
		</div>

		<div class="shopCarouselDescription">
			<p>Product Name</p>
			<p>P0.00</p>
			<p>Color:</p>
			<p>Size: </p>
			<p>Quantitiy: </p>
			<button>Add to Cart</button>
		</div>

	</button>
)
// TEST

// Resposive Properties of the Cart Carousel
const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 0 },
		items: 1,
		slidesToSlide: 1
	}
}

class Shop extends Component {
	state = {
		shopList: [shopItem, shopItem, shopItem, shopItem],
		showCarousel: false
	}

	render() {
		return (
			<div>
				
				<section id="shop">

					<section id="allProducts_header" class="productPage_header">
						<p>Soren Apparel</p>
						<Link to="/masks">  <div> Masks  </div> </Link>
						<Link to="/shirts"> <div> Shirts </div> </Link>
					</section>

					<div class="productDisplay">

						{/* Test -> Options should be coming from database */}
						<div>
							{ this.state.shopList.map(item => item) }
						</div>

						<div>
							{ this.state.shopList.map(item => item) }
						</div>
						{/* Test */}

						{ this.state.showCarousel === true ?
							<div class="shopCarousel">
								<Carousel containerClass="shopSlider" responsive={responsive} infinite={true} swipeable={false} draggable={false}>
									{ this.state.shopList.map(item => item) }
								</Carousel>
							</div>
						: null }

					</div>

				</section>

				<footer>&#169; 2020 by Soren.</footer>

			</div>
		)
	}
}

export default Shop