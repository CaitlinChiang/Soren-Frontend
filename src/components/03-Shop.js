import React, { Component } from 'react'


class Shop extends Component {
	state = {
		category: 'All'
	}

	handleChange = (event) => {
		event.preventDefault()
		const { name, value } = event.target
		this.setState({ [name]: value })
	}

	render() {
		return (
			<div>
				<section id="shop">

					<select onChange={this.handleChange} value={this.state.category} name="category">
						<option value="All">All Items</option>
						
						{/* Test -> Options should be coming from database */}
						<option value="Masks">Masks</option>
						<option value="Shirts">Shirts</option>
						{/* Test */}
					</select>

					<div class="productDisplay">

						<div>
							{/* Test -> Options should be coming from database */}
							<div class="category"> <h2>Masks</h2> </div>

							<button>
						    	<img src="https://image.uniqlo.com/UQ/ST3/ph/imagesgoods/428148/item/phgoods_09_428148.jpg?width=1600&impolicy=quality_75" width="100%;"/>
								<div class="productDescription">
									<h1>Product Name</h1>
									<p>P0.00 (Price)</p>
								</div>
							</button>

							<button>
								<img src="https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/428148/sub/goods_428148_sub1.jpg?width=1600&impolicy=quality_75" width="100%;"/>
								<div class="productDescription">
									<h1>Product Name</h1>
									<p>P0.00 (Price)</p>
								</div>
							</button>

							<button>
						    	<img src="https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/428148/sub/goods_428148_sub2.jpg?width=1600&impolicy=quality_75" width="100%;"/>
								<div class="productDescription">
									<h1>Product Name</h1>
									<p>P0.00 (Price)</p>
								</div>
							</button>

							<button>
						    	<img src="https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/428148/sub/goods_428148_sub3.jpg?width=1600&impolicy=quality_75" width="100%;"/>
								<div class="productDescription">
									<h1>Product Name</h1>
									<p>P0.00 (Price)</p>
								</div>
							</button>
						</div>

						<div>
							<div class="category"> <h2>Shirts</h2> </div>

							<button>
						    	<img src="/images/Soren_Logo.png" width="100%;"/>
								<div class="productDescription">
									<h1>Product Name</h1>
									<p>P0.00 (Price)</p>
								</div>
							</button>

							<button>
						    	<img src="/images/Soren_Logo.png" width="100%;"/>
								<div class="productDescription">
									<h1>Product Name</h1>
									<p>P0.00 (Price)</p>
								</div>
							</button>

							<button>
						    	<img src="/images/Soren_Logo.png" width="100%;"/>
								<div class="productDescription">
									<h1>Product Name</h1>
									<p>P0.00 (Price)</p>
								</div>
							</button>

							<button>
						    	<img src="/images/Soren_Logo.png" width="100%;"/>
								<div class="productDescription">
									<h1>Product Name</h1>
									<p>P0.00 (Price)</p>
								</div>
							</button>
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