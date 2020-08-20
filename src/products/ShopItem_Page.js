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
        productDetails_sizes: [],
        productDetails_colors: [],

        // Product Details
        size: '',
        color: '',
        quantity: ''
    }

    componentDidMount = _ => {
        this.product_fetch()
        this.productDetails_fetch()
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
        const { productID, productDetails_sizes, productDetails_colors } = this.state

        fetch('http://localhost:5000/product_details')
            .then(response => response.json())
            .then(response => {
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].product_id === productID) {
                        if (!productDetails_sizes.includes(response.data[i].detail_size)) {
                            this.setState({ productDetails_sizes: productDetails_sizes.concat(response.data[i].detail_size) })
                        }
                        // change spelling of detail
                        if (!productDetails_colors.includes(response.data[i].deatil_color)) {
                            this.setState({ productDetails_colors: productDetails_colors.concat(response.data[i].deatil_color) })
                        }
                    }
                }
            })
    }

    // Render Data
    product_render = props => {
        const { productDetails_sizes, productDetails_colors, size, color, quantity } = this.state

        return (
            <div key={props.product_id} class="individualItem">
                <img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;"/>
                
                <div class="orderItem">
                    <div>
                        <h1>{props.product_name}</h1>
                        <p>P{props.product_price}.00</p>
                    </div> <br/>
                    
                    <div>
                        <p>Size: {size}</p>
                        { productDetails_sizes.map(item => <button onClick={() => this.setState({ size: item })}>{item}</button>) }
                    </div> <br />

                    <div>
                        <p>Color: {color}</p>
                        { productDetails_colors.map(item => <button onClick={() => this.setState({ color: item })} style={{ background: `${item}` }}></button>) }
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
        let timestamp = helpers.timestamp()
        const { size, color, quantity } = this.state

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
        
        this.props.updateCart_add(cartItem)

        this.clear()
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