
/* =========================================
   AMBLESIDE GALLERY
   COLLECTION PAGE + ARTWORK VIEWER
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("collectionGrid");
    const count = document.getElementById("collectionCount");
    const filters = document.querySelectorAll(".collection-filter");

    const lightbox = document.getElementById("collectionLightbox");
    const lightboxImage = document.getElementById("collectionLightboxImage");
    const lightboxTitle = document.getElementById("collectionLightboxTitle");
    const lightboxCounter = document.getElementById("collectionLightboxCounter");

    const closeButton = lightbox?.querySelector(".lightbox-close");
    const nextButton = lightbox?.querySelector(".lightbox-next");
    const prevButton = lightbox?.querySelector(".lightbox-prev");

    if (!grid || !count || !lightbox || !lightboxImage) {
        console.error("Collection page elements are missing.");
        return;
    }

    if (!Array.isArray(window.artworks)) {
        count.textContent = "Collection data could not be loaded.";
        return;
    }

    let currentImages = [];
    let currentIndex = 0;
    let currentArtwork = null;
    let lastFocusedElement = null;

    function formatPrice(price) {
        if (price === null || price === undefined || price === "") {
            return "";
        }

        if (typeof price !== "number") return String(price);

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
        }).format(price);
    }

    function makeElement(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined && text !== null) {
            element.textContent = String(text);
        }
        return element;
    }

    function getImages(artwork) {
        const paths = [artwork.image];

        if (Array.isArray(artwork.images)) {
            paths.push(...artwork.images);
        }

        // heroImage remains reserved for homepage/featured use.
        // Do not automatically include it in the viewer.

        return [...new Set(paths.filter(
            path => typeof path === "string" && path.trim()
        ))];
    }

    function renderCollection(filter = "all") {
        grid.replaceChildren();

        const visibleWorks = window.artworks.filter(artwork =>
            artwork &&
            typeof artwork.image === "string" &&
            artwork.image.trim() &&
            (filter === "all" || artwork.category === filter)
        );

        visibleWorks.forEach(artwork => {

            const article = makeElement("article", "artwork-card");

            const button = makeElement(
                "button",
                "collection-artwork-link"
            );
            button.type = "button";
            button.setAttribute(
                "aria-label",
                `View ${artwork.title || "artwork"} by ${artwork.artist || "artist"}`
            );

            const imageWrap = makeElement(
                "div",
                "collection-artwork-image"
            );

            const image = document.createElement("img");
            image.src = artwork.image;
            image.alt = `${artwork.title || "Untitled"} by ${artwork.artist || "Unknown artist"}`;
            image.loading = "lazy";

            imageWrap.appendChild(image);
            imageWrap.appendChild(
                makeElement("span", "collection-view-label", "View Artwork")
            );

            button.appendChild(imageWrap);
            button.addEventListener("click", () => openLightbox(artwork));

            const info = makeElement("div", "artwork-info");
            info.appendChild(
                makeElement("h2", "", artwork.title || "Untitled")
            );

            if (artwork.artist) {
                if (
                    typeof artwork.artistPage === "string" &&
                    artwork.artistPage.trim() &&
                    artwork.artistPage !== "null"
                ) {
                    const artistLink = makeElement(
                        "a",
                        "artwork-artist",
                        artwork.artist
                    );
                    artistLink.href = artwork.artistPage;
                    info.appendChild(artistLink);
                } else {
                    info.appendChild(
                        makeElement("p", "artwork-artist", artwork.artist)
                    );
                }
            }

            if (artwork.medium) {
                info.appendChild(
                    makeElement("p", "artwork-medium", artwork.medium)
                );
            }

            if (artwork.dimensions) {
                info.appendChild(
                    makeElement("p", "artwork-dimensions", artwork.dimensions)
                );
            }

            if (
                artwork.price !== null &&
                artwork.price !== undefined &&
                artwork.price !== ""
            ) {
                info.appendChild(
                    makeElement("p", "artwork-price", formatPrice(artwork.price))
                );
            }

            article.appendChild(button);
            article.appendChild(info);
            grid.appendChild(article);
        });

        count.textContent =
            `${visibleWorks.length} ${visibleWorks.length === 1 ? "work" : "works"}`;
    }

    function openLightbox(artwork) {
        currentArtwork = artwork;
        currentImages = getImages(artwork);
        currentIndex = 0;

        if (!currentImages.length) return;

        lastFocusedElement = document.activeElement;

        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";

        updateLightbox();
        closeButton?.focus();
    }

    function updateLightbox() {
        if (!currentImages.length) return;

        lightboxImage.src = currentImages[currentIndex];
        lightboxImage.alt =
            `${currentArtwork.title || "Artwork"} by ${currentArtwork.artist || "artist"}`;

        if (lightboxTitle) {
            lightboxTitle.textContent =
                currentArtwork.title || "Untitled";
        }

        if (lightboxCounter) {
            const label = currentIndex === 0
                ? "Artwork"
                : "Additional view";

            lightboxCounter.textContent =
                `${currentIndex + 1} / ${currentImages.length} · ${label}`;
        }

        const showArrows = currentImages.length > 1;

        if (nextButton) nextButton.hidden = !showArrows;
        if (prevButton) prevButton.hidden = !showArrows;
    }

    function closeLightbox() {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
        lastFocusedElement?.focus();
    }

    function changeImage(direction) {
        if (!currentImages.length) return;

        currentIndex =
            (currentIndex + direction + currentImages.length) %
            currentImages.length;

        updateLightbox();
    }

    closeButton?.addEventListener("click", closeLightbox);
    nextButton?.addEventListener("click", () => changeImage(1));
    prevButton?.addEventListener("click", () => changeImage(-1));

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", event => {
        if (!lightbox.classList.contains("open")) return;

        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") changeImage(1);
        if (event.key === "ArrowLeft") changeImage(-1);

        if (event.key === "Tab") {
            const controls = [
                closeButton,
                prevButton,
                nextButton
            ].filter(el => el && !el.hidden);

            const first = controls[0];
            const last = controls[controls.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    filters.forEach(button => {
        button.addEventListener("click", () => {
            filters.forEach(item => item.classList.remove("active"));
            button.classList.add("active");
            renderCollection(button.dataset.filter);
        });
    });

    renderCollection();

});
