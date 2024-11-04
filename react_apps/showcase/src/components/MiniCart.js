
export function MiniCart({ toggleCart, cartItems, data, mod }) {
    const items = Object.values(cartItems);
    const dataItems = Object.values(data);
    return (
      <section className="W300PX H100 d-flex flex-column justify-content-between align-items-stretch RIGHT-CENTER-EDGE BG-SECONDARY Z600 BORDER-INFO BORDER-1PX BORDER-SOLID">
        <header
          id="miniCartHeader"
          className="BG-INFO-OP75 H50PX d-flex justify-content-start align-items-center ps-3 mb-3 flex-grow-0 flex-shrink-0 relative hlx-shadow-s cursor-pointer"
          onClick={() => toggleCart()}
        >
          <div
            id="miniCartCloseButton"
            className="SQUARE40PX TXT-INFO-CONTRAST RIGHT-CENTER br-10px FLEX-CENTER"
          >
            <span>✕</span>
          </div>
          <span className="TXT-HLX-MED TXT-INFO-CONTRAST txt-n">{"Cart"}</span>
        </header>
        <div id="miniCartBody" className="flex-grow-1 flex-shrink-1">
          {items.map((item) => (
            <MiniCartItem
              item={dataItems.find((record) => record.id === item.id)}
              amount={item.quantity}
              mod={mod}
            />
          ))}
        </div>
        <footer id="miniCartFooter" className="H50PX BG-INFO-OP75 FLEX-CENTER">
          <span className="TXT-HLX-MED TXT-INFO-CONTRAST txt-n">{`CHECKOUT >>>`}</span>
        </footer>
      </section>
    );
  }
  
  function MiniCartItem({ item, amount, mod }) {
    return (
      <article
        key={item.id}
        className="WR-100 d-flex flex-column justify-content-start align-items-stretch px-3 py-4 hlx-shadow-min-st"
      >
        <div
          className="NOPAD"
          style={{
            opacity: amount < 1 ? "0.5" : "1",
            textDecoration: amount < 1 ? "line-through" : "none",
          }}
        >
          <header className="TXT-HLX-MED TXT-INFO txt-s lh-1">{`${item.id}: ${item.title}`}</header>
          <p className="TXT-HLX-THIN TXT-DARK txt-xs p-0 my-0 mt-0 mb-2">{`${item.description}`}</p>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-0">
          <p className="WR-50 TXT-DARKMUTED TXT-HLX-MED txt-xs NOPAD">{`${
            amount < 1 ? `Press ✖︎ to remove >>>` : `${amount}x ${item.price} €`
          }`}</p>
          <div
            className="SQUARE25PX BG-SECONDARY-OP75 me-2 flex-grow-0 FLEX-CENTER cursor-pointer br-10px hlx-shadow-min"
            onClick={() => mod(item, "0")}
          >
            <span className="TXT-DANGER">✖︎</span>
          </div>
          {amount > 0 && (
            <div
              className="SQUARE25PX BG-INFO-OP25 me-2 flex-grow-0 FLEX-CENTER cursor-pointer br-10px hlx-shadow-min"
              onClick={() => mod(item, "-", 1)}
            >
              <span className="TXT-DARK">-</span>
            </div>
          )}
  
          <div
            className="SQUARE25PX BG-INFO-OP75 me-2 flex-grow-0 FLEX-CENTER cursor-pointer br-10px hlx-shadow-min"
            onClick={() => mod(item, "+", 1)}
          >
            <span className="TXT-INFO-CONTRAST">+</span>
          </div>
        </div>
        <div className ="TXT-HLX-MED txt-s TXT-INFO text-start" style={{textDecoration:'overline'}}>{`${amount * item.price} €`}</div>
      </article>
    );
  }
  