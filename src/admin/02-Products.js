import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import '../admin_css/02-Products.css'

class Products extends Component {
    state = {
        arrangement: 'New_to_Old',
        category: '',

        // Data
        shirt_products: [],
        productImages: [],
        categories: []
    }

    componentDidMount = _ => {
        this.products_fetch()
        this.productImages_fetch()
        this.categories_fetch()
    }

    // Fetch Data
    products_fetch = _ => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].category_id === 2) {
                        this.setState({ shirt_products: this.state.shirt_products.concat(response.data[i]) })
                    }
                }
            })
    }

    productImages_fetch = _ => {
        fetch('http://localhost:5000/product_photos')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
					this.setState({ productImages: this.state.productImages.concat(response.data[i]) })
                }
            })
    }

    categories_fetch = _ => {
        fetch('http://localhost:5000/categories')
            .then(response => response.json())
            .then(response => this.setState({ categories: response.data }) )
    }

    // Render Data
    products_render = props => {
        const image = _ => {
			return this.state.productImages.map(item => {
				if (item.product_id === props.product_id && item.url_photo === "front") {
					return <img src={item.url_link} width="100%;" />
				}
			})
		}

        return (
            <div key={props.product_id} class="productItem">
                <Link to={{ 
                    pathname: `mzU4d@tjEacsXzBUKKhwaqtSMY6YVq6ursAnE9L4Xrr725ZcVRKWysVJUZC7DBQE7xky3PbVQU8Dq3q@534fgdgjtsryhhgjlkhynkolhjZAvppAZ/${props.product_id}`,
                    productID: props.product_id
                }}>
                    {image()}
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
        this.handleChange(event)

        this.state.shirt_products.reverse()
    }

    render() {
        const { arrangement, category, categories, shirt_products } = this.state

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
                        { categories.map(item => <option value={item.category_id}>{item.category_name}</option>) }
                    </select>
                    
                    { this.state.category === "" || this.state.category === "2" ? 
                        <div>
                            { shirt_products.map(this.products_render) }
                        </div>
                    : null }
                </div>
            </section>
        )
    }
}

export default Products