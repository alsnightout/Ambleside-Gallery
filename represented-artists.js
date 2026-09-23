/* =========================================
   AMBLESIDE GALLERY
   REPRESENTED ARTISTS
========================================= */

window.representedArtists = [

    {
        name: "Guan Weixing",
        medium: "Watercolor",
        page: "artists/guan-weixing.html",
        cardImage: "images/weixing-lexington-lady-hero.png",

        homepageReady: true,

        featureTitle: "Masterful watercolor.",

        featureText:
            "Discover the extraordinary watercolor work of Guan Weixing, distinguished by sensitivity, atmosphere and remarkable technical command."
    },


    {
        name: "Karl Wennergren",
        medium: "Oil · Watercolor · Printmaking",
        page: "artists/karl-wennergren.html",
        cardImage: null,

        homepageReady: false
    },


    {
        name: "Morgan Samuel Price",
        medium: "Oil",
        page: "artists/morgan-samuel-price.html",
        cardImage: null,

        homepageReady: false
    },


    {
        name: "Brad & Bryan Caviness",
        medium: "Ceramic · Sculpture",
        page: "artists/brad-bryan-caviness.html",
        cardImage: "images/caviness-the-great-wall-02.jpg",

        homepageReady: true,

        featureTitle: "Architecture reimagined in clay.",

        featureText:
            "Explore the architectural ceramic sculpture of Brad and Bryan Caviness, where history, structure and imagination converge."
    },


    {
        name: "Deborah Squier",
        medium: "Pastel · Oil",
        page: "artists/deborah-squier.html",
        cardImage: "images/squier-artists-card-01.jpg",

        homepageReady: true,

        featureTitle: "Atmosphere held in color.",

        featureText:
            "Discover Deborah Squier's atmospheric landscapes, where light, distance and the natural world are rendered with quiet sensitivity."
    },


    {
        name: "Elissa Houghton",
        medium: "Painting · Abstraction",
        page: "artists/elissa-houghton.html",
        cardImage: "images/houghton-dream-scape.png",

        homepageReady: true,

        featureTitle: "Color beyond the visible.",

        featureText:
            "Explore Elissa Houghton's expressive paintings, where abstraction, color and atmosphere create spaces that hover between landscape and imagination."
    },


    {
        name: "Frank Eber",
        medium: "Watercolor · Oil",
        page: "artists/frank-eber.html",
        cardImage: "images/eber-passionate-artists-card.jpg",

        homepageReady: true,

        featureTitle: "Light captured in watercolor.",

        featureText:
            "Discover Frank Eber's expressive watercolor paintings and his distinctive command of atmosphere, movement and light."
    },


    {
        name: "Jeff Botz",
        medium: "Black & White Photography · Large Format",
        page: "artists/jeff-botz.html",
        cardImage:
            "images/botz-marriage-of-physics-metaphysics-hero.png",

        homepageReady: true,

        featureTitle: "Snow, stone and sky.",

        featureText:
            "Explore Jeff Botz's large-format black-and-white photography of the high Himalayas, shaped by endurance, precision and the darkroom."
    },


    {
        name: "Katriel Srebnik",
        medium: "Oil · Pastel · Drawing",
        page: "artists/katriel-srebnik.html",
        cardImage: "images/srebnik-a-winters-drive-002.jpg",

        homepageReady: true,

        featureTitle: "Observation rendered with precision.",

        featureText:
            "Discover Katriel Srebnik's carefully observed paintings and drawings, balancing atmosphere, structure and representational detail."
    },


    {
        name: "Lisa Ethier",
        medium: "Oil · Cold Wax · Mixed Media",
        page: "artists/lisa-ethier.html",
        cardImage: "images/ethier-solara-hero.png",

        homepageReady: true,

        featureTitle: "Surface, color and abstraction.",

        featureText:
            "Explore Lisa Ethier's atmospheric work in oil, cold wax and mixed media, where layered surfaces become fields of color and texture."
    },


    {
        name: "Matthew Hillier",
        medium: "Wildlife · Acrylic",
        page: "artists/matthew-hillier.html",
        cardImage: "images/hillier-jay-on-fence-hero.png",

        homepageReady: true,

        featureTitle: "The natural world, closely observed.",

        featureText:
            "Discover Matthew Hillier's wildlife paintings, defined by close observation, precision and an enduring fascination with the animal world."
    },


    {
        name: "Nancy Carroll",
        medium: "Oil · Painting · Sculpture",
        page: "artists/nancy-carroll.html",
        cardImage:
            "images/carroll-nod-to-sunflowers-hero.png",

        homepageReady: true,

        featureTitle: "Nature becomes color and character.",

        featureText:
            "Discover Nancy Carroll's work across painting and sculpture, shaped by natural forms, close observation and an instinct for color."
    },


    {
        name: "Nigel Price",
        medium: "",
        page: null,
        cardImage: null,

        homepageReady: false
    },


    {
        name: "Pat Dews",
        medium: "Watercolor · Collage",
        page: "artists/pat-dews.html",
        cardImage: "images/dews-slippery-slope-hero.png",

        homepageReady: true,

        featureTitle: "Watercolor set in motion.",

        featureText:
            "Explore Pat Dews' expressive watercolor work, where abstraction, collage, gesture and luminous color transform the familiar."
    },


    {
        name: "Tom Christopher",
        medium: "Pastel · Painting · Drawing",
        page: "artists/tom-christopher.html",
        cardImage:
            "images/christopher-b&w-street-scene-hero.png",

        homepageReady: true,

        featureTitle: "Observation becomes narrative.",

        featureText:
            "Discover Tom Christopher's work across drawing, pastel and painting, shaped by close observation and a career devoted to visual storytelling."
    },


    {
        name: "Wendy Musser Fleck",
        medium: "Oil · Pastel · Landscape",
        page: "artists/wendy-musser.html",
        cardImage:
            "images/musser-fleck-splendid-day-hero.png",

        homepageReady: true,

        featureTitle: "Landscape shaped by light.",

        featureText:
            "Explore Wendy Musser Fleck's landscapes, where changing skies, open terrain and shifting light become the heart of the composition."
    },


    {
        name: "Tatyana Dronova",
        medium: "",
        page: null,
        cardImage: null,

        homepageReady: false
    },


    {
        name: "Patricia Savage",
        medium: "",
        page: null,
        cardImage: null,

        homepageReady: false
    }

];
/* =========================================
   REPRESENTED ARTIST IMAGE ROTATION
========================================= */

const representedArtistImages =
    window.representedArtists
        .filter(
            artist =>
                artist.homepageReady === true &&
                artist.cardImage
        )
        .map(
            artist => artist.cardImage
        );
        /* =========================================
   ROTATE REPRESENTED ARTIST PREVIEW
========================================= */

if (
    representedArtistShuffle &&
    representedArtistImages.length
) {

    setInterval(() => {

        rotateImage(
            representedArtistShuffle,
            representedArtistImages,
            "shuffle-fade"
        );

    }, 7500);

}