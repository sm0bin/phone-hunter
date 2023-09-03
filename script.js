const products = document.getElementById("products");
const searchField = document.getElementById("searchField");
const searchBtn = document.getElementById("searchBtn");
const showAllBtn = document.getElementById("showAllBtn");
const showDetailsBtn = document.getElementById("showDetailsBtn");
const showDetailsCloseBtn = document.getElementById("showDetailsCloseBtn");
const popupModal = document.getElementById("popupModal");

const search = (searchFieldText, isShowAll = false) => {
    fetchData(searchFieldText, isShowAll);
}

async function fetchData(searchText, isShowAll) {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        if (!res.ok) {
            throw new Error("Response is not ok!");
        }
        const data = await res.json();
        displayData(data.data, isShowAll);
    } catch (error) {
        console.log("ERR: ", error);
    }
}



let searchFieldText = "";

searchBtn.addEventListener("click", () => {
    searchFieldText = searchField.value;
    search(searchFieldText);
});


showAllBtn.addEventListener("click", () => {
    search(searchFieldText, true);
    showAllBtn.classList.add("hidden");

})


function displayData(data, isShowAll = false) {
    // console.log(isShowAll, data.length);
    if (!isShowAll && data.length > 9) {
        data = data.slice(0, 9);
        showAllBtn.classList.remove("hidden");
    } else {

        showAllBtn.classList.add("hidden");
    }

    // console.log(data);
    products.innerHTML = "";
    data.forEach(element => {
        //     const card = `
        //         <div
        //             class="w-full p-6 bg-white border text-center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        //             <div class="w-full h-64 bg-white rounded-lg flex items-center justify-center">
        //                 <img class="h-2/3 " src="${element.image}" />
        //             </div>
        //             <div class="mt-6">
        //                 <a href="#">
        //                     <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">${element.phone_name}</h5>
        //                 </a>
        //                 <p class="mb-2 font-normal text-lg text-gray-700 dark:text-gray-200">There are many variations of
        //                     passages of available, but the majority have suffered</p>


        //                 <h4 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">$599</h4>
        //                 <button id="showDetailsBtn"
        //                     class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-base px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onclick="fetchDetails()">Show
        //                     Details</button>
        //             </div>
        //         </div>`;


        // products.innerHTML += card;

        const card = document.createElement("div");
        card.classList = `w-full p-6 bg-white border text-center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`;
        card.innerHTML = `
            <div class="w-full h-64 bg-white rounded-lg flex items-center justify-center">
                    <img class="h-2/3 " src="${element.image}" />
            </div>
            <div class="mt-6">
                <a href="#">
                    <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">${element.phone_name}</h5>
                </a>
                <p class="mb-2 font-normal text-lg text-gray-700 dark:text-gray-200">There are many variations of
                    passages of available, but the majority have suffered</p>


                <h4 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">$599</h4>
                <button id="showDetailsBtn"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-base px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"  onclick="fetchDetails('${element.slug}')">Show
                    Details</button>
            </div>`;
        products.appendChild(card);
        // console.log(element.slug);

    });
}


function fetchDetails(slug) {
    fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
        .then(data => data.json())
        .then(json => showDetails(json.data))

    // document.getElementById("popup-modal").classList.remove(hidden);


    // document.getElementById("")

}

// fetch(`https://openapi.programming-hero.com/api/phone/apple_watch_series_7-11146`)
// .then(data => data.json())
// .then(json => console.log(json.data.mainFeatures.storage
//     , json.data.mainFeatures.displaySize
//     , json.data.mainFeatures.chipSet
//     , json.data.mainFeatures.memory
//     , json.data.slug
//     , json.data.name
//     , json.data.releaseDate
//     , json.data.brand
//     , json.data.image))
// .then(json => showDetails(json.data))



function showDetails(slug) {
    console.log(slug);
    popupModal.classList.remove("hidden");
    document.getElementById("phone-name").innerText = slug.name;
    document.getElementById("phone-storage").innerText = slug.mainFeatures.storage;
    document.getElementById("phone-display-size").innerText = slug.mainFeatures.displaySize;
    document.getElementById("phone-chipset").innerText = slug.mainFeatures.chipSet;
    document.getElementById("phone-memory").innerText = slug.mainFeatures.memory;
    document.getElementById("phone-slug").innerText = slug.slug;
    document.getElementById("phone-release-date").innerText = slug.releaseDate;
    document.getElementById("phone-brand").innerText = slug.brand;
    if (slug.others.GPS) {

        document.getElementById("phone-gps").innerText = slug.others.GPS;
    } else {
        // document.getElementById("phone-gps").innerText = "no";
        console.log("wrong");
    }

    // document.querySelector("body").classList.add("pointer-events-none")
    // console.log(document.querySelector("body"));
}


// showDetailsBtn.addEventListener("click", () => {
//     // fetchDetails();

//     // popupModal.toggleAttribute("hidden");
// })


showDetailsCloseBtn.addEventListener("click", () => {
    popupModal.classList.add("hidden");
})

// function showDetails() {
//     popupModal.classList.remove("hidden");

// }


