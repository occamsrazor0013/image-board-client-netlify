//react packages used
import React, { useState, useEffect } from 'react';
import './Messages.css'
import { useForm} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

{/*after strugging with the problem input fields losing focus after a single character input, I gave up and used react-hook-form package*/}
{/*input fields were losing focus because parent component re renders after every character input*/}
function Messages() {
    
    {/*I originally wanted to make messages and the message form on different files but it seemed easier to put them on one page*/}
    const url = "https://anon-image-board.herokuapp.com/messages";
    
    const {register, handleSubmit, errors} = useForm();
    
    {/*onSubmit function that triggers when form is clicked, built in with message form*/}
    const onSubmit = data => {
        const sendMessage = {
            method: 'POST',
            headers: { 'Content-type': 'application/json'},
            body: JSON.stringify(data)
        }
        fetch(url, sendMessage)
            .then(response => response.json())
        window.location.reload(false)
    }
    {/*onSubmit, fetch url and accept sendMessage object which has the http post request, reload after sending to json */}

    {/*toggle hook to handle visiblity of message form*/}
    const [toggle, setToggle] = useState(false);

    {/*toggler arrow function*/}
    {}
    const toggler = () => {
        toggle ? setToggle(false) : setToggle(true);
        console.log(toggle);
    }
    {/*state of toggle is defaulted to false, if toggler function is called, use function in the hook to update toggle state*/}
    {/*used ternary operator for ease of access*/}

    {/* messages hook, state stores array of posts, initialize with empty array*/}
    const [messages, setMessages] = useState([]);

    {/*async function, on mount or unmount, make a get request to json api, then update state of messages with result using function from hook*/}
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(result => {
                setMessages(result);
            })
        }, []);
    {/*if you do not use pass an empty array as the second argument, there will be an infinite loop of get requests */}
    {/*this may create a memmory leak*/}
    
    {/*function that maps the message data from the array*/}
    {/*used bootstrap to map onto a list class and style headings*/}
    function ActualMessages(){
        return(
        <div class="container">
            <div class="listed-unstyled">
            {messages.slice().reverse().map((message) => 
                <li class="media" key={message._id}>
                    <img class="mr-3 mb-3 mt-3" src={message.imageURL}></img>
                    <div class="media-body">
                        <h5 class="mt-2">Username: {message.username}</h5>
                        <h5>Subject: {message.subject}</h5>
                        <h5>Message:</h5>
                        {message.message}
                        <br />
                    </div>
                    <small>Timestamp: {message.created}</small>
                </li>
            )}
            </div>
        </div>
        )}
    
    {/*the message form*/}  
    {/*used react hooks form to create form*/}
    {/*ref is a keyword from create form package*/}
    {/*onSubmit of the form, handle submit*/}
    {/*has restrictions for the input of each category*/}
    {/*there is an error message that appears if any restrictions are not met*/}
    function MessageForm(){
        return(
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="form-group">
                    <label>Username</label>
                    <input 
                    ref={register({
                        maxLength: {
                            value: 24,
                            message: "Username must be less than 25 characters"
                            }   
                        }
                    )}
                    autoComplete="off"
                    text="text"
                    class="form-control"
                    name="username"
                    placeholder="Enter a Username (if none is entered, Anon will be used)"
                    />
                </div>
                <ErrorMessage errors={errors} name="username" render={({ message }) => <p>{message}</p>}/>
                <div class="form-group">
                    <label>Subject</label>
                    <input
                    ref={register({
                        maxLength: {
                            value: 49,
                            message: "Subject must be less than 49 characters"
                            }   
                        }
                    )}
                    autoComplete="off"
                    type="text"
                    class="form-control" 
                    name="subject"
                    placeholder="Enter a Subject"
                    />
                </div>
                <ErrorMessage errors={errors} name="subject" render={({ message }) => <p>{message}</p>}/>
                <div class="form-group">
                    <label>Message</label>
                    <textarea
                    ref={register({
                        maxLength: {
                            value: 499,
                            message: "Message must be less than 500 characters"
                            }   
                        }
                    )}
                    autoComplete="off"
                    type="text"
                    class="form-control"
                    name="message"
                    placeholder="Enter a Message"
                    rows="3" />
                </div>
                <ErrorMessage errors={errors} name="message" render={({ message }) => <p>{message}</p>}/>
                <div class="form-group">
                    <label>Image URL</label>
                    <input
                    ref={register}
                    autoComplete="off"
                    type="URL"
                    class="form-control"
                    name="imageURL"
                    placeholder="Enter an Image URL"
                    />
                </div>
                <input type="submit" class="btn btn-primary mb-3" />
            </form>
        )
        {/*pseudo submit button*/}
    }

    return (
        <div>
            <h1 class="centerText">
                Welcome to my Full Stack Image Board!
            </h1>
            <h3 class="centerText">
                Created by David Chan, An Aspiring Full Stack Developer{"\n"}
            </h3>
            <h4 class="centerText">
                <a href="#">A Link to My Website</a>
            </h4>
            <h5 class="centerText">
                You MUST use a direct image link or the image will be broken. For example, do not use image links that direct you to a website.
            </h5>
            <h6 class="centerText" id="finalTextAtTop">
               The back end of this board is hosted on heroku and uses dynos to start up the server. However, those dynos sleep after 30 seconds, meaning the server is shut off.
               <br />
               When you first access to this site, A GET request sent from here to the API which then starts up the server again.
               <br />
               Because it takes time to start up the server, you may not see anything at first or your message will not be posted if you post too quickly. Sorry!
            </h6>
            <div class="container">
                <button type="button" class="btn btn-info mb-3" onClick = {() => toggler()}>Show Message Form</button>
                
                    {/*button that toggles visibility of message form, I used a ternary operator with the state of toggle*/}
                    {toggle ? <MessageForm /> : null}
                    {/*messages component*/}
                    <ActualMessages />
            </div>
        </div>
    );
}

export default Messages;
