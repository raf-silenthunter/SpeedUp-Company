export class FleetFilter {
    // unableClean is by default set to false because there is not interface for cleaining filter elems. True if there is interface
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
        this.filterInput = document.querySelector(".browser__input");
        this.filterInput.value = "";
        this.cleanBtn = document.querySelector(".browser__action-btn");

        this.filterInput.addEventListener("input", (e) => this.filterOnInput(e));
        this.cleanBtn.addEventListener("click", () => this.cleanFilter())
    }

    cleanFilter(){
        this.filterInput.value = "";
        this.restoreOptions();
    }

    showPosts(postsIndexes){
        this.cleanFleet();
        if(postsIndexes.length === 0) {
            this.missigContentInfo();
        } else {
            postsIndexes.forEach((postIndex) => {
                this.fleetWrap.append(this.fleetOptions[postIndex]);         
            })
        }
    }

    filterH2InFleet(fleet){
        return fleet.map((fleetEl) => {
            const h2FromPosts = fleetEl.querySelector(".blog-article__title").textContent;
            return h2FromPosts;
        });
    }

    findPostsToShow(insertedTxt, filteredH2s){
        const indexesOfPostsToShow = [];
            for(let i = 0; i < filteredH2s.length; i++){
                if(filteredH2s[i].toUpperCase().includes(insertedTxt.toUpperCase())) {
                    indexesOfPostsToShow.push(i);  
                }         
            }
        return indexesOfPostsToShow;
    }

    filterOnInput(e){
        const inputTxt = e.target.value;
        const filteredH2sArray = this.filterH2InFleet(this.fleetOptions);
        const indexesOfPostsToShow = this.findPostsToShow(inputTxt, filteredH2sArray);       
        this.showPosts(indexesOfPostsToShow);
    }
}