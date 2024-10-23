
import {FaLinkedin, FaInstagram, FaTwitter, FaFacebook} from "react-icons/fa"
// const footerStyles = {
//   backgroundColor: '#333',
//   color: '#fff',
//   padding: '20px',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   justifyContent: 'center',
//   position: 'relative',
//   bottom: '0',
//   width: '100%',
// };

const socialLinksStyle = {
  display: 'flex',
  gap: '15px',
  marginTop: '10px',
};

export const ContactUs = () =>{
    return (
      <div>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '2rem', background:"cover" }}>
        <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus cumque velit maxime molestias sunt, suscipit eveniet, tempora possimus repellat, maiores ipsa provident amet doloremque! Quia doloribus accusamus consectetur illo sequi qui nam autem, quos earum blanditiis quibusdam? Debitis tenetur nam asperiores error at? Officiis illo aspernatur sint aliquam accusamus blanditiis voluptatem harum? Ab, aperiam? Voluptatibus, laudantium. Dolorem ex recusandae facere commodi debitis, provident vitae voluptatem nulla laudantium soluta iure ipsum doloribus maiores suscipit quam blanditiis temporibus eaque magnam deleniti accusamus! Nam nihil deleniti fuga! Excepturi fugit ex deleniti atque aspernatur error facere fugiat a ab vel dignissimos esse cum maiores, ipsum incidunt laboriosam expedita ut facilis consectetur fuga, aliquid quis! Aperiam saepe non quae, ipsa praesentium velit? Temporibus ratione modi aspernatur laudantium dolorum cupiditate unde sapiente? Cumque voluptatibus earum neque sunt officiis veritatis! Dolorem nisi fugiat deserunt libero ratione corporis pariatur iure ducimus dolores facilis, exercitationem laborum aliquid rem minima modi excepturi eaque similique nobis. Corporis, facilis architecto delectus perspiciatis voluptate quam temporibus veritatis voluptas! Ullam veniam dolorum necessitatibus libero ipsam dolore qui sapiente, quia iusto molestias incidunt delectus aspernatur quam nulla vel laboriosam temporibus corporis quae mollitia blanditiis praesentium. Repudiandae ipsam voluptates esse molestias magni commodi temporibus maiores? Illo fuga voluptatibus eligendi quos, aliquam earum dolorem debitis nemo repellendus minima soluta, nostrum obcaecati possimus delectus iure rerum dolor ea doloribus assumenda explicabo at. Dolorum est laborum nesciunt illo debitis laudantium! Quia amet atque, libero nulla quos minus aspernatur eligendi, blanditiis excepturi modi deserunt quibusdam labore distinctio! Nobis atque voluptates perferendis ipsa laborum hic animi tempora veritatis eos eligendi sunt assumenda veniam quibusdam consectetur, dolor nemo! Perspiciatis, saepe eveniet odit sapiente voluptates soluta quibusdam at est debitis magnam ad possimus unde hic non? Quod est doloremque id nam ut consectetur voluptates cum, pariatur quis illo iste sunt molestiae incidunt temporibus. Numquam maxime odio nemo explicabo quia, architecto doloribus voluptatibus dignissimos rem inventore repudiandae tempore? Quidem, amet vero inventore tempora veniam atque saepe? Natus fuga ipsum facilis quos earum repellendus velit illum ducimus dignissimos, voluptate corporis laudantium ad aspernatur veniam et praesentium dolorem error quia harum totam nisi commodi labore. Quod deleniti cumque obcaecati voluptates vel repudiandae consectetur commodi. Iure aliquid corrupti, magnam dicta nesciunt, pariatur animi velit atque nobis itaque totam vitae libero harum fugit excepturi illo fuga nulla delectus doloribus est modi aperiam beatae consequuntur sed. Tempora incidunt quam dolore nobis, debitis sit, voluptatum numquam placeat, cum pariatur odio?</h1>
        </div>
        <footer style={footerStyle}>
      <p>&copy; 2024 Vijaya. All rights reserved.</p>
      <div style={socialLinksStyle}>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={24} color="#fff" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={24} color="#fff" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={24} color="#fff" />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={24} color="#fff" />
        </a>
      </div>
    </footer>
        </div>
    )
}

const footerStyle = {
  display:'flex',
  textAlign: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // semi-transparent background
  color: 'white',
  padding: '10px',
  position: 'fixed',
  width: '100%',
  bottom: '0',
};
