import { data, dataTypes, dataCategories, fieldWidths as widths } from "./testData.js"
import { RENDER } from "./classes/render.js"
import { DATASET } from "./classes/dataset.js"
import { EVENTS } from "./classes/tableEvents.js"
import { PARSER } from "./classes/parser.js"
import { CSS } from "./classes/css.js"
import { slowScroll } from "./functions/throttle.js"
import { resizeListener } from "./functions/listeners.js"
import { CSSvars } from "./functions/definitions.js"

const Dataset = new DATASET (data,Object.keys(data[0]),'id',dataTypes,dataCategories,widths,document.createElement("TABLE"),10) //0 = no data multiplying
const Parser = new PARSER()
const Events = new EVENTS(Dataset)
const Renderer = new RENDER(Dataset,Events,'tableContainer')
const HLX = new CSS()
for(const variable in CSSvars){HLX.add(`--${variable}`,CSSvars[variable])}
HLX.render()
Renderer.setRowHeight(CSSvars.rowHeight)
Events.setRenderer(Renderer)
Events.setSlowScroll(slowScroll)
Dataset.setRenderer(Renderer)
Dataset.setParser(Parser)
Renderer.populateViewport()
resizeListener(Renderer)