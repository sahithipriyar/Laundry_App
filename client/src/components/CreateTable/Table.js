import React, { useState } from 'react'
import ButtonOrder from '../Button for orders pages/ButtonOrder';
import SummaryToCreate from '../SummmaryCreateOrderPage/SummaryToCreate';

import OrderConfirm from '../OrderConfirmation/OrderConfirm';
import "./table.css"

import shirt from "../../images/shirt.jpg"
import washingIcon from "../../images/washing-machine.svg"
import washingIconBlue from "../../images/washing-machineblue.svg"
import bleachIcon from "../../images/bleach.svg"
import bleachIconBlue from "../../images/bleachblue.svg"
import ironingIcon from "../../images/ironing.svg"
import ironingIconBlue from "../../images/ironingblue.svg"
import drywashIcon from "../../images/towel.svg"
import drywashIconBlue from "../../images/towelblue.png"
import tshirt from "../../images/tshirt.jpg"
import jeans from "../../images/jeans.jpg"
import trousers from "../../images/trousers.jpg"
import boxers from "../../images/boxers.jpg"
import others from "../../images/others.jpg"
import joggers from "../../images/joggers.jpg"


export default function Table() {
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [order, setOrder] = useState({
        status: "",
        products: [],
        totalPrice: 0,
        totalQuantity: 0
    });
    const [color, setcolor] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
    const [disable, setDisable] = useState([false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false])
    const status = ["Ready to Pickup","Picked up","In Washing","Washed","In Ironing","Ironed","in Delivery","Delivered"]
    const washType = {"20":"washing","15":"ironing","10":"drywash","25":"chemicalwash"}

    const toggleSummaryPopup = () => {
        setIsSummaryOpen(!isSummaryOpen);
    }

    const toggleConfirmationPopup = () => {
        setIsConfirmationOpen(!isConfirmationOpen);
    }

    const [wash,setWash] = useState({
        shirt:{washing:false,ironing:false,drywash:false,chemicalwash:false},
        tshirt:{washing:false,ironing:false,drywash:false,chemicalwash:false},
        trousers:{washing:false,ironing:false,drywash:false,chemicalwash:false},
        jeans:{washing:false,ironing:false,drywash:false,chemicalwash:false},
        boxers:{washing:false,ironing:false,drywash:false,chemicalwash:false},
        joggers:{washing:false,ironing:false,drywash:false,chemicalwash:false},
        others:{washing:false,ironing:false,drywash:false,chemicalwash:false}
    })

    const [price, setPrice] = useState({
        shirt: 0, tshirt: 0, trousers: 0, jeans: 0, boxers: 0, joggers: 0, others: 0
    })
    const [quantity, setQuantity] = useState({
        shirt: 0, tshirt: 0, trousers: 0, jeans: 0, boxers: 0, joggers: 0, others: 0
    })
    var name, value, prev
    const Value = (e) => {
        name = e.target.name
        value = e.target.value
        setQuantity({ ...quantity, [name]: Number(value) + 1 })
    }


    const Reset = (e) => {
        name = e.target.name
        setQuantity({ ...quantity, [name]: 0 })
        setPrice({ ...price, [name]: 0 })
        setWash({...wash,[name]:{washing:false,ironing:false,drywashing:false,chemicalwash:false}})

        const changecolor = [...color]
        console.log(parseInt(e.target.id)+2);
        changecolor[parseInt(e.target.id)] = false
        changecolor[parseInt(e.target.id) + 1] = false
        changecolor[parseInt(e.target.id) + 2] = false
        changecolor[parseInt(e.target.id) + 3] = false
        setcolor(changecolor)

        const disablebutton = [...color]
        // console.log(parseInt(e.target.id)+2);
        disablebutton[parseInt(e.target.id)] = false
        disablebutton[parseInt(e.target.id) + 1] = false
        disablebutton[parseInt(e.target.id) + 2] = false
        disablebutton[parseInt(e.target.id) + 3] = false
        setDisable(disablebutton)
    }

    const Total = (e) => {
        value = e.target.parentElement.value
        name = e.target.parentElement.name
        prev = price[name]
        const wash__type = washType[value]
        setPrice({ ...price, [name]: Number(value) + Number(prev) })
        const product = wash
        product[name]= {...product[name],[wash__type]:true}
        // console.log(product);
        setWash(product)

        const id = e.target.id
        const changecolor = [...color]
        changecolor[parseInt(id) - 1] = !changecolor[parseInt(id) - 1]
        setcolor(changecolor)

        const disablebutton = [...disable]
        disablebutton[parseInt(id) - 1] = !disablebutton[parseInt(id) - 1]
        setDisable(disablebutton)
    }
    // console.log(wash);

    const handleProceedClick =() => {
        const random = Math.floor(Math.random() * status.length);
        const totalPrice = price.shirt*quantity.shirt + price.tshirt*quantity.tshirt + price.trousers*quantity.trousers + price.jeans*quantity.jeans + price.boxers*quantity.boxers + price.joggers*quantity.joggers + price.others*quantity.others;
        const totalQuantity = quantity.shirt + quantity.tshirt + quantity.trousers + quantity.jeans + quantity.boxers + quantity.joggers + quantity.others
        const products = []
        for(let x in quantity){
            let product_obj = {}
            if(quantity[x]>0){
                //console.log("wash types of",x,wash[x]);
                product_obj["productType"] = x
                product_obj["quantity"] = quantity[x]
                product_obj["washing"] = wash[x]["washing"]
                product_obj["ironing"] = wash[x]["ironing"]
                product_obj["drywash"] = wash[x]["drywash"]
                product_obj["chemicalwash"] = wash[x]["chemicalwash"]
                products.push(product_obj)
                
            }          
            
        }
        console.log(products);
        const finalOrder = {
            status: status[random],
            // status:"Ready to Pickup",
            totalPrice: totalPrice,
            totalQuantity: totalQuantity,
            products : products
        }
        setOrder(finalOrder)
        toggleSummaryPopup()
    }


    return (
        <div>
            <div className='create__container'>
                <table className='create__table'>
                    <thead>
                        <tr>
                            <th>Product Type</th>
                            <th>Quantity</th>
                            <th>Washtype</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className='title'>
                                    <img className="product__img" src={shirt} alt="shirt" />
                                    <div className='product__about'>
                                        <p className='product__title'>Shirt</p>
                                        <p className='product__subtitle'>Lorem Ipsum is simply dummy text of the</p>
                                    </div>
                                </div>
                            </td>
                            <td><button className="quantity__button" name="shirt" value={quantity.shirt} onClick={Value}>{quantity.shirt}</button></td>
                            <td>
                                <button value="20" name="shirt" onClick={Total} disabled = {disable[0]} className="wash__button"><img id="1" src={color[0] ? washingIconBlue : washingIcon}  className='wash__image' alt="washing" /></button>
                                <button name="shirt" value="15" onClick={Total} disabled = {disable[1]} className="wash__button"><img id="2" src={color[1] ? ironingIconBlue : ironingIcon}  className='wash__image' alt="ironing" /></button>
                                <button value="10" name="shirt" onClick={Total} disabled = {disable[2]} className="wash__button"><img id="3" src={color[2] ? drywashIconBlue : drywashIcon}  className=' wash__image' alt="dry-washing" /></button>
                                <button value="25" name="shirt" onClick={Total} disabled = {disable[3]} className="wash__button"><img id="4" src={color[3] ? bleachIconBlue : bleachIcon}  className='wash__image' alt="chemical-washing" /></button>
                            </td>
                            <td>{price.shirt*quantity.shirt>0 && <div> <span className='price__calculation'>{price.shirt} x {quantity.shirt} = </span><span className='total__price'>{price.shirt * quantity.shirt}</span></div>}</td>
                            <td>{quantity.shirt>0 && <button name="shirt" id = "0" onClick={Reset} className="reset__button">Reset</button>}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className='title'>
                                    <img className="product__img" src={tshirt} alt="tshirt" />
                                    <div className='product__about'>
                                        <p className='product__title'>T-Shirt</p>
                                        <p className='product__subtitle'>Lorem Ipsum is simply dummy text of the</p>
                                    </div>
                                </div>
                            </td>
                            <td><button className="quantity__button" name="tshirt" value={quantity.tshirt} onClick={Value}>{quantity.tshirt}</button></td>
                            <td>
                                <button value="20" name="tshirt" onClick={Total} disabled = {disable[4]} className="wash__button"><img id="5" src={color[4] ? washingIconBlue : washingIcon}  className='wash__image' alt="washing" /></button>
                                <button name="tshirt" value="15" onClick={Total} disabled = {disable[5]} className="wash__button"><img id="6" src={color[5] ? ironingIconBlue : ironingIcon}  className='wash__image' alt="ironing" /></button>
                                <button value="10" name="tshirt" onClick={Total} disabled = {disable[6]} className="wash__button"><img id="7" src={color[6] ? drywashIconBlue : drywashIcon}  className='wash__image' alt="dry-washing" /></button>
                                <button value="25" name="tshirt" onClick={Total} disabled = {disable[7]} className="wash__button"><img id="8" src={color[7] ? bleachIconBlue : bleachIcon}  className='wash__image' alt="chemical-washing" /></button>
                            </td>
                            <td>{price.tshirt*quantity.tshirt>0 && <div> <span className='price__calculation'>{price.tshirt} x {quantity.tshirt} = </span><span className='total__price'>{price.tshirt * quantity.tshirt}</span></div>}</td>
                            <td>{quantity.tshirt>0 && <button name="tshirt" id = "4" onClick={Reset} className="reset__button">Reset</button>}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className='title'>
                                    <img className="product__img" src={trousers} alt="trousers" />
                                    <div className='product__about'>
                                        <p className='product__title'>Trousers</p>
                                        <p className='product__subtitle'>Lorem Ipsum is simply dummy text of the</p>
                                    </div>
                                </div>
                            </td>
                            <td><button className="quantity__button" name="trousers" value={quantity.trousers} onClick={Value}>{quantity.trousers}</button></td>
                            <td>
                                <button value="20" name="trousers" onClick={Total} disabled = {disable[8]} className="wash__button"><img id="9" src={color[8] ? washingIconBlue : washingIcon}  className='wash__image' alt="washing" /></button>
                                <button name="trousers" value="15" onClick={Total} disabled = {disable[9]} className="wash__button"><img id="10" src={color[9] ? ironingIconBlue : ironingIcon}  className='wash__image' alt="ironing" /></button>
                                <button value="10" name="trousers" onClick={Total} disabled = {disable[10]} className="wash__button"><img id="11" src={color[10] ? drywashIconBlue : drywashIcon}  className='wash__image' alt="dry-washing" /></button>
                                <button value="25" name="trousers" onClick={Total} disabled = {disable[11]} className="wash__button"><img id="12" src={color[11] ? bleachIconBlue : bleachIcon}  className='wash__image' alt="chemical-washing" /></button>
                            </td>
                            <td>{price.trousers*quantity.trousers>0 && <div> <span className='price__calculation'>{price.trousers} x {quantity.trousers} = </span><span className='total__price'>{price.trousers * quantity.trousers}</span></div>}</td>
                            <td>{quantity.trousers>0 && <button name="trousers" id = "8" onClick={Reset} className="reset__button">Reset</button>}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className='title'>
                                    <img className="product__img" src={jeans} alt="jeans" />
                                    <div className='product__about'>
                                        <p className='product__title'>Jeans</p>
                                        <p className='product__subtitle'>Lorem Ipsum is simply dummy text of the</p>
                                    </div>
                                </div>
                            </td>
                            <td><button className="quantity__button" name="jeans" value={quantity.jeans} onClick={Value}>{quantity.jeans}</button></td>
                            <td>
                                <button value="20" name="jeans" onClick={Total} disabled = {disable[12]} className="wash__button"><img id="13" src={color[12] ? washingIconBlue : washingIcon}  className='wash__image' alt="washing" /></button>
                                <button name="jeans" value="15" onClick={Total} disabled = {disable[13]} className="wash__button"><img id="14" src={color[13] ? ironingIconBlue : ironingIcon}  className='wash__image' alt="ironing" /></button>
                                <button value="10" name="jeans" onClick={Total} disabled = {disable[14]} className="wash__button"><img id="15" src={color[14] ? drywashIconBlue : drywashIcon}  className='wash__image' alt="dry-washing" /></button>
                                <button value="25" name="jeans" onClick={Total} disabled = {disable[15]} className="wash__button"><img id="16" src={color[15] ? bleachIconBlue : bleachIcon}  className='wash__image' alt="chemical-washing" /></button>
                            </td>
                            <td>{price.jeans*quantity.jeans>0 && <div> <span className='price__calculation'>{price.jeans} x {quantity.jeans} = </span><span className='total__price'>{price.jeans * quantity.jeans}</span></div>}</td>
                            <td>{quantity.jeans>0 && <button name="jeans" id = "12" onClick={Reset} className="reset__button">Reset</button>}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className='title'>
                                    <img className="product__img" src={boxers} alt="boxers" />
                                    <div className='product__about'>
                                        <p className='product__title'>Boxers</p>
                                        <p className='product__subtitle'>Lorem Ipsum is simply dummy text of the</p>
                                    </div>
                                </div>
                            </td>
                            <td><button className="quantity__button" name="boxers" value={quantity.boxers} onClick={Value}>{quantity.boxers}</button></td>
                            <td>
                                <button value="20" name="boxers" onClick={Total} disabled = {disable[16]} className="wash__button"><img id="17" src={color[16] ? washingIconBlue : washingIcon}  className='wash__image' alt="washing" /></button>
                                <button name="boxers" value="15" onClick={Total} disabled = {disable[17]} className="wash__button"><img id="18" src={color[17] ? ironingIconBlue : ironingIcon}  className='wash__image' alt="ironing" /></button>
                                <button value="10" name="boxers" onClick={Total} disabled = {disable[18]} className="wash__button"><img id="19" src={color[18] ? drywashIconBlue : drywashIcon}  className='wash__image' alt="dry-washing" /></button>
                                <button value="25" name="boxers" onClick={Total} disabled = {disable[19]} className="wash__button"><img id="20" src={color[19] ? bleachIconBlue : bleachIcon}  className='wash__image' alt="chemical-washing" /></button>
                            </td>
                            <td>{price.boxers*quantity.boxers>0 && <div> <span className='price__calculation'>{price.boxers} x {quantity.boxers} = </span><span className='total__price'>{price.boxers * quantity.boxers}</span></div>}</td>
                            <td>{quantity.boxers>0 && <button name="boxers" id = "16" onClick={Reset} className="reset__button">Reset</button>}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className='title'>
                                    <img className="product__img" src={joggers} alt="joggers" />
                                    <div className='product__about'>
                                        <p className='product__title'>Joggers</p>
                                        <p className='product__subtitle'>Lorem Ipsum is simply dummy text of the</p>
                                    </div>
                                </div>
                            </td>
                            <td><button className="quantity__button" name="joggers" value={quantity.joggers} onClick={Value}>{quantity.joggers}</button></td>
                            <td>
                                <button value="20" name="joggers" onClick={Total} disabled = {disable[20]} className="wash__button"><img id="21" src={color[20] ? washingIconBlue : washingIcon} className='wash__image' alt="washing" /></button>
                                <button name="joggers" value="15" onClick={Total} disabled = {disable[21]} className="wash__button"><img id="22" src={color[21] ? ironingIconBlue : ironingIcon} className='wash__image' alt="ironing" /></button>
                                <button value="10" name="joggers" onClick={Total} disabled = {disable[22]} className="wash__button"><img id="23" src={color[22] ? drywashIconBlue : drywashIcon}  className='wash__image' alt="dry-washing" /></button>
                                <button value="25" name="joggers" onClick={Total} disabled = {disable[23]} className="wash__button"><img id="24" src={color[23] ? bleachIconBlue : bleachIcon}  className='wash__image' alt="chemical-washing" /></button>
                            </td>
                            <td>{price.joggers*quantity.joggers>0 && <div> <span className='price__calculation'>{price.joggers} x {quantity.joggers} = </span><span className='total__price'>{price.joggers * quantity.joggers}</span></div>}</td>
                            <td>{quantity.joggers>0 && <button name="joggers" id = "20" onClick={Reset} className="reset__button">Reset</button>}</td>
                        </tr>
                        <tr>
                            <td>
                                <div className='title'>
                                    <img className="product__img" src={others} alt="others" />
                                    <div className='product__about'>
                                        <p className='product__title'>Others</p>
                                        <p className='product__subtitle'>Lorem Ipsum is simply dummy text of the</p>
                                    </div>
                                </div>
                            </td>
                            <td><button className="quantity__button" name="others" value={quantity.others} onClick={Value}>{quantity.others}</button></td>
                            <td>
                                <button value="20" name="others" onClick={Total} disabled = {disable[24]} className="wash__button"><img id="25" src={color[24] ? washingIconBlue : washingIcon}  className='wash__image' alt="washing" /></button>
                                <button name="others" value="15" onClick={Total} disabled = {disable[25]} className="wash__button"><img id="26" src={color[25] ? ironingIconBlue : ironingIcon}  className='wash__image' alt="ironing" /></button>
                                <button value="10" name="others" onClick={Total} disabled = {disable[26]} className="wash__button"><img id="27" src={color[26] ? drywashIconBlue : drywashIcon}  className='wash__image' alt="dry-washing" /></button>
                                <button value="25" name="others" onClick={Total} disabled = {disable[27]} className="wash__button"><img id="28" src={color[27] ? bleachIconBlue : bleachIcon}  className=' wash__image' alt="chemical-washing" /></button>
                            </td>
                            <td>{price.others*quantity.others>0 && <div> <span className='price__calculation'>{price.others} x {quantity.others} = </span><span className='total__price'>{price.others * quantity.others}</span></div>}</td>
                            <td>{quantity.others>0 && <button name="others" id = "24" onClick={Reset} className="reset__button">Reset</button>}</td>
                        </tr>
                    </tbody>
                </table>
                <div className='create__buttons'>
                    <ButtonOrder bg="white" color="#5861AE" content="cancel"></ButtonOrder>
                    <div onClick={handleProceedClick}>
                        <ButtonOrder bg="#5861AE" color="white" content="proceed"></ButtonOrder>
                    </div>
                    {isSummaryOpen && <SummaryToCreate order={order} handleConfirmationPopup={toggleConfirmationPopup} handleSummaryClose={toggleSummaryPopup} />}
                    {isConfirmationOpen && <OrderConfirm handleConfirmationPopup={toggleConfirmationPopup} />}
                </div>
            </div>

        </div>
    )
}