import {Link, Slice, SliceComponentProps} from 'gatsby'
import {FormattedMessage} from 'react-intl'

interface HeaderProps {

}

export default function HeaderSlice(props: SliceComponentProps) {
  console.info('Header props:', props)
  const {sliceContext} = props
  const {
    lang,
    navItem1,
    navItem2
  } = sliceContext as any

  return (
    <header className="flex w-full">
      <nav>
        <ul className="flex">
          <li className="mr-6 p-4">
            <Link className="text-blue-500 hover:text-blue-800" to={`/${lang}/home`}>
              <FormattedMessage id={navItem1} defaultMessage={navItem1} />
              {navItem1}
            </Link>
          </li>

          <li className="mr-6  p-4">
            <Link className="text-blue-500 hover:text-blue-800" to={`/${lang}/product/product-1`}>{navItem2}</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export const Header = (props: HeaderProps) => {
  return (
    <Slice alias={'header'} allowEmpty newprop={23423423} />
  )
}
