// dom element
const home = document.getElementById("home");
const cartBody = document.querySelector(".items-details");
var items = JSON.parse(localStorage.getItem("selectedProducts"));


// return to home page
home.addEventListener('click',function returnHome(){
    window.location.assign("index.html");
});

// draw product details
var quantity = 1;
function drawProductDetails(items){
const cards = items.map((item)=>{
    return ` <div class="itemDetails" >
    <div class="desc">
    <div class="image">  
      <img src="${item.image}"  />
    </div>
    <p class="title"> ${item.title} </p>
    </div>
    <p class="price">  price : ${item.price} $  </p>     
    <div class="edit">
    <i class="fa fa-trash fa-lg" aria-hidden="true" id="delete" data-delete="${item.id}"> delete </i>
    <div class="editQuantity">
    <span id="increase" data-increase="${item.id}"> + </span>
     <span id="quantity" data-quantity="${item.id}"> ${quantity} </span> 
      <span id="decrese" data-decrese="${item.id}" > - </span>
      </div>  
    </div>
    </div> </br>` ;})
cartBody.innerHTML = cards.join("");
};
var items = JSON.parse(localStorage.getItem("selectedProducts"));
drawProductDetails(items);



//increase quantity logic 
document.addEventListener("click",(e)=>{
    if(e.target && e.target.id=='increase'){  
       var id =  e.target.getAttribute("data-increase"); 
       quantity = quantity + 1 ;
       document.querySelector(`[data-quantity="${id}"]`).innerText = quantity;
  }});



//decrese quantity logic
document.addEventListener("click",(e)=>{
    var id =  e.target.getAttribute("data-decrese"); 
    if(e.target && e.target.id=='decrese'){
        if(quantity>1){
             quantity = quantity - 1; // i didnot make quantity -- in the textContent because of order of the operation
       document.querySelector(`[data-quantity="${id}"]`).innerText = quantity;
    }  
  }});


// delete items from shopping cart and re-draw the ui
document.addEventListener("click",(e)=>{
    if(e.target && e.target.id=='delete'){
      var ID = e.target.getAttribute("data-delete");
      var items = JSON.parse(localStorage.getItem("selectedProducts")); // i should make anew getitem because the local one(items) is not up to date
        var newArray =items.filter((x)=>x.id!=ID);
        localStorage.setItem("selectedProducts",JSON.stringify(newArray));
        drawProductDetails(newArray);
}
});

