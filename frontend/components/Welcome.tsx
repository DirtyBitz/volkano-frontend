import * as React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { Button, Grid, Container, Card, Image, Icon } from 'semantic-ui-react'
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

      <Container>
        <Grid stackable centered columns="three">
          <Grid.Column>
            <Card>
              <Image src="/static/images/idea.jpg" />
              <Card.Content>
                <Card.Header>Our vision</Card.Header>
                <Card.Description>
                  Our goal through this project is to bring you joy when seeing images you
                  would love to collect online. We have a wish that we can end the
                  frustration people experience when they see an image they want to
                  collect, but do not want to download it onto their current device.
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
              <Image src="/static/images/product.jpg" />
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
              <Image src="/static/images/team.jpg" />
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

      <div id="get-started">
        <Container>
          <h2>Get started</h2>
          <div id="get-started-steps">
            <div className="step">
              <Icon name="signup" size="huge" />
              <h3>Sign up</h3>
              <p>
                <Link href="/signup">
                  <a>Create</a>
                </Link>{' '}
                a FREE account
              </p>
            </div>

            <div className="step">
              <Icon name="plus" size="huge" />
              <h3>Add items</h3>

              <p>Start collection your media</p>
            </div>

            <div className="step">
              <Icon name="coffee" size="huge" />
              <h3>Chill out</h3>
              <p>Gain the max chill effect.</p>
            </div>
          </div>
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

        #get-started {
          margin-left: -30px;
          margin-right: -30px;
          margin-top: 30px;
          background: #fff;
          padding: 30px;
          margin-bottom: -30px;

          h2 {
            text-align: center;
            margin-bottom: 60px;
          }
        }

        #get-started-steps {
          display: flex;
          justify-content: space-between;
          .step {
            text-align: center;
          }
        }
      `}</style>
    </Layout>
  )
}

export default Welcome
