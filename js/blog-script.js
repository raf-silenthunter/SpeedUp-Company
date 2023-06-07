import {FleetFilter} from "./Fleet-filer.js";
const grid = document.querySelector(".grid");
const gridElements = document.querySelectorAll(".grid__blog-article");
const blogFilter = new FleetFilter(grid, gridElements, false);
blogFilter.filterInit();