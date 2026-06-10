document.querySelectorAll(".section").forEach(section => {
    section.addEventListener("click", function(event){
        const sectionDiv = section.querySelector("#webhook-settings-fields");
        const sectionArrow = section.querySelector(".section-arrow");
        
        if (sectionDiv.classList.contains("disabled")) {
            sectionDiv.classList.remove("disabled")
            sectionArrow.classList.replace("fa-angle-down", "fa-angle-up");
        }
        else{
            sectionDiv.classList.add("disabled")
            sectionArrow.classList.replace("fa-angle-up", "fa-angle-down");
        }
    });
});