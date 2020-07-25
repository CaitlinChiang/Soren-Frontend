import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'


class Shop extends Component {

	// TEST
	item = () => {
		return (
			<button>

				<img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;"/>
				
				<div class="productDescription">
					<h1>Product Name</h1>
					<p>P0.00 (Price)</p>
				</div>
				
			</button>
		)
	}
	// TEST

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
							{ this.item() }
							{ this.item() }
							{ this.item() }
							{ this.item() }
						</div>

						<div>
							{ this.item() }
							{ this.item() }
							{ this.item() }
							{ this.item() }
						</div>
						{/* Test */}

					</div>

				</section>

				<footer>&#169; 2020 by Soren.</footer>

			</div>
		)
	}
}

export default Shop