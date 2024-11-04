
import "./Home.css"

const Home = () => {
    return (
      <div className="home-container">
        <div className="upper-div">
        <h1 className="home-title">Build Your Own AI Today</h1>
        <p className="home-subtitle">
        Introducing Vijaya AI, an innovative AI Research Company dedicated to
        helping you build personalized and secured LLMs, tailored and trained on
        your own data.
        </p>
        <button className="home-button">Take A Demo</button>
        </div>
        <div style={{display:'flex'}} className="home-section">
            <h1 
            style={{
              fontSize: '3.5rem',
              fontWeight: '700',
              textAlign: 'center',
              background: 'linear-gradient(90deg, #6a00f4, #f20089)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>Model Finetuning</h1>
          
          <div className="card" style={{ width: "80rem", borderRadius:"44px", marginLeft:"45%" }}>
      <div className="card-body">
        <h5 className="card-title">Create Superior, Cost-Effective, and Swift AI that is Uniquely Yours</h5>
        <p className="card-text">
        Craft and launch your own secure LLM, tailored and trained on your data. Simply provide the input and output, and our application will automatically train it using the best machine learning algorithms.
        </p>
        <h5>“Sail through the world of AI with Vijaya by your side.”</h5>
      </div>
    </div>
    </div>
    <div
  style={{
    backgroundColor: "#ffffff", // Pure white background
    padding: "40px 20px",
    borderRadius: "15px",
    textAlign: "center",
    fontFamily: "'Roboto', sans-serif",
  }}
>
  <h1
    style={{
      fontSize: "36px",
      color: "#000000", // Dark black text
      marginBottom: "10px",
      fontWeight: "700",
      letterSpacing: "1px",
    }}
  >
    Feel empowered more often.
  </h1>
  <p
    style={{
      fontSize: "18px",
      color: "#000000", // Dark black text
      marginBottom: "30px",
      fontWeight: "500",
    }}
  >
    Manage your AI Model smart!
  </p>

  <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
    <img
      src="/path/to/avatar1.png"
      alt="Avatar 1"
      style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        margin: "0 10px",
        transition: "transform 0.3s ease",
      }}
      onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
    />
    <img
      src="/path/to/avatar2.png"
      alt="Avatar 2"
      style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        margin: "0 10px",
        transition: "transform 0.3s ease",
      }}
      onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
    />
    <img
      src="/path/to/avatar3.png"
      alt="Avatar 3"
      style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        margin: "0 10px",
        transition: "transform 0.3s ease",
      }}
      onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
    />
    <img
      src="/path/to/avatar4.png"
      alt="Avatar 4"
      style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        margin: "0 10px",
        transition: "transform 0.3s ease",
      }}
      onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
    />
  </div>

  <div
    style={{
      backgroundColor: "#ffffff", // Pure white background for the card
      borderRadius: "10px",
      padding: "20px",
      margin: "0 auto",
      maxWidth: "600px",
    }}
  >
    <p
      style={{
        fontSize: "18px",
        color: "#000000", // Dark black text
        fontWeight: "500",
        lineHeight: "1.6",
      }}
    >
      Cost effective beyond your imagination. Average cost for a fine-tune is
      below $200.
    </p>
  </div>
</div>

    

      </div>
    );
  };
  export default Home