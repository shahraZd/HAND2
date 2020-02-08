// import React from 'react'
// import { Card } from "antd"
// import { Link } from "react-router-dom"

// const players = [
//     {
//         cin: "07896875",
//         firstName: "foulen",
//         lastName: "benfoulen",
//         tel: "+21653695",
//         mail: 'foulen@gmail.com',
//         poids: 80,
//         longueur: 1.80,
//         adresse: 'cite ben foulen',
//         club_id: "farachet"
//     },
//     {
//         cin: "07896875",
//         firstName: "foulen",
//         lastName: "benfoulen",
//         tel: "+21653695",
//         mail: 'foulen@gmail.com',
//         poids: 80,
//         longueur: 1.80,
//         adresse: 'cite ben foulen',
//         club_id: "farachet"
//     },
//     {
//         cin: "07896875",
//         firstName: "foulen",
//         lastName: "benfoulen",
//         tel: "+21653695",
//         mail: 'foulen@gmail.com',
//         poids: 80,
//         longueur: 1.80,
//         adresse: 'cite ben foulen',
//         club_id: "farachet"
//     },
//     {
//         cin: "07896875",
//         firstName: "foulen",
//         lastName: "benfoulen",
//         tel: "+21653695",
//         mail: 'foulen@gmail.com',
//         poids: 80,
//         longueur: 1.80,
//         adresse: 'cite ben foulen',
//         club_id: "farachet"
//     },
//     {
//         cin: "07896875",
//         firstName: "foulen",
//         lastName: "benfoulen",
//         tel: "+21653695",
//         mail: 'foulen@gmail.com',
//         poids: 80,
//         longueur: 1.80,
//         adresse: 'cite ben foulen',
//         club_id: "farachet"
//     }
// ]
// const Players = () => {
//     const { Meta } = Card;
//     return (
//         <div>
//             <h1>Players</h1>
//             <div style={{ display: "flex", flexWrap: "wrap" }}>{players.map((e, i) =>

//                 <Link to="/players/profile" style={{ margin: "25px" }} key={i}><Card

//                     hoverable
//                     style={{ width: 240 }}
//                     cover={<img alt="example" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3N28G-qzP_j4mhEhTqxz3NXUI431XIOsAUrvIc0AL_1kHhxS4&s" />}
//                 >
//                     <Meta title={e.firstName + e.lastName} description={e.mail} />
//                 </Card>
//                 </Link>)}
//             </div>

//         </div >
//     )
// }

// export default Players


import React, { Component } from 'react'
import { Button,Select, Card, Image,Modal,Form } from 'semantic-ui-react'
/*import {
    Link
} from "react-router-dom";*/
import axios from 'axios';
// import AddPlayer from './AddPlayer';
//import { Route} from "react-router-dom"
import {
    Redirect
  } from "react-router-dom";
export default class Player extends Component {
    state = {
        players: [],
        open: false,
        open1:false,
        newclub:'',
        id:'',
        cin:'',
        id1:'',
        clubsOptions: [],
        redirect:0
    };


    refreshPage() {
        window.location.reload(false);
      }

/*handleChange = event => {
  this.setState({newclub:{_id:event.target.key,name:event.target.value,adresse:event.target.adresse}});
  console.log(this.state.newclub)

}*/
    componentDidMount(){
        axios.get(`http://192.168.99.100:5000/player`)
        .then(res => {
          const players = res.data;
          this.setState({ players });
      
            const clubsOptions = [];
            axios.get(`http://192.168.99.100:5000/club`)
                .then(res => {
                    const clubs = res.data;
                    clubs.forEach(club => {
                        clubsOptions.push({ key: club._id, text: club.name, value: club._id })
                    })
                    this.setState({clubsOptions});
                })
        })

    }
    
    handleChange = (e, { name, value }) => this.setState({ [name]: value })
    handleUpdate = (cin) => {
  
        //e.preventDefault(e);
        const {newclub} = this.state;

       
          // console.log();
         axios.put(`http://192.168.99.100:5000/player/${cin}`,{"club_id":newclub})
    
          .then(res => { 
          console.log(res)
        window.location.reload(false);
           }) ;
        
       
       
       }
    handleDelete = (cin) => {
        console.log('handle delete',cin)
        axios.delete(`http://192.168.99.100:5000/player/${cin}`)
          .then(res => { 
           
              console.log(res);
              console.log(res.data);
              
            }).then(res => { window.location.reload(false); });
          
        }
        
        close = () => this.setState({ open: false })
        closeConfigShow = (closeOnEscape, closeOnDimmerClick,cin,id1) => () => {
          this.setState({ closeOnEscape, closeOnDimmerClick, open: true,cin:cin, id1:id1 })
        }
        
        close1 = () => this.setState({ open1: false })
        closeConfigShow1 = (closeOnEscape1, closeOnDimmerClick1,id1,cin ) => () => { 
          this.setState({ closeOnEscape1, closeOnDimmerClick1, open1: true,id1:id1, cin:cin })
        }
    render() {
        const {cin, id1} = this.state
      const {redirect,clubsOptions}=this.state
      const { open, closeOnEscape, closeOnDimmerClick} = this.state
      const { open1, closeOnEscape1, closeOnDimmerClick1 } = this.state

        return (

            redirect ? (

                <Redirect to='/Player' />
            ) : (
            <div>
                 {/* <div > <AddPlayer/></div> */}
                 <span>&nbsp;&nbsp;</span><span>&nbsp;&nbsp;</span><span>&nbsp;&nbsp;</span><span>&nbsp;&nbsp;</span>
                
                        
                        <Card.Group>
                { this.state.players.map(player =>
                    <Card key={player._id}>
                        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
                        <Card.Content>
                            <Card.Header>{player.firstName}</Card.Header>
                            <Card.Header>{player.lastName}</Card.Header>
                            <Card.Meta>{player.club_id.name} </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <div className='ui two buttons'>
                                <Button basic color='green' onClick={this.closeConfigShow(false, true,player.cin,player.club_id)}>Update</Button>
                       
                                <Button basic color='red'  onClick={this.closeConfigShow1(false, true, player._id, player.cin)} >Delete</Button> 
                              
                            </div>
                        </Card.Content>
                    </Card>

                    )}
                </Card.Group>
                <div>
          <Modal
          open={open}
          closeOnEscape={closeOnEscape}
          closeOnDimmerClick={closeOnDimmerClick}
          onClose={this.close}
        >
          <Modal.Header>Update Your Account</Modal.Header>
          <Modal.Content>
          
            <Form>
        <Form.Group widths='equal'>
          <Form.Field
            control={Select}
            label='Update Club'
            
        options={clubsOptions}
        onChange={this.handleChange}
         name='newclub'
         key='newclub'
            placeholder={id1.name}
           // value={id1.name}
          />
          </Form.Group>
          </Form>

          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close} negative>
              No
            </Button>
            <Button
              onClick={this.close}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Yes'
              
              onClick={()=>this.handleUpdate(cin)}
            />
          </Modal.Actions>
        </Modal>
      </div>
    
      <div>
          <Modal
          open={open1}
          closeOnEscape={closeOnEscape1}
          closeOnDimmerClick={closeOnDimmerClick1}
          onClose={this.close1}
        >
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete your account</p>
           
           

          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.close1} negative>
              No
            </Button>
            <Button
              onClick={this.close1}
              positive
              labelPosition='right'
              icon='checkmark'
              content='Yes'
              
              onClick={()=>this.handleDelete(cin)}
            />
          </Modal.Actions>
        </Modal>
      </div>
            </div >)
        )
    }
}
