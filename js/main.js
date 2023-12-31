/*
CONSEGNA
Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
Milestone 2 - Prendendo come riferimento il layout di esempio presente nell'html,
 stampiamo i post del nostro feed.
Milestone 3 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e
 incrementiamo il counter dei likes relativo.
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

SVOLGIMENTO
MILESTONE2
1)prendo in input il container
2)leggo l'array di oggetti
    -ad ogni lettura stampo nel DOM la struttura html con relative modifice prese dall'oggetto
    tramite la proprità innerHTML
MINLESTONE3
1)prendo in input il pulsante "Mi piace"
2)all'evento click aggiungo la classe che gli fa cambiare colore 
3)incremento il counter dei likes
    -prendo in input il counter
    -modifico il counter
    -stampo il counter
4)Aggiungo tramite push gli elemnti a cui è stato messo like

*/
//array che contiene le informazioni da stampare nel DOM
const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];
//input container
let objPost = document.getElementById("container");

//fine array di oggetti
for (let i = 0; i < posts.length; i++) {
    let userPhoto;
    //controllo se il profilo ha un immagine oppure no
    if (posts[i].author.image == null){
       userPhoto = document.createElement("div");
       userPhoto.classList.add("standardIcon");
       let iniziali = posts[i].author.name[0] + posts[i].author.name[findLastName(posts[i].author.name)];
       userPhoto.append(iniziali);
    }
    else{
        userPhoto = document.createElement("img");
        userPhoto.classList.add("profile-pic");
        userPhoto.src = posts[i].author.image;
        userPhoto.alt = posts[i].author.name;
    }
    //creo struttura nel mio DOM
    objPost.innerHTML +=`
    <div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                                     
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">${posts[i].author.name}</div>
                    <div class="post-meta__time">${posts[i].created}</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">${posts[i].content}</div>
        <div class="post__image">
            <img src="${posts[i].media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  js-like-button" href="#nogo" data-postid="${i+1}">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${i+1}" class="js-likes-counter">${posts[i].likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>
   `;
   //vado a modificare la parte riguardo l'immagine
   const postMetaIcon = document.querySelector(".post:last-child .post-meta__icon");
   postMetaIcon.append(userPhoto)
}

//MILESTONE 3 SVOLGIMENTO
//prendo in input tutti i button like del DOM
const likeButton = document.querySelectorAll(".like-button")

for (let i = 0; i < likeButton.length; i++) {
    console.log(i, "questo è il pulsante", likeButton[i])
    likeButton[i].addEventListener("click", function(){
        //potevo usare anche la soluzione dataset
        //dataset restituisce un array di valori degli attributi data precedentemente SELEZIONATI
        //mi devo salvare prima in una variabile l'id del post
        //e fare una condizione sul postid 
        //posso usare anche getAttribute("") per recuperare l'attributo; 
        this.classList.toggle("like-button--liked");
        let totLike = parseInt(document.getElementById("like-counter-"+(i+1)).innerHTML);
        //controllo se il pulsante ha la classe like-button--liked in caso aggiungi 1 in più ai like
        if(this.classList.contains("like-button--liked")){
            document.getElementById("like-counter-"+(i+1)).innerHTML = (totLike + 1);
        }
        else{
            document.getElementById("like-counter-"+(i+1)).innerHTML = (totLike - 1); 
        }
    })
}

//my function
//funzione per prelevare la lettera del cognome
function findLastName(nameString){
    let position = 0;
    for (let i = 0; i < nameString.length; i++) {
        if(nameString[i] == " "){
            position = i + 1;
            return(position);
        }
    }
}
