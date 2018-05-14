function viewIndex(){
        var url = 'http://loc.mean.example.com/api/users'

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onload = function(){
            let data = JSON.parse(xhr.response);
            console.log(data);
            var rows = '';

            for(var i=0; i<data['users'].length; i++){
                let x = data['users'][i];
                let name = `${x.first_name} ${x.last_name}`;
                rows = rows + `<tr>
                <td>
                    <a href="#edit-${x._id}"
                    onclick="viewUser('${x._id}')">
                    ${name}
                    </a>
                    </td>
                
                <td>${x.username}</td>
                <td>${x.email}</td>
                </tr>`;
            }

            var app = document.getElementById('app');
            app.innerHTML = `<table class="table">
                <thead>
                    <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        </tr>
        </thead>
        <tbody>${rows}</tbody>
        </table>
        
      
                        `;

        }
        
}     

function viewUser(id){
    var url = 'http://loc.mean.example.com/api/users/' + id;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();

    xhr.onload = function(){
        var data = JSON.parse(xhr.response);
        var user = data.user;
        var app = document.getElementById('app');

        app.innerHTML = `<h2>create new user</h2>
           <form id="createUser" action="/api/users" method="post">
             <div>
                 <label for="username">email</label>
                 <input type="text" 
                 name="email" 
                 id="email"
                
             </div>
         
         <div>
                 <label for="username">first name</label>
                 <input type="text"
                     name="first_name" 
                     id="first_name"
            
             </div>
         
             <div>
             <label for="username">last name</label>
             <input type="text"
                 name="last_name" 
                 id="last_name"
             
         </div>
         <input type="submit" value="submit">
     </form>
     `;

  

var editUser = document.getElementById('editUser');
editUser.addEventListener('submit', function(e){
    e.preventDefault();
    var formData = new FormData(editUser);
    var url = 'http://loc.mean.example.com/api/users';
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader(
        'Content-Type', 
        'application/json; charset=UTF-8');


    var object={};
    formData.forEach(function(value, key){
        object[key] = value;

    });
    xhr.send(JSON.stringify(object));
    xhr.onload = function(){
        let data = JSON.parse(xhr.response);
        if(data.success===true){
            viewIndex();
        }
        
    }
});

    }
}


function createUser(){
    var app = document.getElementById('app');


    app.innerHTML = `<h2>create new user</h2>

           <form id="createUser" action="/api/users" method="post">
           <div>
           <label for="username">username</label>
           <input type="text"
               name="username" 
               id="username"
           
       </div>
             <div>
                 <label for="username">email</label>
                 <input type="text" 
                 name="email" 
                 id="email"
                
             </div>
         
         <div>
                 <label for="username">first name</label>
                 <input type="text"
                     name="first_name" 
                     id="first_name"
            
             </div>
         
             <div>
             <label for="username">last name</label>
             <input type="text"
                 name="last_name" 
                 id="last_name"
             
         </div>
         <input type="submit" value="submit">
     </form>
     `;
    var createUser = document.getElementById('createUser');
    createUser.addEventListener('submit', function(e){
    e.preventDefault();

    var formData = new FormData(createUser);
    var url = 'http://loc.mean.example.com/api/users';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.setRequestHeader(
        'content-Type',
        'application/json; charset=UTF-8'
    );

    var object = {};
    formData.forEach(function(value, key){
        object[key]=value;
    });
    xhr.send(JSON.stringify(object));
    xhr.onload = function(){
        let data = JSON.parse(xhr.response);
        if(data.success===true){
            viewIndex();
        }
        
    }

});
}
viewIndex();
var hash = window.location.hash.substr(1);

if(hash){
let chunks = hash.split('-');

if(chuncks[0]=='#createUser'){
    createUser();
}

}