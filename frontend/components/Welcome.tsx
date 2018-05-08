import * as React from 'react'
import Router from 'next/router'
import { Button, Segment, Grid, Container } from 'semantic-ui-react'

const Welcome = () => {
  return (
    <div>
      <div id="jumbo">
        <div id="welcome-msg">
          <h1>Welcome to Volka.no</h1>
          <div>
            <p>Start collecting today!</p>
            <br />
            <br />
            <Button basic color="olive" onClick={() => Router.push('/signup')}>
              Create Account
            </Button>
          </div>
        </div>

        <img src="https://www.svgrepo.com/show/31499/volcano.svg" />
      </div>

      <div className="info-boxes">
        <Container>
          <Grid columns="three">
            <Grid.Row>
              <Grid.Column>
                <Segment>
                  <h3>Our vision</h3>
                  <p>
                    Our goal through this project is to bring you joy when seeing images
                    you would love to collect online. We have a wish that we can end the
                    frustration people experience when they see an image they want to
                    collect, but do not want to download it onto their current device.
                  </p>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <h3>Our product</h3>
                  <p>
                    Volkano is a place where you can easily save images, gifs,
                    youtube-videos and more you come across online, in a single place. You
                    can also browse your collection and easily share your items.
                  </p>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment>
                  <h3>Who are we?</h3>
                  <p>
                    We are a group of students from UiT The Arctic University of Norway
                    working on a group project to create something beautiful.
                  </p>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>

      <style jsx>{`
        #jumbo {
          display: flex;
          background: #1c222a;
          padding-top: 100px;
          padding-bottom: 30px;
          color: #fff;
          flex-direction: column;

          img {
            margin: 0 auto;
            display: inline-block;
            margin-top: 30px;
            max-width: 200px;
          }
        }

        #welcome-msg {
          display: inline-block;
          margin: 0 auto;
          text-align: center;

          h1 {
            margin-bottom: 15px;
          }
        }

        .info-boxes {
          margin-top: 15px;
        }
      `}</style>
    </div>
  )
}

export default Welcome
