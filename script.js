
function select(query) {
    return document.querySelector(query);
}

var expandBtn = select(".expand");

expandBtn.addEventListener("click", function () {
    
    this.classList.toggle("open");

    var panel = select('.expandable');
    if (panel.style.display === "block") {
        panel.style.display = "none";
    } else {
        panel.style.display = "block";
    }

    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
});