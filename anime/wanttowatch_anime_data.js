const axios = require('axios');
const cheerio = require('cheerio');
const config = require('../config');
const { extractWatchedAnimeList } = require('../utils');

async function wanttowatchAnimeList(name) {
    try {
        const url = `https://www.anime-planet.com/users/${name}/anime/wanttowatch`;

        const axiosConfig = {
            headers: {
                'User-Agent': config.user_agent,
            },
        };

        const response = await axios.get(url, axiosConfig);

        if (response.status === 200) {
            const $ = cheerio.load(response.data);
            var wanttowatchAnimeList = extractWatchedAnimeList($);

            console.log("Want to Watch Anime Names:", wanttowatchAnimeList);

        } else {
            console.log('Failed to retrieve the webpage. Status code:', response.status);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        require('../output_file_processing').outputfileprocessing(wanttowatchAnimeList); 
        require('./stalled_anime_data').stalledAnimeList(name); 

        

    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = { wanttowatchAnimeList };
