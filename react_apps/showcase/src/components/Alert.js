export function Alert({alert, toggle }) {
    const {msg, mood} = alert
    const clss = `BG-S-${mood.toUpperCase()}-OP75`;
    return (
      <aside
        className={`W250PX H50PX FROST10 ${clss} BOTTOM-CENTER FLEX-CENTER br-10px hlx-shadow-n-st cursor-pointer relative Z1000`}
        onClick={() => toggle()}
      >
        <span className="TXT-HLX-MED txt-s">{msg}</span>
        <span className="SQUARE50PX TOP-RIGHT-EDGE FLEX-CENTER br-10px">
          <span>✖︎</span>
        </span>
      </aside>
    );
  }