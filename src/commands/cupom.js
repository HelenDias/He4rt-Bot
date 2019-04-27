const Discord = require('discord.js');

module.exports = {
    async run(client, message, args) {


        const member = message.member;

        var coupon = args[0];
        if(coupon){
 
            if(coupon == "gerar"){

                var prize = args[1];
                var type = args[2];

                if(!prize || !type){
                    return  message.channel.send("``❌`` Utilize: !cupom gerar <valor> <1 para exp/2 para coin>.");
                }

                if(type < 1 || type > 2){
                    return  message.channel.send("``❌`` Utilize: !cupom gerar <valor> <1 para exp/2 para coin>.");
                }

                if(prize === NaN) return message.channel.send("``❗`` Valor inválido.");
                if(type === NaN) return message.channel.send("``❗`` Tipo inválido.");

                client.axios.post(`/coupons`, {value: prize, type_id: type}).then(res => {
                    return message.channel.send("``✅`` Cupom criado: ``"+res.data.name+"``")
                }).catch(err => {console.log(err)})

            } else {

            client.axios.post(`/users/${member.id}/coupon`, {coupon: coupon}).then(res => {

            var type = res.data.coupon.type_id == "1" ? "exp" : "HCoins";

            const embed = new Discord.RichEmbed()
            .setTitle('``👑`` » !cupom')
            .setColor('#8146DC')
            .setDescription("Cupom utilizado com sucesso.\n\nVocê ganhou: `` "+res.data.coupon.value+" "+type+"``.")
            .setFooter(
              `Comando utilizado por: ${message.author.tag}`,
              'https://heartdevs.com/wp-content/uploads/2018/12/logo.png'
            )
            .setTimestamp();
    
            message.channel.send(embed);
        
            }).catch(err =>  {

                const embed = new Discord.RichEmbed()
                .setTitle('``❌`` » !cupom')
                .setColor('#8146DC')
                .setDescription("Você já utilizou esse cupom ou ele não existe.")
                .setFooter(
                  `Comando utilizado por: ${message.author.tag}`,
                  'https://heartdevs.com/wp-content/uploads/2018/12/logo.png'
                )
                .setTimestamp();
        
                message.channel.send(embed);

            });  

            }
            
        } else {

            message.channel.send("``❌`` Utilize: !cupom <cupom>.");

        }

        
        
    },
  
    get command() {
      return {
        name: 'cupom',
        category: 'Admin, mod etc..',
        description: 'Descrição do Comando',
        usage: 'comando',
      };
    },
  };
  