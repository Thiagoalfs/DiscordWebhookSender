document.querySelectorAll(".section").forEach(section => {
    // Ignora seções que estão dentro do container de embeds para evitar conflito
    if (section.closest('#embeds-form-container')) return;

    const sectionDiv = section.querySelector(".dropdown-section");
    const sectionFields = section.querySelector(".fields");
    const sectionArrow = section.querySelector(".section-arrow");

    // Sincroniza o estado inicial da seta
    if (sectionFields && !sectionFields.classList.contains("disabled")) {
        sectionArrow.style.transform = "rotate(180deg)";
    }

    sectionDiv.addEventListener("click", function() {
        if (!sectionFields) return;
        const isCollapsed = sectionFields.classList.toggle("disabled");
        sectionArrow.style.transform = isCollapsed ? "rotate(0deg)" : "rotate(180deg)";
    });
});