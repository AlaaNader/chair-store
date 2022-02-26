import {data} from "../data.js";


//dom elements
const bag = document.getElementById("bag");
const productItems = document.querySelector(".product-items");



// count raiting
function stars(y){
    start=[]
    for(var i=0; i<y.rating; i++){
     var start =  [...start,`<i class="fa fa-star" aria-hidden="true"></i>`].join("");
    }
return start;
};



// draw products
(function drawingProducts(){
const products = data.map(x=>{
   return ` <div class="product-item">
    <div class="product-img">
        <img  class="main-image" src="${x.image}" alt="" />
        <div class="product-hover">
           <img  src="images/chair3.jpg" alt="chairs" title="occasion praesintum" />
           <ul>
               <li><i class="fa fa-heart-o" aria-hidden="true"></i></li>
               <li><i class="fa fa-eye" aria-hidden="true"></i></li>
               <li><i class="fa fa-bars" aria-hidden="true"></i></li>
               <li id="addToCart" data-productID=${x.id}> <i class="fa fa-shopping-cart" aria-hidden="true"></i></li>
           </ul>
        </div>
    </div>
    <div class="product-des">
    <span class="star">
       ${stars(x)}  
    </span>
    <p> ${x.title} </p>
    <h4> ${x.price} </h4>
    </div>
</div>`  
});
// get rid of "," from object 
var pro = products.join("");
productItems.innerHTML = pro;
})();


// add to cart event, event delegation
var allproduct ;
var selectedItem =[] ;
var badge;
document.addEventListener('click',(e)=> {
    if(e.target && e.target.id == 'addToCart') {
         allproduct = localStorage.getItem("selectedProducts")
             if(!allproduct){
                selectedItem = [...data.filter(item=>item.id==e.target.getAttribute("data-productID"))];
                localStorage.setItem("selectedProducts",JSON.stringify(selectedItem));}
            else{  // don't repeat the same item 
            var checkID = JSON.parse(allproduct).some(item=>item.id==e.target.getAttribute("data-productID"));
                if(checkID){
                selectedItem = [...JSON.parse(allproduct)]
                localStorage.setItem("selectedProducts",JSON.stringify(selectedItem));     
                  }
                else{
            selectedItem = [...JSON.parse(allproduct),...data.filter(item=>item.id==e.target.getAttribute("data-productID"))];
        localStorage.setItem("selectedProducts",JSON.stringify(selectedItem));}
            }}
         badge = selectedItem.length;
         document.querySelector("li[data-count]").setAttribute("data-count",badge);
         }
    );


// move to cart details page
bag.addEventListener('click',function(){
    if(JSON.parse(localStorage.getItem("selectedProducts")) && JSON.parse(localStorage.getItem("selectedProducts")).length!=0){
    window.location.assign("cartDetails.html");
}})


// draw count of cart at launching
function drawCount(){
if(JSON.parse(localStorage.getItem("selectedProducts"))){
badge = JSON.parse(localStorage.getItem("selectedProducts")).length;
document.querySelector("li[data-count]").setAttribute("data-count",badge);}
}
drawCount();


