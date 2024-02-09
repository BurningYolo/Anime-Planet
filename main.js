const axios = require('axios');
const cheerio = require('cheerio');
const config = require('./config');

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
            WatchedAnimeData(name); 

        } else {
            console.log('Failed to retrieve the webpage. Status code:', response.status);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
        console.error('Error:', error.message);
    }
}



async function WatchedAnimeData(name)
{
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
            const watchedAnimeList = extractWatchedAnimeList($);

            console.log("Watched Anime Names:" , watchedAnimeList); 



        } else {
            console.log('Failed to retrieve the webpage. Status code:', response.status);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
}
catch (error) {
    console.error('Error:', error.message);
}
}







//Extracting Profile Stats

function extractProfileStats($, listType) {
    const listSelector = config.list_anime_manga.replace('${listType}', listType);

    const list = {};
    
    $(listSelector).each((index, element) => {
        const statusClass = $(element).attr('class');
        const statusName = $(element).find('.slLabel').text().toLowerCase();
        const count = parseInt($(element).find('.slCount').text());
        list[statusClass] = { name: statusName, count };
    });

    return { list };
}

// Extracting Watched Anime 

function extractWatchedAnimeList($)
{    
    const animeList = [];

    $(config.watched_anime_list).each((index, element) => {
        const animeName = $(element).text().trim();
        animeList.push(animeName);
    });

    return animeList;

}


fetchProfileData(config.name_or_id);
