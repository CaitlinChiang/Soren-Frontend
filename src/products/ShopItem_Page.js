import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import Navbar   from '../client/01-Navbar'


class ShopItem_Individual extends Component {
    state = { 
        size: '',
        color: '',
        quantity: '',

        products: [],
        productDetails_sizes: [],
        productDetails_colors: [],
        productID: this.props.location.productID,

        cart: this.props.cart
    }

    // Fetch Data
    componentDidMount = () => {
        this.getProducts()
        this.getProductDetails()
    }

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

    handleChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    

    // Render Item
    item = product => {
        
        return (
            <div key={ product.product_id } class="individualItem">

                <img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;"/>
                
                <div class="orderItem">

                    <div>
                        <h1>{ product.product_name }</h1>
                        <p>P{ product.product_price }.00</p>
                    </div> <br/>
                    
                    <div>
                        <p>Size: { this.state.size }</p>
                        { this.state.productDetails_sizes.map(item => <button onClick={() => this.setState({ size: item })}>{ item }</button>) }
                    </div> <br />

                    <div>
                        <p>Color: { this.state.color }</p>
                        { this.state.productDetails_colors.map(item => <button onClick={() => this.setState({ color: item })} style={{ background: `${item}` }}></button>) }
                    </div> <br/>

                    <div>
                        <p>Quantity: { this.state.quantity }</p>
                        <select onChange={this.handleChange} name="quantity" value={ this.state.quanity }> 
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

                    <button onClick={() => this.addToCart(product.product_id, product.product_name, product.product_price)}>Add To Cart</button>
                </div>

            </div>
        )
    }

    timestamp = () => {
        let newDate = new Date()
        
        let month = newDate.getMonth() + 1;
        let dateToday = newDate.getDate();
        let year = newDate.getFullYear();
        let hour = newDate.getHours();
        let mins = newDate.getMinutes();
        let sec = newDate.getSeconds();

        return (month < 10 ? ('0' + month) : month) + "-" + (dateToday < 10 ? ('0' + dateToday) : dateToday) + "-" + year + "||" + (hour < 10 ? ('0' + hour) : hour) + ":" + (mins < 10 ? ('0' + mins) : mins) + ":" + (sec < 10 ? ('0' + sec) : sec)
    }

    addToCart = (id, name, price) => {
        let timestamp = this.timestamp()

        let finalPrice = price * this.state.quantity

        let cartItem = {
            timestamp: timestamp,
            id: id,
            name: name,
            price: finalPrice,
            size: this.state.size,
            color: this.state.color,
            quantity: this.state.quantity,
        }
        
        this.props.updateCart_add(cartItem)

        this.clear()
    }

    clear = () => {
        this.setState({
            size: '',
            color: '',
            quantity: '',
        })

        alert("Item has been added to cart!")
    }

    render() {
        const { products } = this.state

        return (
            <div>
                <Navbar />
                <section id="items">
                    <div>
                        <Link to="/shop">&#8592;</Link>
                        { products.map(this.item) }
                    </div>
                </section>
            </div>
        )
    }
}

export default ShopItem_Individual