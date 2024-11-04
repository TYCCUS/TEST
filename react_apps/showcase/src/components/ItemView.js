export function ItemView({ item, toggle, mod, cart }) {
    return (
      <section className="W800PX H100 d-flex flex-column justify-content-between align-items-stretch LEFT-CENTER-EDGE BG-SECONDARY Z500 ">
        <header
          id="itemViewHeader"
          className="BG-INFO-OP75 H50PX d-flex justify-content-start align-items-center ps-3 mb-3 flex-grow-0 flex-shrink-0 relative hlx-shadow-s cursor-pointer"
          onClick={() => toggle()}
        >
          <div
            id="itemViewCloseButton"
            className="SQUARE40PX TXT-INFO-CONTRAST RIGHT-CENTER br-10px FLEX-CENTER"
          >
            <span>✕</span>
          </div>
          <span className="TXT-HLX-MED TXT-INFO-CONTRAST txt-n">
            {item.title}
          </span>
        </header>
        <div
          id="itemViewBody"
          className="d-flex flex-column justify-items-stretch flex-grow-1 flex-shrink-1"
        >
          <img
            src={item.image}
            className="W800PX mb-2"
            alt={`${item.title} cover`}
          ></img>
          <div className="px-3 mb-4">
            <div className="H100PX">
              <p className="TXT-HLX-THIN txt-s TXT-DARK mb-1">
                <span className="TXT-INFO me-1">★</span>
                <span className="me-1 TXT-HLX-MED">{item.stats.rating}</span>
                <span className="me-2 TXT-DARKMUTED">{`(${item.stats.reviewCount})`}</span>
                <span className="">{item.location}</span>
              </p>
              <h3 className="TXT-HLX-LIGHT txt-s TXT-INFO">{item.title}</h3>
            </div>
            <p className="TXT-HLX-LIGHT txt-n">{item.description}</p>
          </div>
          {cart.find((entry) => entry.id === item.id) ? (
            <div className="btn BG-ALERT-OP25 br-0px" >
              ITEM IS IN YOUR CART, ENJOY!
            </div>
          ) : (
            <div
              className="btn BG-S-INFO-OP50 br-0px"
              onClick={() => {
                mod({ id: item.id, quantity: 1 });
              }}
            >
              ADD TO CART
            </div>
          )}
        </div>
        <footer id="itemViewFooter" className="H50PX BG-INFO-OP75 FLEX-CENTER">
          <span className="TXT-HLX-MED TXT-INFO-CONTRAST txt-n">
            {parseInt(item.openSpots)
              ? `${item.openSpots} spots left`
              : "SOLD OUT"}
          </span>
        </footer>
      </section>
    );
  }