import {Link, Slice, SliceComponentProps} from 'gatsby'
import {FormattedMessage} from 'react-intl'
import * as React from 'react'

interface HeaderProps {

}

export default function HeaderSlice() {
  return (
    <header className="relative py-8 text-center bg-indigo-600 text-white shadow-md">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-4xl">👨‍🍳</div>
      <div className="container mx-auto px-4">
        <Link to="/" className="text-4xl md:text-5xl font-bold">Cook The Code</Link>
        <div className="text-xl mt-2 italic">Where Programming Gets Deliciously Debugged</div>
      </div>
    </header>
  )
}

export const Header = (props: HeaderProps) => {
  return (
    <HeaderSlice/>
  )
}
