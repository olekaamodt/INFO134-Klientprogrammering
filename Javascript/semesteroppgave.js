var nyliste = [];
//en konstruktør som oppretter et objekt som laster inn et datasett
function FinnData(url) {
  this.datasett = {};
  //finner alle kommunenavnene i datasettet og returnerer listen med alle navn
  this.getName = function() {
      var navnListe = [];
      for (var i = 0; i < Object.keys(this.datasett.elementer).length; i++) {
        navnListe.push(Object.keys(this.datasett.elementer)[i]);

      }
      return navnListe;
    },
    // finner alle kommunenumrene og returnerer en liste
    this.getID = function() {
      var idListe = [];
      for (var i = 0; i < Object.keys(this.datasett.elementer).length; i++) {
        idListe.push(Object.values(this.datasett.elementer)[i].kommunenummer);
      }
      return idListe;
    }
  //returnerer en info om valgt kommune basert på kommunenummeret som
  // blir skrevet inn
  this.getInfo = function(kommuneNR) {
    //hvis datasette befolkning eller sysselsatte skjer koden under
    if (url === "http://wildboy.uib.no/~tpe056/folk/104857.json" || url === "http://wildboy.uib.no/~tpe056/folk/100145.json") {


      var array = [];
      //går igjennom datasettet og returnerer kommunenr og info om kommunen
      for (var i = 0; i < Object.keys(this.datasett.elementer).length; i++) {
        var kommunenummer = Object.values(this.datasett.elementer)[i].kommunenummer
        if (kommunenummer === kommuneNR) {
          var navn = Object.keys(this.datasett.elementer)[i];

          return [Object.values(this.datasett.elementer)[i], navn];
        }
      }
      //hvis datasettet utdanning er valgt skjer koden under
    }
    if (url === "http://wildboy.uib.no/~tpe056/folk/85432.json") {
      var array = [];
      for (var i = 0; i < Object.keys(this.datasett.elementer).length; i++) {
        var kommunenummer = Object.values(this.datasett.elementer)[i].kommunenummer;
        if (kommunenummer === kommuneNR) {

          var navn = Object.keys(this.datasett.elementer)[i];
          //kaller presentUtdanning som gjør at dataene blir skrevet ut på siden.

          return Object.values(this.datasett.elementer)[i];

        }

      }
    }
  }

  //Sender Get request som laster ned Json filene
  this.load = function() {
      var xhr = new XMLHttpRequest();

      xhr.open("GET", url, true);


      xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

          var json = JSON.parse(xhr.responseText);
          //bruker en callback funksjon for å lagre datasettet i objektet
          saveJson(url, json);

          if (url === "http://wildboy.uib.no/~tpe056/folk/85432.json") {
            enableNav();
            SkrivUtKommunerfraUtdanning(utdanning.getName(), sysselsatte.getName(), utdanning.getID(), sysselsatte.getID());
          }
          console.log("test");


        }
      }
      xhr.send();
    },
    this.onload = null;

}

function skrivUtOversikt(navn, kommunenr) {

  for (i in kommunenr) {
    if (befolkning.getInfo(kommunenr[i]) === undefined) {
      document.getElementById("tabell").innerHTML += "<tr><td>" + navn[i] + "<td>" + kommunenr[i] + "</td></td>" + "<td>2018</td><td>Ingen Måling</td><td>Ingen Måling</td></tr>";
    } else {
      var befolkningoversikt = befolkning.getInfo(kommunenr[i]);

      document.getElementById("tabell").innerHTML += "<tr><td>" + navn[i] + "<td>" + kommunenr[i] + "</td></td>" + "<td>2018</td><td>" + befolkningoversikt[0].Kvinner[2018] + "</td><td>" + befolkningoversikt[0].Menn[2018] + "</td></tr>";
    }

  }
}

