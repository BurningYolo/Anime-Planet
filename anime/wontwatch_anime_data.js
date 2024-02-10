const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config');
const { extractWatchedAnimeList } = require('../utils');

async function wontwatchAnimeList(name) {
    try {
        const url = `https://www.anime-planet.com/users/${name}/anime/wontwatch`;

        const axiosConfig = {
            headers: {
                'User-Agent': config.user_agent,
            },
        };

        const response = await axios.get(url, axiosConfig);

        if (response.status === 200) {
            const $ = cheerio.load(response.data);
            var watchinganimelist = extractWatchedAnimeList($);

            console.log("Won't Watch Anime Names:", watchinganimelist);

        } else {
            console.log('Failed to retrieve the webpage. Status code:', response.status);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        require('../output_file_processing').outputfileprocessing(watchinganimelist); 
        require('../manga/reading_manga_data').readingMangaList(name); 

    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { wontwatchAnimeList };
