import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchAllVenues} from '../store/venue'
import {addToCart} from '../store/cart'
import {Grid, Column, Button, Card, Image} from 'semantic-ui-react'

class AllVenues extends Component {
  componentDidMount() {
    this.props.populateVenues()
  }
  handleAddToCart(venueId){
    this.props.addToCart(venueId, 1)
  }
  render() {
    return (
      <div>
        <h1 text-align='center' >All Venues</h1>
        <Grid columns = {3} celled>
        <Grid.Row stretched>
          {this.props.venues.map(venue => {
            return (
            <Grid.Column columns='equal' key={venue.id} >
              <Card class="venuecards" color='blue' centered>
              <Link to={`venues/${venue.id}`}>
                <Image src={venue.imageUrl}  size='huge' />
                <Card.Header>{venue.name}</Card.Header>
                <Card.Meta>Type: {venue.type}</Card.Meta>
                <Card.Description>Price: {venue.price}
                </Card.Description>
                <Card.Description>
                  Capacity: {venue.capacity}
                </Card.Description>
                <p>Address: {venue.address}</p>
                </Link>
              </Card>
            </Grid.Column>
            )
          })}
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  venues: state.venues.venueList
})

const mapDispatchToProps = (dispatch) => (
  {
    populateVenues : () => dispatch(fetchAllVenues()),
    addToCart: (venueId, quantity) => dispatch(addToCart(venueId, quantity))
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(AllVenues)
