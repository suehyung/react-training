var React = require('react')
var PropTypes = require('prop-types')
var api = require('../utils/api')

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

// grid of repositories
function RepoGrid (props) {
  return (
    <ul className='popular-list'>
      {props.repos.map(function (repo, index) {
        return (
          <li className = 'popular-item' key = {repo.name}>
            <div className = 'popular-rank'>#{index + 1}</div>
              <ul className = 'space-list-items'>
                <li>
                  <img 
                    className = 'avatar' 
                    src = {repo.owner.avatar_url}
                    alt = {'Avatar for ' + repo.owner.login} />
                </li>
                <li><a href= {repo.html_url}>{repo.name}</a></li>
                <li>@{repo.owner.login}</li>
                <li>{repo.stargazers_count} stars</li>
              </ul>
          </li>
        )
      })}
    </ul>
  )
}

// performs type checking of props passed to components
RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

// Component names must start with capital letter, see eg, SelectLanguage
class Popular extends React.Component {
  constructor (props) {
    // always put first, otherwise this.props will be undefined
    super(props)
    // sets initial state; don't call .setState() in constructor
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }
    // is in the constructor to ensure that the 'this' inside updateLanguage 
    // refers to the component instance itself to use setState method
    this.updateLanguage = this.updateLanguage.bind(this)
  }
  // invoked by React each time component is rendered on screen
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }
  // updates state
  updateLanguage(lang) {
    // React method that changes component state in response to event handler
    this.setState(() => {
      return {
        selectedLanguage: lang,
        repos: null
      }
    })
    // API method fetches repos for selected lang in response to event
    api.fetchPopularRepos(lang)
    .then(function (repos) {
      this.setState(function () {
        return {
          repos: repos
        }
      })
    // as above, 'this' is inside a function, so bind it to component instance 
    }.bind(this))
  }

  render() {
    return (
      <div>
        <SelectLanguage 
          selectedLanguage = {this.state.selectedLanguage}
          onSelect = {this.updateLanguage}
        />

        {!this.state.repos 
          ? <p>Loading...</p> 
          : <RepoGrid repos = {this.state.repos} />}
      </div>
    )
  // ternary operator above ensures that RepoGrid component only renders once API fetch is complete, otherwise error bc repos prop is undefined
  }
}

module.exports = Popular
