import { GatsbyNode } from "gatsby";
import path from "node:path";

export const onCreateWebpackConfig = ({ stage, actions }) => {
    if (stage === 'build-javascript') {
        actions.setWebpackConfig({
            devtool: false,
        });
    }
};

export const createPages: GatsbyNode['createPages'] = async ({ actions }) => {
    const { createPage } = actions;

    // const providers = ['google', 'facebook', 'twitter']; // Example providers

    // providers.forEach(provider => {
        createPage({
            path: `/auth`,
            matchPath: `/auth/:provider`,
            component: path.resolve("./src/templates/auth.tsx"),
        });
    // });
};
