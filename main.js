import { headerScroll } from "./js/headerScroll.js";
document.addEventListener("DOMContentLoaded",()=>{
    headerScroll({
        selector: "header",
        scrollThreshold: 120
    });
});