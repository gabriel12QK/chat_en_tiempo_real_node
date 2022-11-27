const socket=io();
let Message = document.getElementById("message")
let Send = document.getElementById("send")
let ContainerUser = document.getElementById("containerUser")
let ContainerMessage = document.getElementById("containerMessage")
let Typing =document.getElementById("typing")

let foto, nombre,texto
function getData(event) {
    //console.log(event.children[0].children[0].children[0].children[0].children[0].innerHTML);
    foto = event.children[0].children[0].children[0].children[0].currentSrc
    nombre = event.children[0].children[0].children[1].children[0].innerHTML
    // if(foto==undefined){
    //     foto=event.children[0].children[0].children[0].children[0].children[0].innerHTML
    // }
 

}

Send.addEventListener('click', function(){
    texto = Message.value
    socket.emit('chat:msg',{texto,nombre,foto})
})


Message.addEventListener('keypress', function(){
        texto = Message.value
        socket.emit('typing',{texto,nombre,foto})
    
}) 

socket.on('chat:msgShow',function(data){
    var date=new Date();
     Typing.innerHTML=``;
     if(data.foto!=undefined){
        ContainerMessage.innerHTML+=`
    
        <li>
                                       
                                        <div class="conversation-list">
                                            <div class="chat-avatar">
                                                <img src="${data.foto}" alt="">
                                            </div>
        
                                            <div class="user-chat-content">
                                                <div class="ctext-wrap">
                                                    <div class="ctext-wrap-content">
                                                        <p class="mb-0">
                                                            ${data.texto}
                                                        </p>
                                                        <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span class="align-middle">${date.getHours()}:${date.getMinutes()}</span></p>
                                                    </div>
    
                                                    <!-- menu de opciones para mensaje -->
                                                    <div class="dropdown align-self-start">
                                                        <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            <i class="ri-more-2-fill"></i>
                                                        </a>
                                                        <div class="dropdown-menu">
                                                            <a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a>
                                                            <a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a>
                                                            <a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a>
                                                            <a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
                                                        </div>
                                                    </div>
                                                    <!-- fin menu de opciones para mensaje -->
    
                                                </div>
                                                <div class="conversation-name">${data.nombre}</div>
                                            </div>
                                        </div>
                                       
                                    </li>                   
        `
     }else{
          ContainerMessage.innerHTML+=`
    
    <li>
                                   
                                    <div class="conversation-list">
                                        <div class="chat-avatar">
                                        
                                        <div class="avatar-xs">
                                        
                                        <span class="avatar-title rounded-circle bg-soft-primary text-primary">
                                        <i class='fas fa-user-alt'></i>
                                        </span>
                                  
                                         </div>
                                        </div>
    
                                        <div class="user-chat-content">
                                            <div class="ctext-wrap">
                                                <div class="ctext-wrap-content">
                                                    <p class="mb-0">
                                                        ${data.texto}
                                                    </p>
                                                    <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i> <span class="align-middle">${date.getHours()}:${date.getMinutes()}</span></p>
                                                </div>

                                                <!-- menu de opciones para mensaje -->
                                                <div class="dropdown align-self-start">
                                                    <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        <i class="ri-more-2-fill"></i>
                                                    </a>
                                                    <div class="dropdown-menu">
                                                        <a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a>
                                                        <a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a>
                                                        <a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a>
                                                        <a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
                                                    </div>
                                                </div>
                                                <!-- fin menu de opciones para mensaje -->

                                            </div>
                                            <div class="conversation-name">${data.nombre}</div>
                                        </div>
                                    </div>
                                   
                                </li>                   
    `
     }
  
})

socket.on('typing',function(data){ 

    if(data.foto!=undefined){
        Typing.innerHTML =`
        <div class="conversation-list">
                                        <div class="chat-avatar">
                                            <img src="${data.foto}" alt="">
                                        </div>
    
                                        <div class="user-chat-content">
                                            <div class="ctext-wrap">
                                                <div class="ctext-wrap-content">
                                                <p class="chat-user-message text-truncate mb-0">Escribiendo<span class="animate-typing">
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                            </span></p>
                                                </div>
    
                                                <!-- menu de opciones para mensaje -->
                                                <div class="dropdown align-self-start">
                                                    
                                                </div>
                                                <!-- fin menu de opciones para mensaje -->
    
                                            </div>
                                            <div class="conversation-name">${data.nombre}</div>
                                        </div>
                                    </div>
        `
    }else{
        Typing.innerHTML =`
        <div class="conversation-list">
                                        <div class="chat-avatar">
                                        <i class='fas fa-user-alt'></i>
                                        </div>
    
                                        <div class="user-chat-content">
                                            <div class="ctext-wrap">
                                                <div class="ctext-wrap-content">
                                                <p class="chat-user-message text-truncate mb-0">Escribiendo<span class="animate-typing">
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                                <span class="dot"></span>
                                            </span></p>
                                                </div>
    
                                                <!-- menu de opciones para mensaje -->
                                                <div class="dropdown align-self-start">
                                                    
                                                </div>
                                                <!-- fin menu de opciones para mensaje -->
    
                                            </div>
                                            <div class="conversation-name">${data.nombre}</div>
                                        </div>
                                    </div>
        `
    }
   
})
