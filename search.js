
/* =========================================
   AMBLESIDE GALLERY SEARCH ENGINE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const resultsContainer =
        document.getElementById("search-results");

    const summary =
        document.getElementById("search-summary");

    const searchInput =
        document.getElementById("search-query");

    if (!resultsContainer || !summary) return;

    const params = new URLSearchParams(window.location.search);

    const query = (params.get("q") || "").trim();

    if (searchInput) {
        searchInput.value = query;
    }

    if (!query) {
        summary.textContent =
            "Enter an artist or artwork to begin searching.";
        return;
    }

    const terms = query.toLowerCase().split(/\s+/);

    const artworks = Array.isArray(window.artworks)
        ? window.artworks
        : [];

    const artists = Array.isArray(window.representedArtists)
        ? window.representedArtists
        : [];


    /* =========================================
       MATCH SEARCH TERMS
    ========================================= */

    function matches(text) {

        const content = text.toLowerCase();

        return terms.every(term =>
            content.includes(term)
        );
    }


    /* =========================================
       SEARCH ARTISTS
    ========================================= */

    const matchingArtists = artists.filter(artist => {

        const searchable = [
            artist.name,
            artist.medium,
            artist.featureTitle,
            artist.featureText
        ].filter(Boolean).join(" ");

        return matches(searchable);

    });


    /* =========================================
       SEARCH ARTWORKS
    ========================================= */

    const matchingArtworks = artworks.filter(artwork => {

        const searchable = [
            artwork.artist,
            artwork.title,
            artwork.medium,
            artwork.category,
            artwork.dimensions
        ].filter(Boolean).join(" ");

        return matches(searchable);

    });


    /* =========================================
       RESULTS SUMMARY
    ========================================= */

    const total =
        matchingArtists.length + matchingArtworks.length;

    summary.textContent =
        `${total} result${total === 1 ? "" : "s"} for "${query}"`;


    if (!total) {

        const message = document.createElement("p");

        message.textContent =
            "No matching artists or artworks were found. Try another search.";

        resultsContainer.appendChild(message);

        return;
    }


    /* =========================================
       CREATE SECTION
    ========================================= */

    function createSection(title) {

        const section = document.createElement("section");
        section.className = "search-result-group";

        const heading = document.createElement("h2");
        heading.textContent = title;

        const grid = document.createElement("div");
        grid.className = "search-result-grid";

        section.append(heading, grid);
        resultsContainer.appendChild(section);

        return grid;
    }


    /* =========================================
       CREATE RESULT CARD
    ========================================= */

    function createCard({
        title,
        subtitle,
        image,
        link,
        description
    }) {

        const card = document.createElement("article");
        card.className = "search-result-card";

        const content = link
            ? document.createElement("a")
            : document.createElement("div");

        if (link) {
            content.href = link;
        }

        if (image) {

            const img = document.createElement("img");

            img.src = image;
            img.alt = title;
            img.loading = "lazy";
            img.decoding = "async";

            content.appendChild(img);
        }

        const heading = document.createElement("h3");
        heading.textContent = title;

        content.appendChild(heading);

        if (subtitle) {

            const sub = document.createElement("p");
            sub.textContent = subtitle;

            content.appendChild(sub);
        }

        if (description) {

            const detail = document.createElement("p");
            detail.className = "search-result-description";
            detail.textContent = description;

            content.appendChild(detail);
        }

        card.appendChild(content);

        return card;
    }


    /* =========================================
       RENDER ARTISTS
    ========================================= */

    if (matchingArtists.length) {

        const grid = createSection("Artists");

        matchingArtists.forEach(artist => {

            grid.appendChild(createCard({
                title: artist.name,
                subtitle: artist.medium,
                image: artist.cardImage,
                link: artist.page,
                description: artist.featureText
            }));

        });
    }


    /* =========================================
       RENDER ARTWORKS
    ========================================= */

    if (matchingArtworks.length) {

        const grid = createSection("Artworks");

        matchingArtworks.forEach(artwork => {

            grid.appendChild(createCard({
                title: artwork.title || "Untitled",
                subtitle: artwork.artist,
                image: artwork.image,
                link: artwork.artistPage,
                description: [
                    artwork.medium,
                    artwork.dimensions
                ].filter(Boolean).join(" · ")
            }));

        });
    }

});
