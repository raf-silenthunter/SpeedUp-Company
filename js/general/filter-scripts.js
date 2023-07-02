export class FleetFilter {
        constructor(wrap, elements, unableClean = false){
            this.fleetWrap = wrap;
            this.fleetElements = elements;
            this.fleetOptions = [...this.fleetElements];
            this.unableFreeClean = unableClean;

            this.currentFleet = null;
        }

        missigContentInfo(){
            this.fleetWrap.innerHTML = `<p class="speedup-txt--title gradient-txt">Sorry, we don't have what you're looking for :(</p>`;
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
                this.missigContentInfo();
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

export class ExtraFilter extends FleetFilter{
    constructor(wrap, elements, unableClean = false){
        super(wrap, elements, unableClean);

        const filterInput = document.querySelector(".browser__input");
        filterInput.value = "";
        filterInput.addEventListener("input", (e) => this.filterOnInput(e));
    }

    showPosts(arr){
        this.cleanFleet();
        if(arr.length === 0) {
            this.missigContentInfo();
        } else {
            arr.forEach((arrindex) => {
                this.fleetWrap.append(this.fleetOptions[arrindex]);         
            })
        }
    }

    filterH2InFleet(fleet){
        return fleet.map((fleetEl) => {
            const h2Arr = fleetEl.querySelector(".blog-article__title").textContent.split(" ");
            if(h2Arr.includes('')) {
                const indexOfSpace = h2Arr.indexOf('');
                h2Arr.splice(indexOfSpace, 1);
            }
            const arr = h2Arr.concat().join(" ");
            console.log(arr);
            return h2Arr;
        });
    }

    findPostsToShow(insertedTxt, filterH2Arr){
        let indexesOfPostsToShow = [];
        for(let i = 0; i < filterH2Arr.length; i++){
                const levelOne = filterH2Arr[i];
                for(let x = 0; x < levelOne.length; x++){
                    const levelTwo = levelOne[x];
                    if(levelTwo.toUpperCase() === insertedTxt.toUpperCase()) {
                        indexesOfPostsToShow.push(i);  
                    }         
                }           
            }
        return indexesOfPostsToShow
    }

    filterOnInput(e){
        let value = e.target.value;
        const filterH2Arr = this.filterH2InFleet(this.fleetOptions);
        const indexesOfPostsToShow = this.findPostsToShow(value, filterH2Arr);       
        this.showPosts(indexesOfPostsToShow);
    }

    filterFleet(e){
        super.filterFleet(e);
    }
}