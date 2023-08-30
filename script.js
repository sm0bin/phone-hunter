// fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
//     .then(res => res.json())
//     .then(data => console.log(data))



// fetch("https://openapi.programming-hero.com/api/phones?search=samsung")
//     .then(res => {
//         if (!res) {
//             throw new Error("Network response is not ok")
//         }
//         return res.json();
//     })
//     .then(data => console.log(data))
//     .catch(error => {
//         console.error("ERROR: ", error);
//     })

const fetchData = async () => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/phones?search=iphone");
        if (!res.ok) {
            throw new Error("Response is not ok!");
        }
        const data = await res.json();
        // console.log(data.data);
        displayData(data.data);
    } catch (error) {
        console.log("ERR: ", error);
    }
}

fetchData();

const products = document.getElementById("products");
function displayData(data) {
    data.forEach(element => {
        const card = `
        <div
                class="w-full p-6 bg-white border text-center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div class="w-full h-64 bg-blue-50 rounded-lg flex items-center justify-center">
                    <img class="h-2/3 " src="${element.image}" />
                </div>
                <div class="mt-6">
                    <a href="#">
                        <h5 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-5">${element.phone_name}</h5>
                    </a>
                    <p class="mb-2 font-normal text-lg text-gray-700 dark:text-gray-200">There are many variations of
                        passages of available, but the majority have suffered</p>


                    <h4 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">$599</h4>
                    <button
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-xl px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Show
                        Details</button>
                </div>
            </div>`;

        products.innerHTML += card;
    });
}