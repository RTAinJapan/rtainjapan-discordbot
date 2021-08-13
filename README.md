# rtainjapan-discordbot
Discord bot for RTA in Japan

# Usage
1. `./config/`直下にjsonファイルを用意(詳細は`src/types/config.d.ts`を参照)
1. `npm run start`を実行

# コマンド集
**現在のBOTは`RTA in Japan 2020`用に用意したコマンドしか存在せず、実際には現在運用していません。**

1. VDO.ninja(旧OBS.ninja)への用意した送信/受信用のURLをDMする
```
!receive {受信元ID}
!send {送信先ID}
```

## Technical Details
- use [discord.js](https://github.com/discordjs/discord.js) + [Commando(discord.js framework)](https://github.com/discordjs/Commando)

## TODO
- ~~Port TypeScript~~