//sjekker om kommunenavn og kommunenr fra utdanning datasettet er i sysselsatte datasettet.
function SkrivUtKommunerfraUtdanning(navnUtdanning, navnSysselsatte, nRutdanning, nrSysselsatte) {
  var oversikt = document.getElementById('tabell');
  for (i in navnUtdanning) {
    if (navnSysselsatte.includes(navnUtdanning[i])) {
      continue;
    } else {
      oversikt.innerHTML += "<tr><td>" + navnUtdanning[i] + "</td><td>" + nRutdanning[i] + "</td><td>2018</td><td>ingen måling</td><td>ingen måling</td></tr>";
    }
  }
}

//Savejson funksjonen blir kalt i objektet
function saveJson(url, json) {
  //legger til datasettet i hvert objekt som blir opprettet
  if (url === "http://wildboy.uib.no/~tpe056/folk/104857.json") {
    befolkning.datasett = json;
  }
  if (url === "http://wildboy.uib.no/~tpe056/folk/100145.json") {
    sysselsatte.datasett = json;
  }
  if (url === "http://wildboy.uib.no/~tpe056/folk/85432.json")
    utdanning.datasett = json;
}



/*denne funksjonen kaller getInfo metoden til datasettene
 befolkning og sysselsatte*/
function getkommuneinfo() {
  var kommuneNR = document.getElementById("kommunenr").value
  befolkning.getInfo(kommuneNR);
  sysselsatte.getInfo(kommuneNR);

}
/*Tar inn data fra befolkning.getInfo(), legger til dataene i en liste
og skriver ut dataene til siden.*/
function leggTilListebefolkning(data) {
  if (data[0] === undefined) {
    var div = document.getElementById('befolkningDiv');
    var element = document.createElement("H4");
    var text = document.createTextNode("ingen målinger for denne kommunen");
    element.appendChild(text);
    div.appendChild(element);

  } else {
    var tabellListe = [];
    tabellListe.push("Navn: " +
      data[1]);
    tabellListe.push("Kommunenummer: " + data[0].kommunenummer);
    tabellListe.push("innbyggere: " + (data[0].Kvinner[2018] + data[0].Menn[2018]));
    return taInnData(tabellListe);
  }
}


/*legger til informasjon om kommunen som har blitt valgt til en liste
se console.log*/
function leggTilListeSysselsatte(data) {
  tabellListe = [];
  tabellListe.push("Sysselsatte: " + data[0]["Begge kjønn"][2018] + "%")
  //console.log(tabellListe)
  taInnData(tabellListe);
}

function taInnData(data) {

  for (var i = 0; i < data.length; i++) {
    var tdata = document.createElement("TD");

    var celle = data[i];
    document.getElementById('listeBefolkning').innerHTML += "<li>" + celle + "</li>";

  }


}
/*Tar dataene fra befolkning og sysselsatte og skriver de ut til tabeller*/
function historiskDataBefolkning(databefolkning, datasysselsetting) {
  var befolkningtabell = document.getElementById('befolkningTabell');



  for (var m = 0; m < Object.keys(datasysselsetting[0].Menn).length; m++) {
    var rad = document.createElement("TR");
    rad.id = "befolkningrad" + m;
    befolkningtabell.appendChild(rad);
    /*sysselsattedatasett har målinger for tidligere enn 2007
    , så befolkning vil ha ingen måling for år tidligere enn 2007 */
    if (Object.keys(datasysselsetting[0].Menn)[m] < 2007) {
      var utskrift = "<td>" + Object.keys(datasysselsetting[0].Menn)[m] + "</td><td>Ingen Måling</td><td>Ingen Måling</td><td>" + Object.values(datasysselsetting[0]["Begge kjønn"])[m] + "%</td>";
      document.getElementById('befolkningrad' + m).innerHTML += utskrift;

    } else {
      //skriver ut data fra sysselsatte og befolkning til tabell
      var utskrift = "<td>" + Object.keys(datasysselsetting[0].Menn)[m] + "</td><td>" + Object.values(databefolkning[0].Menn)[m - 2] + "</td><td>" + Object.values(databefolkning[0].Kvinner)[m - 2] + "</td><td>" + Object.values(datasysselsetting[0]["Begge kjønn"])[m] + "%</td>";

      document.getElementById('befolkningrad' + m).innerHTML += utskrift;
    }
  }

}

