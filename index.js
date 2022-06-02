
const grid = document.getElementById("grid")
const gridSizeInput = document.getElementById("gridSizeInput")
const colorInput = document.getElementById("colorInput")
const colorInputDisplay = document.getElementById("colorInputDisplay")
const sizeDisplay=document.getElementById("sizeDisplay")
const erase=document.getElementById("erase")
let colorArray = []


gridSizeInput.addEventListener(/*Code ici*/, (e)=>initializeGrid(e.target.value))
colorInput.addEventListener(/*Code ici*/, (e)=> {
                                        colorArray.push(e.target.value)
                                        initializeColorDisplay()
                                    })
erase.addEventListener(/*Code ici*/)

const initializeColorDisplay=()=>{
    /* Remise à 0 des anciens paramètres */
    colorInputDisplay.innerHTML="";
    colorArray.length>0? erase.style.visibility="visible":erase.style.visibility="hidden"
    /*Code ici*/
}

const initializeGrid = (amount) => {
    /* Remise à 0 des anciens paramètres */
    grid.innerHTML="";
    sizeDisplay.innerText=`${amount}x${amount}`
    /*Code ici*/

}

const changeColor = (e) => {
    /*Code ici*/ 
}

initializeGrid(/*Code ici*/ )
