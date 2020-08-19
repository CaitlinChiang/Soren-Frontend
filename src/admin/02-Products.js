import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import '../admin_css/02-Products.css'

class Products extends Component {
    state = {
        productsList_Masks:  [],
        productsList_Shirts: [],

        productCategories: [],

        arrangement: 'New_to_Old',
        category: ''
    }

    componentDidMount = () => {
        this.getProducts()
        this.getCategories()
    }

    getProducts = _ => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].category_id == 1) {
                        this.setState({ productsList_Masks: this.state.productsList_Masks.concat(response.data[i]) })
                    }
                    else if (response.data[i].category_id == 2) {
                        this.setState({ productsList_Shirts: this.state.productsList_Shirts.concat(response.data[i]) })
                    }
                }
            })
            .catch(error => console.log(error))
    }

    getCategories = _ => {
        fetch('http://localhost:5000/product_categories')
            .then(response => response.json())
            .then(response => this.setState({ productCategories: response.data }))
            .catch(error => console.log(error))
    }

    item = product => {
        return (
            <div key={ product.product_id } class="productItem">

                <Link to={{ 
                    pathname: `mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/${ product.product_id }`,
                    productID: product.product_id
                }}>
                    <img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;" />
                </Link>
                
                <div class="productItem_description">
                    <h1>{ product.product_name }</h1>
                </div>

            </div>
        )
    }

    handleChange = event => {
        event.preventDefault()
        const {name, value} = event.target
        this.setState({ [name]: value })
    }

    reverseArrangement = event => {
        this.handleChange(event)

        this.state.productsList_Masks.reverse()
        this.state.productsList_Shirts.reverse()
    }

    render() {
        const { productsList_Masks, productsList_Shirts } = this.state
        return (
            <section id="admin_products">
                <div class="products">

                    <div>
                        <Link to="/mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/add_product"> + </Link>
                    </div>

                    <select value={this.state.arrangement} name="arrangement" onChange={this.reverseArrangement}>
                        <option value="Old_to_New"> Oldest to Newest </option>
                        <option value="New_to_Old"> Newest to Oldest </option>
                    </select>
                    
                    <select value={this.state.category} name="category" onChange={this.handleChange}>
                        <option value="">All</option>
                        { this.state.productCategories.map(item => <option value={item.category_id}>{item.category_name}</option>) }
                    </select>

                    { this.state.category === "" || this.state.category === "1" ? 
                        <div>
                            { productsList_Masks.map(this.item) }
                        </div>
                    : null }
                    
                    { this.state.category === "" || this.state.category === "2" ? 
                        <div>
                            { productsList_Shirts.map(this.item) }
                        </div>
                    : null }

                </div>
            </section>
        )
    }
}

export default Products