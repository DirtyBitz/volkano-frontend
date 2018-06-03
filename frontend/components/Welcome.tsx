import * as React from 'react'
import Router from 'next/router'
import { Button, Segment, Grid, Container, Card, Image } from 'semantic-ui-react'
import Layout from './Layout'

const Welcome = () => {
  return (
    <Layout transparentHeader>
      <div id="jumbo">
        <img src="/static/jumbo-bg.jpg" />
        <div id="black-overlay">
          <div id="welcome-msg">
            <h1>
              Vol<span>kano</span>
            </h1>
            <div>
              <p>Store your media.</p>
              <br />
              <br />
              <Button basic color="olive" onClick={() => Router.push('/signup')}>
                Create Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="info-boxes">
        <Container>
          <Grid stackable centered columns="three">
            <Grid.Column>
              <Card>
                <Image src="https://cdn.pixabay.com/photo/2017/03/07/13/02/thought-2123970_1280.jpg" />
                <Card.Content>
                  <Card.Header>Our vision</Card.Header>
                  <Card.Description>
                    Our goal through this project is to bring you joy when seeing images
                    you would love to collect online. We have a wish that we can end the
                    frustration people experience when they see an image they want to
                    collect, but do not want to download it onto their current device.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card>
                <Image src="https://cdn.pixabay.com/photo/2018/05/08/08/44/artificial-intelligence-3382507_1280.jpg" />
                <Card.Content>
                  <Card.Header>Our product</Card.Header>
                  <Card.Description>
                    Volkano is a place where you can easily save images, gifs,
                    youtube-videos and more you come across online, in a single place. You
                    can also browse your collection and easily share your items.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>

            <Grid.Column>
              <Card>
                <Image src="https://cdn.pixabay.com/photo/2018/05/12/11/37/team-3393037_1280.jpg" />
                <Card.Content>
                  <Card.Header>Who are we?</Card.Header>
                  <Card.Description>
                    We are a group of students from UiT The Arctic University of Norway
                    working on a group project to create something beautiful.
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </Container>
      </div>

      <style jsx>{`
        #jumbo {
          display: flex;
          color: #fff;
          flex-direction: column;
          margin-left: -30px;
          margin-top: -30px;
          margin-right: -30px;
          position: relative;
          height: 65vh;
          overflow: hidden;
          margin-bottom: 30px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          #black-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            z-index: 901;
            background: rgba(0, 0, 0, 0.65);
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-around;
          }

          #welcome-msg {
            display: inline-block;
            text-align: center;
            h1 {
              margin-bottom: 15px;

              span {
                color: #ce1a1a;
              }
            }
          }
        }

        .info-boxes {
          margin-top: 15px;
        }
      `}</style>
    </Layout>
  )
}

export default Welcome
