import {GatsbyBrowser} from 'gatsby';

import Layout from './src/components/layout/layout';

import "./src/styles/global.css"
import {IntlProvider} from 'react-intl';

export const wrapRootElement: GatsbyBrowser['wrapRootElement'] = ({element, pathname}) => {
    return element
}

export const wrapPageElement: GatsbyBrowser<Record<string, unknown>, Record<string, unknown> & {lang: string}>['wrapPageElement'] = ({element, props}) => {
    const {pageContext} = props
    const {lang} = pageContext

    return <IntlProvider locale={lang} defaultLocale="en">
        <Layout {...props}>{element}</Layout>
    </IntlProvider>
}
