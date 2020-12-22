import { MessageEmbed } from "discord.js"

import Command from "@core/Contracts/Command"
import * as yup from "yup"

const command = Command({
  description: "Faz o bot anunciar algo no chat usando everyone",
  permissions: ["MANAGE_GUILD"],
  help: ":x: Como usar: `!anunciar <mensagem>`",
  validate: ({ args }) =>
    yup
      .array()
      .min(1)
      .required()
      .isValid(args),
  run: async ({ args, send }) => {
    const message = args.join(" ").trim()

    const announcement = new MessageEmbed()
      .setTitle("``🔔`` **Heart informa:**")
      .setDescription(message)
      .setColor("#8146DC")
      .setFooter(
        "2019 © He4rt Developers",
        "https://heartdevs.com/wp-content/uploads/2018/12/logo.png"
      )
      .setTimestamp()

    await send("@everyone", announcement)
  },
})
export default command
