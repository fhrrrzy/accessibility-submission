import data from '../DATA.json'



const dataRestaurant = data.restaurants

const restaurantItem = (restaurant) => {
    const {rating, city, pictureId, description, name} = restaurant
    return `
    <article class="card">
        <div class="card-image">
            <img src="${pictureId}" alt="A restaurant picture in Kota ${city}">
        </div>
        <div class="card-body">
            <h3>${name} • Kota ${city}</h3>
            <p class="rating">Rating : ${rating}</p>
            <p class="description">
                ${description}
            </p>
        </div>
    </article>
    `
}

const sortRestaurantData = (asc = true) => {
    if(asc){
        return dataRestaurant.sort((a, b) => a.rating - b.rating);
    }
    else{
        return dataRestaurant.sort((a, b) => b.rating - a.rating);
    }
}

const renderRestaurants = (restaurants) => {
    const restaurantList = document.getElementById("restaurant-list")
    const restaurantItems = restaurants.map(restaurant => {
        return restaurantItem(restaurant);
    }).join("");
    restaurantList.innerHTML = restaurantItems
}

const main = () => {
    const mobileNav = document.getElementsByClassName("mobile-nav")[0]
    const wrapper = document.getElementById("wrapper")
    const mobileButton = document.getElementsByClassName("mobile-nav-toggle")[0]
    let isNavOpened = false
    console.log(isNavOpened)

    wrapper.addEventListener("click", () => {
        if(isNavOpened) {
            mobileNav.classList.remove("open")
            wrapper.classList.remove("open")
            isNavOpened = false
            console.log(isNavOpened)
        }
    })

    mobileButton.addEventListener("click", (event) => {
        event.stopPropagation();

        if(!isNavOpened) {
            mobileNav.classList.add("open")
            wrapper.classList.add("open")
            isNavOpened = true
            console.log(isNavOpened)
        }
    })

    document.addEventListener("DOMContentLoaded", renderRestaurants(dataRestaurant))


    const sortInput = document.getElementById("sort")
    sortInput.addEventListener("change", ()=>{
        const isAsc = sortInput.value == "ascending"
        const sortedData = isAsc ? sortRestaurantData(true) : sortRestaurantData(false) 
        renderRestaurants(sortedData)
    })
}

export default main