import * as React from 'react'
import * as withRedux from 'next-redux-wrapper'
import store from '../store'
import Layout from '../components/Layout'
import { VolkaButton } from '../components/VolkaButton'
import { hasSession } from '../utils/Session'
import Link from 'next/link'

export class App extends React.Component<{}, {}> {
  render() {
    const isSignedIn = hasSession()
    return (
      <Layout fixedHeader title="Volkano">
        <div id="jumbo">
          <div id="welcome-msg">
            <h1>Welcome to Volka.no</h1>
            <div>
              <p>Start collecting today!</p>
              <br />
              <br />
              {!isSignedIn && (
                <Link href="/signup">
                  <VolkaButton ghost title="Create Account" />
                </Link>
              )}
            </div>
          </div>

          <img src="https://www.svgrepo.com/show/31499/volcano.svg" />
        </div>
        <ul id="info-boxes">
          <li className="info-box">
            <h3>Our vision</h3>
            <p>
              Our goal through this project is to bring you joy when seeing images you
              would love to collect online. We have a wish that we can end the frustration
              people experience when they see an image they want to collect, but do not
              want to download it onto their current device.
            </p>
          </li>
          <li className="info-box">
            <h3>Our product</h3>
            Volkano is a place where you can easily save images, gifs, youtube-videos and
            more you come across online, in a single place. You can also browse your
            collection and easily share your items.
          </li>
          <li className="info-box">
            <h3>Who are we?</h3>
            <p>
              We are a group of students from UiT The Arctic University of Norway working
              on a group project to create something beautiful.
            </p>
          </li>
        </ul>
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
            list-style: none;
            display: flex;
            -webkit-flex-wrap: wrap;
            flex-wrap: wrap;
            justify-content: center;

            .info-box {
              margin: 15px;
              padding: 15px;
              border-radius: 5px;
              background: #fff;
              width: 400px;
              text-align: center;
              box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);

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

export default withRedux(store)(App)
