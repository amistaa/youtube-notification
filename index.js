const Discord = require('discord.js');
const fs = require('fs');
const rss = require('rss-converter');
const config = require('./config.json);
const links = require('./links.json');
const client = new Discord.Client();

client.on("ready", async () => {
    setInterval(() => {
    let feed = await rss.toJson('https://www.youtube.com/feeds/videos.xml?channel_id=' + config.channel_yt);
    if(links.includes(feed.items[0].yt_videoId) return
    let jsonOpen = fs.readFileSync('links.json');
    let json = JSON.parse(jsonOpen);
    json.push(feed.items[0].yt_videoId);
    let jsonLink = JSON.stringify(json);
    fs.writeFileSync('links.json', jsonLink);
    const embed = new Discord.MessageEmbed()
    .setColor("#ff4fa7")
    .setAuthor("Youtube Notification", client.user.avatarURL(), "https://github.com/amistaa/youtube-notification")
    .addField("**Title**", feed.items[0].media_group.media_title)
    .addField("**Likes Count**", feed.items[1].media_group.media_community.media_starRating_count, true)
    .addField("**Likes Average**", feed.items[1].media_group.media_community.media_starRating_average, true)
    .addField("**Views**", feed.items[1].media_group.media_community.media_statistics_views, true)
    .addField("**Description**", feed.items[0].media_group.media_description)
    .setImage(feed.items[0].media_group.media_thumbnail_url)
    client.channel.cache.get(config.channel_id).send(`Hello! **${feed.author.name}** just uploaded a video **${feed.items[0].title}**!\n\nhttps://www.youtube.com/watch?v=${feed.items[0].yt_videoId}` + embed)
    console.log(feed.items[0].media_group.media_description);
    }, 3600000);
})
client.login(config.token);
