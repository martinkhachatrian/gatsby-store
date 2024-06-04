import type {HeadFC, PageProps} from 'gatsby';
import React, { JSX } from 'react';
import {authInstagram} from '../services/auth.service';

export default function AuthTemplate(props: PageProps): JSX.Element {
    console.info('Server Data:', props.serverData)

    return (
        <div>
            <h1>Authorization</h1>
        </div>
    )
}

export const Head: HeadFC = () => <title>Auth Page</title>

export async function getServerData({ query, params }) {
    const { code } = query
    const { provider } = params
    console.info('provider:', provider)

    try {
        if (provider === 'google') {
            console.info('Google provider')
            // await getGoogleIdToken(code)
        }

        const res = await authInstagram(code)

        if (!res.ok) {
            throw new Error(`Response failed`)
        }

        return {
            props: {... (await res.json())}
        }
    } catch (error) {
        return {
            status: 500,
            headers: {},
            props: {}
        }
    }
}
