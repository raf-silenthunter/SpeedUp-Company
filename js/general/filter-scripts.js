export class Filter {
    // unableClean is by default set to false because there is not interface for cleaining filter elems. You can pass true in the class invoke if there is interface 
        constructor(featureWrap, elementsWrap, elements, unableClean = false){
            this.filterFeatureWrap = featureWrap;
            this.filterElemsWrap = elementsWrap;
            this.filterElements = elements;
            this.fleetOptions = [...this.filterElements];
            this.unableFreeClean = unableClean;

            this.currentFleet = null;
        }

        missigContentInfo(){
            this.filterElemsWrap.innerHTML = `<p class="speedup-txt--title gradient-txt">Sorry, we don't have what you're looking for :(</p>`;
        }

        filterInit(){
            this.filterFeatureWrap.addEventListener("click", (e) => this.filterFleet(e));
        }

        cleanFleet() {
            this.filterElemsWrap.innerHTML = '';
        }

        restoreOptions(){
            this.cleanFleet();
            this.fleetOptions.forEach(fleetOption => this.filterElemsWrap.append(fleetOption));
        }

        checkBtnKey(e) {
            if(e.target.matches(".filter__btn, .filter__btn--clean, .filter__title, .filter__icon, .filter__picture")){
                //check only filter button nodes
                let target = e.target; 
                while (target && !target.classList.contains("filter__btn")) target = target.parentElement;
                const clickedBtnKey = target.dataset.key;
                return clickedBtnKey;
            } else if(e.target === this.filterElemsWrap){
                return "filterElemsWrap";
            } else return false;
        }

        filterFleet(e) {
            const btnKey = this.checkBtnKey(e); 
            if(btnKey){
                const filteredFleet = this.fleetOptions.filter(e => e.dataset.option === btnKey);
                if(btnKey === "clean") {
                    return this.restoreOptions();
                } else if(filteredFleet.length === 0 && btnKey !== "filterElemsWrap") {
                    this.missigContentInfo();
                } else if (btnKey === "filterElemsWrap") {            
                    if(this.unableFreeClean) {
                        this.restoreOptions();
                    } else return;
                } else {
                    this.cleanFleet();
                    filteredFleet.forEach(fleetElement => this.filterElemsWrap.append(fleetElement))
                    return;
                }
            }
        }
}

export class BlogPostsFilter extends Filter{
    constructor(featureWrap, elementsWrap, elements, unableClean = false){
        super(featureWrap, elementsWrap, elements, unableClean);
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
                this.filterElemsWrap.append(this.fleetOptions[postIndex]);         
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