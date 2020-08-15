import React, { Component } from 'react'


class EditProduct extends Component {
    state = { 
        name: '',
        category: '',
        price: '',
        stock: '',
        sizes: [],
        colors: [],

        productCategories: [],
        getSizes: [],
        getColors: [],
        getStocks: [],

        products: [],
        productDetails_sizes: [],
        productDetails_colors: [],
        productID: this.props.location.productID
    }

    componentDidMount = () => {
        this.getProducts()
        this.getProductDetails()
        this.getCategories()
        this.getStocks()
        this.getSizes()
        this.getColors()
    }

    handleChange = (event) => {
		event.preventDefault()
		const { name, value } = event.target
        this.setState({ [name]: value })
    }

    // Fetch Data
    getProducts = _ => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].product_id === this.state.productID) {
                        this.setState({ products: this.state.products.concat(response.data[i]) })
                    }
                }
            })
            .catch(error => console.log(error))
    }

    getProductDetails = _ => {
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
            .catch(error => console.log(error))
    }

    getCategories = _ => {
        fetch('http://localhost:5000/product_categories')
            .then(response => response.json())
            .then(response => this.setState({ productCategories: response.data }))
            .catch(error => console.log(error))
    }

    getStocks = _ => {
        fetch('http://localhost:5000/stock_status')
            .then(response => response.json())
            .then(response => this.setState({ getStocks: response.data }))
            .catch(error => console.log(error))
    }

    getSizes = _ => {
        fetch('http://localhost:5000/product_sizes')
            .then(response => response.json())
            .then(response => this.setState({ getSizes: response.data }))
            .catch(error => console.log(error))
    }

    getColors = _ => {
        fetch('http://localhost:5000/product_colors')
            .then(response => response.json())
            .then(response => this.setState({ getColors: response.data }))
            .catch(error => console.log(error))
    }

    // Update Product
    updateProduct = () => {
        const { productID, category, name, price, stock } = this.state
        fetch(`http://localhost:5000/products/update/${productID}?categoryID=${category}&productName=${name}&productPrice=${price}&stockStatus=${stock}`)
            .then(response => response.json())
            .catch(error => console.log(error))

        this.updateProductDetails()
    }

    updateProductDetails = () => {
        const { productID, sizes, colors } = this.state

        fetch(`http://localhost:5000/product_details/delete/${productID}`)
            .then(response => response.json())
            .then(this.remove)
            .catch(error => console.log(error))

        for (let i = 0; i < sizes.length; i++) {
            for (let j = 0; j < colors.length; j++) {
                fetch(`http://localhost:5000/product_details/add?productID=${productID}&size=${sizes[i]}&color=${colors[j]}`)
                    .then(response => response.json())
                    .catch(error => console.log(error))
            }
        }

        this.clear()
        this.getProducts()
        this.getProductDetails()
    }

    remove = () => {
        this.setState({ 
            products: [],
            productDetails_sizes: [],
            productDetails_colors: []
        })
    }

    clear = () => {
        this.setState({
            name: '',
            category: '',
            price: '',
            stock: '',
            sizes: [],
            colors: []
        })
    }

    item = product => {
        return (
            <div key={ product.product_id }>
                <div>{ product.product_name }</div>
                <div>{ product.category_id }</div>
                <div>P{ product.product_price }.00</div>
                <div>{ product.stockStatus_id }</div>
                <div>Sizes: { this.state.productDetails_sizes.map(item => <p>{item}</p>) }</div>
                <div>Colors: { this.state.productDetails_colors.map(item => <p>{item}</p>) }</div>
            </div>
        )
    }

    render() {
        const { products } = this.state
        return (
            <section id="admin_editProduct">

                <div class="currentDetails">
                    <h3>CURRENT DETAILS</h3>
                    { products.map(this.item) }
                </div>

                <div class="editProduct" id="editProduct">

                    <h3>EDIT DETAILS</h3>

                    <input type="text" value={this.state.name} name="name" onChange={this.handleChange} placeholder="Product Name"  autoComplete="off" />
                    
                    <select value={this.state.category} name="category" onChange={this.handleChange} >
                        <option value="">-- Select Product Category --</option>
                        { this.state.productCategories.map(item => <option value={item.category_id}>{item.category_name}</option>) }
                    </select>

                    <input type="number" step="0.01" value={this.state.price} name="price" onChange={this.handleChange} placeholder="Price (ex. 100.00)"  />

                    <select value={this.state.stock} name="stock" onChange={this.handleChange} >
                        <option value="">-- Select Stock Status --</option>
                        { this.state.getStocks.map(item => <option value={item.stockStatus_id}>{item.stockStatus_label}</option>) }
                    </select>
                    
                    <div>
                        <p>Sizes: { this.state.sizes.map(item => <p>{ item }</p>) }</p>
                        { this.state.getSizes.map(item => <button onClick={() => this.setState({ sizes: this.state.sizes.concat(item.size_label) })}>{ item.size_label }</button>) }
                    </div> <br />

                    <div>
                        <p>Colors: { this.state.colors.map(item => <p>{ item }</p>) }</p>
                        { this.state.getColors.map(item => <button onClick={() => this.setState({ colors: this.state.colors.concat(item.color_name) })} style={{ background: `${item.color_name}` }}>{ item.size_label }</button>) }
                    </div> <br/>

                    <button onClick={() => this.clear()}>RESTART</button>
                    <button onClick={() => this.updateProduct()}>SAVE CHANGES</button>
                    <button>DELETE PRODUCT</button>
                    
                </div>
                
            </section>
        )
    }
}

export default EditProduct