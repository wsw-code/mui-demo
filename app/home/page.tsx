import { Box } from '@mui/material';
import CardList from '@/components/CardList';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { GameItem } from '@/type';

import { getPath } from '@/utils';
import { activityList, activityProps, gameCardProps } from '@/contants';
import withPageAnimation from '@/components/WithPageAnimation';
// app/components/LinkExample.jsx
import GameCard from '@/components/GameCard';
import Link from 'next/link';
import GameCardBtn from '@/svg/gameCardBtn';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const Index = async () => {
  try {
    const res = await fetch(getPath('/api/list'), {
      method: 'get',
    });
    const { data = [] } = (await res.json()) as { data: GameItem[] };

    return (
      <Box sx={{ color: '#fff' }}>
        <Box
          sx={{
            backgroundImage: 'url(/banner.png)',
            height: '12vw',
            minHeight: '200px',
            maxHeight: '300px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></Box>
        <Box
          sx={{
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            paddingBottom: '20px',
            paddingLeft: '16px',
            paddingRight: '16px',
          }}
        >
          <CardList wrapperSxProps={gameCardProps} title="推荐游戏" icon={<VideogameAssetIcon />}>
            {data.map((el, index) => (
              <Box
                sx={{
                  borderRadius: '4px',
                }}
                key={index}
                className=" group cursor-pointer"
              >
                <Link href={`/gameDetail/${el.id}`}>
                  <GameCard
                    src={el.iconUrl}
                    wrapperSx={{
                      '&:hover button': {
                        // background:'#999',
                        opacity: 1,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        left: '2%',
                        top: '2%',
                        background: '#213743',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        textAlign: 'center',
                        lineHeight: '28px',
                        cursor: 'pointer',
                      }}
                    >
                      <GameCardBtn />
                    </Box>

                    <Box
                      sx={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        position: 'absolute',
                        right: '2%',
                        bottom: '2%',
                        backgroundColor: '#666',
                        opacity: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      component="button"
                    >
                      <ArrowOutwardIcon fontSize="small" />
                    </Box>
                  </GameCard>
                </Link>
              </Box>
            ))}
          </CardList>

          <CardList wrapperSxProps={gameCardProps} title="热门游戏" icon={<VideogameAssetIcon />}>
            {data.map((el, index) => (
              <Box
                sx={{
                  borderRadius: '4px',
                }}
                key={index}
                className=" group cursor-pointer"
              >
                <Link href={`/game/${el.id}`}>
                  <GameCard src={el.iconUrl} />
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '14px',
                      padding: '0 2%',
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: '#20ff20',
                        marginRight: '5px',
                      }}
                    ></Box>
                    121212
                  </Box>
                </Link>
              </Box>
            ))}
          </CardList>

          <CardList
            wrapperSxProps={{
              gridAutoColumns: '33.3%',
              '& > *': {
                scrollSnapAlign: 'start',
                padding: '0 1%',
              },
              ...activityProps,
            }}
            title="促销活动"
            icon={<VideogameAssetIcon />}
          >
            {activityList.map((el, index) => (
              <Box
                sx={{
                  borderRadius: '4px',
                  // overflow: 'hidden',
                }}
                key={index}
                className=" group cursor-pointer"
              >
                <Box
                  sx={{
                    display: 'grid',
                    justifyContent: 'space-between',
                    // grid-template-columns: calc(60% - 20px) 40%;
                    gridTemplateColumns: 'calc(60% - 20px) 40%',
                    columnGap: '20px',
                    backgroundColor: '#213743',
                    borderRadius: '8px',
                    overflow: 'hidden',
                  }}
                  component="a"
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      padding: '16px',
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        background: '#fff',
                        color: '#071824',
                        fontSize: '12px',
                        alignSelf: 'flex-start',
                        padding: '0 4px',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                      }}
                    >
                      {el.title}
                    </Box>
                    <Box
                      sx={{
                        color: '#fff',
                        fontSize: '20px',
                        fontWeight: 'bold',
                      }}
                    >
                      {el.title2}
                    </Box>
                    <Box
                      sx={{
                        color: '#b1bad3',
                        fontSize: '14px',
                        fontWeight: 'bold',
                      }}
                    >
                      {el.title3}
                    </Box>
                    <Box sx={{ fontWeight: 'bold' }}> 阅读更多</Box>
                  </Box>

                  <Box>
                    <img className=" w-full" src={el.path} alt="" />
                  </Box>
                </Box>
              </Box>
            ))}
          </CardList>
        </Box>
      </Box>
    );
  } catch (error) {
    return <div>ERROR-错误页面??-{JSON.stringify(error)}</div>;
  }
};

export default withPageAnimation(Index);
