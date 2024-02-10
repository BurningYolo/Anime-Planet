const { fetchProfileData } = require('./profile/profile_data_stats');
const config = require('./config');

fetchProfileData(config.name_or_id);
