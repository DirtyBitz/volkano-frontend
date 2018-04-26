import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import store from '../store'
import Layout from '../components/Layout'
import Collection from '../components/Collection'
import { SiteLayout } from '../constants/SiteLayout'
import { isSignedIn } from '../utils/Auth'
import { VolkaButton } from '../components/VolkaButton'
import Link from 'next/link'

export class App extends React.Component<{ req; isSignedIn }, {}> {
  static getInitialProps({ req }) {
    return { isSignedIn: isSignedIn(req) }
  }

  render() {
    if (this.props.isSignedIn) {
      return (
        <Layout>
          <Collection />
        </Layout>
      )
    } else {
      return (
        <Layout title="Volkano">
          <div id="jumbo">
            <div id="welcome-msg">
              <h1>Welcome to Volka.no</h1>
              <div>
                <p>Start collecting today!</p>
                <br />
                <br />
                <Link href="/signup">
                  <VolkaButton ghost title="Create Account" />
                </Link>
              </div>
            </div>

            <img src="https://www.svgrepo.com/show/31499/volcano.svg" />
          </div>

          <div id="info-boxes">
            <div className="info-box">
              <h3>Our vision</h3>
              <p>
                Our goal through this project is to bring you joy when seeing images you
                would love to collect online. We have a wish that we can end the
                frustration people experience when they see an image they want to collect,
                but do not want to download it onto their current device.
              </p>
            </div>
            <div className="info-box">
              <h3>Our product</h3>
              <p>
                Volkano is a place where you can easily save images, gifs, youtube-videos
                and more you come across online, in a single place. You can also browse
                your collection and easily share your items.
              </p>
            </div>
            <div className="info-box">
              <h3>Who are we?</h3>
              <p>
                We are a group of students from UiT The Arctic University of Norway
                working on a group project to create something beautiful.
              </p>
            </div>
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

            #info-boxes {
              margin: 0 auto;
              display: flex;
              max-width: ${SiteLayout.pagewidth}px;
              padding: ${SiteLayout.defaultPadding};

              .info-box {
                margin: 15px;
                padding: 15px;
                border-radius: 5px;
                border: 1px solid #eee;
                background: #fff;
                text-align: center;
                max-width: 33%;

                h3 {
                  padding-bottom: 10px;
                }
              }
            }
          `}</style>
        </Layout>
      )
    }
  }
}

export default withRedux(store)(App)