function skrivUtIntro(data) {
  document.getElementById('introduksjon').innerHTML = data;
}


//kaller funksjonene som skriver ut dataene til siden
function sKrivUtDetaljer() {

  var utskrift = document.getElementById("kommunenr").value;
  if (befolkning.getInfo(utskrift) === undefined || sysselsatte.getInfo(utskrift) === undefined) {
    presentUtdanning(utdanning.getInfo(utskrift));
  } else {
    leggTilListebefolkning(befolkning.getInfo(utskrift));
    leggTilListeSysselsatte(sysselsatte.getInfo(utskrift));
    presentUtdanning(utdanning.getInfo(utskrift));
    historiskDataBefolkning(befolkning.getInfo(utskrift), sysselsatte.getInfo(utskrift));
  }
}
/*endrer klassen på navbaren slik at den skifter farge når jsondataene har
 blitt lastet ned*/
function enableNav() {

  document.getElementsByTagName('a')[1].setAttribute("class", "enabled");
  document.getElementsByTagName('a')[2].setAttribute("class", "enabled");
  document.getElementsByTagName('a')[3].setAttribute("class", "enabled");
  document.getElementsByTagName('a')[4].setAttribute("class", "enabled");
}



/*funksjon som skriver ut alle dataene i datasettet uttdanning for
kvinner og menn for valgte kommune*/
function presentUtdanning(data) {
  var detaljerMenn = document.getElementById('utdanningMenn');
  var detaljerKvinner = document.getElementById('utdanningKvinner');
  var kategori = 0;


  for (i in data) {
    if (data[i].Menn === undefined) {

      continue
    } else {

      //skriver ut kategoriene for menn innenfor utdanning til en liste
      celle = Object.values(utdanning.datasett.datasett.kategorier)[kategori] + ": " + data[i].Menn[2017] + "%";
      document.getElementById('listeMenn').innerHTML += "<li>" + celle + "</li>"
      kategori++;
    }
  }
  kategori = 0;


  for (i in data) {
    if (data[i].Kvinner === undefined) {

      continue
    } else {

      //skriver ut kategoriene for kvinner innenfor utdanning til en liste
      celle = Object.values(utdanning.datasett.datasett.kategorier)[kategori] + ": " + data[i].Kvinner[2017] + "%";
      document.getElementById('listeKvinner').innerHTML += "<li>" + celle + "</li>"
      kategori++;
    }
  }
  //skriver ut all historisk data innefor utdanning i kategorien Kvinner
  function historiskDataUtdanningKvinner() {
    var kvinneTabell = document.getElementById('UtdanningKTabell');
    var headerRad = document.getElementById('radKvinner');
    headerRad.innerHTML += "<th>år</th>";
    //skriver utkategorinavn til headerradene
    for (i in utdanning.datasett.datasett.kategorier) {
      if (utdanning.datasett.datasett.kategorier[i] === undefined) {

        continue
      } else {
        if (headerRad.innerHTML.includes(utdanning.datasett.datasett.kategorier[i])) {
          return
        } else {
          headerRad.innerHTML += "<th>" + utdanning.datasett.datasett.kategorier[i] + "</th>";
        }
      }
    }

    var tableData = [];
    //skriver ut all hsitorisk utdanningsdata om kvinner til tabell
    for (i in data) {

      if (data[i].Kvinner === undefined) {
        continue
      } else {

        //legger til rader i tabellen for kvinner
        for (var a = 0; a < Object.keys(data[i].Kvinner).length; a++) {
          var radKvinner = document.createElement("TR");
          radKvinner.id = "dataKvinner" + a;
          kvinneTabell.appendChild(radKvinner);
        }

        //skriver ut dataene for kvinner
        for (var k = 0; k < Object.keys(data[i].Kvinner).length; k++) {


          if (tableData.includes(Object.keys(data[i].Kvinner)[k])) {
            var utskrift = "<td>" + Object.values(data[i].Kvinner)[k] + "%</td>";
            document.getElementById('dataKvinner' + k).innerHTML += utskrift;
            continue
          }
          tableData.push(Object.keys(data[i].Kvinner)[k]);
          var utskrift = "<td>" + Object.keys(data[i].Kvinner)[k] + "</td><td>" + Object.values(data[i].Kvinner)[k] + "%</td>";
          document.getElementById('dataKvinner' + k).innerHTML += utskrift;
        }
      }
    }
  }
  //skriver ut all historisk data for utdanning innenfor kategorien Menn
  function historiskDataUtdanningMenn() {
    var mennTabell = document.getElementById('UtdanningMTabell');
    var headerRad = document.getElementById('radMenn');
    headerRad.innerHTML += "<th>år</th>";
    //skriver ut utdanningskategoriene til headerradene
    for (i in utdanning.datasett.datasett.kategorier) {
      if (utdanning.datasett.datasett.kategorier[i] === undefined) {

        continue
      } else {
        if (headerRad.innerHTML.includes(utdanning.datasett.datasett.kategorier[i])) {
          return
        } else {
          headerRad.innerHTML += "<th>" + utdanning.datasett.datasett.kategorier[i] + "</th>";
        }
      }
    }

    var tableData = [];
    var rad = 0;
    //skriver ut all historisk data om utdannign for menn til en tabell
    for (i in data) {

      if (data[i].Menn === undefined) {
        continue
      } else {

        //legger til rader i tabellen for menn
        for (var a = 0; a < Object.keys(data[i].Menn).length; a++) {
          var radMenn = document.createElement("TR");
          radMenn.id = "dataMenn" + a;
          mennTabell.appendChild(radMenn);
        }

        //skriver ut dataene for menn
        for (var k = 0; k < Object.keys(data[i].Menn).length; k++) {


          if (tableData.includes(Object.keys(data[i].Menn)[k])) {
            var utskrift = "<td>" + Object.values(data[i].Menn)[k] + "%</td>";
            document.getElementById('dataMenn' + k).innerHTML += utskrift;
            continue
          }
          tableData.push(Object.keys(data[i].Menn)[k]);
          var utskrift = "<td>" + Object.keys(data[i].Menn)[k] + "</td><td>" + Object.values(data[i].Kvinner)[k] + "%</td>";
          document.getElementById('dataMenn' + k).innerHTML += utskrift;
        }

      }

    }
  }
  historiskDataUtdanningKvinner();
  historiskDataUtdanningMenn();

}

