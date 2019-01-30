
let xhr = new XMLHttpRequest();

// http://localhost:8080 webpack-dev-server的服务 -》 3000

// http.proxy


xhr.open('GET','/api/user', true)

xhr.onload = function() {
    console.log(xhr.response);
}

xhr.send()