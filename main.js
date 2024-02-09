const axios = require('axios');
const cheerio = require('cheerio');
const config = require('./config');

async function fetchData(name) {
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

            const useranme= $(config.id_profilename).text().trim(); 
            console.log('Username:', useranme)

            // Extract Anime list
            const animeList = extractList($, 'Anime');

            // Extract Manga list
            const mangaList = extractList($, 'Manga');

            console.log('Anime List:', animeList);
            console.log('Manga List:', mangaList);

        } else {
            console.log('Failed to retrieve the webpage. Status code:', response.status);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
        console.error('Error:', error.message);
    }
}

function extractList($, listType) {
    const listSelector = `div.plr-list h3:contains('${listType}') + div.pure-g ul.statList li`;

    const list = {};
    
    $(listSelector).each((index, element) => {
        const status = $(element).attr('class');
        const count = parseInt($(element).find('.slCount').text());
        list[status] = count;
    });

    return { list };
}

fetchData(config.name_or_id);
