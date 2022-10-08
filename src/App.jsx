import React, {useEffect, useState} from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = 'changjiashuai';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {

    /*
     * Just a state variable we use to store our user's public wallet. Don't forget to import useState.
     */
    const [currentAccount, setCurrentAccount] = useState(null);

    /*
    * Start by creating a new action that we will run on component load
    */
    // Actions
    const checkIfWalletIsConnected = async () => {
        try {
            /*
             * First make sure we have access to window.ethereum
             */
            const {ethereum} = window;

            if (!ethereum) {
                console.log('Make sure you have MetaMask!');
                return;
            } else {
                console.log('We have the ethereum object', ethereum);

                /*
                * Check if we're authorized to access the user's wallet
                */
                const accounts = await ethereum.request({method: 'eth_accounts'});

                /*
                 * User can have multiple authorized accounts, we grab the first one if its there!
                 */
                if (accounts.length !== 0) {
                    const account = accounts[0];
                    console.log('Found an authorized account:', account);
                    setCurrentAccount(account);
                } else {
                    console.log('No authorized account found');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    /*
   * Implement your connectWallet method here
   */
    const connectWalletAction = async () => {
        try {
            const {ethereum} = window;

            if (!ethereum) {
                alert('Get MetaMask!');
                return;
            }

            /*
             * Fancy method to request access to account.
             */
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });

            /*
             * Boom! This should print out public address once we authorize Metamask.
             */
            console.log('Connected', accounts[0]);
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
        }
    };

    /*
     * This runs our function when the page loads.
     */
    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <div className="App">
            <div className="container">
                <div className="header-container">
                    <p className="header gradient-text">⚔️ Avengers Slayer ⚔️</p>
                    <p className="sub-text">Team up to Avengers kill Boss.!</p>
                    <div className="connect-wallet-container">
                        <img
                            src="https://44.media.tumblr.com/552c78035b27755554b441946102561d/fa206edb94446be4-b9/s540x810_f1/696d2298450ee27125f37a2484d8e421877fbd1c.gifv"
                            alt="THE AVENGERS Gif"
                        />
                        {/*
                          * Button that we will use to trigger wallet connect
                          * Don't forget to add the onClick event to call your method!
                          */}
                        <button
                            className="cta-button connect-wallet-button"
                            onClick={connectWalletAction}
                        >
                            Connect Wallet To Get Started
                        </button>
                    </div>
                </div>
                <div className="footer-container">
                    <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo}/>
                    <a
                        className="footer-text"
                        href={TWITTER_LINK}
                        target="_blank"
                        rel="noreferrer"
                    >{`built with @${TWITTER_HANDLE}`}</a>
                </div>
            </div>
        </div>
    );
};

export default App;
