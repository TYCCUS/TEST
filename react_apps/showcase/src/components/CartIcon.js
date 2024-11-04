export function CartIcon({ toggleCart, logos, ItemsNo }) {
    return (
      <div
        className="W75PX H70PX d-flex justify-content-center align-items-center cursor-pointer"
        onClick={() => toggleCart()}
      >
        <div className="txt-xs BG-INFO TXT-INFO-CONTRAST ROUNDED SQUARE20PX FLEX-CENTER">
          <span>{ItemsNo}</span>
        </div>
        <div className="SQUARE50PX FLEX-CENTER">
          <img
            src={ItemsNo > 1 ? logos.multi : logos.single}
            className="SQUARE30PX"
            alt="cartLogo"
          ></img>
        </div>
      </div>
    );
  }