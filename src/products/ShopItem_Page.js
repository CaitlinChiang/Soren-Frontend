import React, { Component } from 'react'
import { HashLink as Link } from 'react-router-hash-link'


// ShopItem const that accepts props from database for rendering


class ShopItem_Individual extends Component {
    state = { 
        size: '',
        color: '',
        quantity: 0
    }

    handleChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    // NOTE: Sizes, colors & quantity of item should come from the database

    // PLACEHOLDER
    item = () => {
        return (
            <div class="individualItem">

                <img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;"/>
                
                <div class="orderItem">

                    <div>
                        <h1>Product Name</h1>
                        <p>P0.00 (Price)</p>
                    </div> <br/>
                    
                    <div>
                        <p>Size: { this.state.size }</p>
                        <button onClick={() => this.setState({ size: 'XS' })}>XS</button> 
                        <button onClick={() => this.setState({ size: 'S'  })}>S </button>
                        <button onClick={() => this.setState({ size: 'M'  })}>M </button>
                        <button onClick={() => this.setState({ size: 'L'  })}>L </button>
                        <button onClick={() => this.setState({ size: 'XL' })}>XL</button>
                    </div> <br />

                    <div>
                        <p>Color: { this.state.color }</p>
                        <button onClick={() => this.setState({ color: 'Black' })} style={{ background: "#000" }}></button> 
                        <button onClick={() => this.setState({ color: 'White' })} style={{ background: "#fff" }}></button>
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

                    <button>Add To Cart</button>
                </div>

            </div>
        )
    }
    // PLACEHOLDER

    render() {
        return (
            <section id="items">
                <div>
                    <Link to="/shop">&#8592;</Link>
                    { this.item() }
                </div>
            </section>
        )
    }
}

export default ShopItem_Individual