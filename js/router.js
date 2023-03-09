export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }
    route(event) {
        event = event || window.event
        event.preventDefault()
    
        window.history.pushState({}, "", event.target.href)
    
        this.handle()
    }

    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]
        fetch(route)
        .then(data => data.text())
        .then(html => {
            document.querySelector('#app').innerHTML = html
        })
        this.background()
    }

    background(){
        const { pathname } = window.location
        const cssVariable = document.documentElement.style
        const listItem = document.querySelectorAll('.menu-item')
  
        listItem.forEach((item) =>{
          item.classList.remove('focus')
        })
  
        switch( pathname ){
          case '/':
            cssVariable.setProperty('--background', 'url(images/pag1.png)')
            listItem[0].classList.add('focus')
            break
  
          case '/universe':
            cssVariable.setProperty('--background', 'url(images/pag2.png)')
            listItem[1].classList.add('focus') 

            break
  
          case '/explorer':
            cssVariable.setProperty('--background', 'url(images/pag3.png)')
            listItem[2].classList.add('focus')
            break
  
          default:
            cssVariable.setProperty('--background')
        }
    }
}