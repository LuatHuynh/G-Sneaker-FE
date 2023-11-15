import { useContext, useReducer } from "react"
import plus from "../assets/plus.png"
import minus from "../assets/minus.png"
import trash from "../assets/trash.png"

export default function CartProduct({product, plusClick, minusClick, removeClick}){
    return (
        <div className="cart-product-container">
            <div className="cart-product-image-background" style={{background: product.color}}>
                <img className="cart-product-image" src={product.image}></img>
            </div>
            <div className="flex-column">
                <h4><b>{product.name}</b></h4>
                <h2 className="margin-top-bot-less"><b>${product.price}</b></h2>
                <div className="flex-row-button-container">
                    <div className="flex-row">
                        <button onClick={minusClick} className="button-image adjust-button">
                            <img className="button-size" src={minus}></img>
                        </button>
                        <div className="quantity">{product.quantity}</div>
                        <button onClick={plusClick} className="button-image adjust-button">
                            <img className="button-size" src={plus}></img>
                        </button>
                    </div>
                    <button onClick={removeClick} className="button-image trash-button">
                            <img className="trash" src={trash}></img>
                    </button>
                </div>
            </div>
        </div>
    )
}