/*
 * README!
 * When layout component is implemented, remove sign in button
 * on pages/index.tsx and instead use Layout component there.
 * Modify tests for index.tsx to check that Layout component is present.
 *
 * See suggested render of this component on the bottom
 */

//import { shallow, ShallowWrapper } from 'enzyme'
//import Layout from '../Layout'

describe('Layout component', () => {
  //let layout: ShallowWrapper<any>

  beforeEach(() => {
    //layout = shallow(<Layout {...defaultProps} />)
  })

  it('Should wrap everything in a div')

  it('Contains a header element')

  it('Contains navigation component')

  it('Contains footer component')

  it('Has default title if none is set')

  it('Changes title when title prop is set')
})

/* Plz delete me once you have seen the idea ;)
 * <div>
 *  <Head>
 *    <title>{ title }</title>
 *    <meta charSet='utf-8' />
 *    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
 *  </Head>
 *  <header>
 *    <Navigation userData={userData} />
 *  </header>
 *  { children }
 *  <Footer />
 * </div>
 * */
