function getoversikt() {
    var xhr = new XMLHttpRequest();
    var url = "http://wildboy.uib.no/~tpe056/folk/104857.json";
  
    xhr.open("GET", url, true);
  
    xhr.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        // Typical action to be performed when the document is ready:
        var json = JSON.parse(xhr.responseText);
  
        for (var i = 0; i < Object.keys(json.elementer).length; i++) {
          var key = Object.keys(json.elementer)[i];
          var kommuneNR = Object.values(json.elementer)[i].kommunenummer;
  
          var lengde = Object.values(json.elementer)[i];
  
  
          //finner all data som er relatert til årstallet 2018 og skriver ut dataene til siden
          for (a in lengde.Menn) {
            if (a == "2018") {
  
  
              document.getElementById("tabell").innerHTML += "<tr>" + "<td>" + key + "<td>" + kommuneNR + "</td>" + "</td>" + "<td>" + a + "<td>" + lengde.Kvinner[a] + "</td>" + "<td>" + lengde.Menn[a] + "</td>" + "</tr>";
  
            }
  
          }
  
        }
  
      }
    }
  
    xhr.send();
  }
  window.onload = getoversikt();