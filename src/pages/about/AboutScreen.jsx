import React, { useState } from "react";
import Layout from '../../component/Layout';

const AboutScreen = () => {

    const [greetMessage, setGreetMessage] = useState("Hi Liza Nice to Meet you here.");

    const handleClick1 = () => {
        setGreetMessage(greetMessage.toUpperCase());
    }
    const handleClick2 = () => {
        setGreetMessage(greetMessage.toLocaleLowerCase());
    }

    return (
        <Layout>
            <div>
                <h1 color="write">About Screen</h1>
                <h2>{greetMessage}</h2>
                <h2 onClick={handleClick1}>Click To Upper Case the Message</h2>
                <h2 onClick={handleClick2}>Click To Lower Case the Message</h2>
            </div>
        </Layout>
    )
}

export default AboutScreen;