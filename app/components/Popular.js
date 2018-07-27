var React = require('react')
var PropTypes = require('prop-types')

// stateless functional component for menu bar 
function SelectLanguage (props) {
  var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
  return (
    // use 'className' for css classes
    <ul className = 'languages'>
      {languages.map(lang => {
        return (
          // iterates thru menu list, green if item matches current state
          // onSelect arg1 is null bc binding for this.updateLanguage is already
          // set in constructor. arg2 passes list item to updateLanguage as lang
          // React requires unique key for each list item
          <li 
            style = {lang === props.selectedLanguage ? {color: 'green'}: null}
            onClick = {props.onSelect.bind(null, lang)}
            key = {lang}>
            {lang}
          </li>
        )
      })}
    </ul>
  )
}

// performs type checking of props passed to components
SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

class Popular extends React.Component {
  constructor (props) {
    // always put first, otherwise this.props will be undefined
    super(props)
    // sets initial state; don't call .setState() in constructor
    this.state = {
      selectedLanguage: 'All'
    }
    // is in the constructor to ensure that the 'this' inside updateLanguage 
    // refers to the component instance itself to use setState method
    this.updateLanguage = this.updateLanguage.bind(this)
  }

  // updates state
  updateLanguage(lang) {
    // React method that changes component state in response to event handler
    this.setState(() => {
      return {
        selectedLanguage: lang
      }
    })
  }

  render() {
    return (
      <div>
        <SelectLanguage 
          selectedLanguage = {this.state.selectedLanguage}
          onSelect = {this.updateLanguage}
        />
      </div>
    )
  }
}

module.exports = Popular
