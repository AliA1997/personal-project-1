import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { updateCart } from '../../redux/reducer';


import './Product.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class Product extends Component {
    constructor(props) {
        super();
        this.state = {
            ...props.location.state,
            inputVal: 0,
            gender: '',
            size: '',
        }
        this.updateProductDB = this.updateProductDB.bind(this);
        this.deleteProductDB = this.deleteProductDB.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addToCart = this.addToCart.bind(this);
    }


    // Updates the information for the selected product to the db.
    updateProductDB(e) {
        this.setState({
            [e.target.name]: this.state.inputVal
        });
        setTimeout(() => axios.put("/api/products", this.state).then(res => {
        }).catch(error => {
            console.log("UPDATE FUNCTION ERROR", error);
        }), 200);
    }
    
    // Deletes product from the db.
    deleteProductDB() {
        axios.delete(`/api/product/${this.state.id}`).then(res => {
        }).catch(error => {
            console.log("DELETE FUNCTION ERROR", error);
        });
    }
    
    //Sets a variable in state equal to what is put in the input.
    handleChange(e) {
        this.setState({
            inputVal: e.target.value
        });
    }
    
     //Attached to OnClick for Adding Product to Cart
    addToCart() {
        const { updateCart } = this.props;
         console.log("ADD2CART PRODUCT LINE53", this.state)
         const { id, image, name, price, gender, size } = this.state; 
         updateCart({
            id: id,
            name: name,
            price: +price,
            image: image,
            gender: gender,
            size: size,
         });
        axios.post('/api/cart', this.props.user).then(res => {
            res.status(200).send();
            }).catch(error => {
                console.log("ADD TO SESSION CART", error);
             })
    } 

    render() {
        // console.log("THIS IS STATE", this.state)
        const { name, description, price, image, man_small_size, man_medium_size, man_large_size, man_xlarge_size, woman_small_size, woman_medium_size, woman_large_size, woman_xlarge_size } = this.state;
        
        return (
            <div className="solo-product-container">
                <Header />
                <div className="solo-product-display">
                    <img src={image} alt="shirt" />

                    <p>Name: {name}</p>

                    <p>Description: {description}</p>

                    <p>Price: {price}</p>
                    {!this.props.user.isAdmin &&
                        <div>
                            <select name="filters" onChange={(e) => {
                                this.setState({
                                    gender: e.target.value
                                })
                        
                            }}>
                                <option value="" defaultValue />
                                <option value="man">Men's</option>
                                <option value="woman" >Women's</option>
                            </select>
                            <br />
                            <select name="filters" onChange={(e) => {
                                this.setState({
                                    size: e.target.value,
                                })
                            }}>
                                <option value="" defaultValue />
                                <option value="small" >Small</option>
                                <option value="medium" >Medium</option>
                                <option value="large" >Large</option>
                                <option value="xlarge" >XLarge</option>
                            </select>

                            <div className="search-add-button">
                                <button className="add-to-cart-button" onClick={() => { this.addToCart() }}>ADD TO CART</button>
                            </div>
                        </div>}    
                    {this.props.user.isAdmin === true &&
                        <div className="inventory-edit-list">
                        <div>
                            
                            <label htmlFor="changeInput">Update Input</label>
                            <input name="changeInput" onChange={(e) => this.handleChange(e)} />
                            
                            <p>Name: {this.state.name}</p>
                            <button name="name"
                                onClick={(e) => this.updateProductDB(e)}>Update</button>
                            
                            <p>Description: {this.state.description}</p>
                            <button name="description"
                                onClick={(e) => this.updateProductDB(e)}>Update</button>
                        
                            

                            <p>Men's Small: {man_small_size}</p>
                            <button name="man_small_size"
                                onClick={(e) => this.updateProductDB(e)}>Update</button>

                            <p>Men's Medium: {man_medium_size}</p>
                            <button name="man_medium_size"
                                onClick={(e) => this.updateProductDB(e)}>Update</button>
                       
                            <p>Men's Large: {man_large_size}</p>
                            <button name="man_large_size"
                                onClick={(e) => this.updateProductDB(e)}>Update</button>

                            <p>Men's XLarge: {man_xlarge_size}</p>
                            <button name="man_xlarge_size"
                                onClick={(e) => this.updateProductDB(e)}>Update</button>

                            <p>Women's Small: {woman_small_size}</p>
                            <button name="woman_small_size"
                                onClick={(e) => this.updateProductDB(e)}>Update</button>

                            <p>Women's Medium: {woman_medium_size}</p>
                            <button name="woman_medium_size"
                                onClick={(e) => this.updateProductDB(e)}>Update</button>

                            <p>Women's Large: {woman_large_size}</p>
                            <button name="woman_large_size"
                                onClick={(e) => this.updateProductDB(e)}>Update</button>

                            <p>Women's XLarge: {woman_xlarge_size}</p>
                            <button name="woman_xlarge_size"
                                onClick={(e) => this.updateProductDB(e)}>Update</button>
                        </div>
                        <Link to="/search"><button onClick={this.deleteProductDB}>DELETE PRODUCT</button></Link>
                        </div>}
                </div>
                <Footer />
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { user, product } = state;

    return {
        user,
        product
    };
}

export default connect(mapStateToProps, {updateCart})(Product);