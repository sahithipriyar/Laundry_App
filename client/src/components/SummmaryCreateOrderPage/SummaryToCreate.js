import React, { useState } from 'react'
import axios from "axios"
import "../SummaryPastOrderPage/summary.css"

function SummaryToCreate(props) {
    console.log(props.order);
    const [storeNo, setStoreNo] = useState("")
    const [storeAddress, setStoreAddress] = useState("")
    const [disabled, setDisabled] = useState(true)

    const washType = []
    const washPrice = []
    const Price = []

    props.order.products.forEach(product => {
        let wash = ""
        let price = 0
        console.log(product);
        if (product.washing === true) {
            wash += "Washing  "
            price += 10
            console.log(price);
        }
        if (product.ironing === true) {
            wash += "Ironing  "
            price += 15
            console.log(price);
        }
        if (product.chemicalwash === true) {
            wash += "Chemical wash  "
            price += 20
            console.log(price);
        }
        if (product.drywash === true) {
            wash += "Dry wash  "
            price += 30
            console.log(price);
        }
        Price.push(product.quantity * price)
        washType.push(wash)
        washPrice.push(price)
    });

    const handleForm = () => {
        setStoreNo("+91 9999999999")
        setStoreAddress("Near phone Booth, 10th road")
        setDisabled(false)
    }

    // const handleConfirmationPopup = () => {
    //     props.handleConfirmationPopup()
    // }


    const handleSubmitClick = () => {
        console.log("submit clicked");
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjIzNzU0NmUxYWYyYTA5NDZhMzFmMDJhIiwiaWF0IjoxNjQ3NzkzMjY2LCJleHAiOjE2NDgzOTgwNjZ9.gQRci9zeR7PSo5ZNTIYAAgCll4jqh49qMjZ5KjRAwiA"

        const token = localStorage.getItem("token")
        let config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        // axios.post("https://laundry-service-backend.herokuapp.com/orders", props.order, config)
        //     .then(res => {
        //         console.log(res);
        //     })
        //     .catch(err => console.log(err)
        //     );

        axios.post("https://server--laundry.herokuapp.com/orders", props.order, config)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err)
            );

        props.handleSummaryClose()
        // handleConfirmationPopup()
        props.handleConfirmationPopup()
    }

    return (

        <div className='popup-box'>
            {console.log("summary to create component rendering")}
            <div className='summary__box' style={{ overflow: "scroll" }}>
                <div className='summary__header'>
                    Summary
                    <button className='summary__btn__close' onClick={props.handleSummaryClose}>x</button>
                </div>
                <div className='summary__storeinfo'>
                    <div className='store__detail'>
                        <form className='store__form'>
                            <select onChange={handleForm} defaultValue="Store Location">
                                <option disabled>Store Location</option>
                                <option>Jp Nagar</option>
                            </select>
                        </form>
                    </div>

                    <div className='store__detail'>
                        <h4><strong>Store Address</strong></h4>
                        <p>{storeAddress}</p>
                    </div>
                    <div className='store__detail'>
                        <h4><strong>Phone</strong></h4>
                        <p>{storeNo}</p>
                    </div>
                </div>

                <div className='summary__order'>
                    <h4>Order Details</h4>
                    <table className='summary__table'>
                        <tbody>
                            {props.order.products.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='product__type'>
                                            {product.productType} {props.canCancel}
                                        </td>
                                        <td className='product__washtype'>
                                            {washType[index]}
                                        </td>
                                        <td className='price__calculation'>
                                            {product.quantity} x {washPrice[index]}
                                        </td>
                                        <td className='product__price'>
                                            {Price[index]}
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td /><td />
                                <td>Sub total:</td>
                                <td style={{ fontWeight: "bold" }}>{props.order.totalPrice}
                                </td>
                            </tr>
                            <tr>
                                <td /><td />
                                <td>Pickup Charges:</td>
                                <td style={{ fontWeight: "bold" }}>90</td>
                            </tr>
                            <tr className='product__total'><td /><td />
                                <td>
                                    Total:
                                </td>
                                <td>Rs {props.order.totalPrice + 90}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>


                <div className='summary__address'>
                    <label>Address</label>
                    <div>
                        <p className='address__title'>Home</p>
                        <p>#223, 10th road, Jp Nagar,</p>
                        <p>Bangalore</p>

                    </div>
                </div>

                <div className='summary__footer'>

                    <button className="submit__button" disabled={disabled} onClick={handleSubmitClick}>Submit</button>
                </div>

            </div>
        </div>

    )

}

export default React.memo(SummaryToCreate)