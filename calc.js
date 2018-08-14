var capslider = document.getElementById("cap-slider");
var capoutput = document.getElementById("cap-disp");
var captxtbox = document.getElementById("cap-txtbox");

capoutput.innerHTML = capslider.value.toString().concat(" lbs"); // Display the default slider value
// Update the current slider value (each time you drag the slider handle)
capslider.oninput = function() {
    capoutput.innerHTML = this.value.toString().concat(" lbs");
    capslider.innerHTML = this.value;
    captxtbox.value = capslider.value.toString().concat(" lbs");

}
capoutput.innerHTML = capslider.value.toString().concat(" lbs");
captxtbox.value = capslider.value.toString().concat(" lbs");
captxtbox.oninput = function() {
  capslider.value = this.value;
  capoutput.innerHTML = capslider.value.toString().concat(" lbs");
}

var disslider = document.getElementById("dis-slider");
var disoutput = document.getElementById("dis-disp");
var distxtbox = document.getElementById("dis-txtbox");

disoutput.innerHTML = (Math.floor(disslider.value/12)).toString().concat("' ", (disslider.value%12).toString(), "\"")
// Update the current slider value (each time you drag the slider handle)
disslider.oninput = function() {
    disoutput.innerHTML = (Math.floor(this.value/12)).toString().concat("' ", (this.value%12).toString(), "\"")
    disslider.innerHTML = this.value;
    distxtbox.value = disslider.value.toString().concat(" in");

}
disoutput.innerHTML = (Math.floor(disslider.value/12)).toString().concat("' ", (disslider.value%12).toString(), "\"")
distxtbox.value = disslider.value.toString().concat(" in");
distxtbox.oninput = function() {
  disslider.value = this.value;
  disoutput.innerHTML = (Math.floor(disslider.value/12)).toString().concat("' ", (disslider.value%12).toString(), "\"")
}



var htslider = document.getElementById("ht-slider");
var htoutput = document.getElementById("ht-disp");
var httxtbox = document.getElementById("ht-txtbox");

httxtbox.value = htslider.value.toString().concat(" in");
htoutput.innerHTML = (Math.floor(htslider.value/12)).toString().concat("' ", (htslider.value%12).toString(), "\"")
// Update the current slider value (each time you drag the slider handle)
htslider.oninput = function() {
    htoutput.innerHTML = (Math.floor(this.value/12)).toString().concat("' ", (this.value%12).toString(), "\"")
    htslider.innerHTML = this.value;
    httxtbox.value = htslider.value.toString().concat(" in");

}

httxtbox.oninput = function() {
  // capoutput.innerHTML = this.value.toString().concat(" lbs");
  htslider.value = this.value;
  htoutput.innerHTML = (Math.floor(htslider.value/12)).toString().concat("' ", (htslider.value%12).toString(), "\"")

  // distxtbox.value = capslider.value.toString().concat(" lbs");
}

var gantrydisp = document.getElementById("display-gantry-type");
var submitbutton = document.getElementById("calc-gantry"); 

function showresults() {

  var oneton = {capacity: 2000, heighmin: 60, heightmax: 87, beamsize1: 6, maxspan1: 96, beamsize2: null, maxspan2: null, link: '1ton.html'};
  var twoton_1 = {capacity: 4000, heighmin: 60, heightmax: 87, beamsize1: 10, maxspan1: 180, beamsize2: 8, maxspan2: 96, link: '2ton.html#short'};
  var twoton_2 = {capacity: 4000, heighmin: 79, heightmax: 124, beamsize1: 10, maxspan1: 180, beamsize2: 8, maxspan2: 96,  link: '2ton.html#medium'};
  var twoton_3 = {capacity: 4000, heighmin: 96, heightmax: 135, beamsize1: 10, maxspan1: 180, beamsize2: 8, maxspan2: 96, link: '2ton.html#tall'};
  var twoton_4 = {capacity: 4000, heighmin: 100, heightmax: 168, beamsize1: 10, maxspan1: 180, beamsize2: 8, maxspan2: 96,  link: '2ton4.html'};
  var threeton = {capacity: 6000, heighmin: 100, heightmax: 168, beamsize1: 12, maxspan1: 180, beamsize2: null, maxspan2: null, link: '3ton.html'};
  var fiveton = {capacity: 10000, heighmin: 100, heightmax: 168, beamsize1: 12, maxspan1: 180, beamsize2: null, maxspan2: null, link: '5ton.html'};

  var gantries = [oneton, twoton_1, twoton_2, twoton_3, twoton_4, threeton, fiveton];
  var temp_candidates = [];
  var final_options = [];

  for(var i = 0; i < gantries.length; i++) {
    if(gantries[i].heightmax >= htslider.value && gantries[i].heighmin <= htslider.value && gantries[i].capacity >= capslider.value) {
      temp_candidates.push(gantries[i]);
    }
  }
  var lents = temp_candidates.length;

  for(var x = 0; x < lents; x++) {
    // alert(temp.heighmin);
    var temp = temp_candidates.pop();
    if(disslider.value <= temp.maxspan1) {
      temp.maxspan2 = null;
      final_options.push(temp);
    } else if(disslider.value <= temp.maxspan2) {
      temp.maxspan1 = null;
      final_options.push(temp);
    }
  }
  var body = document.getElementById("results");
  if(body.hasChildNodes()) body.removeChild(body.childNodes[0]);
  var tbl = document.createElement('p');
  var lenth = final_options.length;
  for(var y = 0; y < lenth; y++) {
    var gantry_obj = final_options.pop();
    var beamsize = gantry_obj.beamsize1 == null ? gantry_obj.beamsize2 : gantry_obj.beamsize1;
    var gantrylink = document.createElement("a");
    var gantrytext = Math.floor(gantry_obj.capacity/2000).toString().concat(
      " Ton Gantry (", Math.floor(gantry_obj.heighmin/12).toString(), "\' ", 
      Math.floor(gantry_obj.heighmin%12).toString(), " to ", 
      Math.floor(gantry_obj.heightmax/12).toString(), "\' ", 
      Math.floor(gantry_obj.heightmax%12).toString(), "\") with a ", 
      (Math.floor(disslider.value/12)+1).toString(), "ft I-beam (", 
      beamsize.toString(), " in)");
    var gantry = document.createTextNode(gantrytext);
    gantrylink.appendChild(gantry);
    gantrylink.title = gantrytext;
    gantrylink.href = gantry_obj.link;
    tbl.appendChild(document.createElement('br'));
    tbl.appendChild(gantrylink);
    tbl.appendChild(document.createElement('br'));
    tbl.appendChild(document.createElement('br'));
  }
  body.appendChild(tbl);
}
document.getElementById("showHide").onclick = function() {
  var theDiv = document.getElementById("foo");
  if(theDiv.style.display == 'none') {
      theDiv.style.display = 'block';
      this.innerHTML = 'Hide';
  } else {
      theDiv.style.display = 'none';
      this.innerHTML = 'Show';
  }
}