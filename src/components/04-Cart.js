import React, { Component } from 'react'


class Cart extends Component {
	state = {}

	render() {
		return (
			<div>
				<section id="cart">
					<div class="cartContent">

						<div class="box">
							<div class="imgBx">
								<img src="https://image.uniqlo.com/UQ/ST3/ph/imagesgoods/428148/item/phgoods_09_428148.jpg?width=1600&impolicy=quality_75" width="100%;"/>
							</div>

							<div class="content">
								<h1>Product Name</h1>
								<div>
									<p>Total Price</p>
									<p>Quantity</p>
									<p>Size</p>
									<p>Color</p>
								</div>
							</div>
						</div>

						<div class="box">
							<div class="imgBx">
								<img src="https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/428148/sub/goods_428148_sub1.jpg?width=1600&impolicy=quality_75" width="100%;"/>
							</div>

							<div class="content">
								<h1>Product Name</h1>
								<div>
									<p>Total Price</p>
									<p>Quantity</p>
									<p>Size</p>
									<p>Color</p>
								</div>
							</div>
						</div>

						<div class="box">
							<div class="imgBx">
								<img src="https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/428148/sub/goods_428148_sub2.jpg?width=1600&impolicy=quality_75" width="100%;"/>
							</div>

							<div class="content">
								<h1>Product Name</h1>
								<div>
									<p>Total Price</p>
									<p>Quantity</p>
									<p>Size</p>
									<p>Color</p>
								</div>
							</div>
						</div>

					</div>
				</section>
			</div>
		)
	}
}

export default Cart