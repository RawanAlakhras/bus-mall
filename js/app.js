"use strict";
function sectionEvent(e) {}

let img_pathArr = [
  "bag.jpg",
  "banana.jpg",
  "bathroom.jpg",
  "boots.jpg",
  "breakfast.jpg",
  "bubblegum.jpg",
  "chair.jpg",
  "cthulhu.jpg",
  "dog-duck.jpg",
  "dragon.jpg",
  "pen.jpg",
  "pet-sweep.jpg",
  "scissors.jpg",
  "shark.jpg",
  "sweep.png",
  "tauntaun.jpg",
  "unicorn.jpg",
  "usb.gif",
  "water-can.jpg",
  "wine-glass.jpg",
];
let imgSection = document.getElementById("img");
let img1 = document.getElementById("img1");
let img2 = document.getElementById("img2");
let img3 = document.getElementById("img3");
let clickNumber = 0;
let indexImg1 = 0;
let indexImg2 = 0;
let indexImg3 = 0;
let vote = 25;
let labelArr = [];
let voteArr = [0];
let viewedArr=[0];
//craete constructor
function Product(name) {
  this.name = name;
  for (let i = 0; i < img_pathArr.length; i++) {
    if (img_pathArr[i].substring(0, name.length) == name) {
      this.imgPath = `./img/${img_pathArr[i]}`;
      //console.log(this.imgPath);
      break;
    }
  }
  this.shown = 0;
  this.clicks = 0;
  Product.allObject.push(this);
}
Product.allObject = [];
for (let i = 0; i < img_pathArr.length; i++) {
  let r = img_pathArr[i].split(".");
  new Product(r[0]);
  console.log(r[0]);
  labelArr.push(r[0]);
}
function generateImg() {
  let index1;
  do {
    index1 = randomNumber(0, img_pathArr.length - 1);
    //console.log(index1,'random');
    //console.log(indexImg1,'img prev');
  } while (index1 == indexImg1);

  Product.allObject[index1].shown++;
  viewedArr[index1]=Product.allObject[index1].shown;

  let index2 = randomNumber(0, img_pathArr.length - 1);
  while (index1 == index2 || indexImg2 == index2) {
    index2 = randomNumber(0, img_pathArr.length - 1);
  }
  Product.allObject[index2].shown++;
  viewedArr[index2]=Product.allObject[index2].shown;

  let index3 = randomNumber(0, img_pathArr.length - 1);
  while (index3 == index1 || index3 == index2 || index3 == indexImg3) {
    index3 = randomNumber(0, img_pathArr.length - 1);
  }
  Product.allObject[index3].shown++;
  viewedArr[index3]=Product.allObject[index3].shown;

  img1.src = Product.allObject[index1].imgPath;
  img2.src = Product.allObject[index2].imgPath;
  img3.src = Product.allObject[index3].imgPath;

  indexImg1 = index1;
  indexImg2 = index2;
  indexImg3 = index3;
}
//random number function
function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

generateImg();
//event listener
function sectionEvent(e) {
  console.log(e);

  if (
    (e.target.id == "img1" || e.target.id == "img2" || e.target.id == "img3") &&
    clickNumber < vote
  ) {
    if (e.target.id == "img1") {
      Product.allObject[indexImg1].clicks++;
      voteArr[indexImg1] = Product.allObject[indexImg1].clicks;
      generateImg();
      clickNumber++;
      console.log(clickNumber, "img 1");
    }
    if (e.target.id == "img2") {
      Product.allObject[indexImg2].clicks++;
      voteArr[indexImg2] = Product.allObject[indexImg2].clicks;
      generateImg();
      clickNumber++;
      console.log(clickNumber, "img 2");
    }
    if (e.target.id == "img3") {
      Product.allObject[indexImg3].clicks++;
      voteArr[indexImg3] = Product.allObject[indexImg3].clicks;
      generateImg();
      clickNumber++;
      console.log(clickNumber, "img 3");
    }
  } else if (clickNumber == vote) 
  {
    var ctx = document.getElementById("myChart").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labelArr,
        datasets: [
          {
            label: "# of Votes",
            data: voteArr,
            backgroundColor: ["#51c4d3"],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
          {
              label:'# of viewed',
              data:viewedArr,
              backgroundColor:["rgba(255, 99, 132, 1)"],
              borderColor:["rgba(54, 162, 235, 1)"],
              borderWidth: 1,
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    clickNumber++;
  }
}

imgSection.addEventListener("click", sectionEvent);
let btn = document.getElementById("Results");
function btnFunction() {
  let ul = document.createElement("ul");
  document.getElementById("section-Results").appendChild(ul);

  for (let i = 0; i < Product.allObject.length; i++) {
    let li = document.createElement("li");
    li.textContent =
      Product.allObject[i].name +
      " had " +
      Product.allObject[i].clicks +
      " votes and was seen " +
      Product.allObject[i].shown +
      " times.";
    ul.appendChild(li);
  }
  btn.removeEventListener("click", btnFunction);
}
btn.addEventListener("click", btnFunction);
//chart.js
function callChart() {}
