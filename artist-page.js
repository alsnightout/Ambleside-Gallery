/* =========================================
   AMBLESIDE GALLERY
   SHARED ARTIST PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       PAGE INFORMATION
    ========================================== */

    const artistName =
        document.body.dataset.artist;

    const artistWorks =
        document.getElementById("artistWorks");


    /* =========================================
       CHECK REQUIRED DATA
    ========================================== */

    if (!window.artworks || !Array.isArray(window.artworks)) {

        console.error(
            "Ambleside artwork-data.js did not load."
        );

        return;
    }


    if (!artistName) {

        console.error(
            "This artist page is missing data-artist."
        );

        return;
    }


    if (!artistWorks) {

        console.error(
            "This artist page is missing #artistWorks."
        );

        return;
    }


    /* =========================================
       FIND THIS ARTIST'S WORK
    ========================================== */

    const works =
        window.artworks.filter(
            artwork =>
                artwork.artist === artistName
        );


    console.log(
        `${artistName}: ${works.length} works found`
    );


    /* =========================================
       PRICE FORMATTER
    ========================================== */

    function formatPrice(price) {

        if (
            price === null ||
            price === undefined ||
            price === ""
        ) {
            return "";
        }


        if (typeof price === "number") {

            return new Intl.NumberFormat(
                "en-US",
                {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0
                }
            ).format(price);
        }


        return price;
    }


    /* =========================================
       ARTIST-PAGE IMAGE PATH

       artwork-data.js:
       images/example.jpg

       Artist page needs:
       ../images/example.jpg
    ========================================== */

    function artistImagePath(path) {

        if (!path) {
            return "";
        }


        if (
            path.startsWith("../") ||
            path.startsWith("http://") ||
            path.startsWith("https://")
        ) {
            return path;
        }


        return `../${path}`;
    }


    /* =========================================
       BUILD ARTWORK CARDS
    ========================================== */

    works.forEach(artwork => {

        if (!artwork.image) {
            return;
        }


        /* =====================================
           CARD
        ====================================== */

        const article =
            document.createElement("article");

        article.className =
            "artist-work";


        /* =====================================
           BUTTON
        ====================================== */

        const button =
            document.createElement("button");

        button.className =
            "artwork-gallery-trigger";

        button.type =
            "button";

        button.dataset.title =
            artwork.title;


        /* =====================================
           GALLERY IMAGES

           Supports:
           image: "..."

           OR

           images: ["...", "..."]
        ====================================== */

        let artworkImages = [];


        if (
            Array.isArray(artwork.images) &&
            artwork.images.length
        ) {

            artworkImages =
                artwork.images;

        } else {

            artworkImages =
                [artwork.image];
        }


        const galleryImages =
            artworkImages
                .filter(Boolean)
                .map(
                    image =>
                        artistImagePath(image)
                );


        button.dataset.images =
            galleryImages.join(",");


        /* =====================================
           IMAGE
        ====================================== */

        const imageWrap =
            document.createElement("div");

        imageWrap.className =
            "artwork-image-wrap";


        const image =
            document.createElement("img");


        image.alt =
            `${artwork.title} by ${artwork.artist}`;


        image.loading =
            "lazy";


        /* If photograph is unavailable,
           remove the entire artwork card. */

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    `Artwork image unavailable: ${artwork.title}`
                );

                article.remove();
            }
        );


        image.src =
            artistImagePath(
                artwork.image
            );


        /* =====================================
           VIEW ARTWORK LABEL
        ====================================== */

        const viewLabel =
            document.createElement("span");

        viewLabel.className =
            "artwork-view-label";

        viewLabel.textContent =
            "View Artwork";


        /* Show image count when artwork
           has multiple photographs. */

        if (galleryImages.length > 1) {

            const imageCount =
                document.createElement("small");

            imageCount.textContent =
                `${galleryImages.length} images`;

            viewLabel.appendChild(
                imageCount
            );
        }


        imageWrap.appendChild(
            image
        );

        imageWrap.appendChild(
            viewLabel
        );

        button.appendChild(
            imageWrap
        );


        /* =====================================
           ARTWORK DETAILS
        ====================================== */

        const details =
            document.createElement("div");

        details.className =
            "artwork-details";


        const title =
            document.createElement("h3");

        title.textContent =
            artwork.title;

        details.appendChild(
            title
        );


        /* =====================================
           METADATA
        ====================================== */

        const meta =
            document.createElement("div");

        meta.className =
            "artwork-meta";


        const metaInfo =
            document.createElement("div");

        metaInfo.className =
            "artwork-meta-info";


        /* MEDIUM */

        if (artwork.medium) {

            const medium =
                document.createElement("p");

            medium.textContent =
                artwork.medium;

            metaInfo.appendChild(
                medium
            );
        }


        /* DIMENSIONS */

        if (artwork.dimensions) {

            const dimensions =
                document.createElement("p");

            dimensions.textContent =
                artwork.dimensions;

            metaInfo.appendChild(
                dimensions
            );
        }


        meta.appendChild(
            metaInfo
        );


        /* PRICE */

        if (
            artwork.price !== null &&
            artwork.price !== undefined &&
            artwork.price !== ""
        ) {

            const price =
                document.createElement("p");

            price.className =
                "artwork-price";

            price.textContent =
                formatPrice(
                    artwork.price
                );

            meta.appendChild(
                price
            );
        }


        details.appendChild(
            meta
        );


        /* =====================================
           ASSEMBLE CARD
        ====================================== */

        article.appendChild(
            button
        );

        article.appendChild(
            details
        );

        artistWorks.appendChild(
            article
        );

    });


