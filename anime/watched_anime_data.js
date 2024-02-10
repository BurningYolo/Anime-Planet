const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config');
const { extractWatchedAnimeList } = require('../utils');



async function watchedAnimeList(name) {
    try {
        const url = `https://www.anime-planet.com/users/${name}/anime/watched`;

        const axiosConfig = {
            headers: {
                'User-Agent': config.user_agent,
            },
        };

        const response = await axios.get(url, axiosConfig);

        if (response.status === 200) {
            const $ = cheerio.load(response.data);
            var list1 = extractWatchedAnimeList($);

            console.log("Watched Anime Names:", list1);

        } else {
            console.log('Failed to retrieve the webpage. Status code:', response.status);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        require('../output_file_processing').outputfileprocessing(list1); 

        require('./watching_anime_data').watchingAnimeList(name);

    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { watchedAnimeList };
