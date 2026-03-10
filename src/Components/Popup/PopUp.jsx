import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function termsPopUp ({openTerms,setOpenTerms}){

return (

    <Popup 
          display="center"
          open={openTerms}
          onClose={() => setOpenTerms(false)}
          modal
          closeOnDocumentClick
          >
            Welcome to the site — I've been working on this for ages and I'm excited to finally share it with you!

To request a login, you should have already provided me (Ben Green) with your email address, which will be the only personal data stored in our database. I've decided to provide passwords myself rather than letting users set their own — this way, if the site were ever compromised, only email addresses would be exposed.

If you'd like your email removed from the system, just let me know — no hard feelings! 😊

If you have any questions about the site's security or data storage, I'd be happy to chat about encryption and cyber security.
<br/>
But if your happy just click agree and follow the steps. Enjoy!

<br/>
<br/>
        
            Privacy Policy
            <br/>
Last updated:  2/3/25
<br/>

This Privacy Policy explains how we collect, use, and protect your personal information.
<br/>
1. Information We Collect
We only collect your email address when you sign up or log in.
<br/>
2. How We Use Your Information
We use your email address to:
Provide access to our services.
Send occasional service-related updates.
<br/>
3. Cookies
We use cookies to remember your login preferences when you select "Remember Me" during login. These cookies are stored on your device and expire automatically after 30 days.

You can disable cookies at any time in your browser settings.
<br/>
4. Data Protection
Your email address will not be shared or sold to third parties. We take reasonable measures to protect your data.
<br/>
5. Contact Us
If you have any questions about this Privacy Policy, please contact us at benjamin-green@live.co.uk

          </Popup>

)

}

export default termsPopUp