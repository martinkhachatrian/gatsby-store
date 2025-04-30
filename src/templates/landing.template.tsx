import type { JSX } from 'react';
import type {HeadFC, PageProps} from 'gatsby';
import {Seo} from '../components/seo/seo';

export default function LandingTemplate(props: PageProps): JSX.Element {
    console.log('HomeTemplate props ', props)
    const {pageContext: { translations }} = props

    return (
        <div>
            <h1 className="text-3xl mb-2">{translations.title}</h1>
            <h3 className="text-2xl">{translations.subtitle}</h3>
        </div>
    )
}

export const Head: HeadFC = (props) => {
    console.log('HomeTemplate Head props:', props)

    return (
        <Seo>
        <title>HomeTemplate Page</title>
    </Seo>
    )
}
