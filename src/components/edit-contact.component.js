import React,{Component,createRef} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditContact extends Component{
    constructor(props){
        super(props);

        this.usernameRef = React.createRef();
        this.onChangeUsername=this.onChangeUsername.bind(this);
        this.onChangeNumber=this.onChangeNumber.bind(this);
        this.onChangeDescription=this.onChangeDescription.bind(this);
        this.onChangeDOB=this.onChangeDOB.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

        this.state={
            username:'',
            number:0,
            description:'',
            DOB: new Date(),
            users:[]
        }
    }

    componentDidMount(){
        const {match} = this.props;
        if(match && match.params){
        axios.get('http://localhost:3009/contacts/'+this.props.match.params.id)
            .then(response =>{
                this.setState({
                    username:response.data.username,
                    number:response.data.number,
                    description:response.data.description,
                    DOB: new Date(response.data.date)
                })
            })
            .catch(function(error){
                console.log(error);
            })
        }
       axios.get('http://localhost:3009/users/')
            .then(response =>{
                if(response.data.length >0){
                    this.setState({
                        users:response.data.map(user =>user.username),
                    })
                }
            })
    }

    onChangeUsername(e){
        this.setState({
            username:e.target.value
        });
    }

    onChangeNumber(e){
        this.setState({
            number:e.target.value
        });
    }

    onChangeDescription(e){
        this.setState({
            description:e.target.value
        });
    }

    onChangeDOB(date){
        this.setState({
            DOB:date
        });
    }
    
    onSubmit(e){
        e.preventDefault();

        const contact={
            username: this.usernameRef.current.value,
            number:this.state.number,
            description:this.state.description,
            DOB:this.state.DOB
        }

        console.log(contact);

        const {match} = this.props;
        if(match && match.params){
        axios.post('http://localhost:3009/contacts/update/'+this.props.match.params.id,contact)
            .then(res =>console.log(res.data));

        
        }
        window.location='/';
    }
    
    
    render(){
        return(
            <div>
                <h3>Edit Contact Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref={this.usernameRef}
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user){
                                    return <option
                                    key={user}
                                    value={user}>{user}
                                    </option>;
                                })
                            }

                        </select>
                    </div>
                    <div className="form-group">
                        <label>Number: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.number}
                            onChange={this.onChangeNumber}
                            />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />

                    </div>
                    <div className="form-group">
                        <label>DOB: </label>
                        <div>
                            <DatePicker
                                selected={this.state.DOB}
                                onChange={this.onChangeDOB}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Contact Log" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}