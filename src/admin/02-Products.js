import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'


// PLACEHOLDER
var product = (
	<div class="productItem">

		<img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;"/>
		
		<div class="productItem_description">
			<h1>Product Name</h1>
		</div>

	</div>
)
// PLACEHOLDER


class Products extends Component {
    state = {
        productsList_Masks:  [product, product, product, product, product, product, product, product],
        productsList_Shirts: [product, product, product, product, product, product, product, product],

        arrangement: '',
        category: ''
    }

    handleChange = event => {
        event.preventDefault()
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    render() {
        return (
            <section id="admin_products">
                <div class="products">

                    <div>
                        <Link to="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/add_product"> + </Link>
                    </div>

                    <select value={this.state.arrangement} name="arrangement" onChange={this.handleChange}>
                        <option value="">-- Arrangement --</option>
                        <option value="Old_to_New"> Oldest to Newest </option>
                        <option value="New_to_Old"> Newest to Oldest </option>
                    </select>
                    
                    <select value={this.state.category} name="category" onChange={this.handleChange}>
                        <option value="">-- Category --</option>
                        <option value="Masks">  Masks  </option>
                        <option value="Shirts"> Shirts </option>
                    </select>

                    <div>
                        { this.state.productsList_Masks.map(item => item) }
                    </div>

                    <div>
                        { this.state.productsList_Shirts.map(item => item) }
                    </div>

                </div>
            </section>
        )
    }
}

export default Products