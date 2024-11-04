import { useState } from "react";
import { MiniCart } from "./MiniCart";
import { CartIcon } from "./CartIcon";
import { Logo } from "./Logo";
import { NavMenu } from "./NavMenu";

export function Header({ cartItems, data, modCart, size }) {
  const [showMiniCart, setShowMiniCart] = useState(false);
  const cartItemsNo = cartItems.length;
  function toggleMiniCart() {
    setShowMiniCart((prevShowMiniCart) => !prevShowMiniCart);
  }
  return (
    <div className="W100 BG-LIGHT d-flex justify-content-between align-items-center hlx-shadow-s-st px-3 mb-3 flex-grow-0" style={{height:`${size.headerHeight}px`}}>
      <Logo {...data} />
      <nav className="d-flex justify-content-start align-items-center">
        <NavMenu {...data.menuItems} />
      </nav>
      {cartItemsNo > 0 && (
        <CartIcon
          toggleCart={toggleMiniCart}
          logos={{ ...data.cartLogos }}
          ItemsNo={cartItemsNo}
        />
      )}
      {showMiniCart && (
        <MiniCart
          toggleCart={toggleMiniCart}
          cartItems={cartItems}
          data={data.items}
          mod={modCart}
        />
      )}
    </div>
  );
}
