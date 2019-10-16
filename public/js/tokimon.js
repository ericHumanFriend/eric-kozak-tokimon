function rand_value() {
    return Math.floor(Math.random() * 101);
}

function randomize() {
    document.getElementById("weight").value = rand_value();
    document.getElementById("height").value = rand_value();
    document.getElementById("fly").value = rand_value();
    document.getElementById("fight").value = rand_value();
    document.getElementById("fire").value = rand_value();
    document.getElementById("water").value = rand_value();
    document.getElementById("electric").value = rand_value();
    document.getElementById("ice").value = rand_value();
}