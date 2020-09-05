/**
 * Funktion zur Überprüfung des Kontaktformulars. Wird beim Abschicken des
 * Formulars aufgerufen.
 */
let validateForm = event => {
    // Variablen für das Prüfergebnis
    let form = event.target;
    let okay = true;
    let message = "";

    // Erster Reisender
    if (form.first_firstname.value == "") {
        okay = false;
        message += "Geben Sie bitte den Vornamen des ersten Reisenden ein. <br />";
    }

    if (form.first_lastname.value == "") {
        okay = false;
        message += "Geben Sie bitte den Nachnamen des ersten Reisenden ein. <br />";
    }

    if (form.first_zip.value == "") {
        okay = false;
        message += "Geben Sie bitte die Postleitzahl des ersten Reisenden ein. <br />";
    }

    if (form.first_city.value == "") {
        okay = false;
        message += "Geben Sie bitte den Ort des ersten Reisenden ein. <br />";
    }

    if (form.first_country.value == "") {
        okay = false;
        message += "Geben Sie bitte das Land des ersten Reisenden ein. <br />";
    }

    if (form.first_email.value == "" || !form.first_email.value.includes("@")) {
        okay = false;
        message += "Geben Sie bitte eine gültige E-Mailadresse ein. <br />";
    }

    // Zweiter Reisender
    if (form.second_firstname.value != "" || form.second_lastname.value != "") {
        if (form.second_firstname.value == "") {
            okay = false;
            message += "Geben Sie bitte den Vornamen des zweiten Reisenden ein. <br />";
        }

        if (form.second_lastname.value == "") {
            okay = false;
            message += "Geben Sie bitte den Nachnamen des zweiten Reisenden ein. <br />";
        }

        if (form.second_zip.value == "") {
            okay = false;
            message += "Geben Sie bitte die Postleitzahl des zweiten Reisenden ein. <br />";
        }

        if (form.second_city.value == "") {
            okay = false;
            message += "Geben Sie bitte den Ort des zweiten Reisenden ein. <br />";
        }

        if (form.second_country.value == "") {
            okay = false;
            message += "Geben Sie bitte das Land des zweiten Reisenden ein. <br />";
        }

        if (form.second_email.value != "" && !form.second_email.value.includes("@")) {
            okay = false;
            message += "Geben Sie bitte eine gültige E-Mailadresse ein. <br />";
        }
    }

    // Ankunft und Abreise
    if (form.arrival.value == "") {
        okay = false;
        message += "Geben Sie bitte das Ankunftsdatum ein. <br />";
    }

    if (form.departure.value == "") {
        okay = false;
        message += "Geben Sie bitte das Abreisedatum ein. <br />";
    }

    // Ergebnis anzeigen
    let resultElement = document.getElementById("result");

    if (okay) {
        message = "Vielen Dank für Ihre Nachricht!";
        resultElement.classList.add("okay");
    } else {
        resultElement.classList.remove("okay");
    }

    resultElement.innerHTML = message;

    // Formular nicht abschicken
    //if (!okay) {
    event.preventDefault();
    //}
}
