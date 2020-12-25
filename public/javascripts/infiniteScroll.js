let camps = campgrounds.features.slice(0, 10);
const container = document.getElementById('infinite');

const loadData = () => {
    for (let campground of camps) {
        if (!campground.images.length) {
            campground.images[0].url = "https://res.cloudinary.com/douqbebwk/image/upload/v1600103881/YelpCamp/lz8jjv2gyynjil7lswf4.png";
        }
        const campElement = document.createElement('div');
        campElement.classList.add('card');
        campElement.classList.add('mb-3');
        campElement.classList.add('indexCard');
        campElement.innerHTML = `
                        <div class="row">
                        <div class="col-md-4">
                            <img class="img-fluid" alt="" src="${campground.images[0].url}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${campground.title}</h5>
                                <p class="card-text card-description">${campground.description}</p>
                                <p class="card-text">
                                    <small class="text-muted">${campground.location}</small>
                                </p>
                                <a class="btn btn-secondary indexButton" href="/campgrounds/${campground._id}">View ${campground.title}</a>
                            </div>
                        </div>
                        </div>`;
        container.appendChild(campElement);
    }
}

loadData();
let start = 0;
let end = 10;
window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (clientHeight + scrollTop >= scrollHeight - 5) {
        // show the loading animation
        start = start + 10;
        end = end + 10;
        camps = campgrounds.features.slice(start, end);
        loadData();
    }
})