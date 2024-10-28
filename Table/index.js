import { data as originalData, dataTypes, dataCategories, fieldWidths as widths } from "./testData.js";
import { RENDER } from "./classes/render.js";
import { DATASET } from "./classes/dataset.js";
import {EVENTS} from "./classes/tableEvents.js"
import { slowScroll } from "./functions/throttle.js";

const Dataset = new DATASET (originalData,Object.keys(originalData[0]),'id',dataTypes,dataCategories,widths,document.createElement("TABLE"),0) //0 = no data multiplying
const Events = new EVENTS(Dataset);
const Renderer = new RENDER(Dataset,Events,'tableContainer');
Events.setRenderer(Renderer)
Dataset.setRenderer(Renderer)
Renderer.populateViewport()

// Scroll handling
const scrollData = event => {
        if (event.deltaX !== 0) return
        event.preventDefault() // Prevent default scrolling
        event.stopPropagation()
        const scrollMultiplier = (event.ctrlKey || event.metaKey) && event.altKey ? 100 : event.ctrlKey || event.metaKey ? 10 : event.altKey ? 5 : 2;
        let scrollAmount = (Math.sign(event.deltaY) * scrollMultiplier); // -1 for up, 1 for down * multiplier
        event.shiftKey && (scrollAmount = slowScroll(scrollAmount)(Renderer.scrollDesceleration)) // slow scroll if shift pressed
        Renderer.repopulateViewport(scrollAmount)
}
Renderer.getTableContainer().addEventListener( "wheel", scrollData)
// Dataset.table.addEventListener( "click", (event)=>{
//         event.stopPropagation();
//         Events.handler
// })