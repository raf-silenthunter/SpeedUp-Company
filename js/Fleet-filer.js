class FleetFilter {
        constructor(wrap, elements, unableClean = false){
            this.fleetWrap = wrap;
            this.fleetElements = elements;
            this.fleetOptions = [...this.fleetElements];
            this.unableFreeClean = unableClean;
        }

        filterInit(){
            document.addEventListener("click", (e) => this.filterFleet(e));
        }

        cleanFleet() {
            this.fleetWrap.innerHTML = '';
        }

        restoreOptions(){
            this.cleanFleet();
            this.fleetOptions.forEach(fleetOption => this.fleetWrap.append(fleetOption));
        }

        checkBtnKey(e) {
            if(e.target.matches(".filter__btn, .filter__btn--clean, .filter__title, .filter__icon, .filter__picture")){
                let target = e.target; 
                while (target && !target.classList.contains("filter__btn")) target = target.parentElement;
                const clickedBtnKey = target.dataset.key;
                return clickedBtnKey;
            } else if (e.target.matches(".option, .option__img, .option__list, .option__item, .option__txt, .action-btn")) {
                // for the future developement
                return;
            } else return undefined;
        }

        filterFleet(e) {
            const btnKey = this.checkBtnKey(e); 
            const filteredFleet = this.fleetOptions.filter(e => e.dataset.option === btnKey);
            if(btnKey === "clean") {
                return this.restoreOptions();
            } else if(filteredFleet.length === 0 && btnKey !== "clean" && btnKey !== undefined) {
                this.fleetWrap.innerHTML = `<p class="speedup-txt--title gradient-txt">Sorry, we don't have what you're looking for :(</p>`;
            } else if (btnKey === undefined) {
                if(this.unableFreeClean) {
                    this.restoreOptions();
                } else return;
            } else {
                this.cleanFleet();
                filteredFleet.forEach(fleetElement => this.fleetWrap.append(fleetElement))
            }
        }
    }

export {FleetFilter};    
