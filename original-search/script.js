const txtBox = document.querySelector(".txtBox");
const form = document.querySelector(".searchForm");
const searchWord = document.querySelector(".search-word");
const description = document.querySelector(".description");
const theSymbol = document.querySelector(".symbol")
const values = document.querySelector(".values")
const notes = document.querySelector(".notes")
const dts = document.querySelectorAll("dt")
const transformation = []

dts.forEach(item => {
  item.classList.toggle("hide")
})

const dictionaryJson =
  "transforms.json";
function searchDict(e) {
  e.preventDefault();
  fetch(dictionaryJson)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      e.preventDefault;

      //hide all dts
      dts.forEach(item => {
        item.classList.add("hide")
        item.classList.remove("show")
      })
      theSymbol.innerHTML = ""
      notes.innerHTML = ""
      values.innerHTML = ""


      let word = txtBox.value;
      console.log(txtBox.value);
      let searchKeyword = word.toLowerCase();
      let maxIndex = Object.keys(data).length - 1;
      Object.keys(data).every((key, index) => {
        console.log("key", key, "index", index);
        if (key === searchKeyword) {
          //show dts and definitions
          dts.forEach(item => {
            item.classList.remove("hide")
            item.classList.add("show")
          });
          txtBox.value = ""; //clear search value
          searchWord.innerHTML = searchKeyword;
          theSymbol.innerHTML = data[key]["symbol"];

          //turn values array into a list with val/notes
          //turn values array into a string with vas
          //get an array of vas
          let vals = data[key]["values"].map(item => { return item.val }).join(',')
          values.innerHTML = vals;//data[key]["values"];
          notes.innerHTML = data[key]["notes"]
          return false; //break out of loop because found
        } else {
          //test for not found
          if (maxIndex === index) {
            txtBox.value = ""; //clear search value
            searchWord.innerHTML = searchKeyword;
            theSymbol.innerHTML = "Not found";
            return false;
          } else {
            return true; //keep going in loop
          }
        }
      });
    });
}

form.addEventListener("submit", searchDict);
