import React, { ChangeEvent, Component, FormEvent } from 'react';
import { postData } from '../service/PostDataService';

type Props = {
    onTrue : any
    onClose : any
}

type State = {

    payeeName : string
    product : string
    price : number
    setDate : string
}

class AddDataForm extends Component<Props,State>{


    constructor (props : Props) {
        super(props)
        this.state = {
            payeeName : "",
            product : "",
            price : 0,
            setDate : this.setDefaultDate()
        }

        this.setpayee = this.setpayee.bind(this)
        this.setProduct = this.setProduct.bind(this)
        this.setProduct = this.setProduct.bind(this)
        this.loggedDate = this.loggedDate.bind(this)
    }

    setDefaultDate = () => {
        const today = new Date();
        return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    }

    setpayee = (event : ChangeEvent<HTMLSelectElement>) => {
        this.setState({
            payeeName : event.target.value
        })
    }

    setProduct = (event : ChangeEvent<HTMLInputElement>) => {
        this.setState({
            product : event.target.value
        })
    }

    setPrice = (event : ChangeEvent<HTMLInputElement>) => {
        this.setState({
            price : parseInt(event.target.value)
        })
    }

    loggedDate = (e : ChangeEvent<HTMLInputElement>) => {        
        this.setState({
            setDate : e.target.value,
        })
    }

    submitHandler = async (event : FormEvent<HTMLFormElement>) =>{
        event?.preventDefault()
        // console.log(this.state)
        const finalData = {
            ...this.state
        }
        const data = await postData(finalData)
        this.props.onTrue()
    } 

    el = document.createElement('div')


    render(){
        const element =(
            <>
                <section>
                    <header>
                        <h1>Add New Item</h1>
                        <p>Read the below instructions before proceeding:<br /> Make sure you fill all the fileds where * is provided</p>
                    </header>
                    <form onSubmit={this.submitHandler}>
                        <article>
                            <p>Name</p>
                            <select name="Name" id="district" required value={this.state.payeeName} onChange={this.setpayee}>
                                <option value="" defaultChecked>Choose</option>
                                <option value="John">John</option>
                                <option value="Vicky">Vicky</option>
                            </select>
                        </article>
    
                        <article>
                            <p>Product</p>
                            <input type="text" required  value={this.state.product} onChange={this.setProduct}/>
                        </article>
    
                        <article>
                            <p>Price</p>
                            <input type="number" required value={this.state.price} onChange={this.setPrice}/>
                        </article>
    
                        <article>
                            <p>Date</p>
                            <input type="date" required value={this.state.setDate} onChange={this.loggedDate}/>
                        </article>
    
                        <button type="button" className="form-button" onClick={this.props.onClose}>Close</button>
                        <button className="form-button">Submit</button>
                    </form>
                </section>
            </>
        )
        return element
    }
}

export default AddDataForm;
