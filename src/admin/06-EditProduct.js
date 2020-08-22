import React, { Component } from 'react'
import '../admin_css/06-EditProduct.css'

class EditProduct extends Component {
    state = {
        // Data
        productID: this.props.location.productID,
        product: [],
        productVariants_sizes: [],
        productVariants_colors: [],

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
        fetch('http://localhost:5000/products_variants')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].product_id === this.state.productID) {
                        if (!this.state.productVariants_sizes.includes(response.data[i].size_id)) {
                            this.setState({ productVariants_sizes: this.state.productVariants_sizes.concat(response.data[i]) })
                        }

                        if (!this.state.productVariants_colors.includes(response.data[i].color_id)) {
                            this.setState({ productVariants_colors: this.state.productVariants_colors.concat(response.data[i]) })
                        }
                    }
                }
            })
    }

    categories_fetch = _ => {
        fetch('http://localhost:5000/categories')
            .then(response => response.json())
            .then(response => this.setState({ categories: response.data }))
    }

    stocks_fetch = _ => {
        fetch('http://localhost:5000/product_stocks')
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
        const { productVariants_sizes, productVariants_colors } = this.state

        return (
            <div key={props.product_id}>
                <div>{props.product_name}</div>
                <div>{props.category_id}</div>
                <div>P{props.product_price}.00</div>
                <div>{props.stock_id}</div>
                <div>Sizes: { productVariants_sizes.map(item => <p>{item.size_name}</p>) }</div>
                <div>Colors: { productVariants_colors.map(item => <p>{item.color_name}</p>) }</div>
            </div>
        )
    }

    // Update Data
    product_update = _ => {
        const { productID, name, category, price, stock } = this.state

        fetch(`http://localhost:5000/products/update/${productID}?product_category=${category}&name=${name}&price=${price}&stock=${stock}`)
            .then(response => response.json())

        this.productDetails_update()
    }

    productDetails_update = _ => {
        const { productID, productSizes, productColors } = this.state

        fetch(`http://localhost:5000/products_variants/delete/${productID}`)
            .then(response => response.json())
            .then(this.remove)

        for (let i = 0; i < productSizes.length; i++) {
            for (let j = 0; j < productColors.length; j++) {
                fetch(`http://localhost:5000/products_variants/add?product_id=${productID}&size=${productSizes[i].size_id}&color=${productColors[j].color_id}`)
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
            productVariants_sizes: [],
            productVariants_colors: []
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

                <div id="editProduct" class="editProduct">
                    <h3>EDIT DETAILS</h3>

                    <input type="text" value={name} name="name" onChange={this.handleChange} placeholder="Product Name" autoComplete="off" required />
                    
                    <select value={category} name="category" onChange={this.handleChange} required >
                        <option value="">-- Select Product Category --</option>
                        { categories.map(item => <option value={item.category_id}>{item.category_name}</option>) }
                    </select>

                    <input type="number" step="0.01" value={price} name="price" onChange={this.handleChange} placeholder="Price (ex. 100.00)" required />

                    <select value={stock} name="stock" onChange={this.handleChange} required >
                        <option value="">-- Select Stock Status --</option>
                        { stocks.map(item => <option value={item.stock_id}>{item.stock_status}</option>) }
                    </select>
                    
                    <div>
                        <p>Sizes: { productSizes.map(item => <p>{item.size_name}</p>) }</p>
                        { sizes.map(item => <button onClick={() => this.setState({ productSizes: this.state.productSizes.concat(item) })}>{item.size_name}</button>) }
                    </div> <br />

                    <div>
                        <p>Colors: { productColors.map(item => <p>{item.color_name}</p>) }</p>
                        { colors.map(item => <button onClick={() => this.setState({ productColors: this.state.productColors.concat(item) })} style={{ background: `${item.color_name}` }}></button>) }
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