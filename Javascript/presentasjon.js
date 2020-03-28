//viser intro delen av siden, mens de andre divvene blir skjult
function visIntro() {
    var intro = document.getElementById('intro');
    var oversikt = document.getElementById('oversikt');
    var detaljer = document.getElementById('detaljer');
    var sammenligning = document.getElementById('sammenligning');
    intro.className = "synlig";
    oversikt.className = "gjemt";
    detaljer.className = "gjemt";
    sammenligning.className = "gjemt";
    document.getElementById('aktiv').innerHTML = "Om Denne siden";
  }
  //viser oversikt delen av siden, mens resten de andre divvene blir skjult
  function visOversikt() {
    var intro = document.getElementById('intro');
    var oversikt = document.getElementById('oversikt');
    var detaljer = document.getElementById('detaljer');
    var sammenligning = document.getElementById('sammenligning');
    intro.className = "gjemt";
    oversikt.className = "synlig";
    detaljer.className = "gjemt";
    sammenligning.className = "gjemt";
    document.getElementById('aktiv').innerHTML = "Oversikt";
  }
  //viser detalje delen av siden, mens de andre divvene blir skjult
  function visDetaljer() {
    var intro = document.getElementById('intro');
    var oversikt = document.getElementById('oversikt');
    var detaljer = document.getElementById('detaljer');
    var sammenligning = document.getElementById('sammenligning');
    intro.className = "gjemt";
    oversikt.className = "gjemt";
    detaljer.className = "synlig";
    sammenligning.className = "gjemt";
    document.getElementById('aktiv').innerHTML = "Detaljert oversikt";
  }
  //viser sammenligning delen av siden, mens de andre divvene blir skjult
  function visSammenligning() {
    var intro = document.getElementById('intro');
    var oversikt = document.getElementById('oversikt');
    var detaljer = document.getElementById('detaljer');
    var sammenligning = document.getElementById('sammenligning');
    intro.className = "gjemt";
    oversikt.className = "gjemt";
    detaljer.className = "gjemt";
    sammenligning.className = "synlig";
    document.getElementById('aktiv').innerHTML = "Sammenligning";
  }
  //funksjon som lager lister til befolkning og sysselsatte
  function lagLister() {
    //lager liste for befolkning
    function lagListeBefolkning() {
      var header = document.createElement("H4");
      var headertext = document.createTextNode("Sist målte befolkning og sysselsetting(2018)");
      var befolkningDiv = document.getElementById('befolkningDiv');
      var ul = document.createElement("UL");
      ul.id = "listeBefolkning";
      ul.className = "sisteMålinger";
      ul.style.listStyleType = "none";
      header.id = "headerB";
      header.appendChild(headertext);
      befolkningDiv.appendChild(header)
      befolkningDiv.appendChild(ul);
  
    }
    //lager en ul liste for kvinnelige sysselsatte
    function laglisteKvinner() {
      var header = document.createElement("H4");
      var headertext = document.createTextNode("Sist målte utdanning Kvinner(2017)");
      var kvinneDiv = document.getElementById('KvinnerDiv');
      var ul = document.createElement("UL");
      ul.id = "listeKvinner";
      ul.className = "sisteMålinger";
      ul.style.listStyleType = "none";
      header.appendChild(headertext);
      kvinneDiv.appendChild(header)
      kvinneDiv.appendChild(ul);
  
    }
    //lager en ul liste for mannlige sysselsatte
    function laglisteMenn() {
      var header = document.createElement("H4");
      var headertext = document.createTextNode("Sist målte utdanning Menn(2017)");
      var mennDiv = document.getElementById('MennDiv');
      var ul = document.createElement("UL");
      ul.id = "listeMenn";
      ul.className = "sisteMålinger";
      ul.style.listStyleType = "none";
      header.appendChild(headertext);
      mennDiv.appendChild(header)
      mennDiv.appendChild(ul);
  
    }
    //kaller alle listefunskjonene
    fjernTabellerHistoriskData(document.getElementById('befolkningDiv'), document.getElementById('KvinnerDiv'), document.getElementById('MennDiv'));
    lagListeBefolkning();
    laglisteKvinner();
    laglisteMenn();
  
  }
  //lager tabelle for historiske data for befolkning, sysselsatte og utdanning
  function lagTabeller() {
    //lager tabeller for befolkningsdataene
    function lagTabellBefolkning() {
      var headerListe = ["År", "Befolkning (Menn)", "Befolkning (Kvinner)", "Totalt sysselsatte"];
  
      var befolkningDiv = document.getElementById('befolkningDiv');
      var tabell = document.createElement("TABLE");
      var headerRad = document.createElement("TR");
      headerRad.id = "befsysHeader";
  
      tabell.id = "befolkningTabell";
      tabell.className = "tabeller";
      tabell.style.width = "100%";
  
      befolkningDiv.appendChild(tabell);
      tabell.appendChild(headerRad);
      for (i in headerListe) {
        document.getElementById('befsysHeader').innerHTML += "<th>" + headerListe[i] + "</th>";
      }
  
    }
    //lager tabell for utdanningsdataene til kvinner
    function lagTabellUtdanningKvinner() {
      var kvinneDiv = document.getElementById('KvinnerDiv');
      var tabell = document.createElement("TABLE");
      var theadRow = document.createElement("TR");
  
      tabell.id = "UtdanningKTabell";
      tabell.className = "tabeller";
      tabell.style.width = "100%";
      theadRow.id = "radKvinner";
  
      kvinneDiv.appendChild(tabell);
      tabell.appendChild(theadRow);
  
  
    }
    //lager tabell for utdanningsdataene for menn
    function lagTabellUtdanningMenn() {
      var mennDiv = document.getElementById('MennDiv');
      var tabell = document.createElement("TABLE");
      var theadRow = document.createElement("TR");
  
      tabell.id = "UtdanningMTabell";
      tabell.className = "tabeller";
      tabell.style.width = "100%";
      theadRow.id = "radMenn";
  
      mennDiv.appendChild(tabell);
      tabell.appendChild(theadRow);
    }
  
    lagTabellBefolkning();
    lagTabellUtdanningKvinner();
    lagTabellUtdanningMenn();
  
  }
  
  //lager tabeller til dataene for sammenligning
  function lagtabellSammenligning() {
  
    //lager tabelle som blir vist øverst
    function lagTabellVenstre() {
      var headerNavn = ["År", "Sysselsatte (Menn)", "Prosentpoeng Menn", "",  "Sysselsatte (Kvinner)", "Prosentpoeng Kvinner", ""]
      var sammenligningDiv = document.getElementById("SammenligningVenstre");
  
      var resultatKvinner = document.createElement("H3");
      var resultatMenn = document.createElement("H3");
      resultatKvinner.id = "resultatKvinner";
      resultatMenn.id = "resultatMenn";
      sammenligningDiv.appendChild(resultatMenn);
      sammenligningDiv.appendChild(resultatKvinner);
  
      var tabell = document.createElement("TABLE");
      var theadRow = document.createElement("TR");
      tabell.id = "tabellVenstre";
      tabell.className = "tabeller";
      theadRow.id = "theadRowSammenligningV";
      sammenligningDiv.appendChild(tabell);
      tabell.appendChild(theadRow);
      for (i in headerNavn) {
  
        document.getElementById('theadRowSammenligningV').innerHTML += "<th>" + headerNavn[i] + "</th>";
      }
    }
    //lager tabellen som blir vist nederst
    function lagTabellHøyre() {
      var headerNavn = ["År", "Sysselsatte (Menn)", "Prosentpoeng Menn", "", "Sysselsatte (Kvinner) ", "Prosentpoeng Kvinner", ""]
      var sammenligningDiv = document.getElementById("SammenligningHøyre");
      var tabell = document.createElement("TABLE");
      var theadRow = document.createElement("TR");
      tabell.id = "tabellHøyre";
      tabell.className = "tabeller"
      theadRow.id = "theadRowSammenligningH";
      sammenligningDiv.appendChild(tabell);
      tabell.appendChild(theadRow);
      for (i in headerNavn) {
  
        document.getElementById('theadRowSammenligningH').innerHTML += "<th>" + headerNavn[i] + "</th>";
      }
  
    }
    fjernTabellerSammenligning(document.getElementById("SammenligningVenstre"), document.getElementById("SammenligningHøyre"));
    lagTabellVenstre();
    lagTabellHøyre();
  }
  //fjerner tabeller i historiske data delen
  function fjernTabellerHistoriskData(befolkningDiv, kvinneDiv, mennDiv) {
  
    for (var i = 0; i < befolkningDiv.children.length; i++) {
  
      befolkningDiv.children[i].remove();
      i--;
    }
  
    for (var k = 0; k < kvinneDiv.children.length; k++) {
      kvinneDiv.children[k].remove();
      k--;
    }
    for (var m = 0; m < mennDiv.children.length; m++) {
      mennDiv.children[m].remove();
      m--;
    }
  }
  //fjerner tabellene i sammenligning delen
  function fjernTabellerSammenligning(sammenligningVenstre, sammenligningHøyre) {
    for (var v = 0; v < sammenligningVenstre.children.length; v++) {
      if (sammenligningVenstre.children[v] === document.getElementById('navnVenstre')) {
        continue
      } else {
        sammenligningVenstre.children[v].remove();
      }
      v--
    }
  
    for (var h = 0; h < sammenligningHøyre.children.length; h++) {
      if (sammenligningHøyre.children[h] === document.getElementById('navnHøyre')) {
        continue
      } else {
        sammenligningHøyre.children[h].remove();
      }
      h--
    }
  }
  
  /* hver gang ikonet som er til høyre blir klikket på når det er liten skjerm vil klassen "navbar" bli til  "responsove". */
  function litennavbar() {
    var navbar = document.getElementById("navbar");
    if (navbar.className === "navbar") {
      navbar.className += " responsive";
    } else {
      navbar.className = "navbar";
    }
  }
  