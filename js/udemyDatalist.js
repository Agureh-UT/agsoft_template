document.getElementsByTagName('form')[0].addEventListener("submit", (e)=>{
//grab input element
let userInput=document.querySelector("input[list]");
//grab the value the user has typed in the input element
let userValue= userInput.value;
//grab hidden input element that we will send to back end
let hiddenInput=document.querySelector('input[type="hidden"]');
// Finall lets target all the options the user can select
options = document.querySelectorAll("datalist option");
//do a for loop that loops through all your optionsand places the data-value attribute's value into the hidden input field
for(let i=0; i <options.length;i++){
 let option= options[i];
 console.log(option);
 if(option.innerText ===userValue){
    hiddenInput.value = option.getAttribute("data-value");
    //if we find a match, break our for loop
    break;

 }
} 
// now we deal with case where user types own value outside the options fetched from DB
// from above loop the hidden input cant be empty if user selects within options available. If empty however then that means he has selected outside the options fetched from DB

if(hiddenInput.value ===""){
   alert("you must select within the options available");
    //then prevent form submission
   e.preventDefault();

 }

});