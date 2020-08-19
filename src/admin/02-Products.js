import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import '../admin_css/02-Products.css'

class Products extends Component {
    state = {
        arrangement: 'New_to_Old',
        category: '',

        // Data
        mask_products: [],
        shirt_products: [],
        productCategories: []
    }

    componentDidMount = _ => {
        this.products_fetch()
        this.categories_fetch()
    }

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

    categories_fetch = _ => {
        fetch('http://localhost:5000/product_categories')
            .then(response => response.json())
            .then(response => this.setState({ productCategories: response.data }))
    }

    // Render Data
    productItem_render = props => {
        return (
            <div key={props.product_id} class="productItem">
                <Link to={{ 
                    pathname: `mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/${props.product_id}`,
                    productID: props.product_id
                }}>
                    <img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;" />
                </Link>
                
                <div class="productItem_description">
                    <h1>{props.product_name}</h1>
                </div>
            </div>
        )
    }

    // Helper Functions
    handleChange = event => {
        event.preventDefault()
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    reverseArrangement = event => {
        const { mask_products, shirt_products } = this.state

        this.handleChange(event)

        mask_products.reverse()
        shirt_products.reverse()
    }

    render() {
        const { arrangement, category, productCategories, mask_products, shirt_products } = this.state

        return (
            <section id="admin_products">
                <div class="products">
                    <div>
                        <Link to="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/add_product"> + </Link>
                    </div>

                    <select value={arrangement} name="arrangement" onChange={this.reverseArrangement}>
                        <option value="Old_to_New"> Oldest to Newest </option>
                        <option value="New_to_Old"> Newest to Oldest </option>
                    </select>
                    
                    <select value={category} name="category" onChange={this.handleChange}>
                        <option value="">All</option>
                        { productCategories.map(item => <option value={item.category_id}>{item.category_name}</option>) }
                    </select>

                    { this.state.category === "" || this.state.category === "1" ? 
                        <div>
                            { mask_products.map(this.productItem_render) }
                        </div>
                    : null }
                    
                    { this.state.category === "" || this.state.category === "2" ? 
                        <div>
                            { shirt_products.map(this.productItem_render) }
                        </div>
                    : null }
                </div>
            </section>
        )
    }
}

export default Products