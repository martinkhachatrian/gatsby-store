import type { JSX } from 'react';
import  {type HeadFC, type PageProps, graphql} from 'gatsby';
import Layout from '../components/layout/layout';
import {Seo} from '../components/seo/seo';

export default function ProductDetailsTemplate(props: PageProps): JSX.Element {
    console.log('ProductDetailsTemplate props ', props)

    const {pageContext: { intl }} = props

    return (
        <div>
            <h1 className="text-3xl mb-2">{intl.title}</h1>
            <h3 className="text-2xl">{''}</h3>
        </div>
    )
}

export const Head: HeadFC = (props) => {
    console.log('ProductDetailsTemplate Head props:', props)

    return (
        <Seo>
            <title>HomeTemplate Page</title>
        </Seo>
    )
}

