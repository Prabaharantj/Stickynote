const contain=document.getElementsByClassName('container')[0];
const bts=document.getElementsByClassName('btn')[0];

//[{"id":1234,"contant":"it's my sample 1"},{"id":1235,"contant":"it's my sample 2"},{"id":1236,"contant":"it's my sample 3"},{"id":1237,"contant":"it's my sample 4"}]

function getvalues(){
    return JSON.parse(localStorage.getItem("contants")||"[]");
}
getvalues().forEach(element => {
    const textarea=creattextarea(element.id,element.contant);
    contain.insertBefore(textarea,bts);
});

function creattextarea(id,contant){
    let textarea=document.createElement('textarea');
    textarea.classList.add('sticky');
    textarea.value=contant;

   textarea.addEventListener('change',()=>{
    changesave(id,textarea.value);
   })


   textarea.addEventListener('dblclick',()=>{
     let check=confirm("you want to remove this!!!!");
     if(check){
        deletetext(id, textarea)
     }
   })

    textarea.placeholder='enter your nots';
    return textarea;
}
bts.addEventListener('click',addnots)

function addnots(){
    let note=getvalues();
    let addcontant={
        id:Math.floor(Math.random()*100000),
        contant:""
    };
 let textarea=creattextarea(addcontant.id,addcontant.contant);
    contain.insertBefore(textarea,bts);
    note.push(addcontant)
    savenot(note);
}


function savenot(note){
   localStorage.setItem("contant",JSON.stringify(note));
}


function  changesave(id,contant){
    let note=getvalues();
    let updatelement=note.filter((note)=>note.id==id)[0];
    updatelement.content=contant;
    savenot(note);
}


function deletetext(id,textarea){
    let note=getvalues().filter((note)=>note.id!=id);
    savenot();
    contain.removeChild(textarea);
}