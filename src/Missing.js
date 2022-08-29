import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
      <h2>Page Not Found</h2>
      <p>Well, that's disappointing.</p>
      <p>
        <Link to='/'>Go Back to Homepage</Link>
      </p>
    </main>
  )
}

export default Missing