const style = document.documentElement.style;

function toggleTheme(isDarkMode) {
    if (isDarkMode) {
        style.setProperty("--colorRoot", "rgb(34, 34, 34)");
        style.setProperty("--colorBotton", "rgb(255, 255, 255)");
        style.setProperty("--bkButton", "#343434");
        style.setProperty("--loading-top", "#bde0fe");
        style.setProperty(
            "--image",
            'url("https://i.ibb.co/kQZ260V/tasking-Blanco.png")'
        )
    } else {
        style.setProperty("--colorRoot", "rgb(230, 230, 230)");
        style.setProperty("--colorBotton", "rgb(0, 0, 0)");
        style.setProperty("--bkButton", "#adb5bd");
        style.setProperty("--loading-top", "#03045e");
        style.setProperty(
            "--image",
            'url("https://i.ibb.co/h89BLcF/tasking.png")'
        )
    }
}

export default toggleTheme;