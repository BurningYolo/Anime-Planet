// config.js

module.exports = {
    name_or_id: 'Username', // add username
    user_agent:'agent', // add agent else code 403 

    //don't alter these    
    id_profilename : '#profileName',
    raw_watched_number:'p:contains("Watched") b',

    list_anime_manga: 'div.plr-list h3:contains(\'${listType}\') + div.pure-g ul.statList li',
    list_div_anime:'ul.cardGrid li[data-type="anime"] a h3.cardName',
    list_div_manga:'ul.cardGrid li[data-type="manga"] a h3.cardName'
};