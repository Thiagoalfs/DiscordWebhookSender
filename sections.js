document.querySelectorAll(".section").forEach(section => {
    const sectionDiv = section.querySelector(".dropdown-section");
    sectionDiv.addEventListener("click", function(event){
        const sectionArrow = section.querySelector(".section-arrow");
        const sectionFields = section.querySelector(".fields");
        
        if (sectionFields.classList.contains("disabled")) {
            sectionFields.classList.remove("disabled")
            sectionArrow.classList.replace("fa-angle-down", "fa-angle-up");
        }
        else{
            sectionFields.classList.add("disabled")
            sectionArrow.classList.replace("fa-angle-up", "fa-angle-down");
        }
    });
});