class Inmueble{
    constructor(direccion, barrio, valor, ambientes){
        this.direccion = direccion;
        this.barrio = barrio;
        this.valor = parseFloat(valor);
        this.ambientes = parseInt(ambientes);
    }
}
const arrayInmuebles = [];
arrayInmuebles.push (new Inmueble("25 de mayo 192", "Centro", 18000, 1));
arrayInmuebles.push (new Inmueble("24 de septiembre 1864", "General Paz", 50000, 2));
arrayInmuebles.push (new Inmueble("Emilio Olmos 324", "Centro", 150000, 4));
arrayInmuebles.push (new Inmueble("Caseros 1000", "Alberdi", 90000, 3));

/*Listado de todos los barrios que existan en arrayInmuebles*/
let listaBarrios= [];
arrayInmuebles.forEach((el)=>{listaBarrios.push(el.barrio)});

/*Elimina los elementos repetidos del listado*/
listaBarrios = listaBarrios.filter((el, index)=>{return listaBarrios.indexOf(el)===index});

let filterContainer = document.createElement("div");
document.body.appendChild(filterContainer);
filterContainer.classList.add("filterContainer");

let districtSelect = document.createElement("select");
filterContainer.appendChild(districtSelect);
districtSelect.innerHTML=`<option value="Barrio">Barrio</option>`;
districtSelect.classList.add("districtSelect");

/*Agrega los barrios como opciones a districtSelect*/
for (i in listaBarrios){
    let option = document.createElement("option");
    option.text = listaBarrios[i];
    option.value = listaBarrios[i];
    districtSelect.add(option);
}

let ambientOptions = document.createElement("select");
filterContainer.appendChild(ambientOptions);
ambientOptions.classList.add("ambientSelect");
ambientOptions.innerHTML=
    `<option value="ambiente/s">Ambientes</option>
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>`;

let search = document.createElement("input");
filterContainer.appendChild(search);
search.type = "search";
search.id = "propertieSearch";
search.placeholder = "Buscar dirección";
search.classList.add("propertieSearch");
search.value = localStorage.getItem('Search');

let listaPropiedades = document.createElement("div");
document.body.appendChild(listaPropiedades);
listaPropiedades.classList.add("cardsContainer");

arrayInmuebles.forEach((el)=>{
    let cardCreator = document.createElement("div");
    listaPropiedades.appendChild(cardCreator);
    cardCreator.classList.add("card");
    cardCreator.innerHTML=
    `<button class="compareButton" id="compareButton" type="button">Comparar</button>
    <div class="imgContainer">
        <span>Ver Contacto</span>
        <img src="./images/${el.direccion}.jpg">
    </div>
    <ul>
        <li class="direction">${el.direccion}</li>
        <li class="district">${el.barrio}</li>
        <li>$${el.valor}</li>
        <li class="ambient">${el.ambientes} ambiente/s</li>
    </ul>`;
})

let ambientSelect= (input,selector)=>{
    document.querySelectorAll(selector).forEach((el)=>
                el.textContent.includes(input)
                ? (el.parentNode).parentNode.classList.remove("ambientFilter")
                : (el.parentNode).parentNode.classList.add("ambientFilter")
    );
}
ambientOptions.onchange = ()=>{
    ambientSelect(ambientOptions.value,".ambient");
    localStorage.setItem('Ambient Storage', ambientOptions.value);
}
!(localStorage.getItem('Ambient Storage'))||(ambientOptions.value = localStorage.getItem('Ambient Storage'));

let barrioSelect= (input,selector)=>{
    document.querySelectorAll(selector).forEach((el)=>
        (el.textContent.includes(input)||input=="Barrio")
            ? (el.parentNode).parentNode.classList.remove("districtFilter")
            : (el.parentNode).parentNode.classList.add("districtFilter")
    );
}

/*Llama a la funcion cada vez que el select cambia*/
districtSelect.onchange = ()=>{
    barrioSelect(districtSelect.value,".district");
    localStorage.setItem('District Storage', districtSelect.value);
}
!(localStorage.getItem('District Storage'))||(districtSelect.value = localStorage.getItem('District Storage'));

/*String vacio para que la primera vez que se usa el buscador arroje todos los resultados*/
let searchStorage ="";
function buscador(){document.querySelectorAll(".direction").forEach((el)=>
                el.textContent.toLowerCase().includes(search.value.toLowerCase())
                ? (el.parentNode).parentNode.classList.remove("searchFilter")
                : (el.parentNode).parentNode.classList.add("searchFilter")
            )}

buscador();
barrioSelect(districtSelect.value,".district");
ambientSelect(ambientOptions.value,".ambient");

let buscadorKeyUp= (input,selector)=>{
    document.addEventListener("keyup", (e)=>{
        if(e.target.matches(input)){
            if(e.key=="Escape")e.target.value="";
            searchStorage= e.target.value;
            /*Almacena la busqueda en localStorage*/
            localStorage.setItem('Search',searchStorage);
            buscador();
        }
    })
}
buscadorKeyUp("#propertieSearch",".direction");

/*Comparador*/
let countCompare = 0;
const btnCompare = document.querySelectorAll("#compareButton")
btnCompare.forEach(button=>{button.addEventListener('click', e=>{
    if(e.target.getAttribute("class").includes("firstCompare")){
        e.target.classList.remove("firstCompare");
        countCompare = countCompare-1;
    }
    else{
        e.target.classList.add("firstCompare");
        countCompare++;
    }
    console.log(e);
    countCompare===2
    ? (btnCompare.forEach(button=>{!(button.getAttribute("class").includes("firstCompare"))&& button.classList.add("searchFilter")}))
    : (btnCompare.forEach(button=>{!(button.getAttribute("class").includes("firstCompare"))&& button.classList.remove("searchFilter")}))
})});

class Dueño{
    constructor(nombre, telefono, email){
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
    }
  }
  const owners=[];
  function showUsers(datos){
    datos.forEach(el => {
      owners.push(new Dueño(el.name.first.concat(' ',el.name.last),el.cell,el.email))
    })
  }
   (()=>{
        fetch("https://randomuser.me/api/?results=3")
          .then(results => results.json())
          .then((datos) => {
           showUsers(datos.results)
          })
          .catch(error => console.error (error))
   })()
   const span = document.querySelectorAll("span");
  span.forEach(el=>{el.addEventListener('click',()=>Swal.fire('Propietario: '.concat(owners[parseInt(Math.random()*3)].nombre,'\nEmail: ',owners[parseInt(Math.random()*3)].email,'\nTeléfono: ',owners[parseInt(Math.random()*3)].telefono)))})