import type {HeadFC, PageProps} from 'gatsby';
import React, { JSX } from 'react';
import {authInstagram} from '../services/auth.service';

export default function Authorize(props: PageProps): JSX.Element {
    console.info('Server Data:', props.serverData)

    return (
        <div>
            <h1>Server Side Rendered Page</h1>
        </div>
    )
}

export const Head: HeadFC = () => <title>Home Page</title>

export async function getServerData({ query }) {
    const { code } = query

    try {
        const res = await authInstagram(code)

        if (!res.ok) {
            throw new Error(`Response failed`)
        }

        return {
            props: {... (await res.json()), a:12321232}
        }
    } catch (error) {
        return {
            status: 500,
            headers: {},
            props: {}
        }
    }
}
