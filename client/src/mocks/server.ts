import { setupServer } from 'msw/node';
import { rest } from 'msw';

export default setupServer(
  rest.post(
    `${process.env.REACT_APP_API_ENDPOINT}/users/login`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          _id: '555',
          email: 'test@email.com',
          token: 'faketoken',
        }),
      ),
  ),

  rest.post(
    `${process.env.REACT_APP_API_ENDPOINT}/movies/share`,
    (req, res, ctx) => res(ctx.status(200), ctx.json({ message: 'success' })),
  ),

  rest.get(
    `${process.env.REACT_APP_API_ENDPOINT}/movies/list`,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          movies: [
            {
              _id: '629e3bf8b36eb399f1c5bc43',
              youtubeId: 'PjkeaLZr8RE',
              user: {
                _id: '629c6d2fadcc57e209cdc628',
                email: 'duc@email.com',
              },
              title:
                'The New YEEZY Slide! Adidas Adilette 22 Slide Review & On Foot',
              description:
                "Today we're taking a look at the latest slides making waves right now the Adidas Adilette 22 Slide. These had a small shock drop a few days ago however will officially release on June 23rd and retail for £45/$55. This is the Desert Sand colourway but theres a bunch of other that will be part of the release. In this video I compare these to the Yeezy slides in terms of Sizing, Materials, Comfort & everything else. Theres a lot to get into so be sure to catch the full review for all the details!\n\nLet me know what you think of these down in the comments! \n\nSubscribe for more sneaker content: \nhttps://www.youtube.com/channel/UCML15nS7tyrKoQCvoALTrtA\n\nFollow me on Instagram!\nhttps://www.instagram.com/elliotpagesneakers/\n\nBusiness Enquires/Contact Email: owen@smallscreenmarketing.com\nPersonal email: Elliotpagesneakers@gmail.com\n\nCopyright Free Music I Use:\nhttps://www.epidemicsound.com/referral/ux5hd3/\n\n#adidasadiletteslide22 #yeezyslide #sneakers",
              likedByUsers: [],
              dislikedByUsers: [],
              createdAt: '2022-06-06T17:40:08.223Z',
              updatedAt: '2022-06-06T17:41:30.841Z',
            },
            {
              _id: '629de5b34cecfa4efd6630ad',
              youtubeId: 'sIPCqBM6SYw',
              user: {
                _id: '629c6d2fadcc57e209cdc628',
                email: 'duc@email.com',
              },
              title: '"stop bullying with satchels raze"',
              description:
                "Give the video a thumbs up if you liked it & Subscribe if you love today's video, thanks for watching!\n\nNothing more fun than using Raze's satchels to pull off 200IQ plays on Valorant. From sticking enemies with satchels, satchelling backwards or just doing your normal tiktok satchels they can be the best $400 spent a round! In one of the clips in this video I was told I was bullying the enemy with my satchel play, hope you enjoy the plays (& the odd sage play).\n\nFollow me on -\nTwitch: https://www.twitch.tv/grayfps_\nDiscord: https://discord.gg/qP33raM\nTwitter: http://www.twitter.com/grayfps​\nTikTok: http://www.tiktok.com/@grayfps​\n\nOutro music:\nSedyyBeats - Shady Tree\n\nCreator of my Profile Picture:\nJASPER / MYBIRTHRIGHT\nTwitter: https://twitter.com/JasperSketches\n\n#valorant #raze #entryraze #valorantmontage #valorantraze #grayfps #razesatchels #tiktoksatchels #fastraze #200iqrazeplays #funnysatchels #flyingraze #rozault",
              likedByUsers: ['629c6d2fadcc57e209cdc628'],
              dislikedByUsers: [],
              createdAt: '2022-06-06T11:32:03.971Z',
              updatedAt: '2022-06-06T15:04:07.886Z',
            },
          ],
        }),
      ),
  ),
);
