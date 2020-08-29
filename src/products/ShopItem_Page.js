import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import Navbar from '../client/01-Navbar'
import helpers from '../client/helper'

class ShopItem extends Component {
    state = {
        productID: this.props.location.productID,
        cart: this.props.cart,
        
        // Data
        product: [],
        productVariants_sizes: [],
        productVariants_colors: [],
        sizes: [],
        colors: [],

        // Product Details
        size: '',
        color: '',
        quantity: ''
    }

    componentWillMount = _ => {
        if (this.props.location.productID === undefined) {
            var productID = JSON.parse(localStorage.getItem("product_id"))
            this.setState({ productID })
        }
    }

    componentDidMount = _ => {
        const { productID } = this.state

        if (productID !== undefined) {
            localStorage.setItem("product_id", JSON.stringify(productID))
        }

        this.product_fetch()
        this.productDetails_fetch()
        this.sizes_fetch()
        this.colors_fetch()
    }

    // Fetch Data
    product_fetch = _ => {
        const { productID, product } = this.state

        fetch('http://localhost:5000/products')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].product_id === productID) {
                        this.setState({ product: product.concat(response.data[i]) })
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
                            this.setState({ productVariants_sizes: this.state.productVariants_sizes.concat(response.data[i].size_id) })
                        }

                        if (!this.state.productVariants_colors.includes(response.data[i].color_id)) {
                            this.setState({ productVariants_colors: this.state.productVariants_colors.concat(response.data[i].color_id) })
                        }
                    }
                }
            })
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
        const { productVariants_sizes, productVariants_colors, sizes, colors, size, color, quantity } = this.state

        const product_sizes = _ => {
            return productVariants_sizes.map(item => {
                for (let i = 0; i < sizes.length; i++) {
                    if (sizes[i].size_id === item) {
                        return <button onClick={() => this.setState({ size: item })}>{sizes[i].size_name}</button>
                    }
                }
            })
        }

        const display_size = _ => {
            for (let i = 0; i < sizes.length; i++) {
                if (sizes[i].size_id === size) {
                    return sizes[i].size_name
                }
            }
        }

        const product_colors = _ => {
            return productVariants_colors.map(item => {
                for (let i = 0; i < colors.length; i++) {
                    if (colors[i].color_id === item) {
                        return <button onClick={() => this.setState({ color: item })} style={{ background: `${colors[i].color_name}` }}></button>
                    }
                }
            })
        }

        const display_color = _ => {
            for (let i = 0; i < colors.length; i++) {
                if (colors[i].color_id === color) {
                    return colors[i].color_name
                }
            }
        }

        return (
            <div key={props.product_id} class="individualItem">
                <img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;"/>
                
                <div class="orderItem">
                    <div>
                        <h1>{props.product_name}</h1>
                        <p>P{props.product_price}.00</p>
                    </div> <br/>
                    
                    <div>
                        <p>Size: {display_size()}</p>
                        {product_sizes()}
                    </div> <br />

                    <div>
                        <p>Color: {display_color()}</p>
                        {product_colors()}
                    </div> <br/>

                    <div>
                        <p>Quantity: {quantity}</p>
                        <select onChange={this.handleChange} name="quantity" value={quantity}> 
                            <option value="">--Quantity--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </div>

                    <button onClick={() => this.product_add(props.product_id, props.product_name, props.product_price)}>Add To Cart</button>
                </div>
            </div>
        )
    }

    // Save Data
    product_add = (id, name, price) => {
        const { size, color, quantity } = this.state

        let timestamp = helpers.timestamp()
        let finalPrice = price * quantity

        let cartItem = {
            timestamp: timestamp,
            id: id,
            name: name,
            price: finalPrice,
            size: size,
            color: color,
            quantity: quantity,
        }
        
        if (size !== '' && color !== '' && price !== '') {
            this.props.updateCart_add(cartItem)

            this.clear()
        }
        else alert("Please fill in all item details.")
    }

    // Helper Functions
    handleChange = event => {
        event.preventDefault()
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    clear = _ => {
        this.setState({
            size: '',
            color: '',
            quantity: '',
        })

        alert("Item has been added to cart!")
    }

    render() {
        const { product } = this.state

        return (
            <div>
                <Navbar />

                <section id="items">
                    <div>
                        <Link to="/products">&#8592;</Link>
                        { product.map(this.product_render) }
                    </div>
                </section>
            </div>
        )
    }
}

export default ShopItem