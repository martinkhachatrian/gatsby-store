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
