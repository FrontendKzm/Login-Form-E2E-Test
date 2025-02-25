import { useEffect, useState } from "react"
import { Form,FormGroup,Label,Input,Button, FormFeedback } from "reactstrap"
import { useNavigate } from "react-router-dom";

export default function Login(){

 const emailPattern =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[/=#?!@$%^&*-]).{8,}$/
    
const defaultdata = {email:'',password:''}
const[data,setData]  = useState(defaultdata)
const [profile,setProfile] = useState([])
const[disable,setDisable]= useState(true)
const[validEmail,setValidEmail] = useState()
const[validPassword,setValidPassword] = useState()
const[ischecked,setIsChecked] = useState();

const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();
  if (validEmail && validPassword && ischecked) {
    navigate('/success');
  }
};


const handleChange =(e)=>{
const{name,value,type,checked}=e.target
setData((prevData)=>({...prevData,[name]:value}))
console.log(data)

if(name === 'email'){
   setValidEmail(emailPattern.test(value)) 
}


if (name === "password") {
    setValidPassword(passwordPattern.test(value));
  }
  if(type === "checkbox"){
    setIsChecked(checked)  
  }
}

useEffect(()=>{
    if(validEmail && validPassword && ischecked){setDisable(false)}
    else setDisable(true);   
   },[validEmail,validPassword,ischecked])

   return(
   <div className="log-container">
   <Form onSubmit={handleSubmit} >
    <FormGroup>
      <Label for="exampleEmail">
        Email
      </Label>
      <Input
      className="inputs"
        id="exampleEmail"
        name="email"
        placeholder="enter your email"
        type="email"
        onChange={handleChange}
        value={data.email}
        valid={validEmail}
        invalid={!validEmail}
        autoComplete="on"
      />
    </FormGroup>
    <FormGroup>
      <Label for="examplePassword">
        Password
      </Label>
      <Input
      className="inputs"
        id="examplePassword"
        name="password"
        placeholder="enter a strong password"
        type="password"
        onChange={handleChange}
        value={data.password}
        valid={validPassword}
        invalid={!validPassword}
        autoComplete="on"
      />
     {validPassword?(<FormFeedback valid = {true}>Strong password!</FormFeedback>):(<FormFeedback className="feedback" invalid={true}>Passwords should be:
At least 8 characters in length.
Include a random mixture of letters (uppercase and lowercase), numbers and symbols characters (e.g . / = ! @ # $ % ^ & * ( ) – + ? ).</FormFeedback>) }
    </FormGroup>
    <FormGroup check>
    <Label for="cbox">I agree to the terms and conditions.</Label>
    <Input
    id="cbox"
    name="ischecked"
    type="checkbox"
    onChange={handleChange}
    />
    </FormGroup>
    <Button  outline type="submit" size="lg" block color="dark" disabled={disable}
    > Log in</Button>
    </Form>
    </div>
    ) 
}