//skriver ut sammenligning av sysselsatte mellom to kommuner
function skrivUtSammenligning(kommuneVenstre, kommuneHøyre) {
  var tabellVenstre = document.getElementById('tabellVenstre');
  var tabellHøyre = document.getElementById('tabellHøyre');

  var grønnpil = "<img src=\"Images/arrowUp.png\" heigth=\"10px\" width=\"10px\">";
  var rødpil = "<img src=\"Images/redArrow.png\" heigth=\"10px\" width=\"10px\">"

  document.getElementById('navnVenstre').innerHTML = kommuneVenstre[1];
  document.getElementById('navnHøyre').innerHTML = kommuneHøyre[1];
  //lister som inneholder årlig prosent for sysselsatte for hver kommune.
  var prosentpoengVMenn = [];
  var prosentpoengHMenn = [];
  var prosentpoengVKvinner = [];
  var prosentpoengHKvinner = [];
  //for loop som går igjennom datasetten for kommunene som er skrevet inn.
  /*kommuneVenstre og Høyre er basert på kommuneNR man skriver inn i venstre og
  høyre input på siden*/
  for (var m = 0; m < Object.keys(kommuneVenstre[0].Menn).length; m++) {
    var radVenstre = document.createElement("TR");
    var radHøyre = document.createElement("TR");
    radVenstre.id = "radVenstre" + m;
    radHøyre.id = "radHøyre" + m;
    tabellVenstre.appendChild(radVenstre);
    tabellHøyre.appendChild(radHøyre);
    //legger til alle prosentverdiene i hver liste for kvinner og menn.
    prosentpoengVMenn.push(Object.values(kommuneVenstre[0].Menn)[m]);
    prosentpoengHMenn.push(Object.values(kommuneHøyre[0].Menn)[m]);
    prosentpoengVKvinner.push(Object.values(kommuneVenstre[0].Kvinner)[m]);
    prosentpoengHKvinner.push(Object.values(kommuneHøyre[0].Kvinner)[m]);
    //finner årstall og prosent for valgte år.

    var årstallHøyre = Object.keys(kommuneHøyre[0].Menn)[m];
    var utskriftMennHøyre = Object.values(kommuneHøyre[0].Menn)[m];
    var utskriftKvinnerHøyre = Object.values(kommuneHøyre[0].Kvinner)[m];

    var dataVenstre = document.getElementById('radVenstre' + m);
    var dataHøyre = document.getElementById('radHøyre' + m);
  }
  //skriver ut sysselsatte i valgte kommune til den vesntre tabellen på siden.
  function skrivUtSammenligningVenstre() {

    for (var m = 0; m < Object.keys(kommuneVenstre[0].Menn).length; m++) {

      var årstallVenstre = Object.keys(kommuneVenstre[0].Menn)[m];
      var utskriftMennVenstre = Object.values(kommuneVenstre[0].Menn)[m]
      var utskriftKvinnerVenstre = Object.values(kommuneVenstre[0].Kvinner)[m];
      var tdataVenstre = document.getElementById('radVenstre' + m);

      if ((prosentpoengVMenn[m] - prosentpoengVMenn[0]) > 0) {
        tdataVenstre.innerHTML += "<td>" + årstallVenstre + "</td><td>" + utskriftMennVenstre + "%</td><td>" + (prosentpoengVMenn[m] - prosentpoengVMenn[0]).toFixed(2) + "</td><td>" + grønnpil + "</td>"
      } else {
        tdataVenstre.innerHTML += "<td>" + årstallVenstre + "</td><td>" + utskriftMennVenstre + "%</td><td>" + (prosentpoengVMenn[m] - prosentpoengVMenn[0]).toFixed(2) + "</td><td>" + rødpil + "</td>"
      }
      if ((prosentpoengVKvinner[m] - prosentpoengVKvinner[0]) > 0) {
        tdataVenstre.innerHTML += "<td>" + utskriftKvinnerVenstre + "%</td><td>" + (prosentpoengVKvinner[m] - prosentpoengVKvinner[0]).toFixed(2) + "</td><td>" + grønnpil + "</td>";
      } else {
        tdataVenstre.innerHTML += "<td>" + utskriftKvinnerVenstre + "%</td><td>" + (prosentpoengVKvinner[m] - prosentpoengVKvinner[0]).toFixed(2) + "</td><td>" + rødpil + "</td>";
      }
    }
  }
  //skriver ut syselsatte i valgte kommune til den høyre tabellen på siden.
  function skrivUtSammenligningHøyre() {

    for (var m = 0; m < Object.keys(kommuneHøyre[0].Menn).length; m++) {

      var årstallHøyre = Object.keys(kommuneHøyre[0].Menn)[m];
      var utskriftMennHøyre = Object.values(kommuneHøyre[0].Menn)[m];
      var utskriftKvinnerHøyre = Object.values(kommuneHøyre[0].Kvinner)[m];
      var tdataHøyre = document.getElementById('radHøyre' + m);

      if ((prosentpoengHMenn[m] - prosentpoengHMenn[0]) > 0) {
        tdataHøyre.innerHTML += "<td>" + årstallHøyre + "</td><td>" + utskriftMennHøyre + "%</td><td>" + (prosentpoengHMenn[m] - prosentpoengHMenn[0]).toFixed(2) + "</td><td>" + grønnpil + "</td>"
      } else {

        tdataHøyre.innerHTML += "<td>" + årstallHøyre + "</td><td>" + utskriftMennHøyre + "%</td><td>" + (prosentpoengHMenn[m] - prosentpoengHMenn[0]).toFixed(2) + "</td><td>" + rødpil + "</td>"
      }
      if ((prosentpoengHKvinner[m] - prosentpoengHKvinner[0]) > 0) {
        tdataHøyre.innerHTML += "<td>" + utskriftKvinnerHøyre + "%</td><td>" + (prosentpoengHKvinner[m] - prosentpoengHKvinner[0]).toFixed(2) + "</td><td>" + grønnpil + "<td>";
      } else {
        tdataHøyre.innerHTML += "<td>" + utskriftKvinnerHøyre + "%</td><td>" + (prosentpoengHKvinner[m] - prosentpoengHKvinner[0]).toFixed(2) + "</td><td>" + rødpil + "<td>";
      }
      console.log((prosentpoengHMenn[m] - prosentpoengHMenn[0]))
      console.log((prosentpoengVMenn[m] - prosentpoengVMenn[0]))
      console.log((prosentpoengVKvinner[m] - prosentpoengVKvinner[0]))
      console.log((prosentpoengHKvinner[m] - prosentpoengHKvinner[0]))

    }
    if (prosentpoengHMenn[13] - prosentpoengHMenn[0] > prosentpoengVMenn[13] - prosentpoengVMenn[0]) {
      document.getElementById('resultatMenn').innerHTML = kommuneHøyre[1] + " har økt mest/mistet minst prosentpoeng i kategorien Menn med " + (prosentpoengHMenn[13] - prosentpoengHMenn[0]).toFixed(2) + "%";

    } else {
      document.getElementById('resultatMenn').innerHTML = kommuneVenstre[1] + " har økt mest/mistet minst prosentpoeng i kategorien Menn med " + (prosentpoengVMenn[13] - prosentpoengVMenn[0]).toFixed(2) + "%";
    }

    if (prosentpoengHKvinner[13] - prosentpoengHKvinner[0] > prosentpoengVKvinner[13] - prosentpoengVKvinner[0]) {

      document.getElementById('resultatKvinner').innerHTML = kommuneHøyre[1] + " har økt mest/mistet minst prosentpoeng i kategorien Kvinner med " + (prosentpoengHKvinner[13] - prosentpoengHKvinner[0]).toFixed(2) + "%";

    } else {
      document.getElementById('resultatKvinner').innerHTML = kommuneVenstre[1] + " har økt mest/mistet minst prosentpoeng i kategorien Kvinner med " + (prosentpoengVKvinner[13] - prosentpoengVKvinner[0]).toFixed(2) + "%";

    }

  }
  skrivUtSammenligningVenstre();
  skrivUtSammenligningHøyre();
}




function skrivUtSammenligningTilSide() {
  var inputVenstre = sysselsatte.getInfo(document.getElementById("kommuneNr1").value);
  var inputHøyre = sysselsatte.getInfo(document.getElementById("kommuneNr2").value);
  skrivUtSammenligning(inputVenstre, inputHøyre);
}

var befolkning = new FinnData("http://wildboy.uib.no/~tpe056/folk/104857.json");
var sysselsatte = new FinnData("http://wildboy.uib.no/~tpe056/folk/100145.json");
var utdanning = new FinnData("http://wildboy.uib.no/~tpe056/folk/85432.json");

document.getElementsByTagName('body').onload = befolkning.load(), sysselsatte.load(), utdanning.load()