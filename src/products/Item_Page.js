import React, { Component } from 'react'


class Individual_Item extends Component {
    state = { 
        size: '',
        color: ''
    }

    // Add Quantity

    // TEST
    item = () => {
        return (
            <div class="individualItem">

                <img src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/430130/item/goods_09_430130.jpg?width=2000" width="100%;"/>
                
                <div class="orderItem">
                    <h1>Product Name</h1>
                    <p>P0.00 (Price)</p>
                    <br/>
                    <p>Size: { this.state.size }</p>
                    <div>
                        <button onClick={() => this.setState({ size: 'XS' })}>XS</button> 
                        <button onClick={() => this.setState({ size: 'S'  })}>S </button>
                        <button onClick={() => this.setState({ size: 'M'  })}>M </button>
                        <button onClick={() => this.setState({ size: 'L'  })}>L </button>
                        <button onClick={() => this.setState({ size: 'XL' })}>XL</button>
                    </div>
                    <br />
                    <p>Color: { this.state.color }</p>
                    <div>
                        <button onClick={() => this.setState({ color: 'Black' })} style={{ background: "#000" }}></button> 
                        <button onClick={() => this.setState({ color: 'White' })} style={{ background: "#fff" }}></button>
                    </div>
                    <button>Add To Cart</button>
                </div>

            </div>
        )
    }
    // TEST

    render() {
        return (
            <section id="items">
                <div>
                    { this.item() }
                </div>
            </section>
        )
    }
}

export default Individual_Item