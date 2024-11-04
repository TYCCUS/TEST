import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Carousel } from "./components/Carousel";
import { Alert as AlertComponent } from "./components/Alert";
import { useState } from "react";
import "./css/hlxMOD.css";
import { Alert } from "./components/Alert";

function App(data) {
  const [chosenItem, setChosenItem] = useState(data.defaultItem);
  const [formDisplayed, setFormDisplayed] = useState(false);
  const [cartItems, setCartItems] = useState(data.cartItems);
  const ALERT = new Alert()
  const [alert, setAlert] = useState({
    msg: "",
    mood: "secondary",
    show: false,
  });
  const [showView, setshowView] = useState(false);
  const [viewedItem, setviewedItem] = useState(null);
  const [UIsizes, setUIsizes] = useState({
    ...data.UIsizes,
    wh: window.innerHeight,
    ww: window.innerWidth,
    heroH:
      window.innerHeight -
      data.UIsizes.headerH -
      data.UIsizes.carouselH -
      2 * data.UIsizes.gapL,
  });
  function resizeUI() {
    setUIsizes((prevSizes) => {
      return { ...prevSizes, wh: window.innerHeight, ww: window.innerWidth };
    });
  }
  function show(item) {
    setshowView(true);
    setviewedItem(item);
  }
  function toggleView() {
    setshowView((prevshowView) => !prevshowView);
  }
  function toggleAlert() {
    setAlert((prevalert) => {
      return { ...prevalert, show: !prevalert.show };
    });
  }
  function newAlert(message, style) {
    setAlert((prevalert) => {
      return { ...prevalert, msg: message, mood: style };
    });
    toggleAlert();
  }
  function modifyCart(item, action = null, amount = 0) {
    const cartItemIndex = cartItems.findIndex((entry) => entry.id === item.id);
    if (cartItemIndex !== -1) {
      setCartItems((prevCartItems) => {
        const updatedCart = [...prevCartItems];
        const cItem = updatedCart[cartItemIndex];
        const maxQ = data.items.find((item) => item.id === cItem.id).openSpots;
        switch (action) {
          case "0":
            updatedCart.splice(cartItemIndex, 1);
            ALERT.new("item removed from cart", "alert");
            break;
          case "+":
            updatedCart[cartItemIndex] = {
              ...cItem,
              quantity: Math.min(maxQ, cItem.quantity + amount),
            };
            ALERT.new("cart has been updated", "success");
            break;
          case "-":
            updatedCart[cartItemIndex] = {
              ...cItem,
              quantity: Math.max(0, cItem.quantity - amount),
            };
            ALERT.new("cart has been updated", "alert");
            break;
          default:
            updatedCart[cartItemIndex] = { ...cItem };
            break;
        }
        return updatedCart;
      });
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, item]);
      ALERT.new("item added to cart", "success");
    }
  }
  return (
    <main className="W100 H100 NOSCROLLBAR relative d-flex flex-column justify-content-between align-items-stretch relative">
      <Header
        cartItems={cartItems}
        data={{ ...data }}
        modCart={modifyCart}
        size={UIsizes}
      />
      <div
        id="scrollContainer"
        className="d-flex flex-column algin-items-stretch relative flex-grow-1 flex-shrink-0 overflow-y-scroll"
      >
        <div
          id="cover"
          className="W100 HR-100 d-flex flex-column justify-content-between"
        >
          <Hero
            showForm={formDisplayed}
            item={chosenItem}
            data={data}
            size={UIsizes}
          />
          <Carousel
            setChosen={setChosenItem}
            data={data}
            mod={modifyCart}
            cartItems={cartItems}
            toggleView={toggleView}
            showView={showView}
            show={show}
            viewedItem={viewedItem}
            size={UIsizes}
          />
        </div>
      </div>

      {alert.show && <Alert alert={{ ...alert }} toggle={toggleAlert} />}
    </main>
  );
}

function Form() {}

export default App;
