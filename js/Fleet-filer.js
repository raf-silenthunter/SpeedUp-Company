class FleetFilter {
        constructor(wrap, elements, unableClean){
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
            this.fleetOptions.forEach(fleetOption => this.fleetWrap.append(fleetOption));
        }

        checkBtnKey(e) {
            if(e.target.matches(".filter__btn, .filter__title, .filter__icon, .filter__picture")){
                let target = e.target; 
                
                console.log(e.target);
                while (target && !target.classList.contains("filter__btn")) target = target.parentElement;
                this.cleanFleet();
                //only works for implementation with clean button
                    if(target.matches(".filter__btn--clean")){
                        this.restoreOptions();
                        this.unableFreeClean = false;
                    }
                //only for filter implementation with clean button
                const clickedBtnKey = target.dataset.key;
                console.log(clickedBtnKey);
                return clickedBtnKey;
            } else if (e.target.matches(".option, .option__img, .option__list, .option__item, .option__txt, .action-btn")) {
                return;
            } else {
                return;
            }
        }

        filterFleet(e) {
            const btnKey = this.checkBtnKey(e); 
            const filteredFleet = this.fleetOptions.filter(e => e.dataset.option === btnKey);
            if(filteredFleet.length === 0 && btnKey !== "clean" && btnKey !== undefined) {
                this.fleetWrap.innerHTML = `<p class="speedup-txt--title gradient-txt">Sorry, we don't have what you're looking for :(</p>`;
            } else{
                filteredFleet.forEach(fleetElement => this.fleetWrap.append(fleetElement))
            }
        }
    }

export {FleetFilter};    
