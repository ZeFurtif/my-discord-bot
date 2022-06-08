module.exports = (client, message, args) => {
    const vchannel = message.member.voiceChannel;
    vchannel.join();
    console.log(vchannel)
}