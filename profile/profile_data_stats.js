const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config');
const { extractProfileStats } = require('../utils');

async function fetchProfileData(name) {
    try {
        const url = `https://www.anime-planet.com/users/${name}`;

        const axiosConfig = {
            headers: {
                'User-Agent': config.user_agent,
            },
        };

        const response = await axios.get(url, axiosConfig);

        if (response.status === 200) {
            const $ = cheerio.load(response.data);

            const user_Name = $(config.id_profilename).text().trim();

            // Extract Anime list
            const anime_Stats = extractProfileStats($, 'Anime');

            // Extract Manga list
            const manga_Stats = extractProfileStats($, 'Manga');

            console.log('Username:', user_Name);
            console.log('Anime List:', anime_Stats);
            console.log('Manga List:', manga_Stats);

            require('../output_file_processing').outputfileprocessing(user_Name); 
            require('../output_file_processing').outputfileprocessing(anime_Stats); 
            require('../output_file_processing').outputfileprocessing(manga_Stats); 

            // Call the function from the other file
            require('../anime/watched_anime_data').watchedAnimeList(name);

        } else {
            console.log('Failed to retrieve the webpage. Status code:', response.status);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { fetchProfileData };
