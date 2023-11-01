import "./parts/menu.js";
import "./parts/range.js";
import { maskInputs } from "./static/inputmask.js";
import { accorden } from "./static/accordeon.js";

maskInputs('+7 (999) 999-99-99', 'input[name="phone"]')
accorden();
