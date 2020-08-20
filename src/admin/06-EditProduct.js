import React, { Component } from 'react'
import '../admin_css/06-EditProduct.css'

class EditProduct extends Component {
    state = {
        // Data
        productID: this.props.location.productID,
        product: [],
        productDetails_sizes: [],
        productDetails_colors: [],

        categories: [],
        sizes: [],
        colors: [],
        stocks: [],

        // Product Details
        name: '',
        category: '',
        price: '',
        stock: '',
        productSizes: [],
        productColors: []
    }

    componentDidMount = () => {
        this.product_fetch()
        this.productDetails_fetch()
        this.categories_fetch()
        this.stocks_fetch()
        this.sizes_fetch()
        this.colors_fetch()
    }

    // Fetch Data
    product_fetch = _ => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].product_id === this.state.productID) {
                        this.setState({ product: this.state.product.concat(response.data[i]) })
                    }
                }
            })
    }

    productDetails_fetch = _ => {
        fetch('http://localhost:5000/product_details')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].product_id === this.state.productID) {
                        if (!this.state.productDetails_sizes.includes(response.data[i].detail_size)) {
                            this.setState({ productDetails_sizes: this.state.productDetails_sizes.concat(response.data[i].detail_size) })
                        }
                        // change spelling of detail down the line
                        if (!this.state.productDetails_colors.includes(response.data[i].deatil_color)) {
                            this.setState({ productDetails_colors: this.state.productDetails_colors.concat(response.data[i].deatil_color) })
                        }
                    }
                }
            })
    }

    categories_fetch = _ => {
        fetch('http://localhost:5000/product_categories')
            .then(response => response.json())
            .then(response => this.setState({ categories: response.data }))
    }

    stocks_fetch = _ => {
        fetch('http://localhost:5000/stock_status')
            .then(response => response.json())
            .then(response => this.setState({ stocks: response.data }))
    }

    sizes_fetch = _ => {
        fetch('http://localhost:5000/product_sizes')
            .then(response => response.json())
            .then(response => this.setState({ sizes: response.data }))
    }

    colors_fetch = _ => {
        fetch('http://localhost:5000/product_colors')
            .then(response => response.json())
            .then(response => this.setState({ colors: response.data }))
    }

    // Render Data
    product_render = props => {
        const { productDetails_sizes, productDetails_colors } = this.state

        return (
            <div key={props.product_id}>
                <div>{props.product_name}</div>
                <div>{props.category_id}</div>
                <div>P{props.product_price}.00</div>
                <div>{props.stockStatus_id}</div>
                <div>Sizes: { productDetails_sizes.map(item => <p>{item}</p>) }</div>
                <div>Colors: { productDetails_colors.map(item => <p>{item}</p>) }</div>
            </div>
        )
    }

    // Update Data
    product_update = _ => {
        const { productID, name, category, price, stock } = this.state

        fetch(`http://localhost:5000/products/update/${productID}?categoryID=${category}&productName=${name}&productPrice=${price}&stockStatus=${stock}`)
            .then(response => response.json())

        this.productDetails_update()
    }

    productDetails_update = _ => {
        const { productID, productSizes, productColors } = this.state

        fetch(`http://localhost:5000/product_details/delete/${productID}`)
            .then(response => response.json())
            .then(this.remove)

        for (let i = 0; i < productSizes.length; i++) {
            for (let j = 0; j < productColors.length; j++) {
                fetch(`http://localhost:5000/product_details/add?productID=${productID}&size=${productSizes[i]}&color=${productColors[j]}`)
                    .then(response => response.json())
            }
        }

        this.clear()
        this.product_fetch()
        this.productDetails_fetch()
    }

    // Helper Functions
    handleChange = event => {
		event.preventDefault()
		const { name, value } = event.target
        this.setState({ [name]: value })
    }

    remove = _ => {
        this.setState({ 
            product: [],
            productDetails_sizes: [],
            productDetails_colors: []
        })
    }

    clear = _ => {
        this.setState({
            name: '',
            category: '',
            price: '',
            stock: '',
            productSizes: [],
            productColors: []
        })
    }

    render() {
        const { product, name, category, price, stock, productSizes, productColors, categories, stocks, sizes, colors } = this.state

        return (
            <section id="admin_editProduct">
                <div class="currentDetails">
                    <h3>CURRENT DETAILS</h3>
                    { product.map(this.product_render) }
                </div>

                <div class="editProduct" id="editProduct">
                    <h3>EDIT DETAILS</h3>

                    <input type="text" value={name} name="name" onChange={this.handleChange} placeholder="Product Name" autoComplete="off" required />
                    
                    <select value={category} name="category" onChange={this.handleChange} required >
                        <option value="">-- Select Product Category --</option>
                        { categories.map(item => <option value={item.category_id}>{item.category_name}</option>) }
                    </select>

                    <input type="number" step="0.01" value={price} name="price" onChange={this.handleChange} placeholder="Price (ex. 100.00)" required />

                    <select value={stock} name="stock" onChange={this.handleChange} required >
                        <option value="">-- Select Stock Status --</option>
                        { stocks.map(item => <option value={item.stockStatus_id}>{item.stockStatus_label}</option>) }
                    </select>
                    
                    <div>
                        <p>Sizes: { productSizes.map(item => <p>{item}</p>) }</p>
                        { sizes.map(item => <button onClick={() => this.setState({ productSizes: this.state.productSizes.concat(item.size_label) })}>{item.size_label}</button>) }
                    </div> <br />

                    <div>
                        <p>Colors: { productColors.map(item => <p>{item}</p>) }</p>
                        { colors.map(item => <button onClick={() => this.setState({ productColors: this.state.productColors.concat(item.color_name) })} style={{ background: `${item.color_name}` }}>{item.size_label}</button>) }
                    </div> <br/>

                    <button onClick={() => this.clear()}>RESTART</button>
                    <button type="submit" onClick={() => this.product_update()}>SAVE CHANGES</button>
                    <button>DELETE PRODUCT</button>
                </div>
            </section>
        )
    }
}

export default EditProduct