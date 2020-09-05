/*
 * Kleines Script zur Generierung der Playlist-Einträge. Wird hier gemacht,
 * damit der HTML-Code durch die Einträge nicht so aufgeblasen wird. In einer
 * echten Anwendung müsste hier natürlich viel mehr Logik stehen. :-)
 */
let artists = [
    "AC-DC",
    "Alan Jackson",
    "Band of Heathens",
    "Bap Kennedy",
    "Black Keys",
    "Blues Brothers",
    "BluesClub",
    "Bob Dylan",
    "Bon Jovi",
    "Bonnie Tyler",
    "Booker T. Jones",
    "Buena Vista Social Club",
    "Cas Haley",
    "Cat Stevens",
    "Chris DeBurgh",
    "Count Basie",
    "David Bowie",
    "Deep Purple",
    "Dire Straits",
    "Eagles",
    "Earth, Wind & Fire",
    "EAV",
    "Ed Sheran",
    "Elton John",
    "Emmylou Harris",
    "Endless Second",
    "Enigma",
    "Eric Clapton",
    "Eros Ramazzotti",
    "Gov't Mule",
    "Gregory Porter",
    "Gun N' Roses",
    "Guy Fletcher",
    "Harpo",
    "Howard Carpendale",
    "JJ Cale",
    "Joe Bonamassa",
    "Joe Cocker",
    "John Illsley",
    "Karen Matheson",
    "Kate Bush",
    "Leonard Cohen",
    "Mark Knopfler",
    "Mavericks",
    "Michael Jackson",
    "Michael McGoldrick",
    "Mike Oldfield",
    "Nancy Sinatra",
    "Nat King Cole",
    "O.M.D.",
    "Otto Walkes",
    "Paul Kalkbrenner",
    "Port O'Brian",
    "Pur",
    "Queen",
    "Rapperees",
    "R.E.M.",
    "Richard Bennett",
    "Riverside",
    "Roxette",
    "RPWL",
    "Ruth Moody",
    "Santana",
    "Simon & Garfunkel",
    "Simple Minds",
    "Steve Hackett",
    "Takako Mamiya",
    "Tom Petty",
    "Toni Braxton",
    "Toto",
    "Van Morrison",
    "Vicente Amigo",
    "Vintage Trouble",
    "Willie Nelson",
];

window.addEventListener("load", () => {
    let playlistElement = document.getElementById("playlist");
    let artistTemplate = playlistElement.querySelector("li");
    playlistElement.removeChild(artistTemplate);

    artists.forEach(artist => {
        let listItem = artistTemplate.cloneNode(true);
        listItem.querySelector("img").src += "?random=" + Math.floor(Math.random() * 1000);
        listItem.querySelector(".artist").textContent = artist;
        playlistElement.appendChild(listItem);
    });
});
