'use strict';
function sectionEvent( e ){}

let img_pathArr=['bag.jpg','banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg','bubblegum.jpg','chair.jpg',
'cthulhu.jpg','dog-duck.jpg','dragon.jpg','pen.jpg','pet-sweep.jpg','scissors.jpg','shark.jpg','sweep.png',
'tauntaun.jpg','unicorn.jpg','usb.gif','water-can.jpg','wine-glass.jpg'];
let imgSection=document.getElementById('img');
let img1=document.getElementById('img1');
let img2=document.getElementById('img2');
let img3=document.getElementById('img3');
let clickNumber = 0;
let indexImg1=0;
let indexImg2=0;
let indexImg3=0;
//craete constructor
function Product (name ) {
    this.name=name;
    for (let i=0;i<img_pathArr.length;i++){
        if(img_pathArr[i].substring(0,name.length) == name){
            this.imgPath=`./img/${img_pathArr[i]}`;
            //console.log(this.imgPath);
            break;
        }
    }
    this.shown=0;
    this.clicks = 0;
    Product.allObject.push(this);
}
Product.allObject=[];
for (let i = 0 ;i<img_pathArr.length;i++){
    let r = img_pathArr[i].split('.'); 
    new Product(r[0]);
    console.log(r[0])

}
function generateImg(){
    let index1= randomNumber( 0, img_pathArr.length-1 );
    Product.allObject[index1].shown++;
    let index2=randomNumber(0, img_pathArr.length-1);
    while(index1 == index2){
        index2=randomNumber(0, img_pathArr.length-1);
    }
    Product.allObject[index2].shown++;
    let index3=randomNumber( 0, img_pathArr.length-1 );
    while(index3== index1 && index3==index2){
         index3=randomNumber( 0, img_pathArr.length-1 );
    }
    Product.allObject[index3].shown++; 
   
    img1.src=Product.allObject[index1].imgPath;
    img2.src=Product.allObject[index2].imgPath;
    img3.src=Product.allObject[index3].imgPath;

    indexImg1=index1;
    indexImg2=index2;
    indexImg3=index3;
    


}
//random number function
function randomNumber( min, max ) {
    min = Math.ceil( min );
    max = Math.floor( max );
    return Math.floor( Math.random() * ( max - min + 1 ) + min ); //The maximum is inclusive and the minimum is inclusive
  }

  generateImg();
  //event listener
  function sectionEvent( e ){
    if( clickNumber < 25)
    {
        clickNumber++;
        generateImg();
        

    }
}
  
  imgSection.addEventListener('click', sectionEvent);
  img1.addEventListener('click',function(e){
      if(clickNumber < 25){
        clickNumber++;
        Product.allObject[indexImg1].clicks++;
        generateImg();
        console.log('img 1 click');

      }

  });
  img2.addEventListener('click',function(e){
    if(clickNumber < 25){
      clickNumber++;
      Product.allObject[indexImg2].clicks++;
      generateImg();
      console.log('img 2 click');

    }
    console.log(clickNumber);

});
img3.addEventListener('click',function(e){
    if(clickNumber < 25){
      clickNumber++;
      Product.allObject[indexImg3].clicks++;
      generateImg();
      console.log('img 3 click');
      console.log(clickNumber);

    }

});
  let btn=document.getElementById('Results');
  btn.addEventListener('click',function(){
      let ul=document.createElement('ul');
      document.getElementById('section-Results').appendChild(ul);
      
      for (let i=0;i<Product.allObject.length ;i++){
         let li=document.createElement('li');
          li.textContent=Product.allObject[i].name + ' had '+Product.allObject[i].clicks+' votes and was seen '+Product.allObject[i].shown+' times.';
          ul.appendChild(li);
      }

  });
  console.log(clickNumber);