const axios = require('axios');
const cheerio = require('cheerio');
const config = require('./config');

const extractProfileStats = ($, listType) => {
    const listSelector = config.list_anime_manga.replace('${listType}', listType);
    const list = {};

    $(listSelector).each((index, element) => {
        const statusClass = $(element).attr('class');
        const statusName = $(element).find('.slLabel').text().toLowerCase();
        const count = parseInt($(element).find('.slCount').text());
        list[statusClass] = { name: statusName, count };
    });

    return { list };
};



// functions works for everylist..... watched , wathcing etc..... idk was too bored to rewrtie the name ICANT

const extractWatchedAnimeList = ($) => {
    const animeList = [];

    $(config.list_div_anime).each((index, element) => {
        const animeName = $(element).text().trim();
        animeList.push(animeName);
    });

    return animeList;
};



const extractMangaList = ($) => {
    const animeList = [];

    $(config.list_div_manga).each((index, element) => {
        const animeName = $(element).text().trim();
        animeList.push(animeName);
    });

    return animeList;
};
module.exports = { extractProfileStats, extractWatchedAnimeList , extractMangaList};
