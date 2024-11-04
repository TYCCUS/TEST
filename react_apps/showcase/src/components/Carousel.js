import {ItemView} from './ItemView'

export function Carousel({ data, setChosen, mod, cartItems, toggleView, showView, show, viewedItem,size}) {
  return (
    <section className="WR-100 BG-SECONDARY d-flex justify-content-start align-items-center overflow-x-scroll px-4" style={{height:`${size.carouselHeight}px`}}>
      <Cards setChosen={setChosen} items={data.items} show={show} />
      {showView && (
        <ItemView
          item={viewedItem}
          toggle={toggleView}
          mod={mod}
          cart={cartItems}
        />
      )}
    </section>
  );
}

function Cards({ items, setChosen, show }) {
  function handleClick(item, show) {
    setChosen(item);
    show(item);
  }
  return items.map((item) => {
    return (
      <article
        key={item.id}
        id={`${item.id}`}
        element="experience card"
        className="H350PX W250PX d-flex flex-column justify-content-between align-items-stretch mx-4 hlx-shadow-n-st br-10px overflow-hidden flex-shrink-0 cursor-pointer"
        onClick={() => handleClick(item, show)}
      >
        <CardHeader {...item} />
        <CardBody {...item} />
        <CardFooter {...item} />
      </article>
    );
  });
}
function CardHeader(item) {
  return (
    <header className="H250PX FLEX-CENTER mb-2">
      <div className="SQUARE250PX relative BG-PRIMARY-OP25">
        <img
          src={item.image}
          className="SQUARE250PX mb-2"
          alt={`${item.title} cover`}
        ></img>
        <div className="W75PX TOP-LEFT FROST SEMIWHITE br-5px txt-xs hlx-shadow-s-st px-2">
          {parseInt(item.openSpots) ? item.openSpots : "SOLD OUT"}
        </div>
      </div>
    </header>
  );
}
function CardBody(item) {
  return (
    <div className="H100PX px-2">
      <p className="TXT-HLX-THIN txt-s TXT-DARK mb-1">
        <span className="TXT-INFO me-1">★</span>
        <span className="me-1 TXT-HLX-MED">{item.stats.rating}</span>
        <span className="me-2 TXT-DARKMUTED">{`(${item.stats.reviewCount})`}</span>
        <span className="">{item.location}</span>
      </p>
      <h3 className="TXT-HLX-LIGHT txt-s TXT-INFO">{item.title}</h3>
    </div>
  );
}
function CardFooter(item) {
  return (
    <footer className="px-2">
      <p className="TXT-HLX-LIGHT txt-s">
        <span className="TXT-HLX-BOLD">{`From ${item.price}`}</span> € / pp
      </p>
    </footer>
  );
}
