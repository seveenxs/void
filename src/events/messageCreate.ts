import { EmbedBuilder } from "discord.js";
import VoidClient from "../structs/Client";
import VoidEvent from "../structs/Event";

export default new VoidEvent({
  name: 'messageCreate',
  runner: async (message) => {
    const client = VoidClient.getInstance();

    if (message.author.id !== "903186158937325569") return;
    if (!message.content.replace('!', '').startsWith(`<@${client.user?.id}>`)) return;

    const input = message.content.replace('!', '').slice(client.user!.id.length + 3);
    
    const msg = await message.reply('> Pensando...');
    const response = await client.void.prompt(input);

    console.log(response.text);

    const embed = new EmbedBuilder()
      .setDescription(response.text)
      .setColor('White');
    
    msg.edit({
      content: message.author.toString(),
      embeds: [embed]
    })
  }
})