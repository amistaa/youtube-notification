const Discord = require('discord.js');
const rss = require('rss-converter');
const config = require('./config.json);

(async () => {
    let feed = await rss.toJson('https://www.youtube.com/feeds/videos.xml?channel_id=' + config.channel_yt);
    console.log(feed.items[0].media_group.media_description);
})();
