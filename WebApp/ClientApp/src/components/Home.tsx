import * as React from 'react';
import { connect } from 'react-redux';
import '../static/Home.css';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import collapseIcon from '../static/collapse.png'
import expandIcon from '../static/expand.png'
import Input from './Input';
import Header from './Header';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cardOne: {
                Company: {
                    elementType: "input",
                    elementConfig: {
                        Type: "checkbox",
                        placeholder: "",
                    },
                    value: "",
                    shouldValidate: false,
                    touched: false,
                    valid:true
                },
                Prefix: {
                    elementType: "input",
                    elementConfig: {
                        Type: "text",
                        placeholder: "",
                    },
                    value: "",
                    validations: {
                        maxLength: 10,
                    },
                    valid: true,
                    touched: false,
                    shouldValidate: true
                },
                FirstName: {
                    elementType: "input",
                    elementConfig: {
                        Type: "text",
                        placeholder: "",
                    },
                    value: "",
                    validations: {
                        required: true,
                        maxLength:50
                    },
                    valid: false,
                    touched: false,
                    shouldValidate: true
                },
                LastName: {
                    elementType: "input",
                    elementConfig: {
                        Type: "text",
                        placeholder: "",
                    },
                    value: "",
                    validations: {
                        required: true,
                          maxLength: 50
                    },
                    valid: false,
                    touched: false,
                    shouldValidate: true
                },
                MiddleName: {
                    elementType: "input",
                    elementConfig: {
                        Type: "text",
                        placeholder: "",
                    },
                    value: "",
                    validations: {
                        maxLength: 50,
                    },
                    valid: true,
                    touched: false,
                    shouldValidate: true
                },
                NickName: {
                    elementType: "input",
                    elementConfig: {
                        Type: "text",
                        placeholder: "",
                    },
                    value: "",
                    validations: {
                        maxLength: 50,
                    },
                    valid: true,
                    touched: false,
                    shouldValidate: true
                },
                Email: {
                    elementType: "input",
                    elementConfig: {
                        Type: "email",
                        placeholder: "",
                    },
                    value: "",
                    touched: false,
                    shouldValidate: false,
                    valid:true
                },
               
            },
            cardTwo: {
                Address: {
                    elementType: "input",
                    elementConfig: {
                        Type: "text",
                        placeholder: "",
                    },
                    value: "",
                    valid: true,
                    touched: false,
                    shouldValidate: true,
                    validations: {
                        maxLength: 100,
                    },
                },
                City: {
                    elementType: "input",
                    elementConfig: {
                        Type: "text",
                        placeholder: "",
                    },
                    value: "",
                    valid: true,
                    touched: false,
                    shouldValidate: true,
                    validations: {
                        maxLength: 50,
                    },
                },
                Country: {
                    elementType: "CountryDropdown",
                    value: "United States",
                    shouldValidate: false,
                    valid: true
                },
                State: {
                    elementType: "RegionDropdown",
                    elementConfig: {
                        country: "United States",
                       
                    },
                    value: "",
                    shouldValidate: false,
                    valid: true
                    
                },
                PostalCode: {
                    elementType: "input",
                    elementConfig: {
                        Type: "text",
                        placeholder: "",
                    },
                    value: "",
                    valid: true,
                    touched: false,
                    shouldValidate: true,
                    validations: {
                        maxLength: 30,
                    },
                },
               
            },
            clientId: "",
            
            active: true,
            valid: false,
            cardone: true,
            cardtwo: true,
            iscardOneChanged: false,
            iscardTwoChanged: false,
            cardTwoIsValid: true,
            cardOneIsValid: true
            
        };
        
        
    }
    makeValid (){
        console.log('in');
        this.setState({ valid: !this.state.valid });
    }
    toggleone = () => {

        this.setState({ cardone: !this.state.cardone })
    }
    toggletwo = () => {

        this.setState({ cardtwo: !this.state.cardtwo })
    }
    collapseAll = () => {
        this.setState({ cardone: false, cardtwo: false});
    }
    expandAll = () => {
        this.setState({ cardone: true, cardtwo: true })
    }
    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required)
            isValid = !(value.trim() === "") && isValid;
        if (rules.maxLength) {
            value = value.trim();
            isValid = value.length <= rules.maxLength && isValid;
        }
           
        return isValid; 
    }
    cardOneInputChangedHandler = (event, cardOneElementIdentifier) => {
        const updatedcardOne = {
            ...this.state.cardOne
        };
        const updatedcardoneElement = {
            ...updatedcardOne[cardOneElementIdentifier]
        };
        updatedcardoneElement.value = event.target.value;
        updatedcardoneElement.touched = true;
        if (updatedcardoneElement.shouldValidate)
        updatedcardoneElement.valid = this.checkValidity(event.target.value, updatedcardoneElement.validations)
        updatedcardOne[cardOneElementIdentifier] = updatedcardoneElement;

        let cardOneIsValid = true;
        for (let cardOneElementIdentifier in updatedcardOne)
            cardOneIsValid = updatedcardOne[cardOneElementIdentifier].valid && cardOneIsValid;

        this.setState({ cardOne: updatedcardOne, iscardOneChanged: true, cardOneIsValid: cardOneIsValid});

    }
    cardTwoInputChangedHandler = (event, cardTwoElementIdentifier) => {
        const updatedcardTwo = {
            ...this.state.cardTwo
        };
        const updatedcardtwoElement = {
            ...updatedcardTwo[cardTwoElementIdentifier]
        };
        
        if (cardTwoElementIdentifier === 'Country') {
            updatedcardtwoElement.value = event;
            const updatedcardtwoElementState = {
                ...updatedcardTwo['State']
            }
            updatedcardtwoElementState.elementConfig.country = event;
            updatedcardTwo[cardTwoElementIdentifier] = updatedcardtwoElement;
            updatedcardTwo['State'] = updatedcardtwoElementState;

            this.setState({ cardTwo: updatedcardTwo, iscardTwoChanged: true });
        }
        else {
            let cardTwoIsValid = true;
            if (cardTwoElementIdentifier === 'State')
                updatedcardtwoElement.value = event;

            else{
                updatedcardtwoElement.value = event.target.value;
                updatedcardtwoElement.valid = this.checkValidity(event.target.value, updatedcardtwoElement.validations)
                updatedcardtwoElement.touched = true;
                
                for (let cardTwoElementIdentifier in updatedcardTwo) 
                    cardTwoIsValid = updatedcardTwo[cardTwoElementIdentifier].valid && cardTwoIsValid;
                    
                
                cardTwoIsValid = updatedcardTwo[cardTwoElementIdentifier].valid && cardTwoIsValid;

            }
            
            updatedcardTwo[cardTwoElementIdentifier] = updatedcardtwoElement;
            this.setState({ cardTwo: updatedcardTwo, iscardTwoChanged: true, cardTwoIsValid: cardTwoIsValid });
        }
    }


    headerDeactivate = "active";

    


    deactivate = ({ target }) => {
        this.setState({ active: false });
        this.headerDeactivate = "inactive";
        this.props.client.isDeactive= true;
        { this.props.updateData(this.props.client)  }
    };
    
    validate = (event) => {
        event.preventDefault();
        console.log("In validator");
        console.log(this.state);
        if (!this.state.iscardOneChanged && !this.state.iscardTwoChanged)
            alert('Please Input  Values !');
        if (!((this.state.iscardOneChanged && this.state.iscardTwoChanged ) || (this.state.cardOneIsValid && this.state.cardTwoIsValid)))
            alert('Please Input Valid Values !');
        else {
            const cardOneValueArray = [];
            const cardTwoValueArray = [];
            for (let key in this.state.cardOne)
                cardOneValueArray.push({
                    id: key,
                    config: this.state.cardOne[key]
                });
            for (let key in this.state.cardTwo)
                cardTwoValueArray.push({
                    id: key,
                    config: this.state.cardTwo[key]
                });
            
            let clientIn = {
                company: cardOneValueArray[0].config.value,
                prefix: cardOneValueArray[1].config.value,
                firstName: cardOneValueArray[2].config.value,
                lastName: cardOneValueArray[3].config.value,
                middleName: cardOneValueArray[4].config.value,
                nickName: cardOneValueArray[5].config.value,
                email: cardOneValueArray[6].config.value,
                clientId: this.props.client.clientId,
                address: cardTwoValueArray[0].config.value,
                city: cardTwoValueArray[1].config.value,
                country: cardTwoValueArray[2].config.value,
                state: cardTwoValueArray[3].config.value,
                postalCode: cardTwoValueArray[4].config.value
                
            }

            if (clientIn.company === "")
                clientIn.company = this.props.client.company
            if (clientIn.address === "")
                clientIn.address = this.props.client.address
            if (clientIn.city === "")
                clientIn.city = this.props.client.city
            if (clientIn.postalCode === "")
                clientIn.postalCode = this.props.client.postalCode
            if (clientIn.nickName === "")
                clientIn.nickName = this.props.client.nickName
            if (clientIn.middleName === "")
                clientIn.middleName = this.props.client.middleName
            if (clientIn.firstName === "")
                clientIn.firstName = this.props.client.firstName
            if (clientIn.lastName === "")
                clientIn.lastName = this.props.client.lastName
            if (clientIn.prefix === "")
                clientIn.prefix = this.props.client.prefix
            if (clientIn.country === "")
                clientIn.country = this.props.client.country
            if (clientIn.state === "")
                clientIn.state = this.props.client.state
            if (clientIn.email === "")
                clientIn.email = this.props.client.email

            let validatorObject = {
                firstName: clientIn.firstName,
                lastName: clientIn.lastName,
                Email: clientIn.email
            }
           
                { this.props.ValidateClient(validatorObject) }

                setTimeout(this.finalvalid, 1000, clientIn);
            
        
        }
    }
    finalvalid = (clientIn) => {
        if (this.props.isValid)
        { this.props.updateData(clientIn) }
        else
            alert("User Already Exist !")
    }
    buttonDisable = "return false";
   
    render() {
       
        if (!this.state.active)
            this.buttonDisable = "true"

        const cardOneArray = [];
        const cardTwoArray = [];
        for (let key in this.state.cardOne)
            cardOneArray.push({
                id:key,
                config: this.state.cardOne[key]
            });
        for (let key in this.state.cardTwo)
            cardTwoArray.push({
                id: key,
                config: this.state.cardTwo[key]
            });

        

        return (
            <div className="body">
                <div className={this.headerDeactivate}>
                    <Header firstName={this.props.client.firstName} lastName={this.props.client.lastName} clientID={this.props.client.clientId}/>   
                </div>
                
                <br /><br />
                <div className="bodyinfo">
                    <br />
                    <div className="buttons">
                    
                        <button type="button" className="btn btn-primary" disabled={!this.state.active && this.state.isStateChanged} onClick={this.validate}>Save</button>&nbsp;
                        <button type="button" className="btn btn-primary" disabled={!this.state.active} onClick={this.deactivate}>Deactivate</button>&nbsp;<br />
                        <img src={collapseIcon} width="15" height="15" />&nbsp;
                        <a onClick={this.collapseAll} >Collapse All</a>&nbsp;&nbsp;
                        <img src={expandIcon} width="15" height="15" />&nbsp;
                        <a onClick={this.expandAll} >Expand All</a>&nbsp;
                    </div> <br/><br/>
                   
                  
                            <div className="card-row">

                                <Card>
                                     <Button color="white"  style={{ textAlign: 'left' }} className="cardbuttons" onClick={this.toggleone}> Edit name </Button>
                                     <Collapse isOpen={this.state.cardone}>
                                        <CardBody>
                                            <form >
                                                {cardOneArray.map(cardOne =>
                                                    <Input
                                                        key={cardOne.id}
                                                        label={cardOne.id}
                                                        elementType={cardOne.config.elementType}
                                                        elementConfig={cardOne.config.elementConfig}
                                                        value={cardOne.config.value}
                                                        inValid={!cardOne.config.valid}
                                                        shouldValidate={cardOne.config.shouldValidate}
                                                        touched={this.state.iscardOneChanged}
                                                        changed={(event) => this.cardOneInputChangedHandler(event, cardOne.id)}
                                                     />
                                                )}

                                            </form>
                                        </CardBody>
                                    </Collapse>
                                </Card>
                                <br/><br/>
                           

                            
                                <Card>
                                    <Button color="white" style={{ textAlign: 'left' }} className="cardbuttons" onClick={this.toggletwo}>   Address</Button>
                                    <Collapse isOpen={this.state.cardtwo}>
                                        <CardBody>
                                            <form>
                                                {cardTwoArray.map(cardTwo =>
                                                    <Input
                                                        key={cardTwo.id}
                                                        label={cardTwo.id}
                                                        elementType={cardTwo.config.elementType}
                                                        elementConfig={cardTwo.config.elementConfig}
                                                        value={cardTwo.config.value}
                                                        inValid={!cardTwo.config.valid}
                                                        shouldValidate={cardTwo.config.shouldValidate}
                                                        touched={this.state.iscardTwoChanged}
                                                        changed={(event) => this.cardTwoInputChangedHandler(event, cardTwo.id)}
                                                    />
                                                )}
                                            </form>
                                        </CardBody>
                                    </Collapse>
                                </Card>
                            </div>
                        
                            <br /><br />
                           
                            <div className="buttonlast">
                                <button type="button" style={{ textAlign: 'center' }} className="btn btn-primary " disabled={!this.state.active} onClick={this.validate}>Save</button>
                            </div>
                            <br /><br />
                </div>

                
               
               
              
            </div >
        );
    }
}


const mapDispatchToProps = dispatch =>{
    return {
        getData: () => dispatch(getClient()),
        updateData: (res) => dispatch({ type: "Update Client", payload: res }),
        ValidateClient: (res) => dispatch({ type: "Validate Client", payload: res })
    };
};


const mapStateToProps =state=>{
   return {
       client: state.Client,
       isValid:state.valid
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
