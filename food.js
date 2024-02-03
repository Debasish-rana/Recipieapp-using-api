let searchinput = document.getElementById("searchinput");
let searchbtn = document.getElementById("searchbtn");
let foodcontainer = document.querySelector(".foodcontainer");
let heading = document.querySelector(".heading");
let contentText = document.querySelector(".contentText");

          let renderFood = async(searchdeta)=>{
        
                    heading.innerHTML="your deta on process please wait"
                    let deta = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchdeta.value}`)
                    let jason = await deta.json()
                    console.log(jason.meals);

                    heading.innerHTML="Best dishes ever..."
                    searchdeta.value=""
                    foodcontainer.innerHTML=""
                     jason.meals.forEach((meal)=>{

                              let div = document.createElement("div");
                              div.classList.add("food-card");
                              foodcontainer.appendChild(div);


                              div.innerHTML = `<img src="${meal.strMealThumb}"/>
                              <h3>${meal.strMeal}</h3>
                              <P>${meal.strArea} <span>Dish</span></p>
                              <P>${meal.strTags}</p>
                              `
                              let button = document.createElement("button");
                              button.setAttribute("id","viewmore");
                              button.innerText="viewmore"
                              div.appendChild(button);
                              
                              button.addEventListener("click",()=>{
                                        showContent(meal)
                              })
                    })
                
                    
                    
          }

          function ingredients(meal){
            let list = ""


            for(let a=1; a<20; a++){
                 let deta = meal[`strIngredient${a}`];
                 if(deta){
                    list+=`<li>${deta}</li>`
                 }
                 else{
                    break;
                 }
            }
            return list;
        }

          function showContent(meal){
                    contentText.innerHTML=`
                    <h1>${meal.strMeal}</h1>
                    <h2>Ingredients :</h2>
                    <ul>${ingredients(meal)}</ul>
                    <h2>Insructions :</h2>
                    <p>${meal.strInstructions}</p>
                    `

                    document.querySelector(".content").style.display="block"
                }
               document.getElementById("close").addEventListener("click",function(){
                document.querySelector(".content").style.display="none"
               })
searchbtn.addEventListener("click",function(){
          renderFood(searchinput)
})
