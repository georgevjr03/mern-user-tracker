import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Contact = props =>(
    <tr>
        <td>{props.contact.username}</td>
        <td>{props.contact.number}</td>
        <td>{props.contact.description}</td>
        <td>{new Date(props.contact.DOB).toLocaleDateString()}</td>
        <td>
            <Link to={"/edit/"+props.contact._id}>edit</Link> | <a href="#" onClick={()=>{props.deleteContact(props.contact._id) }}>delete</a>
        </td>
    </tr>
)


export default class ContactsList extends Component{
    constructor(props){
        super(props);

        this.deleteContact=this.deleteContact.bind(this);

        this.state={contacts:[]};
    }

    componentDidMount(){
        axios.get('http://localhost:3009/contacts/')
            .then(response =>{
                this.setState({contacts:response.data})
            })
            .catch((error)=>{
                console.log(error);
            })
    }

    deleteContact(id){
        axios.delete('http://localhost:3009/contacts/'+id)
            .then(res=> console.log(res.data));
        
            this.setState({
                contacts:this.state.contacts.filter(el =>el._id !==id)
            })
    }

    contactList(){
        return this.state.contacts.map(currentcontact =>{
            return <Contact contact={currentcontact} deleteContact={this.deleteContact} key={currentcontact._id}/>;
        })
    }
    render(){
        return(
            <div>
                <h3>Logged Contacts</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Number</th>
                            <th>Description</th>
                            <th>DOB</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.contactList()}
                    </tbody>
                </table>
            </div>
        )
    }
} 