/* =========================================
   LIGHTBOX
========================================= */

const lightbox =
    document.getElementById("artworkLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxCounter =
    document.getElementById("lightboxCounter");

const closeButton =
    document.querySelector(".lightbox-close");

const nextButton =
    document.querySelector(".lightbox-next");

const prevButton =
    document.querySelector(".lightbox-prev");


let currentImages = [];
let currentIndex = 0;
let currentTitle = "";


/* =========================================
   OPEN ARTWORK WHEN CARD IS CLICKED
========================================= */

artistWorks.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".artwork-gallery-trigger"
            );
console.log(
    "Artwork clicked:",
    button
);

        if (!button) {
            return;
        }


        event.preventDefault();


        currentImages =
            (button.dataset.images || "")
                .split(",")
                .map(image => image.trim())
                .filter(Boolean);


        currentTitle =
            button.dataset.title || "";


        currentIndex = 0;


        if (
            !lightbox ||
            !lightboxImage ||
            !currentImages.length
        ) {

            return;
        }


        updateLightbox();


        lightbox.classList.add("open");


        document.body.style.overflow =
            "hidden";
    }
);


/* =========================================
   UPDATE LIGHTBOX
========================================= */

function updateLightbox() {

    if (!currentImages.length) {
        return;
    }


    lightboxImage.src =
        currentImages[currentIndex];


    lightboxImage.alt =
        `${currentTitle} by ${artistName}`;


    if (lightboxTitle) {

        lightboxTitle.textContent =
            currentTitle;
    }


    if (lightboxCounter) {

        lightboxCounter.textContent =
            currentImages.length > 1

                ? `${currentIndex + 1} / ${currentImages.length}`

                : "";
    }


    /* Only show arrows when multiple
       photographs exist */

    if (nextButton) {

        nextButton.style.display =
            currentImages.length > 1
                ? "block"
                : "none";
    }


    if (prevButton) {

        prevButton.style.display =
            currentImages.length > 1
                ? "block"
                : "none";
    }
}


/* =========================================
   NEXT IMAGE
========================================= */

if (nextButton) {

    nextButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            if (!currentImages.length) {
                return;
            }


            currentIndex =
                (
                    currentIndex + 1
                ) %
                currentImages.length;


            updateLightbox();
        }
    );
}


/* =========================================
   PREVIOUS IMAGE
========================================= */

if (prevButton) {

    prevButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();


            if (!currentImages.length) {
                return;
            }


            currentIndex =
                (
                    currentIndex - 1 +
                    currentImages.length
                ) %
                currentImages.length;


            updateLightbox();
        }
    );
}


/* =========================================
   CLOSE LIGHTBOX
========================================= */

function closeLightbox() {

    if (!lightbox) {
        return;
    }


    lightbox.classList.remove("open");


    document.body.style.overflow =
        "";
}


if (closeButton) {

    closeButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            closeLightbox();
        }
    );
}


/* Click dark background to close */

if (lightbox) {

    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {

                closeLightbox();
            }
        }
    );
}


/* Escape key */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            lightbox &&
            lightbox.classList.contains("open")
        ) {

            closeLightbox();
        }
    }
);

});

