const optionsPopular = {
    perPage: 5,
    perMove: 1,
    autoplay: true,
    interval: 3000,
    pauseOnHover: true,
    gap: 32,
    pagination: false,
    arrows: false,
    type: 'loop',
    focus: 'center',
    trimSpace: false,
    autoScroll: true,
    align: 'center',
    justify: 'center',
    classes: {
        arrows: 'splide__arrows',
        arrow: 'splide__arrow',
        prev: 'splide__arrow--prev',
        next: 'splide__arrow--next',
    },
    breakpoints: {
        1450: {
            perPage: 4,
            gap: 20,
        },
        1280: {
            perPage: 3,
            gap: 20,
        },
        1024: {
            perPage: 2,
            gap: 10,
        },
        768: {
            perPage: 2,
            gap: 10,
        },
        640: {
            perPage: 1,
            gap: 10,
        },
    },
};

const optionsCustomerSay = {
    perPage: 1,
    perMove: 1,
    autoplay: true,
    interval: 3000,
    pauseOnHover: true,
    pagination: false,
    arrows: false,
    type: 'loop',
    focus: 'center',
    trimSpace: false,
    autoScroll: true,
    align: 'center',
    justify: 'center',
    classes: {
        arrows: 'splide__arrows',
        arrow: 'splide__arrow',
        prev: 'splide__arrow--prev',
        next: 'splide__arrow--next',
    },
}


export { optionsPopular, optionsCustomerSay };