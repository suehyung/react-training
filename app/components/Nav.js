var React = require('react')
var NavLink = require('react-router-dom').NavLink
// use NavLink when highlighting current page, as in navbar 

function Nav () {
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active' to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/battle'>Battle</NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/popular'>Popular</NavLink>
      </li>
    </ul>
  )
  // 'exact' in NavLink ensures only exact match, otherwise always active
}

module.exports = Nav