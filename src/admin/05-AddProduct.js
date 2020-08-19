import React, { Component } from 'react'
import '../admin_css/05-AddProduct.css'

class AddProduct extends Component {
    state = { 
        name: '',
        category: '',
        price: '',
        sizes: [],
        colors: [],

        productID: '',

        productCategories: [],
        getSizes: [],
        getColors: []
    }

    componentDidMount = () => {
        this.getCategories()
        this.getSizes()
        this.getColors()

        this.getProductID()
    }

    handleChange = (event) => {
		event.preventDefault()
		const { name, value } = event.target
        this.setState({ [name]: value })
    }

    clear = () => {
        this.setState({
            name: '',
            category: '',
            price: '',
            sizes: [],
            colors: [],
            productID: ''
        })
    }

    // Fetch Data
    getCategories = _ => {
        fetch('http://localhost:5000/product_categories')
            .then(response => response.json())
            .then(response => this.setState({ productCategories: response.data }))
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

    // Obtain product ID
    getProductID = _ => {
        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(response => this.setState({ productID: response.data[0].product_id + 1 }))
            .catch(error => console.log(error))
    }

    // Add Product
    addProduct = () => {
        // make it this.state
       if (this.state.name !== '' && this.state.category !== '' && this.state.price !== '' && this.state.sizes !== '' && this.state.colors !== '') {

            fetch(`http://localhost:5000/products/add?productCategory=${this.state.category}&productName=${this.state.name}&productPrice=${this.state.price}`)
                .then(response => response.json())
                .then(this.getProductID())
                .catch(error => console.log(error))

            for (let i = 0; i < this.state.sizes.length; i++) {
                for (let j = 0; j < this.state.colors.length; j++) {
                    fetch(`http://localhost:5000/product_details/add?productID=${this.state.productID}&size=${this.state.sizes[i]}&color=${this.state.colors[j]}`)
                        .then(response => response.json())
                        .catch(error => console.log(error))
                }
            }

            this.clear()
       }
    }


    render() {
        return (
            <section id="admin_addProduct">
                <div class="editProduct">

                    <input type="text" value={this.state.name} name="name" onChange={this.handleChange} placeholder="Product Name"  autoComplete="off" />
                    
                    <select value={this.state.category} name="category" onChange={this.handleChange} >
                        <option value="">-- Select Product Category --</option>
                        { this.state.productCategories.map(item => <option value={item.category_id}>{item.category_name}</option>) }
                    </select>

                    <input type="number" step="0.01" value={this.state.price} name="price" onChange={this.handleChange} placeholder="Price (ex. 100.00)"  />
                    
                    <div>
                        <p>Sizes: { this.state.sizes.map(item => <p>{ item }</p>) }</p>
                        { this.state.getSizes.map(item => <button onClick={() => this.setState({ sizes: this.state.sizes.concat(item.size_label) })}>{ item.size_label }</button>) }
                    </div> <br />

                    <div>
                        <p>Colors: { this.state.colors.map(item => <p>{ item }</p>) }</p>
                        { this.state.getColors.map(item => <button onClick={() => this.setState({ colors: this.state.colors.concat(item.color_name) })} style={{ background: `${item.color_name}` }}>{ item.size_label }</button>) }

                    </div> <br/>

                    <button onClick={() => this.clear()}>RESTART</button>
                    <button onClick={() => this.addProduct()}>ADD PRODUCT</button>

                </div>
            </section>
        )
    }
}

export default AddProduct