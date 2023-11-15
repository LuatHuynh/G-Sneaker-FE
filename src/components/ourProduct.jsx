import checked from "../assets/check.png"

export default function OurProduct({product, addClick, isAdded}){
    
    return (
        <div className="products-container">
            <div className="product-image-background" style={{background: product.color}}>
                <img className="product-image" src={product.image}></img>
            </div>
            <h3><b>{product.name}</b></h3>
            <div className="product-description">{product.description}</div>
            <div className="flex-row">
                <h3><b>${product.price}</b></h3>
                {
                    !isAdded ?
                    <button onClick={addClick} className="add-to-card"><h3 className="margin-less"><b>add to card</b></h3></button> :
                    <button className="checked-button">
                        <img className="check-img" src={checked}></img>
                    </button>
                }
            </div>
        </div>
    )
}