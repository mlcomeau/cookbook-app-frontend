class ChefsAdapter {
    static baseURL = "http://localhost:3000/chefs"

    static fetchAndMakeChefs(){
      return fetch(ChefsAdapter.baseURL)
        .then((obj) => obj.json())
        .then(function(chefsArray) {
          return chefsArray.forEach(function(chef){
            return new Chef(chef)
          })
        })
    }
    

    static createNewChef(name) {
        const chef = {
            name: name
        }

        return fetch(ChefsAdapter.baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(chef)
        }).then(res => res.json())
    }
}