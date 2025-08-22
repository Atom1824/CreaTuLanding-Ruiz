import '../footer.css';

function Footer() {
  return (
   <footer className="footer">
  <p>© 2023 Games E-Com. All rights reserved.</p>
  <p>Follow us on social media!</p>
  <div className="social-media-icons">
    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-facebook-f"></i>
    </a>
    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-twitter"></i>
    </a>
    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram"></i>
    </a>
  </div>
</footer>

  );
}

export default Footer;
