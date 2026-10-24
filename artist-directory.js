
/* =========================================
   AMBLESIDE GALLERY
   INTERACTIVE A–Z ARTIST DIRECTORY
   FOR THE COLLECTION PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const alphabet = document.getElementById(
        "artistAlphabet"
    );

    const list = document.getElementById(
        "artistDirectoryList"
    );

    const count = document.getElementById(
        "artistDirectoryCount"
    );

    const preview = document.getElementById(
        "artistDirectoryPreview"
    );

    const previewImage = document.getElementById(
        "artistPreviewImage"
    );

    const previewName = document.getElementById(
        "artistPreviewName"
    );

    const previewTitle = document.getElementById(
        "artistPreviewTitle"
    );

    if (!alphabet || !list || !count || !preview) {
        return;
    }

    /* =========================================
       LOAD ARTISTS FROM ARTWORK DATABASE
    ========================================= */

    const artworks = Array.isArray(window.artworks)
        ? window.artworks
        : [];

    const directory = new Map();

    artworks.forEach(artwork => {

        if (!artwork.artist) return;

        const name = artwork.artist.trim();
        const key = name.toLowerCase();

        if (!directory.has(key)) {

            directory.set(key, {
                name: name,
                image: "",
                title: "Selected Work",
                featured: false
            });

        }

        const artist = directory.get(key);

        // Prefer featured artwork photographs

        if (
            artwork.image &&
            (
                !artist.image ||
                (artwork.featured && !artist.featured)
            )
        ) {

            artist.image = artwork.image;
            artist.title = artwork.title || "Selected Work";
            artist.featured = Boolean(artwork.featured);

        }

    });

    const artists = Array.from(directory.values())
        .sort((a, b) => a.name.localeCompare(b.name));


    /* =========================================
       ALPHABET NAVIGATION
    ========================================= */

    const letters = [
        "ALL",
        ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    ];

    let activeLetter = "";
    let selectedArtist = "";

    letters.forEach(letter => {

        const button = document.createElement("button");

        button.type = "button";
        button.className = "artist-alphabet-letter";

        button.textContent =
            letter === "ALL" ? "All" : letter;

        button.dataset.letter = letter;

        button.addEventListener("click", () => {

            activeLetter = letter;
            renderDirectory();

        });

        alphabet.appendChild(button);

    });


    /* =========================================
       ARTWORK PREVIEW
    ========================================= */

    function hidePreview() {

        preview.classList.remove("is-visible");

        preview.setAttribute(
            "aria-hidden",
            "true"
        );

    }

    function showPreview(artist) {

        if (!artist.image) {
            hidePreview();
            return;
        }

        previewImage.src = artist.image;

        previewImage.alt =
            "Artwork by " + artist.name;

        previewName.textContent = artist.name;

        previewTitle.textContent = artist.title;

        preview.classList.add("is-visible");

        preview.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    /* =========================================
       FILTER COLLECTION BY ARTIST
    ========================================= */

    function selectArtist(name) {

        selectedArtist = name;

        // Send the selection to the collection page.
        // The collection renderer can listen for
        // this event and apply its artist filter.

        document.dispatchEvent(
            new CustomEvent("ambleside:artistSelected", {
                detail: {
                    artist: name
                }
            })
        );

        const collectionGrid = document.querySelector(
            ".collection-grid"
        );

        if (collectionGrid) {

            collectionGrid.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }


    /* =========================================
       RENDER ARTIST LIST
    ========================================= */

    function renderDirectory() {

        hidePreview();

        list.replaceChildren();

        const matches = activeLetter === "ALL"
            ? artists
            : artists.filter(artist =>
                artist.name.toUpperCase().startsWith(
                    activeLetter
                )
            );

        count.textContent = matches.length
            ? `Showing ${matches.length} artist${
                matches.length === 1 ? "" : "s"
              }`
            : "No artists under this letter";

        alphabet.querySelectorAll("button")
            .forEach(button => {

                const active =
                    button.dataset.letter === activeLetter;

                button.classList.toggle(
                    "is-active",
                    active
                );

                button.setAttribute(
                    "aria-pressed",
                    String(active)
                );

            });


        matches.forEach(artist => {

            const button = document.createElement(
                "button"
            );

            button.type = "button";

            button.className =
                "artist-directory-item";

            const name = document.createElement(
                "span"
            );

            name.textContent = artist.name;

            const arrow = document.createElement(
                "span"
            );

            arrow.textContent = "↗";

            arrow.setAttribute(
                "aria-hidden",
                "true"
            );

            // Mobile artwork thumbnail

            if (artist.image) {

                const thumbnail =
                    document.createElement("img");

                thumbnail.src = artist.image;

                thumbnail.alt = "";

                thumbnail.loading = "lazy";

                thumbnail.className =
                    "artist-directory-mobile-image";

                button.appendChild(thumbnail);

            }

            button.appendChild(name);
            button.appendChild(arrow);

            button.addEventListener(
                "mouseenter",
                () => showPreview(artist)
            );

            button.addEventListener(
                "mouseleave",
                hidePreview
            );

            button.addEventListener(
                "focus",
                () => showPreview(artist)
            );

            button.addEventListener(
                "blur",
                hidePreview
            );

            button.addEventListener(
                "click",
                () => selectArtist(artist.name)
            );

            list.appendChild(button);

        });

    }


    /* =========================================
       INITIALIZE DIRECTORY
    ========================================= */

   
count.innerHTML = `
    <span class="artist-directory-invitation">
        Every artist has a story.
    </span>
    <span class="artist-directory-instruction">
        Select a letter to discover theirs.
    </span>
`;

list.replaceChildren();


});
