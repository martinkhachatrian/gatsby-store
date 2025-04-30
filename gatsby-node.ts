import {GatsbyNode} from 'gatsby'
import path from 'node:path'
import SanityHeaderFilterInput = Queries.SanityHeaderFilterInput

export const onCreateWebpackConfig = ({stage, actions}) => {
  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      devtool: false
    })
  }
}

export const createPages: GatsbyNode['createPages'] = async ({actions, graphql}) => {
  const {createPage, createSlice} = actions

    const result = await graphql(`
        query MyQuery {
            allSanityHome(filter: {isActive: {eq: true}}) {
                nodes {
                    title
                    subtitle
                }
            }
        }
    `)

  if (result.errors) {
    throw result.errors
  }

    const productQueryResult = await graphql<object>(`
        query ProductsQuery {
            allSanityProduct {
                nodes {
                    slug {
                        current
                    }
                    language
                    title
                    body {
                        children {
                            text
                        }
                    }
                }
            }
        }
    `)


  if (productQueryResult.errors) {
    throw productQueryResult.errors
  }

  const headerQueryResult = await graphql(`
      query HeaderQuery {
          allSanityHeader {
              nodes {
                  navItem1
                  navItem2
                  navItem3
                  language
              }
          }
      }
  `)

  if (headerQueryResult.errors) {
    throw productQueryResult.errors
  }

  headerQueryResult.data.allSanityHeader.nodes.forEach((node: SanityHeaderFilterInput) => {
    createSlice({
      id: `header-${node.language}`,
      component: path.resolve('./src/components/layout/header-slice.tsx'),
      context: {
        ...node,
        lang: node.language,
      }
    })
  })
;

  const trans = result.data.allSanityHome.nodes[0]
  const homeTranslations = {
    title: 'Title Home Care'
  }
  ;

  ['en', 'ja'].forEach((lang) => {
    createPage({
      path: `${lang}/home`,
      component: path.resolve('./src/templates/landing.template.tsx'),
      context: {
        translations: homeTranslations,
        lang,
      },
      slices: {
        header: `header-${lang}`,
      }
    })
  })

  productQueryResult.data.allSanityProduct.nodes.forEach((node) => {
    const lang = node.language
    console.info('Product node:', node)

    createPage({
      path: `${lang}/product/${node.slug.current}`,
      component: path.resolve('./src/templates/product-details.template.tsx'),
      context: {
        intl: node,
        lang,
      },
      slices: {
        header: `header-${lang}`,
      }
    })
  })
}
